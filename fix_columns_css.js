const fs = require('fs');
const path = require('path');
const files = ['01-fp-study-roadmap.html', '02-fp-law-reforms.html', '03-fp1-master-roadmap.html'].map(f => path.join(__dirname, 'fp/columns', f));

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log('Skipping ' + file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix head links
  content = content.replace(/href="\.\.\/favicon\.png"/g, 'href="../../favicon.png"');
  content = content.replace(/href="\.\.\/assets\//g, 'href="../../assets/');
  
  // Fix primary-nav links
  content = content.replace(/href="\.\.\/index\.html"/g, 'href="../../index.html"');
  content = content.replace(/href="\.\.\/toeic\//g, 'href="../../toeic/');
  content = content.replace(/href="\.\.\/fp\//g, 'href="../../fp/');
  content = content.replace(/href="\.\.\/takken\//g, 'href="../../takken/');
  content = content.replace(/href="\.\.\/it-passport\//g, 'href="../../it-passport/');
  content = content.replace(/href="\.\.\/boki\//g, 'href="../../boki/');
  content = content.replace(/href="\.\.\/other-exams\.html"/g, 'href="../../other-exams.html"');
  
  // Fix breadcrumbs
  content = content.replace(/<li><a href="index\.html">FP技能士<\/a><\/li>/g, '<li><a href="../index.html">FP技能士</a></li>');
  content = content.replace(/<li><a href="articles\.html">コラム・合格ロードマップ<\/a><\/li>/g, '<li><a href="../articles.html">コラム・合格ロードマップ</a></li>');
  
  // Fix main article links
  content = content.replace(/href="3kyu\/problems\.html"/g, 'href="../3kyu/problems.html"');
  content = content.replace(/href="2kyu\/problems\.html"/g, 'href="../2kyu/problems.html"');
  
  // Fix footer links
  content = content.replace(/href="index\.html">FPトップ<\/a>/g, 'href="../index.html">FPトップ</a>');
  content = content.replace(/href="3kyu\/index\.html">FP3級対策<\/a>/g, 'href="../3kyu/index.html">FP3級対策</a>');
  content = content.replace(/href="2kyu\/index\.html">FP2級対策<\/a>/g, 'href="../2kyu/index.html">FP2級対策</a>');
  content = content.replace(/href="1kyu\/index\.html">FP1級対策<\/a>/g, 'href="../1kyu/index.html">FP1級対策</a>');
  content = content.replace(/href="\.\.\/contact\.html"/g, 'href="../../contact.html"');
  content = content.replace(/href="\.\.\/profile\.html"/g, 'href="../../profile.html"');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed ' + file);
});
