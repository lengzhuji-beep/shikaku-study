import requests
import json
from bs4 import BeautifulSoup

def extract_question(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    main_col = soup.find('main', id='mainCol')
    if not main_col: return None
    
    # Breadcrumbs (pan)
    pan = main_col.find('div', class_='pan')
    breadcrumbs = []
    if pan:
        for a in pan.find_all('a'):
            breadcrumbs.append(a.text.strip())
        breadcrumbs.append(pan.find('b').text.strip()) if pan.find('b') else None
    
    # Extract Categories from breadcrumbs (e.g. HOME > 過去問題 > 令和6年度 > 問1 > ストラテジ系 企業活動)
    major_category = ""
    minor_category = ""
    if pan:
        # e.g. "HOME»ITパスポート令和6年度春期公開問題»問1" -> doesn't have category here.
        pass
        
    # Categories might be in #qTag
    qtag = main_col.find('div', id='qTag')
    tags = []
    if qtag:
        tags = [tag.text.strip() for tag in qtag.find_all('a')]
    
    # Question text
    q_div = main_col.find('div', id='mondai')
    q_text = str(q_div) if q_div else ""
    
    # Options
    select_ul = main_col.find('ul', class_='select_ip')
    options = []
    if select_ul:
        for li in select_ul.find_all('li'):
            options.append(str(li))
            
    # Answer
    ans_div = main_col.find('div', class_='answer')
    answer = ans_div.find('span', class_='ansbg').text.strip() if ans_div and ans_div.find('span', class_='ansbg') else ""
    
    # Explanation
    kaisetsu_div = main_col.find('div', class_='kaisetsu')
    kaisetsu = str(kaisetsu_div) if kaisetsu_div else ""
    
    return {
        "breadcrumbs": breadcrumbs,
        "tags": tags,
        "question": q_text,
        "options": options,
        "answer": answer,
        "explanation": kaisetsu
    }

res = requests.get('https://www.itpassportsiken.com/kakomon/06_haru/q1.html')
data = extract_question(res.content)
with open('test_q1.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Saved test_q1.json")
