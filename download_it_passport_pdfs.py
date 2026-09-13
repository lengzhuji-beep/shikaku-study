import os
import requests
import urllib.parse
from bs4 import BeautifulSoup

# Base URL and Target Directory
page_url = 'https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/questions.html'
target_dir = r'C:\Users\pengi\.gemini\antigravity\scratch\auto-AD\shikaku-study\it-passport\raw_data'

# Create target directory if it doesn't exist
os.makedirs(target_dir, exist_ok=True)

print(f"Fetching {page_url}...")
response = requests.get(page_url)
response.raise_for_status()

# Parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Find all links ending with .pdf
pdf_links = []
for a_tag in soup.find_all('a', href=True):
    href = a_tag['href']
    if href.lower().endswith('.pdf'):
        # Resolve the absolute URL
        absolute_url = urllib.parse.urljoin(page_url, href)
        pdf_links.append(absolute_url)

# Remove duplicates if any
pdf_links = list(set(pdf_links))

print(f"Found {len(pdf_links)} PDF files to download.")

for pdf_url in pdf_links:
    file_name = os.path.basename(urllib.parse.urlparse(pdf_url).path)
    file_path = os.path.join(target_dir, file_name)
    
    if os.path.exists(file_path):
        print(f"Already exists: {file_name}")
        continue
        
    print(f"Downloading {file_name}...")
    try:
        pdf_response = requests.get(pdf_url, stream=True)
        pdf_response.raise_for_status()
        
        with open(file_path, 'wb') as f:
            for chunk in pdf_response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"  -> Saved {file_name}")
    except Exception as e:
        print(f"Failed to download {pdf_url}: {e}")

print("Download complete!")
