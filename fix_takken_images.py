import json
import os
import re
import urllib.request

JSON_PATH = 'site/data/takken_questions.json'
JS_PATH = 'site/assets/js/takken-past-all-data.js'
IMG_DIR = 'site/assets/images/takken'
os.makedirs(IMG_DIR, exist_ok=True)

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Total questions: {len(questions)}")

fixed_count = 0
downloaded_count = 0

def resolve_and_download(src, session_id):
    global downloaded_count
    if not src or src.startswith('data:'):
        return src
    
    # Extract clean filename
    raw_name = os.path.basename(src.split('?')[0])
    # Prefix with sessionId to prevent collision across sessions having same "01.png"
    save_filename = f"{session_id}_{raw_name}"
    local_path = os.path.join(IMG_DIR, save_filename)
    rel_path = f"../assets/images/takken/{save_filename}"
    
    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        return rel_path

    # Candidate URLs to try
    candidates = []
    if src.startswith('http'):
        candidates.append(src)
    elif src.startswith('/'):
        candidates.append(f"https://takken-siken.com{src}")
    else:
        # Relative to session
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
                    downloaded_count += 1
                    return rel_path
        except Exception:
            continue
            
    # If not downloadable, return original or sanitized
    return src

for q in questions:
    sid = q['sessionId']
    
    def repl(match):
        orig_src = match.group(1)
        new_src = resolve_and_download(orig_src, sid)
        return f'src="{new_src}"'
        
    q['question'] = re.sub(r'src=["\']([^"\']+)["\']', repl, q['question'])
    if q['explanation']:
        q['explanation'] = re.sub(r'src=["\']([^"\']+)["\']', repl, q['explanation'])
    if q['options']:
        for k in q['options']:
            q['options'][k] = re.sub(r'src=["\']([^"\']+)["\']', repl, q['options'][k])

print(f"Downloaded {downloaded_count} images.")

with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

with open(JS_PATH, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace questions in JS file
with open(JS_PATH, 'w', encoding='utf-8') as f:
    f.write("window.TAKKEN_PAST_QUESTIONS = ")
    json.dump(questions, f, ensure_ascii=False)
    f.write(";\n")
    # Preserve TAKKEN_SESSIONS
    m = re.search(r'window\.TAKKEN_SESSIONS\s*=\s*(\[[\s\S]*?\]);', js_content)
    if m:
        f.write(f"window.TAKKEN_SESSIONS = {m.group(1)};\n")

print("Updated JSON and JS files successfully!")
