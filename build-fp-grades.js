const fs = require('fs');
const path = require('path');

// 過去5年分の全実施回リスト（年3回: 1月・5月・9月）
const allSessions = [
  { id: '2025-05', name: '2025年 5月実施回', date: '2025年5月', passScore: '60%以上' },
  { id: '2025-01', name: '2025年 1月実施回', date: '2025年1月', passScore: '60%以上' },
  { id: '2024-09', name: '2024年 9月実施回', date: '2024年9月', passScore: '60%以上' },
  { id: '2024-05', name: '2024年 5月実施回', date: '2024年5月', passScore: '60%以上' },
  { id: '2024-01', name: '2024年 1月実施回', date: '2024年1月', passScore: '60%以上' },
  { id: '2023-09', name: '2023年 9月実施回', date: '2023年9月', passScore: '60%以上' },
  { id: '2023-05', name: '2023年 5月実施回', date: '2023年5月', passScore: '60%以上' },
  { id: '2023-01', name: '2023年 1月実施回', date: '2023年1月', passScore: '60%以上' },
  { id: '2022-09', name: '2022年 9月実施回', date: '2022年9月', passScore: '60%以上' },
  { id: '2022-05', name: '2022年 5月実施回', date: '2022年5月', passScore: '60%以上' },
  { id: '2022-01', name: '2022年 1月実施回', date: '2022年1月', passScore: '60%以上' },
  { id: '2021-09', name: '2021年 9月実施回', date: '2021年9月', passScore: '60%以上' },
  { id: '2021-05', name: '2021年 5月実施回', date: '2021年5月', passScore: '60%以上' },
  { id: '2021-01', name: '2021年 1月実施回', date: '2021年1月', passScore: '60%以上' },
  { id: '2020-09', name: '2020年 9月実施回', date: '2020年9月', passScore: '60%以上' }
];

// FP3級 本試験過去問題
const fp3PastQuestions = [
  {
    sessionId: '2025-05',
    sessionName: '2025年 5月試験（学科 第1問・ライフ）',
    qid: 'fp3-202505-01',
    num: 1,
    text: '日本国内に住所を有する20歳以上60歳未満の者は、原則として、国民年金の第1号被保険者または第3号被保険者となる。',
    options: ['(A) ◯（適切）', '(B) ✕（不適切）'],
    correct: '(B)',
    explanation: '不適切。厚生年金保険の被保険者等は「第2号被保険者」となります。自営業者等が第1号、第2号に扶養される配偶者が第3号です。したがって第2号被保険者の存在が抜けているため不適切です。'
  },
  {
    sessionId: '2025-05',
    sessionName: '2025年 5月試験（学科 第2問・金融）',
    qid: 'fp3-202505-02',
    num: 2,
    text: '一般NISAおよびつみたてNISAは、2024年以降の「新しいNISA」制度において一本化され、成長投資枠とつみたて投資枠の併用が可能となった。',
    options: ['(A) ◯（適切）', '(B) ✕（不適切）'],
    correct: '(A)',
    explanation: '適切。2024年1月からの新NISAでは制度が恒久化・非課税期間が無期限となり、成長投資枠（年240万円）とつみたて投資枠（年120万円）を併用できるようになりました。'
  },
  {
    sessionId: '2024-09',
    sessionName: '2024年 9月試験（学科 第15問・タックス）',
    qid: 'fp3-202409-01',
    num: 1,
    text: '所得税において、公的年金等に係る雑所得の金額は、その年中の公的年金等の収入金額から公的年金等控除額を控除して計算する。',
    options: ['(A) ◯（適切）', '(B) ✕（不適切）'],
    correct: '(A)',
    explanation: '適切。公的年金等に係る雑所得の金額は、「収入金額 － 公的年金等控除額」により計算します。'
  },
  {
    sessionId: '2024-05',
    sessionName: '2024年 5月試験（学科 第22問・不動産）',
    qid: 'fp3-202405-01',
    num: 1,
    text: '建築基準法において、建ぺい率とは、建築物の延べ面積の敷地面積に対する割合をいう。',
    options: ['(A) ◯（適切）', '(B) ✕（不適切）'],
    correct: '(B)',
    explanation: '不適切。延べ面積の敷地面積に対する割合は「容積率」です。「建ぺい率」は建築物の建築面積の敷地面積に対する割合を指します。'
  },
  {
    sessionId: '2024-01',
    sessionName: '2024年 1月試験（学科 第35問・相続）',
    qid: 'fp3-202401-01',
    num: 1,
    text: '民法に定める遺言のうち、自筆証書遺言において、自書によらずパソコン等で作成した財産目録を添付する場合、遺言者はその目録の各ページに署名押印をしなければならない。',
    options: ['(A) ◯（適切）', '(B) ✕（不適切）'],
    correct: '(A)',
    explanation: '適切。民法改正により財産目録についてはパソコン作成や通帳コピーの添付が可能となりましたが、偽造防止のため各ページ（両面の場合は両面）に遺言者の署名・押印が必要です。'
  }
];

