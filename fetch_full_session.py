import urllib.request
import re
import json
import time
import sys

sys.stdout.reconfigure(encoding='utf-8')

def get_category_info(num):
    if (1 <= num <= 5) or (31 <= num <= 35):
        return {'key': 'life', 'name': 'ライフプランニングと資金計画', 'class': 'badge-cat-life'}
    elif (6 <= num <= 10) or (36 <= num <= 40):
        return {'key': 'risk', 'name': 'リスク管理', 'class': 'badge-cat-risk'}
    elif (11 <= num <= 15) or (41 <= num <= 45):
        return {'key': 'finance', 'name': '金融資産運用', 'class': 'badge-cat-finance'}
    elif (16 <= num <= 20) or (46 <= num <= 50):
        return {'key': 'tax', 'name': 'タックスプランニング', 'class': 'badge-cat-tax'}
    elif (21 <= num <= 25) or (51 <= num <= 55):
        return {'key': 'realestate', 'name': '不動産', 'class': 'badge-cat-realestate'}
    else:
        return {'key': 'inheritance', 'name': '相続・事業承継', 'class': 'badge-cat-inheritance'}

def fetch_single_question(year_str, q_num):
    q_str = f"{q_num:02d}"
    url = f"https://fp3-siken.com/kakomon/{year_str}/{q_str}.html"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}", file=sys.stderr)
        return None

    # 問題文
    m = re.search(r'<div class="mondai">([\s\S]*?)</div>', html)
    mondai_raw = m.group(1) if m else ''
    
    # 選択肢 (<ol><li>...<li>...<li>...</ol>)
    ol_m = re.search(r'<ol>([\s\S]*?)</ol>', mondai_raw)
    options = []
    if ol_m:
        raw_opts = re.findall(r'<li>([\s\S]*?)(?=<li>|</ol>|$)', ol_m.group(1))
        options = [f"({i+1}) " + re.sub(r'<[^>]+>', '', opt).strip() for i, opt in enumerate(raw_opts)]
        q_text = re.sub(r'<ol>[\s\S]*?</ol>', '', mondai_raw)
    else:
        q_text = mondai_raw
        options = ['(1) ◯（適切）', '(2) ✕（不適切）']

    q_text = re.sub(r'<span class="bb"></span>', '【 空欄 】', q_text)
    q_text = re.sub(r'<[^>]+>', '', q_text).strip()

    # 正解判定 (answerCharブロック内の判定)
    ans_block_m = re.search(r'class="answerChar">([\s\S]*?)</span>', html)
    ans_block = ans_block_m.group(1) if ans_block_m else ''

    ans = '(1)'
    if 'class="batu"' in ans_block:
        ans = '(2)'
    elif 'class="maru"' in ans_block:
        ans = '(1)'
    else:
        num_m = re.search(r'([123])', ans_block)
        if num_m:
            ans = f'({num_m.group(1)})'

    cat = get_category_info(q_num)

    return {
        'num': q_num,
        'catKey': cat['key'],
        'catName': cat['name'],
        'catClass': cat['class'],
        'text': q_text,
        'options': options,
        'correct': ans
    }

def build_session(year_str, session_name):
    print(f"Fetching {session_name} ({year_str})...")
    questions = []
    for q_num in range(1, 61):
        q = fetch_single_question(year_str, q_num)
        if q:
            if q['options'][0] == '(1) ◯（適切）':
                if q['correct'] == '(1)':
                    explanation = f"【正解：◯（適切）】<br>記述のとおりです。{q['catName']}の基本原則および関連法令に適合した正しい説明です。"
                else:
                    explanation = f"【正解：✕（不適切）】<br>本問の記述は誤りです。{q['catName']}に関する規定・要件の例外や正しい条件を混同しないよう整理しておきましょう。"
            else:
                explanation = f"【正解：{q['correct']}】<br>{q['catName']}における出題頻度の高い重要テーマです。選択肢ごとの数値・要件の差異を正しく判別できるようにしましょう。"

            q['explanation'] = explanation
            questions.append(q)
        time.sleep(0.08)
    print(f"Successfully fetched {len(questions)} questions for {session_name}")
    return questions

if __name__ == '__main__':
    q_list = build_session('2024_1', '2024年1月試験')
    with open('fp3_2024_1.json', 'w', encoding='utf-8') as f:
        json.dump(q_list, f, ensure_ascii=False, indent=2)
    print("Done. Sample Q1-Q3 correct answers:")
    for i in range(3):
        print(f"Q{q_list[i]['num']}: {q_list[i]['correct']}")
