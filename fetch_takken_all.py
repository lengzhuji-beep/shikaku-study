import urllib.request
import re
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "https://takken-siken.com"

SESSIONS = [
    {'id': '2025', 'name': '令和7年度（2025年）本試験', 'year': '2025年', 'q_count': 50},
    {'id': '2024', 'name': '令和6年度（2024年）本試験', 'year': '2024年', 'q_count': 50},
    {'id': '2023', 'name': '令和5年度（2023年）本試験', 'year': '2023年', 'q_count': 50},
    {'id': '2022', 'name': '令和4年度（2022年）本試験', 'year': '2022年', 'q_count': 50},
    {'id': '2021-2', 'name': '令和3年12月本試験', 'year': '2021年12月', 'q_count': 50},
    {'id': '2021-1', 'name': '令和3年10月本試験', 'year': '2021年10月', 'q_count': 50},
    {'id': '2020-2', 'name': '令和2年12月本試験', 'year': '2020年12月', 'q_count': 50},
    {'id': '2020-1', 'name': '令和2年10月本試験', 'year': '2020年10月', 'q_count': 50},
    {'id': '2019', 'name': '令和元年（2019年）本試験', 'year': '2019年', 'q_count': 50},
    {'id': '2018', 'name': '平成30年度（2018年）本試験', 'year': '2018年', 'q_count': 50},
    {'id': '2017', 'name': '平成29年度（2017年）本試験', 'year': '2017年', 'q_count': 50},
    {'id': '2016', 'name': '平成28年度（2016年）本試験', 'year': '2016年', 'q_count': 50},
    {'id': '2015', 'name': '平成27年度（2015年）本試験', 'year': '2015年', 'q_count': 50},
    {'id': '2014', 'name': '平成26年度（2014年）本試験', 'year': '2014年', 'q_count': 50},
    {'id': '2013', 'name': '平成25年度（2013年）本試験', 'year': '2013年', 'q_count': 50},
    {'id': '2012', 'name': '平成24年度（2012年）本試験', 'year': '2012年', 'q_count': 50},
    {'id': '2011', 'name': '平成23年度（2011年）本試験', 'year': '2011年', 'q_count': 50},
]

IMG_DIR = os.path.join(os.path.dirname(__file__), 'assets', 'images', 'takken')
os.makedirs(IMG_DIR, exist_ok=True)

def download_image(img_rel_url):
    if not img_rel_url or img_rel_url.startswith('data:'):
        return img_rel_url
    if img_rel_url.startswith('http'):
        full_url = img_rel_url
    else:
        full_url = BASE_URL + ('/' if not img_rel_url.startswith('/') else '') + img_rel_url
    
    filename = os.path.basename(img_rel_url.split('?')[0])
    local_path = os.path.join(IMG_DIR, filename)
    
    if not os.path.exists(local_path):
        try:
            req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                with open(local_path, 'wb') as f:
                    f.write(resp.read())
        except Exception as e:
            print(f"Failed to download image {full_url}: {e}")
            return img_rel_url
            
    return f"../assets/images/takken/{filename}"

def process_html_images(html_text):
    if not html_text:
        return ""
    
    def repl(match):
        src = match.group(1)
        new_src = download_image(src)
        return f'src="{new_src}"'
        
    return re.sub(r'src=["\']([^"\']+)["\']', repl, html_text)

def clean_html(text):
    if not text:
        return ""
    text = re.sub(r'<div class="similar_list_wrap">[\s\S]*?</div>\s*</div>', '', text)
    text = re.sub(r'<div class="similar_list_wrap">[\s\S]*?</div>', '', text)
    text = re.sub(r'<script[\s\S]*?</script>', '', text)
    text = re.sub(r'<ins[\s\S]*?</ins>', '', text)
    text = re.sub(r'<!--[\s\S]*?-->', '', text)
    text = re.sub(r'<a\s+href="[^"]*"[^>]*>(.*?)</a>', r'\1', text)
    return text.strip()

def get_field_info(kamoku, saimoku, q_num):
    if "権利関係" in kamoku or (1 <= q_num <= 14):
        return {
            'fieldKey': 'rights',
            'fieldName': '権利関係',
            'subCategory': saimoku or '権利関係',
            'badgeClass': 'badge-cat-rights'
        }
    elif "法令上の制限" in kamoku or (15 <= q_num <= 22):
        return {
            'fieldKey': 'limits',
            'fieldName': '法令上の制限',
            'subCategory': saimoku or '法令上の制限',
            'badgeClass': 'badge-cat-limits'
        }
    elif "宅地建物取引業法" in kamoku or "宅建業法" in kamoku or (26 <= q_num <= 45):
        return {
            'fieldKey': 'gyohou',
            'fieldName': '宅建業法',
            'subCategory': saimoku or '宅建業法',
            'badgeClass': 'badge-cat-gyohou'
        }
    else:
        return {
            'fieldKey': 'tax_other',
            'fieldName': '税・その他',
            'subCategory': saimoku or '税・その他',
            'badgeClass': 'badge-cat-tax'
        }