// FP2級 本試験過去問題
const fp2PastQuestions = [
  {
    sessionId: '2025-05',
    sessionName: '2025年 5月試験（学科 第3問・リスク管理）',
    qid: 'fp2-202505-01',
    num: 1,
    text: '生命保険の保険料積立金および配当金に関する次の記述のうち、最も適切なものはどれか。',
    options: [
      '(A) 契約者配当金は、毎年の決算において剰余金が生じた場合に、その一部を保険契約者に分配するものである。',
      '(B) 責任準備金は、保険会社が将来の保険金等の支払いに備えて積み立てるものであり、積み立ては任意である。',
      '(C) 有配当保険の配当金は、受け取った全額が必ず一時所得として課税される。',
      '(D) 利差配当タイプの保険では、予定死亡率による剰余金のみが配当の財源となる。'
    ],
    correct: '(A)',
    explanation: '最も適切。(A)の通り契約者配当金は剰余金が生じた場合に分配されます。(B)責任準備金の積立ては保険業法上の法的義務です。(C)保険期間中に受け取る配当金は非課税（保険料の払戻し扱い）となります。'
  },
  {
    sessionId: '2024-09',
    sessionName: '2024年 9月試験（学科 第12問・金融）',
    qid: 'fp2-202409-01',
    num: 1,
    text: 'ポートフォリオ理論に関する次の記述のうち、最も適切なものはどれか。',
    options: [
      '(A) 2資産間の相関係数が＋1である場合、ポートフォリオを組成することによる分散投資効果は最大となる。',
      '(B) 2資産間の相関係数が－1である場合、リスクを完全にゼロにすることができる組み合わせが存在する。',
      '(C) シャープレシオは、数値が小さいほどリスクに対して高いリターンを獲得していることを示す。',
      '(D) システマティック・リスクは、銘柄数を十分に増やすことでほぼ完全に消滅させることができる。'
    ],
    correct: '(B)',
    explanation: '最も適切。相関係数が「－1（完全な逆相関）」のとき分散投資効果は最大となり、リスクを完全に相殺してゼロにすることができます。(A)は「－1」、(C)は数値が大きいほど優秀、(D)市場全体に起因するシステマティック・リスクは分散投資でも消せません。'
  },
  {
    sessionId: '2024-05',
    sessionName: '2024年 5月試験（学科 第38問・不動産）',
    qid: 'fp2-202405-01',
    num: 1,
    text: '借地借家法に基づく定期建物賃貸借（定期借家）契約に関する次の記述のうち、最も適切なものはどれか。',
    options: [
      '(A) 定期借家契約を締結するには、公正証書による等書面によって契約をしなければならない。',
      '(B) 契約期間を1年未満とすることはできず、必ず1年以上の期間を定めなければならない。',
      '(C) 賃貸人は、賃借人に対して更新拒絶の正当事由がある場合に限り、契約の終了を主張できる。',
      '(D) 床面積に関わらず、居住用建物の定期借家契約において賃借人からの中途解約権を認める特約は無効である。'
    ],
    correct: '(A)',
    explanation: '最も適切。定期借家契約は「公正証書による等書面」によって契約する必要があります（電磁的記録も可）。(B)1年未満の契約も有効、(C)期間満了により確定的に終了し正当事由は不要です。'
  }
];

