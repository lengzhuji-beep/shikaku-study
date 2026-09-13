import urllib.request
import re
import json
import time
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

# 過去5年分の全15実施回
SESSIONS = [
    {'id': '2024-01', 'dir': '2024_1', 'name': '2024年 1月実施回'},
    {'id': '2023-09', 'dir': '2023_9', 'name': '2023年 9月実施回'},
    {'id': '2023-05', 'dir': '2023_5', 'name': '2023年 5月実施回'},
    {'id': '2023-01', 'dir': '2023_1', 'name': '2023年 1月実施回'},
    {'id': '2022-09', 'dir': '2022_9', 'name': '2022年 9月実施回'},
    {'id': '2022-05', 'dir': '2022_5', 'name': '2022年 5月実施回'},
    {'id': '2022-01', 'dir': '2022_1', 'name': '2022年 1月実施回'},
    {'id': '2021-09', 'dir': '2021_9', 'name': '2021年 9月実施回'},
    {'id': '2021-05', 'dir': '2021_5', 'name': '2021年 5月実施回'},
    {'id': '2021-01', 'dir': '2021_1', 'name': '2021年 1月実施回'},
    {'id': '2020-09', 'dir': '2020_9', 'name': '2020年 9月実施回'},
    {'id': '2020-01', 'dir': '2020_1', 'name': '2020年 1月実施回'},
    {'id': '2019-09', 'dir': '2019_9', 'name': '2019年 9月実施回'},
    {'id': '2019-05', 'dir': '2019_5', 'name': '2019年 5月実施回'},
    {'id': '2019-01', 'dir': '2019_1', 'name': '2019年 1月実施回'}
]

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
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return None

    # 問題文
    m = re.search(r'<div class="mondai">([\s\S]*?)</div>', html)
    mondai_raw = m.group(1) if m else ''
    if not mondai_raw:
        return None

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

    # 正解判定
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

    if options[0] == '(1) ◯（適切）':
        if ans == '(1)':
            explanation = f"【正解：◯（適切）】<br>記述のとおり適切です。{cat['name']}の基本事項・法令要件を満たした正しい内容です。"
        else:
            explanation = f"【正解：✕（不適切）】<br>記述は不適切（誤り）です。{cat['name']}における例外規定や数値要件と混同しないよう整理しておきましょう。"
    else:
        explanation = f"【正解：{ans}】<br>{cat['name']}における重要テーマです。選択肢ごとの条件・数値の違いを正しく見極めることが大切です。"

    return {
        'num': q_num,
        'catKey': cat['key'],
        'catName': cat['name'],
        'catClass': cat['class'],
        'text': q_text,
        'options': options,
        'correct': ans,
        'explanation': explanation
    }

def fetch_all():
    all_data = {}
    total_q = 0

    # 既に2024-01があればロード
    if os.path.exists('fp3_2024_1.json'):
        with open('fp3_2024_1.json', 'r', encoding='utf-8') as f:
            all_data['2024-01'] = json.load(f)
            total_q += len(all_data['2024-01'])
            print(f"Loaded existing 2024-01 ({len(all_data['2024-01'])} questions)")

    for s in SESSIONS:
        sid = s['id']
        sdir = s['dir']
        sname = s['name']

        if sid in all_data:
            continue

        print(f"Fetching {sname} ({sdir})...", flush=True)
        questions = []
        for q_num in range(1, 61):
            q = fetch_single_question(sdir, q_num)
            if q:
                q['sessionId'] = sid
                q['sessionName'] = sname
                questions.append(q)
            time.sleep(0.04) # 高速かつ安全なウェイト

        if questions:
            all_data[sid] = questions
            total_q += len(questions)
            print(f" -> Successfully fetched {len(questions)} questions for {sname} (Total: {total_q})", flush=True)
            # 中間保存
            with open('fp3_past_all.json', 'w', encoding='utf-8') as f:
                json.dump(all_data, f, ensure_ascii=False)
        else:
            print(f" -> No questions returned for {sname}", flush=True)

    print(f"ALL FETCHING COMPLETED! Total sessions: {len(all_data)}, Total questions: {total_q}", flush=True)

if __name__ == '__main__':
    fetch_all()
