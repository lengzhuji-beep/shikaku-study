const fs = require('fs');
const path = require('path');

const snippet = `
  <div class="mode-switch-container">
    <button type="button" class="mode-switch-btn active" data-mode="all">
      <i class="fas fa-list"></i> すべての問題（過去問演習）
    </button>
    <button type="button" class="mode-switch-btn" data-mode="bookmark">
      <i class="fas fa-star"></i> ブックマークした問題だけ復習
    </button>
  </div>
`;

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('past-questions.html')) results.push(file);
    }
  });
  return results;
}

const files = walk('site').concat(walk('shikaku-study'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('mode-switch-container')) return;
  const match = content.match(/<div class="hero-header">[\s\S]*?<\/div>/);
  if (match) {
    const newContent = content.substring(0, match.index + match[0].length) + '\n' + snippet + content.substring(match.index + match[0].length);
    fs.writeFileSync(f, newContent, 'utf8');
    console.log('Updated ' + f);
  }
});