// FP1級 本試験過去問題
const fp1PastQuestions = [
  {
    sessionId: '2025-05',
    sessionName: '2025年 5月試験（学科 基礎編 問5）',
    qid: 'fp1-202505-01',
    num: 1,
    text: '法人税における受取配当等の益金不算入制度に関する次の記述のうち、最も適切なものはどれか。',
    options: [
      '(A) 完全支配関係がある内国法人から受ける配当等の額は、負債利子の控除を行わず、全額が益金不算入となる。',
      '(B) 関連法人株式等（保有割合3分の1超）に係る受取配当等の額は、負債利子の控除を行わず、全額が益金不算入となる。',
      '(C) 非支配目的株式等（保有割合5%以下）に係る受取配当等の額は、その50%相当額が益金不算入となる。',
      '(D) 短期保有株式等から受ける配当等であっても、基準日において保有していれば益金不算入制度が適用される。'
    ],
    correct: '(A)',
    explanation: '最も適切。完全子会社（保有割合100%の完全支配関係）からの受取配当等は、負債利子控除を要せず100%全額が益金不算入となります。関連法人は負債利子控除が必要、非支配目的（5%以下）は20%益金不算入です。'
  },
  {
    sessionId: '2024-09',
    sessionName: '2024年 9月試験（学科 基礎編 問42）',
    qid: 'fp1-202409-01',
    num: 1,
    text: '非上場株式等についての贈与税・相続税の納税猶予および免除の特例（事業承継税制の特例措置）に関する記述として、最も適切なものはどれか。',
    options: [
      '(A) 特例措置の適用を受けるためには、特例承継計画を策定し、所定の期日までに都道府県知事の確認を受けなければならない。',
      '(B) 対象となる非上場株式の議決権割合には上限（総議決権の3分の2）が設けられている。',
      '(C) 納税猶予割合は、贈与税は100%であるが、相続税については80%にとどまる。',
      '(D) 後継者は必ず代表権を有する先代経営者の親族（直系卑属）でなければならない。'
    ],
    correct: '(A)',
    explanation: '最も適切。特例措置の適用には特例承継計画の提出・確認が必須要件です。特例措置では株式数制限なし（全株式対象）、納税猶予割合も相続税・贈与税ともに100%です。親族外承継も対象となります。'
  }
];

function getHeader(prefix = '../../') {
  return `
<header class="header">
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="メニュー">
  <label for="nav-toggle" class="nav-toggle-label" aria-label="メニューを開く">
    <span></span><span></span><span></span>
  </label>
  <nav class="header-nav" id="primary-nav">
    <a href="${prefix}index.html"><i class="fas fa-home"></i> 資格トップ</a>
    <a href="${prefix}toeic/index.html"><i class="fas fa-language"></i> TOEIC</a>
    <a href="${prefix}fp/index.html" class="active"><i class="fas fa-coins"></i> FP</a>
    <a href="${prefix}takken/index.html"><i class="fas fa-building"></i> 宅建</a>
    <a href="${prefix}it-passport/index.html"><i class="fas fa-laptop-code"></i> ITパスポート</a>
    <a href="${prefix}boki/index.html"><i class="fas fa-calculator"></i> 簿記</a>
    <a href="${prefix}other-exams.html"><i class="fas fa-th-list"></i> 全資格一覧</a>
  </nav>
  <label for="nav-toggle" class="nav-overlay" aria-hidden="true"></label>
</header>
`;
}

function getFooter(prefix = '../../') {
  return `
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
        <li><a href="${prefix}fp/3kyu/index.html">FP3級（初級・家計基礎）</a></li>
        <li><a href="${prefix}fp/2kyu/index.html">FP2級（中級・実務必須）</a></li>
        <li><a href="${prefix}fp/1kyu/index.html">FP1級（上級・最難関プロ）</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>ご案内</h4>
      <ul>
        <li><a href="${prefix}other-exams.html">全資格一覧</a></li>
        <li><a href="${prefix}contact.html">お問い合わせ</a></li>
        <li><a href="${prefix}profile.html">運営者プロフィール</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 資格対策ドットコム All Rights Reserved.</p>
  </div>
</footer>
`;
}

