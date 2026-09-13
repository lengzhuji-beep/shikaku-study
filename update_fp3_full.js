const fs = require('fs');
const path = require('path');

// 過去5年分の全実施回リスト（年3回: 1月・5月・9月）
const allSessions = [
  { id: '2024-01', name: '2024年 1月実施回', date: '2024年1月', count: '本試験 全60問（学科）', passScore: '60%以上（36点/60点）' },
  { id: '2023-09', name: '2023年 9月実施回', date: '2023年9月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2023-05', name: '2023年 5月実施回', date: '2023年5月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2023-01', name: '2023年 1月実施回', date: '2023年1月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2022-09', name: '2022年 9月実施回', date: '2022年9月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2022-05', name: '2022年 5月実施回', date: '2022年5月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2022-01', name: '2022年 1月実施回', date: '2022年1月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2021-09', name: '2021年 9月実施回', date: '2021年9月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2021-05', name: '2021年 5月実施回', date: '2021年5月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2021-01', name: '2021年 1月実施回', date: '2021年1月', count: '本試験 学科試験', passScore: '60%以上' },
  { id: '2020-09', name: '2020年 9月実施回', date: '2020年9月', count: '本試験 学科試験', passScore: '60%以上' }
];

const categories = [
  { key: 'all', name: '全6分野' },
  { key: 'life', name: 'ライフプランニングと資金計画' },
  { key: 'risk', name: 'リスク管理' },
  { key: 'finance', name: '金融資産運用' },
  { key: 'tax', name: 'タックスプランニング' },
  { key: 'realestate', name: '不動産' },
  { key: 'inheritance', name: '相続・事業承継' }
];

// 2024_1 の60問データを読み込み
const qList = JSON.parse(fs.readFileSync(path.join(__dirname, 'fp3_2024_1.json'), 'utf8'));

// 過去問ページ用HTML生成
const pastHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FP3級 過去問演習 | 過去5年分・試験実施回＆6大分野別選択 | 資格対策ドットコム</title>
<meta name="description" content="FP3級（ファイナンシャル・プランニング技能士3級）の本試験過去問題。過去5年分の試験実施回、および6大分野（ライフ・リスク・金融・タックス・不動産・相続）から選択して本番演習が可能です。">
<link rel="icon" href="../../favicon.png" type="image/png">
<link rel="stylesheet" href="../../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">

<header class="header">
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="メニュー">
  <label for="nav-toggle" class="nav-toggle-label" aria-label="メニューを開く">
    <span></span><span></span><span></span>
  </label>
  <nav class="header-nav" id="primary-nav">
    <a href="../../index.html"><i class="fas fa-home"></i> 資格トップ</a>
    <a href="../../toeic/index.html"><i class="fas fa-language"></i> TOEIC</a>
    <a href="../index.html" class="active"><i class="fas fa-coins"></i> FP</a>
    <a href="../../takken/index.html"><i class="fas fa-building"></i> 宅建</a>
    <a href="../../it-passport/index.html"><i class="fas fa-laptop-code"></i> ITパスポート</a>
    <a href="../../boki/index.html"><i class="fas fa-calculator"></i> 簿記</a>
    <a href="../../other-exams.html"><i class="fas fa-th-list"></i> 全資格一覧</a>
  </nav>
  <label for="nav-toggle" class="nav-overlay" aria-hidden="true"></label>
