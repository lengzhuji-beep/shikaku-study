import urllib.request
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def fetch_q(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
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

    # 正解判定
    ans = '不明'
    if 'class="maru"' in html:
        ans = '(1)'
    elif 'class="batu"' in html:
        ans = '(2)'
    else:
        num_m = re.search(r'class="answerChar">[\s\S]*?<em[^>]*>([123])</em>', html)
        if num_m:
            num = num_m.group(1)
            ans = f'({num})'

    return {
        'text': q_text,
        'options': options,
        'correct': ans
    }

print(json.dumps(fetch_q('https://fp3-siken.com/kakomon/2024_1/01.html'), ensure_ascii=False, indent=2))
print(json.dumps(fetch_q('https://fp3-siken.com/kakomon/2024_1/31.html'), ensure_ascii=False, indent=2))
