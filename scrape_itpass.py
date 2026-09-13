import os
import time
import json
import requests
from bs4 import BeautifulSoup
import urllib.parse

BASE_URL = 'https://www.itpassportsiken.com'
IMAGE_DIR = os.path.join(os.path.dirname(__file__), 'assets', 'images', 'it-passport')
os.makedirs(IMAGE_DIR, exist_ok=True)

# List of all exam periods (from main page)
exams = [
    '08_haru', '07_haru', '06_haru', '05_haru', '04_haru', '03_haru',
    '02_aki', '01_aki', '31_haru', '30_aki', '30_haru',
    '29_aki', '29_haru', '28_aki', '28_haru', '27_aki', '27_haru',
    '26_aki', '26_haru', '25_aki', '25_haru', '24_aki', '24_haru',
    '23_aki', '23_toku', '22_aki', '22_haru', '21_aki', '21_haru'
]

def download_and_replace_image(img_tag, page_url):
    src = img_tag.get('src')
    if not src:
        return
    # Resolve absolute URL
    img_url = urllib.parse.urljoin(page_url, src)
    if 'itpassportsiken.com' not in img_url:
        return # Skip external images
        
    filename = os.path.basename(urllib.parse.urlparse(img_url).path)
    if not filename:
        return
        
    # Some images might have the same name in different folders, so prepend a unique identifier if needed,
    # but for simplicity let's use the original name. If it exists, we just use it.
    local_path = os.path.join(IMAGE_DIR, filename)
    if not os.path.exists(local_path):
        try:
            res = requests.get(img_url)
            res.raise_for_status()
            with open(local_path, 'wb') as f:
                f.write(res.content)
            time.sleep(0.5) # small delay for image download
        except Exception as e:
            print(f"Failed to download image {img_url}: {e}")
            return
            
    # Update src to point to our local assets
    img_tag['src'] = f"../../assets/images/it-passport/{filename}"


def extract_question(exam, q_num):
    url = f"{BASE_URL}/kakomon/{exam}/q{q_num}.html"
    try:
        res = requests.get(url)
        if res.status_code != 200:
            return None
    except Exception as e:
        print(f"Request failed for {url}: {e}")
        return None
        
    soup = BeautifulSoup(res.content, 'html.parser')
    main_col = soup.find('main', id='mainCol')
    if not main_col:
        return None
        
    # Categories
    categories = []
    category_div = main_col.find(lambda tag: tag.name == 'h3' and '分類' in tag.text)
    if category_div:
        next_div = category_div.find_next_sibling('div')
        if next_div:
            categories = [c.strip() for c in next_div.text.split('»') if c.strip()]
            
    # Download images in the main column
    for img in main_col.find_all('img'):
        download_and_replace_image(img, url)
        
    # Question text
    mondai_div = main_col.find('div', id='mondai')
    question_html = ""
    if mondai_div:
        # Get inner HTML
        question_html = "".join([str(c) for c in mondai_div.contents]).strip()
        
    # Options
    select_ul = main_col.find('ul', class_='selectList')
    options = {}
    if select_ul:
        for li in select_ul.find_all('li'):
            btn = li.find('button', class_='selectBtn')
            span = li.find('span')
            if btn and span:
                opt_char = btn.text.strip()
                opt_text = "".join([str(c) for c in span.contents]).strip()
                options[opt_char] = opt_text
                
    # Correct Answer
    answer_char = ""
    ans_box = main_col.find('span', id='answerChar')
    if ans_box:
        answer_char = ans_box.text.strip()
        
    # Explanation
    kaisetsu_div = main_col.find('div', id='kaisetsu')
    kaisetsu_html = ""
    if kaisetsu_div:
        kaisetsu_html = "".join([str(c) for c in kaisetsu_div.contents]).strip()
        
    # Check if this is a valid question
    if not question_html or not answer_char:
        return None
        
    return {
        "id": f"{exam}_q{q_num}",
        "exam": exam,
        "q_num": q_num,
        "categories": categories,
        "question": question_html,
        "options": options,
        "answer": answer_char,
        "explanation": kaisetsu_html
    }

def main():
    all_questions = []
    out_file = os.path.join(os.path.dirname(__file__), 'data', 'itpass_questions.json')
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    
    # Check if we are resuming
    if os.path.exists(out_file):
        try:
            with open(out_file, 'r', encoding='utf-8') as f:
                all_questions = json.load(f)
            print(f"Resuming with {len(all_questions)} questions loaded.")
        except Exception:
            pass
            
    existing_ids = {q['id'] for q in all_questions}
    
    total_exams = len(exams)
    for i, exam in enumerate(exams):
        print(f"Processing exam {exam} ({i+1}/{total_exams})...")
        for q_num in range(1, 101):
            q_id = f"{exam}_q{q_num}"
            if q_id in existing_ids:
                continue
                
            q_data = extract_question(exam, q_num)
            if q_data:
                all_questions.append(q_data)
                existing_ids.add(q_id)
                print(f"  Extracted {q_id}")
            else:
                print(f"  Failed or missing {q_id}")
                
            # Sleep to be polite
            time.sleep(1)
            
        # Save after every exam
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(all_questions, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