</header>

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../../index.html">ホーム</a></li>
    <li><a href="../index.html">FP技能士</a></li>
    <li><a href="index.html">FP3級</a></li>
    <li>過去問演習</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge badge-finance">本試験過去問</span>
      <h1>FP3級 過去問演習</h1>
      <p>過去5年分の試験実施回と6大分野を選択して、本番さながらの演習に挑戦しましょう</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">収録年数</div>
        <div class="stat-val">過去5年分</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">対応分野</div>
        <div class="stat-val">6大分野完全網羅</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">解説</div>
        <div class="stat-val">全問付き</div>
      </div>
    </div>
  </div>

  <!-- 試験実施回セレクターUI（過去5年分） -->
  <div class="session-selector-card">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <h2 style="margin:0; font-size:1.25rem;"><i class="fas fa-calendar-check" style="color:#3182ce;"></i> 試験実施回を選択</h2>
      <span style="font-size:0.85rem; color:#718096;">解きたい回をクリックすると問題が切り替わります</span>
    </div>
    <div class="session-grid">
      <button type="button" class="session-btn active" data-session="2024-01">
        <span class="session-name">2024年 1月実施回（完全版）</span>
        <span class="session-meta">本試験 全60問収録 ｜ 合格ライン: 36問以上</span>
      </button>
      ${allSessions.filter(s => s.id !== '2024-01').map(s => `
      <button type="button" class="session-btn" data-session="${s.id}">
        <span class="session-name">${s.name}</span>
        <span class="session-meta">${s.count} ｜ 合格ライン: ${s.passScore}</span>
      </button>
      `).join('')}
    </div>
  </div>



  <!-- 進捗バー -->
  <div class="progress-card">
    <span id="progressText" style="font-size:0.95rem; color:#4a5568;">進捗: 読み込み中...</span>
    <div class="progress-bar-bg">
      <div id="progressFill" class="progress-bar-fill"></div>
    </div>
  </div>

  <!-- 過去問題リスト（全60問） -->
  ${qList.map(item => `
  <div class="quiz-card" data-session="2024-01" data-cat="${item.catKey}" data-qid="fp3-202401-${item.num}" data-answer="${item.correct}">
    <div class="quiz-header-row">
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <span class="quiz-num-badge" style="background:#ebf8ff; color:#2b6cb0;">第 ${item.num} 問</span>
        <span class="shikaku-card-badge ${item.catClass}">${item.catName}</span>
      </div>
      <button type="button" class="bookmark-toggle-btn" title="ブックマークに追加/解除">
        <i class="far fa-star"></i> ブックマーク
      </button>
    </div>
    <div class="quiz-question-text">${item.text}</div>
    <div class="quiz-options">
      ${item.options.map((opt, i) => `
      <div class="quiz-option" data-value="(${i+1})">
        ${opt}
      </div>
      `).join('')}
    </div>
    <button type="button" class="quiz-answer-btn" disabled><i class="fas fa-check"></i> 解答する</button>
    <div class="quiz-explanation-area">
      <div class="quiz-result-title"></div>
      <p><strong>【解答・解説】</strong><br>${item.explanation}</p>
    </div>
  </div>
  `).join('')}

  <div class="card" style="background:#f8fafc; text-align:center; padding:30px; margin-top:30px;">
    <h3>過去5年分全問題データベース順次更新中</h3>
    <p>他の実施回（2023年〜2020年）の問題データも順次追加・拡充しております。</p>
  </div>
</div>

<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-col">
      <h4>資格対策ドットコム</h4>
      <p style="font-size:0.88rem; color:#a0aec0; margin-top:5px;">
        FP・TOEIC・宅建・ITパスポート・簿記など、主要資格の練習問題・過去問・コラムをすべて無料で提供する総合学習プラットフォームです。
      </p>
    </div>
    <div class="footer-col">
      <h4>FP技能検定（級別）</h4>
      <ul>
        <li><a href="index.html">FP3級対策トップ</a></li>
        <li><a href="../2kyu/index.html">FP2級対策トップ</a></li>
        <li><a href="../1kyu/index.html">FP1級対策トップ</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>ご案内</h4>
      <ul>
        <li><a href="../../other-exams.html">全資格一覧</a></li>
        <li><a href="../../contact.html">お問い合わせ</a></li>
        <li><a href="../../profile.html">運営者プロフィール</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 資格対策ドットコム All Rights Reserved.</p>
  </div>
</footer>

<script src="../../assets/js/common-quiz.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'fp', '3kyu', 'past-questions.html'), pastHtml, 'utf8');

// 同様に練習問題ページ（problems.html）にも全60問のトレーニング・ブックマーク・6大分野フィルターを反映
const probHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FP3級 練習問題 | 6大分野別トレーニング＆ブックマーク復習 | 資格対策ドットコム</title>
<meta name="description" content="FP3級の分野別練習問題。ライフ・リスク・金融・タックス・不動産・相続の6大分野から選択し、一問一答トレーニングと苦手ブックマーク復習が可能です。">
<link rel="icon" href="../../favicon.png" type="image/png">
<link rel="stylesheet" href="../../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">

<header class="header">
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="メニュー">
  <label for="nav-toggle" class="nav-toggle-label" aria-label="メニューを開く">
    <span></span><span></span><span></span>
  </label>
  <nav class="header-nav" id="primary-nav">
    <a href="../../index.html"><i class="fas fa-home"></i> 資格トップ</a>
    <a href="../../toeic/index.html"><i class="fas fa-language"></i> TOEIC</a>
    <a href="../index.html" class="active"><i class="fas fa-coins"></i> FP</a>
    <a href="../../takken/index.html"><i class="fas fa-building"></i> 宅建</a>
    <a href="../../it-passport/index.html"><i class="fas fa-laptop-code"></i> ITパスポート</a>
    <a href="../../boki/index.html"><i class="fas fa-calculator"></i> 簿記</a>
    <a href="../../other-exams.html"><i class="fas fa-th-list"></i> 全資格一覧</a>
  </nav>
  <label for="nav-toggle" class="nav-overlay" aria-hidden="true"></label>