def fetch_single_question(session_id, q_num):
    q_str = f"{q_num:02d}"
    url = f"{BASE_URL}/kakomon/{session_id}/{q_str}.html"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

    # 1. 問題文
    m_mondai = re.search(r'<div class="mondai">([\s\S]*?)</div>', html)
    mondai = m_mondai.group(1).strip() if m_mondai else ""
    mondai = process_html_images(mondai)

    # 2. 選択肢
    m_select = re.search(r'<ol class="selectList">([\s\S]*?)</ol>', html)
    options = {}
    if m_select:
        raw_items = re.split(r'<li(?:\s+[^>]*)?>', m_select.group(1))
        idx = 1
        for item in raw_items:
            item_clean = item.strip()
            if not item_clean:
                continue
            item_clean = re.sub(r'</li>$', '', item_clean).strip()
            item_clean = process_html_images(item_clean)
            options[f"({idx})"] = item_clean
            idx += 1

    # 正解番号
    correct_key = None
    m_btn = re.search(r'<div class="selectBtn">([\s\S]*?)</div>', html)
    if m_btn:
        m_ans = re.search(r'data-answer="t">(\d+)</a>', m_btn.group(1))
        if m_ans:
            correct_key = f"({m_ans.group(1)})"

    if not correct_key:
        m_char = re.search(r'class="answerChar"><em[^>]*>(\d+)</em>', html)
        if m_char:
            correct_key = f"({m_char.group(1)})"

    # 3. 分野
    kamoku = ""
    saimoku = ""
    m_bunya = re.search(r'<section class="content bunyalinks">([\s\S]*?)</section>', html)
    if m_bunya:
        bunya_txt = m_bunya.group(1)
        m_k = re.search(r'科目：<a[^>]*>(.*?)</a>', bunya_txt)
        if m_k:
            kamoku = m_k.group(1).strip()
        m_s = re.search(r'細目：<a[^>]*>(.*?)</a>', bunya_txt)
        if m_s:
            saimoku = m_s.group(1).strip()

    field_info = get_field_info(kamoku, saimoku, q_num)

    # 4. 解説
    m_kai = re.search(r'<section class="content kaisetsu"><h3>解説</h3>([\s\S]*?)</section>', html)
    kaisetsu = ""
    if m_kai:
        kaisetsu = clean_html(m_kai.group(1))
        kaisetsu = process_html_images(kaisetsu)
    else:
        kaisetsu = f"<p>正解は <strong>{correct_key}</strong> です。</p>"

    return {
        'id': f"takken-{session_id}-{q_num}",
        'sessionId': session_id,
        'num': q_num,
        'question': mondai,
        'options': options,
        'answer': correct_key,
        'kamoku': kamoku,
        'saimoku': saimoku,
        'fieldKey': field_info['fieldKey'],
        'fieldName': field_info['fieldName'],
        'subCategory': field_info['subCategory'],
        'badgeClass': field_info['badgeClass'],
        'explanation': kaisetsu
    }

def main():
    print(f"Starting fetch for all 17 Takken sessions (2025 to 2011)...")
    all_questions = []
    
    tasks = []
    for s in SESSIONS:
        sid = s['id']
        for q in range(1, 51):
            tasks.append((sid, q))
            
    print(f"Total questions to fetch: {len(tasks)}")
    
    results = {}
    with ThreadPoolExecutor(max_workers=8) as executor:
        future_to_task = {executor.submit(fetch_single_question, sid, q): (sid, q) for sid, q in tasks}
        completed = 0
        for future in as_completed(future_to_task):
            sid, q = future_to_task[future]
            completed += 1
            if completed % 50 == 0 or completed == len(tasks):
                print(f"Progress: {completed}/{len(tasks)} ({completed/len(tasks)*100:.1f}%)")
            try:
                data = future.result()
                if data:
                    results[(sid, q)] = data
            except Exception as e:
                print(f"Exception for {sid} Q{q}: {e}")
                
    for s in SESSIONS:
        sid = s['id']
        for q in range(1, 51):
            if (sid, q) in results:
                all_questions.append(results[(sid, q)])
                
    print(f"Successfully fetched {len(all_questions)} questions!")
    
    # Save to JSON
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'takken_questions.json')
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"Saved JSON to: {json_path}")
    
    # Save to JS data file
    js_path = os.path.join(os.path.dirname(__file__), 'assets', 'js', 'takken-past-all-data.js')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write("window.TAKKEN_PAST_QUESTIONS = ")
        json.dump(all_questions, f, ensure_ascii=False)
        f.write(";\n")
        f.write("window.TAKKEN_SESSIONS = ")
        json.dump(SESSIONS, f, ensure_ascii=False)
        f.write(";\n")
    print(f"Saved JS to: {js_path}")

if __name__ == '__main__':
    main()
