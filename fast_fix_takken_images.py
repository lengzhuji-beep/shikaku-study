import json
import os
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(encoding='utf-8')

JSON_PATH = 'site/data/takken_questions.json'
JS_PATH = 'site/assets/js/takken-past-all-data.js'
IMG_DIR = 'site/assets/images/takken'
os.makedirs(IMG_DIR, exist_ok=True)

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Total questions loaded: {len(questions)}", flush=True)

# Collect all unique (src, sessionId) pairs
src_session_pairs = set()
for q in questions:
    sid = q['sessionId']
    all_text = q['question'] + ' ' + (q['explanation'] or '')
    if q['options']:
        for k, v in q['options'].items():
            all_text += ' ' + str(v)
    for m in re.finditer(r'src=["\']([^"\']+)["\']', all_text):
        src_session_pairs.add((m.group(1), sid))

print(f"Total unique (src, sessionId) pairs: {len(src_session_pairs)}", flush=True)

cache = {}

def download_one_pair(src, session_id):
    if not src or src.startswith('data:'):
        return (src, session_id, src)
        
    raw_name = os.path.basename(src.split('?')[0])
    save_filename = f"{session_id}_{raw_name}"
    local_path = os.path.join(IMG_DIR, save_filename)
    rel_path = f"../assets/images/takken/{save_filename}"
    
    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        return (src, session_id, rel_path)

    candidates = []
    if src.startswith('http'):
        candidates.append(src)
    elif src.startswith('/'):
        candidates.append(f"https://takken-siken.com{src}")
    else:
        candidates.append(f"https://takken-siken.com/kakomon/{session_id}/{src}")
        candidates.append(f"https://takken-siken.com/{src}")
        candidates.append(f"https://takken-siken.com/img/{raw_name}")
        candidates.append(f"https://takken-siken.com/kakomon/img/{raw_name}")

    headers = {'User-Agent': 'Mozilla/5.0'}
    for url in candidates:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as resp:
                content = resp.read()
                if len(content) > 0:
                    with open(local_path, 'wb') as f:
                        f.write(content)
                    return (src, session_id, rel_path)
        except Exception:
            continue
            
    return (src, session_id, src)

with ThreadPoolExecutor(max_workers=10) as executor:
    futures = [executor.submit(download_one_pair, src, sid) for src, sid in src_session_pairs]
    done_count = 0
    for f in as_completed(futures):
        orig_src, sid, final_src = f.result()
        cache[(orig_src, sid)] = final_src
        done_count += 1
        if done_count % 50 == 0 or done_count == len(futures):
            print(f"Image pairs processed: {done_count}/{len(futures)}", flush=True)

# Now rewrite questions with cached replacements
for q in questions:
    sid = q['sessionId']
    
    def repl(match):
        orig_src = match.group(1)
        new_src = cache.get((orig_src, sid), orig_src)
        return f'src="{new_src}"'
        
    q['question'] = re.sub(r'src=["\']([^"\']+)["\']', repl, q['question'])
    if q['explanation']:
        q['explanation'] = re.sub(r'src=["\']([^"\']+)["\']', repl, q['explanation'])
    if q['options']:
        for k in q['options']:
            q['options'][k] = re.sub(r'src=["\']([^"\']+)["\']', repl, q['options'][k])

with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

with open(JS_PATH, 'r', encoding='utf-8') as f:
    js_content = f.read()

with open(JS_PATH, 'w', encoding='utf-8') as f:
    f.write("window.TAKKEN_PAST_QUESTIONS = ")
    json.dump(questions, f, ensure_ascii=False)
    f.write(";\n")
    m = re.search(r'window\.TAKKEN_SESSIONS\s*=\s*(\[[\s\S]*?\]);', js_content)
    if m:
        f.write(f"window.TAKKEN_SESSIONS = {m.group(1)};\n")

print("All image pairs resolved and written to JSON & JS!", flush=True)