</header>

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../../index.html">ホーム</a></li>
    <li><a href="../index.html">FP技能士</a></li>
    <li><a href="index.html">FP3級</a></li>
    <li>練習問題</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge badge-finance">演習</span>
      <h1>FP3級 分野別練習問題</h1>
      <p>6大分野のトレーニングで基礎を固め、ブックマークした問題を繰り返しマスターしよう</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">モード</div>
        <div class="stat-val">トレーニング</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">復習機能</div>
        <div class="stat-val"><i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク</div>
      </div>
    </div>
  </div>

  <!-- モード切り替えタブ -->
  <div class="mode-switch-container">
    <button type="button" class="mode-switch-btn active" data-mode="all">
      <i class="fas fa-dumbbell"></i> すべての問題（トレーニング）
    </button>
    <button type="button" class="mode-switch-btn" data-mode="bookmark">
      <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマークした問題だけ復習
    </button>
  </div>

  <!-- 6大分野フィルター -->
  <div class="category-filter-card">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <h3 style="margin:0; font-size:1.1rem;"><i class="fas fa-filter" style="color:#4a90e2;"></i> 6大分野で絞り込み</h3>
      <span style="font-size:0.82rem; color:#718096;">解きたい分野を選択してください</span>
    </div>
    <div class="category-filter-btns">
      <button type="button" class="cat-filter-btn active" data-cat="all">全分野（60問）</button>
      <button type="button" class="cat-filter-btn" data-cat="life">ライフプランニングと資金計画</button>
      <button type="button" class="cat-filter-btn" data-cat="risk">リスク管理</button>
      <button type="button" class="cat-filter-btn" data-cat="finance">金融資産運用</button>
      <button type="button" class="cat-filter-btn" data-cat="tax">タックスプランニング</button>
      <button type="button" class="cat-filter-btn" data-cat="realestate">不動産</button>
      <button type="button" class="cat-filter-btn" data-cat="inheritance">相続・事業承継</button>
    </div>
  </div>

  <!-- 進捗バー -->
  <div class="progress-card">
    <span id="progressText" style="font-size:0.95rem; color:#4a5568;">進捗: 読み込み中...</span>
    <div class="progress-bar-bg">
      <div id="progressFill" class="progress-bar-fill"></div>
    </div>
  </div>

  <div id="bookmarkEmptyMsg" class="card" style="display:none; text-align:center; padding:35px; background:#fffaf0; border:1px solid #feebc8;">
    <i class="far fa-star" style="font-size:2rem; color:#d69e2e; margin-bottom:10px;"></i>
    <h3>ブックマークされた問題がありません</h3>
    <p style="color:#744210;">問題の右上にある「☆ ブックマーク」ボタンを押すと、ここに保存されていつでも苦手問題だけを復習できます。</p>
  </div>

  <!-- 問題リスト -->
  ${qList.map(item => `
  <div class="quiz-card" data-cat="${item.catKey}" data-qid="fp3-train-${item.num}" data-answer="${item.correct}">
    <div class="quiz-header-row">
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <span class="quiz-num-badge">第 ${item.num} 問</span>
        <span class="shikaku-card-badge ${item.catClass}">${item.catName}</span>
      </div>
      <button type="button" class="bookmark-toggle-btn" title="ブックマークに追加/解除">
        <i class="far fa-star"></i> ブックマーク
      </button>
    </div>
    <div class="quiz-question-text">${item.text}</div>
    <div class="quiz-options">
      ${item.options.map((opt, i) => `
      <div class="quiz-option" data-value="(${i+1})">
        ${opt}
      </div>
      `).join('')}
    </div>
    <button type="button" class="quiz-answer-btn" disabled><i class="fas fa-check"></i> 解答する</button>
    <div class="quiz-explanation-area">
      <div class="quiz-result-title"></div>
      <p><strong>【解説】</strong><br>${item.explanation}</p>
    </div>
  </div>
  `).join('')}

  <div class="card" style="text-align:center; padding:30px; margin-top:30px;">
    <h3>本番レベルの模試に挑戦する</h3>
    <a href="past-questions.html" class="shikaku-card-btn" style="display:inline-block; margin-top:10px;">過去問演習に進む</a>
  </div>
</div>

<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-col">
      <h4>資格対策ドットコム</h4>
      <p style="font-size:0.88rem; color:#a0aec0; margin-top:5px;">
        FP・TOEIC・宅建・ITパスポート・簿記など、主要資格の練習問題・過去問・コラムをすべて無料で提供する総合学習プラットフォームです。
      </p>
    </div>
    <div class="footer-col">
      <h4>FP技能検定（級別）</h4>
      <ul>
        <li><a href="index.html">FP3級対策トップ</a></li>
        <li><a href="../2kyu/index.html">FP2級対策トップ</a></li>
        <li><a href="../1kyu/index.html">FP1級対策トップ</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>ご案内</h4>
      <ul>
        <li><a href="../../other-exams.html">全資格一覧</a></li>
        <li><a href="../../contact.html">お問い合わせ</a></li>
        <li><a href="../../profile.html">運営者プロフィール</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 資格対策ドットコム All Rights Reserved.</p>
  </div>
</footer>
<script src="../../assets/js/common-quiz.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'fp', '3kyu', 'problems.html'), probHtml, 'utf8');

console.log('FP3kyu past-questions and problems updated with full 60 questions and 6-category badges!');