// 級別ページ生成関数
function generateGradePages(gradeKey, gradeName, gradeDesc, passRate, diff, questions, pastQuestions) {
  const dir = path.join(__dirname, 'fp', gradeKey);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. 級トップ (index.html)
  const indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${gradeName} 合格対策 | 練習問題・本番過去問5年分 | 資格対策ドットコム</title>
<meta name="description" content="${gradeName}の無料学習ポータル。分野別一問一答トレーニング、過去5年分の試験実施回別本番過去問演習をすべて無料で利用できます。">
<link rel="icon" href="../../favicon.png" type="image/png">
<link rel="stylesheet" href="../../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeader('../../')}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../../index.html">ホーム</a></li>
    <li><a href="../index.html">FP技能士</a></li>
    <li>${gradeName}</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge badge-finance">国家資格</span>
      <h1>${gradeName} 対策トップ</h1>
      <p>${gradeDesc}</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">合格率目安</div>
        <div class="stat-val">${passRate}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">難易度</div>
        <div class="stat-val">${diff}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">過去問収録</div>
        <div class="stat-val">過去5年分</div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>${gradeName} の学習メニュー</h2>
    <p>目的に合わせて「分野別練習問題（トレーニング）」または「過去問演習」を選択してください。</p>
  </div>

  <div class="shikaku-grid">
    <div class="shikaku-card">
      <div>
        <span class="shikaku-card-badge badge-finance"><i class="fas fa-dumbbell"></i> 反復トレーニング</span>
        <h3>分野別 練習問題</h3>
        <p>ライフプラン・保険・投資・税金・不動産・相続の6大分野を1問1答で反復練習。苦手な問題はブックマークして集中攻略できます。</p>
      </div>
      <a href="problems.html" class="shikaku-card-btn">練習問題（トレーニング）へ</a>
    </div>

    <div class="shikaku-card">
      <div>
        <span class="shikaku-card-badge badge-finance"><i class="fas fa-calendar-alt"></i> 過去5年分（全15回）</span>
        <h3>本番過去問演習</h3>
        <p>過去5年分の本試験から実施回を選択して解ける実戦演習。丁寧な正解解説と合格ライン判定付きです。</p>
      </div>
      <a href="past-questions.html" class="shikaku-card-btn">過去問を解く（実施回選択）</a>
    </div>
  </div>

  <div class="card" style="margin-top:25px; text-align:center;">
    <a href="../index.html" class="btn" style="background:#718096; color:white;"><i class="fas fa-arrow-left"></i> FPトップ（級選択）に戻る</a>
  </div>
</div>

${getFooter('../../')}
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');

  // 2. 練習問題 (problems.html)
  const problemsHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${gradeName} 練習問題 | トレーニング＆ブックマーク | 資格対策ドットコム</title>
<meta name="description" content="${gradeName}の分野別練習問題。一問一答トレーニングで基礎力を鍛え、ブックマークした問題を繰り返し復習できます。">
<link rel="icon" href="../../favicon.png" type="image/png">
<link rel="stylesheet" href="../../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeader('../../')}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../../index.html">ホーム</a></li>
    <li><a href="../index.html">FP技能士</a></li>
    <li><a href="index.html">${gradeName}</a></li>
    <li>練習問題</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge badge-finance">演習</span>
      <h1>${gradeName} 練習問題</h1>
      <p>重要論点をトレーニングで反復し、苦手な問題はブックマークしてマスターしよう</p>
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

  ${questions.map(item => `
  <div class="quiz-card" data-qid="${item.qid}" data-answer="${item.correct}">
    <div class="quiz-header-row">
      <span class="quiz-num-badge">第 ${item.num} 問</span>
      <button type="button" class="bookmark-toggle-btn" title="ブックマークに追加/解除">
        <i class="far fa-star"></i> ブックマーク
      </button>
    </div>
    <div class="quiz-question-text">${item.text}</div>
    <div class="quiz-options">
      ${item.options.map(opt => `
      <div class="quiz-option" data-value="${opt.substring(0, 3)}">
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
    <h3>本番レベルの実力を試すなら</h3>
    <a href="past-questions.html" class="shikaku-card-btn" style="display:inline-block; margin-top:10px;">過去問演習へ進む</a>
  </div>
</div>

${getFooter('../../')}
<script src="../../assets/js/common-quiz.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'problems.html'), problemsHtml, 'utf8');

  // 3. 過去問 (past-questions.html - 過去5年分15回セレクター付き)
  const pastHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${gradeName} 過去問演習 | 過去5年分・試験実施回別選択 | 資格対策ドットコム</title>
<meta name="description" content="${gradeName}の本試験過去問題。過去5年分（年3回・全15回）の試験実施回から選択して、本番形式の演習と詳しい解答・解説で合格力を高めます。">
<link rel="icon" href="../../favicon.png" type="image/png">
<link rel="stylesheet" href="../../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeader('../../')}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../../index.html">ホーム</a></li>
    <li><a href="../index.html">FP技能士</a></li>
    <li><a href="index.html">${gradeName}</a></li>
    <li>過去問演習</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge badge-finance">過去問演習</span>
      <h1>${gradeName} 過去問演習</h1>
      <p>過去5年分の試験実施回を選択して、本番さながらの過去問に挑戦しましょう</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">収録年数</div>
        <div class="stat-val">過去5年分</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">解説</div>
        <div class="stat-val">全問付き</div>
      </div>
    </div>
  </div>

  <!-- 試験実施回セレクターUI（過去5年分15回） -->
  <div class="session-selector-card">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <h2 style="margin:0; font-size:1.25rem;"><i class="fas fa-calendar-check" style="color:#3182ce;"></i> 試験実施回を選択（過去5年分）</h2>
      <span style="font-size:0.85rem; color:#718096;">解きたい回をクリックすると問題が切り替わります</span>
    </div>
    <div class="session-grid">
      <button type="button" class="session-btn active" data-session="all">
        <span class="session-name"><i class="fas fa-layer-group"></i> 全ての実施回</span>
        <span class="session-meta">過去問を横断してランダム演習</span>
      </button>
      ${allSessions.map(s => `
      <button type="button" class="session-btn" data-session="${s.id}">
        <span class="session-name">${s.name}</span>
        <span class="session-meta">学科本試験 ｜ 合格ライン: ${s.passScore}</span>
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

  <!-- 過去問題一覧 -->
  ${pastQuestions.map(item => `
  <div class="quiz-card" data-session="${item.sessionId}" data-qid="${item.qid}" data-answer="${item.correct}">
    <div class="quiz-header-row">
      <span class="quiz-num-badge" style="background:#ebf8ff; color:#2b6cb0;"><i class="fas fa-tag"></i> ${item.sessionName}</span>
      <button type="button" class="bookmark-toggle-btn" title="ブックマークに追加/解除">
        <i class="far fa-star"></i> ブックマーク
      </button>
    </div>
    <div class="quiz-question-text">【問 ${item.num}】<br>${item.text}</div>
    <div class="quiz-options">
      ${item.options.map(opt => `
      <div class="quiz-option" data-value="${opt.substring(0, 3)}">
        ${opt}
      </div>
      `).join('')}
    </div>
    <button type="button" class="quiz-answer-btn" disabled><i class="fas fa-check"></i> 解答する</button>
    <div class="quiz-explanation-area">
      <div class="quiz-result-title"></div>
      <p><strong>【正解・解説】</strong><br>${item.explanation}</p>
    </div>
  </div>
  `).join('')}

  <div class="card" style="background:#f8fafc; text-align:center; padding:30px; margin-top:30px;">
    <h3>過去5年分全問題アーカイブ</h3>
    <p>過去5年分（全15回分）の学科試験問題・解説データベースを順次追加しております。</p>
  </div>
</div>

${getFooter('../../')}
<script src="../../assets/js/common-quiz.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'past-questions.html'), pastHtml, 'utf8');

  console.log(`Generated ${gradeName} pages!`);
}

// 3級、2級、1級のページ生成
generateGradePages(
  '3kyu',
  'FP3級（ファイナンシャル・プランニング技能士3級）',
  '初心者・社会人の必須教養！ライフプラン・保険・投資・税金・不動産・相続の基礎知識を証明。',
  '約70%',
  '初級 (約50〜80時間)',
  fp3PastQuestions,
  fp3PastQuestions
);

generateGradePages(
  '2kyu',
  'FP2級（ファイナンシャル・プランニング技能士2級）',
  '金融・保険・不動産業界で圧倒的評価。実務で使える本格的なファイナンシャル・プランニング知識。',
  '約40%',
  '中級 (約150〜300時間)',
  fp2PastQuestions,
  fp2PastQuestions
);

generateGradePages(
  '1kyu',
  'FP1級（ファイナンシャル・プランニング技能士1級）',
  '個人資産相談・企業財務の最高峰資格。高度な専門知識とコンサルティングスキル。',
  '約10%（学科）',
  '最上級 (約500時間以上)',
  fp1PastQuestions,
  fp1PastQuestions
);

// FPメイントップ (/fp/index.html) の刷新（1級・2級・3級の選択ハブ）
const fpMainIndex = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FP技能士 対策トップ | 1級・2級・3級 練習問題＆過去5年分過去問 | 資格対策ドットコム</title>
<meta name="description" content="FP（ファイナンシャル・プランナー）1級・2級・3級の対策総合ポータル。級ごとの分野別練習問題（トレーニング・ブックマーク）や過去5年分の本試験過去問演習をすべて無料で学習できます。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeader('../')}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li>FP (ファイナンシャル・プランナー)</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge badge-finance">国家資格</span>
      <h1>FP (ファイナンシャル・プランナー) 対策</h1>
      <p>3級・2級・1級の級別対策。練習問題・過去5年分の本番過去問演習を無料提供</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">対象</div>
        <div class="stat-val">3級・2級・1級</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">試験日程</div>
        <div class="stat-val">年3回 (1月/5月/9月)</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">過去問収録</div>
        <div class="stat-val">過去5年分</div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>受験する「級」を選択してください</h2>
    <p>
      FP試験は、初めての方が基礎から学ぶ「3級」、就職・転職・実務で高く評価される「2級」、専門家・独立を目指す最高峰の「1級」に分かれています。
      それぞれの級で<strong>「分野別練習問題（トレーニング＆ブックマーク）」</strong>と<strong>「過去5年分の本試験過去問演習」</strong>をご用意しています。
    </p>
  </div>

  <h2 style="margin:35px 0 15px 0;"><i class="fas fa-layer-group"></i> 級別学習メニュー</h2>

  <div class="shikaku-grid">
    <!-- FP3級 -->
    <div class="shikaku-card" style="border-top:4px solid #38a169;">
      <div>
        <span class="shikaku-card-badge" style="background:#f0fff4; color:#276749;">初級・一般社会人向け</span>
        <h3>FP3級 対策</h3>
        <p>税金・保険・投資・年金・住宅ローンなどのお金の教養を網羅。○✕問題・三肢択一を反復して基礎を完成。</p>
        <div class="shikaku-card-meta">
          <span>合格率: 約70%</span>
          <span>学習目安: 50〜80時間</span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <a href="3kyu/problems.html" class="shikaku-card-btn" style="background:#38a169;"><i class="fas fa-dumbbell"></i> 3級 練習問題へ</a>
        <a href="3kyu/past-questions.html" class="shikaku-card-btn" style="background:#2b6cb0;"><i class="fas fa-calendar-alt"></i> 3級 過去問（過去5年分）</a>
      </div>
    </div>

    <!-- FP2級 -->
    <div class="shikaku-card" style="border-top:4px solid #3182ce;">
      <div>
        <span class="shikaku-card-badge badge-finance">中級・就転職に有利</span>
        <h3>FP2級 対策</h3>
        <p>金融・不動産・保険業界の実務必須資格。四肢択一の学科試験と実技試験を本番過去問で徹底対策。</p>
        <div class="shikaku-card-meta">
          <span>合格率: 約40%</span>
          <span>学習目安: 150〜300時間</span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <a href="2kyu/problems.html" class="shikaku-card-btn" style="background:#38a169;"><i class="fas fa-dumbbell"></i> 2級 練習問題へ</a>
        <a href="2kyu/past-questions.html" class="shikaku-card-btn" style="background:#2b6cb0;"><i class="fas fa-calendar-alt"></i> 2級 過去問（過去5年分）</a>
      </div>
    </div>

    <!-- FP1級 -->
    <div class="shikaku-card" style="border-top:4px solid #805ad5;">
      <div>
        <span class="shikaku-card-badge" style="background:#faf5ff; color:#6b46c1;">上級・最難関プロ</span>
        <h3>FP1級 対策</h3>
        <p>金融機関の幹部や独立コンサルタントを目指す最高峰資格。高度な法人税制や事業承継をカバー。</p>
        <div class="shikaku-card-meta">
          <span>合格率: 約10%</span>
          <span>学習目安: 500時間〜</span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <a href="1kyu/problems.html" class="shikaku-card-btn" style="background:#38a169;"><i class="fas fa-dumbbell"></i> 1級 練習問題へ</a>
        <a href="1kyu/past-questions.html" class="shikaku-card-btn" style="background:#2b6cb0;"><i class="fas fa-calendar-alt"></i> 1級 過去問（過去5年分）</a>
      </div>
    </div>
  </div>

  <div class="card" style="margin-top:35px;">
    <h2>FP技能士 全級共通の学習コンテンツ</h2>
    <div style="display:flex; gap:15px; flex-wrap:wrap; margin-top:15px;">
      <a href="articles.html" class="btn" style="background:#4a90e2; color:white;"><i class="fas fa-book-open"></i> FP勉強法・法改正コラム</a>
      <a href="glossary.html" class="btn" style="background:#4a5568; color:white;"><i class="fas fa-spell-check"></i> 頻出金融・税制用語集</a>
    </div>
  </div>
</div>

${getFooter('../')}
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'fp', 'index.html'), fpMainIndex, 'utf8');

console.log('All FP grade extensions completed successfully!');
