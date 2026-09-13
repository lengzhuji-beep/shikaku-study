const https = require('https');

https.get('https://fp3-siken.com/kakomon/2024_1/01.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // 問題文
    const qMatch = data.match(/<div id="question"[^>]*>([\s\S]*?)<\/div>/i);
    // 選択肢
    const selectMatch = data.match(/<ul id="selectList"[^>]*>([\s\S]*?)<\/ul>/i);
    // 正解
    const ansMatch = data.match(/<span id="answerChar"[^>]*>([\s\S]*?)<\/span>/i);

    console.log("=== Q ===");
    console.log(qMatch ? qMatch[1].replace(/<[^>]+>/g, '').trim() : 'no q');
    console.log("=== SELECT ===");
    console.log(selectMatch ? selectMatch[1].replace(/<[^>]+>/g, '\n').trim() : 'no select');
    console.log("=== ANS ===");
    console.log(ansMatch ? ansMatch[1].trim() : 'no ans');
  });
});
