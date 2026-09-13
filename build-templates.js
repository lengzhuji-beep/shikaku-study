const fs = require('fs');
const path = require('path');

const qualifications = [
  {
    id: 'toeic',
    name: 'TOEIC® L&R',
    category: '英語・語学',
    badgeClass: 'badge-english',
    tagline: 'ビジネス英語の標準指標。就職・昇進・転職で圧倒的評価。',
    examDate: '毎月実施',
    passRate: 'スコア制 (平均約600点)',
    difficulty: '初級〜上級',
    desc: 'TOEIC® Listening & Reading Testは、日常生活やグローバルビジネスにおける実践的な英語コミュニケーション能力を公平かつ正確に測定する世界共通のテストです。',
    sampleQuestions: [
      {
        num: 1,
        text: 'The quarterly sales report must be submitted to the management board _______ Friday afternoon.',
        options: ['(A) by', '(B) until', '(C) during', '(D) while'],
        correct: '(A)',
        explanation: '「金曜日の午後までに（期限）」を表す前置詞は "by" が適切です。"until" は「金曜日までずっと継続する」という意味になるため不適切です。'
      },
      {
        num: 2,
        text: 'All employees are encouraged to attend the upcoming seminar on effective time _______.',
        options: ['(A) manage', '(B) manager', '(C) management', '(D) manageable'],
        correct: '(C)',
        explanation: '名詞 "time" の後ろにさらに名詞が続いて「時間管理」という複合名詞を作る文脈です。名詞である (C) management が正解となります。'
      }
    ],
    samplePastQuestions: [
      {
        year: '2025年 第320回公開テスト想定問題',
        num: 1,
        text: 'Mr. Tanaka will be leading the customer satisfaction initiative _______ the next two months.',
        options: ['(A) for', '(B) since', '(C) between', '(D) toward'],
        correct: '(A)',
        explanation: '「the next two months（今後2か月間）」という期間を表すため、期間を導く前置詞 (A) for が正解です。'
      }
    ],
    sampleArticles: [
      {
        title: '【完全独学】TOEIC 500点から800点を突破する3ヶ月勉強法ロードマップ',
        summary: '初心者からスコア800点を目指すための具体的なパート別対策とおすすめの公式問題集活用法を徹底解説。',
        date: '2026.04.10',
        tag: '勉強法'
      },
      {
        title: 'Part 5（短文穴埋め問題）を1問20秒で解くための文法見極めテクニック',
        summary: '品詞問題・前置詞/接続詞問題・動詞の形問題の3秒見極め法を具体例とともにレクチャーします。',
        date: '2026.04.15',
        tag: '解法テクニック'
      }
    ],
    sampleGlossary: [
      { term: 'quarterly', desc: '季刊の、年4回の、四半期ごとの', level: '★★★' },
      { term: 'initiative', desc: '新たな取り組み、主導権、構想', level: '★★★' },
      { term: 'reimburse', desc: '〜を払い戻す、精算・補償する', level: '★★☆' },
      { term: 'mandatory', desc: '義務的な、必須の、強制の', level: '★★★' }
    ]
  },
  {
    id: 'fp',
    name: 'FP (ファイナンシャル・プランナー)',
    category: '金融・資産運用',
    badgeClass: 'badge-finance',
    tagline: '税金・保険・年金・投資・不動産など「お金」のプロフェッショナル国家資格。',
    examDate: '年3回 (1月・5月・9月)',
    passRate: '3級 約70% / 2級 約40%',
    difficulty: '初級〜中級',
    desc: 'FP技能検定は、個人の資産設計やライフプランニングに関する知識を証明する国家資格です。家計管理からビジネス・金融機関の就転職まで幅広く役立ちます。',
    sampleQuestions: [
      {
        num: 1,
        text: '国民年金の第1号被保険者の保険料免除制度に関する次の記述のうち、最も適切なものはどれか。',
        options: [
          '(A) 保険料の全額免除を受けた期間は、受給資格期間に算入される。',
          '(B) 保険料の免除を受けた場合、追納することは一切できない。',
          '(C) 学生納付特例の承認を受けた期間は、年金額の計算において全額納付した場合と同じに扱われる。',
          '(D) 免除申請は、過去5年間に遡って申請することができる。'
        ],
        correct: '(A)',
        explanation: '国民年金の保険料全額免除を受けた期間は、老齢基礎年金の受給資格期間（10年）にそのまま算入されます（年金額は一定割合が国庫負担により反映されます）。'
      },
      {
        num: 2,
        text: '贈与税の暦年課税における基礎控除額として、正しいものはどれか。',
        options: ['(A) 年間60万円', '(B) 年間110万円', '(C) 年間200万円', '(D) 年間500万円'],
        correct: '(B)',
        explanation: '贈与税の暦年課税における基礎控除額は、受贈者1人あたり年間110万円です。'
      }
    ],
    samplePastQuestions: [
      {
        year: '2025年 5月実施 2級/3級学科試験想定',
        num: 1,
        text: '金融商品取引法における「投資者保護」の規定に基づき、クーリング・オフ制度が適用される金融取引はどれか。',
        options: ['(A) 投資信託の買付', '(B) 投資顧問契約', '(C) 上場株式の現物取引', '(D) 国債の購入'],
        correct: '(B)',
        explanation: '原則として市場性のある株式や投資信託にはクーリング・オフはありませんが、投資顧問契約の締結にはクーリング・オフが認められています。'
      }
    ],
    sampleArticles: [
      {
        title: '【FP3級・2級】独学一発合格に必要な勉強時間とスケジュール管理術',
        summary: '金融未経験からFP3級・2級に合格するための分野別（ライフ・リスク・金融・タックス・不動産・相続）の学習順序を解説。',
        date: '2026.04.12',
        tag: '独学合格法'
      },
      {
        title: '法改正で変わる！NISA・年金・贈与税制の超重要ポイントまとめ',
        summary: 'FP試験で頻出となる直近の法改正ポイントを試験対策の観点からコンパクトに整理しました。',
        date: '2026.04.20',
        tag: '法改正・対策'
      }
    ],
    sampleGlossary: [
      { term: '元利均等返済', desc: '毎回の返済額（元金＋利息）が一定となる返済方法。返済計画が立てやすい特徴がある。', level: '★★★' },
      { term: 'ポートフォリオ効果', desc: '異なる値動きをする資産を組み合わせることで、リターンを維持しつつリスク（価格変動幅）を低減させる効果。', level: '★★★' },
      { term: '小規模宅地等の特例', desc: '被相続人の居住用や事業用の宅地等を相続した場合、一定の要件を満たせば評価額が最大80%減額される相続税の特例制度。', level: '★★★' },
      { term: 'PER (株価収益率)', desc: '株価 ÷ 1株当たり当期純利益（EPS）で算出され、株価の割安・割高を測る指標。', level: '★★★' }
    ]
  },
  {
    id: 'takken',
    name: '宅地建物取引士 (宅建士)',
    category: '不動産・法律',
    badgeClass: 'badge-realestate',
    tagline: '不動産取引のスペシャリスト。毎年20万人が受験する国内屈指の超人気国家資格。',
    examDate: '年1回 (毎年10月第3日曜日)',
    passRate: '約15%〜17%',
    difficulty: '中級 (約300時間)',
    desc: '宅建士は、不動産の売買や賃貸の仲介において「重要事項説明」を行うことができる独占業務資格です。不動産業界はもちろん、金融や建設業界でも必須の資格です。',
    sampleQuestions: [
      {
        num: 1,
        text: '宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。',
        options: [
          '(A) 宅地建物取引士は、相手方から請求があった場合にのみ、宅地建物取引士証を提示すればよい。',
          '(B) 賃貸借の媒介の場合、重要事項説明書への専任の宅地建物取引士の記名押印は省略できる。',
          '(C) 宅地建物取引士は、取引の相手方が宅地建物取引業者である場合、重要事項の説明を省略することができる。',
          '(D) 重要事項説明は、売買契約の締結後遅滞なく行わなければならない。'
        ],
        correct: '(C)',
        explanation: '相手方が宅地建物取引業者（プロ）である場合、重要事項の「説明」は省略できます（ただし、35条書面の交付は省略できません）。なお、取引士証は請求がなくても提示が必須です。'
      },
      {
        num: 2,
        text: '民法上の意思表示に関する次の記述のうち、民法の規定によれば誤っているものはどれか。',
        options: [
          '(A) 詐欺による意思表示の取消しは、善意でかつ過失がない第三者に対抗することができない。',
          '(B) 強迫による意思表示の取消しは、善意無過失の第三者であっても対抗することができる。',
          '(C) 意思表示に錯誤があった場合、表意者に重大な過失があっても相手方がその錯誤を知っていたときは取消しを主張できる。',
          '(D) 虚偽表示による無効は、善意の第三者に対抗することができる。'
        ],
        correct: '(D)',
        explanation: '虚偽表示（通謀虚偽表示）による無効は、善意の第三者に対抗することができません。よって(D)が誤り（正解肢）です。'
      }
    ],
    samplePastQuestions: [
      {
        year: '令和7年度 宅建士本試験想定問題',
        num: 1,
        text: 'クーリング・オフ（宅建業法第37条の2）に関する次の記述のうち、クーリング・オフによる解除ができるものはどれか。',
        options: [
          '(A) 買主自ら指定した買主の自宅で買受けの申込みを行い、その場所で契約を締結した場合。',
          '(B) 宅地建物取引業者の事務所で買受けの申込みを行い、喫茶店で契約を締結した場合。',
          '(C) テント張りの案内所で買受けの申込みを行い、翌日クーリング・オフを書面で告知された日から5日経過した場合。',
          '(D) 宅地の引渡しを受け、かつ代金の全額を支払った場合。'
        ],
        correct: '(C)',
        explanation: '専任の宅建士が置かれていないテント張りの案内所等はクーリング・オフの対象場所です。告知日から8日以内であれば無条件解除が可能です。'
      }
    ],
    sampleArticles: [
      {
        title: '【宅建独学】初学者が300時間で1発合格するための4科目攻略順序',
        summary: '配点の高い「宅建業法」で満点近くを狙い、「民法（権利関係）」で深追いを避ける得点戦略を詳解。',
        date: '2026.04.05',
        tag: '科目別戦略'
      },
      {
        title: '宅建業法 35条（重要事項説明）と37条（契約書）の決定的な違いと暗記法',
        summary: '受験生が必ず混乱する35条書面と37条書面の記載事項の違いを表形式で一発整理。',
        date: '2026.04.18',
        tag: '最重要論点'
      }
    ],
    sampleGlossary: [
      { term: '重要事項説明 (35条)', desc: '契約が成立する前に、宅建士が取引の相手方に物件や取引条件に関する重要事項を説明すること。取引士証の提示が必須。', level: '★★★' },
      { term: 'クーリング・オフ', desc: '事務所等以外の場所で買受けの申込み等をした一般消費者買主が、8日以内であれば無条件で解除できる制度。', level: '★★★' },
      { term: '対抗要件', desc: '二重譲渡などがあった場合に、自分の権利を第三者に主張するために必要な法的要件（不動産登記など）。', level: '★★★' },
      { term: '用途地域', desc: '都市計画法に基づき、住居・商業・工業など用途に応じて定められた13種類の地域区分。', level: '★★★' }
    ]
  },
  {
    id: 'it-passport',
    name: 'ITパスポート試験 (iパス)',
    category: 'IT・テクノロジー',
    badgeClass: 'badge-it',
    tagline: 'すべての社会人のためのITリテラシー国家試験。AI・セキュリティ・DX基礎を網羅。',
    examDate: '随時実施 (CBT方式・全国会場)',
    passRate: '約50%',
    difficulty: '初級 (約100時間)',
    desc: 'ITパスポートは、ITを利活用するすべての社会人・学生が備えておくべき、ITの基礎知識（セキュリティ、AI、ネットワーク、経営戦略、法務）を証明する経済産業省認定の国家試験です。',
    sampleQuestions: [
      {
        num: 1,
        text: '情報セキュリティの3大要素（CIA）に含まれないものはどれか。',
        options: [
          '(A) 機密性（Confidentiality）',
          '(B) 完全性（Integrity）',
          '(C) 可用性（Availability）',
          '(D) 真正性（Authenticity）'
        ],
        correct: '(D)',
        explanation: '情報セキュリティの3大要素は「機密性」「完全性」「可用性」です。真正性は追加の要素（7大要素）として含まれますが、3大要素には含まれません。'
      },
      {
        num: 2,
        text: '機械学習において、正解ラベルを与えずにデータが持つ構造や特徴を分析・抽出する手法はどれか。',
        options: [
          '(A) 教師あり学習',
          '(B) 教師なし学習',
          '(C) 強化学習',
          '(D) 転移学習'
        ],
        correct: '(B)',
        explanation: '正解ラベルを与えず、データの類似度やクラスタリングを行う手法は「教師なし学習」です。'
      }
    ],
    samplePastQuestions: [
      {
        year: '令和7年度 公開問題想定',
        num: 1,
        text: 'フィッシング詐欺の手口として、最も適切なものはどれか。',
        options: [
          '(A) 実在する銀行等を装った偽の電子メールを送り、偽のWebサイトへ誘導して暗証番号等を詐取する。',
          '(B) サーバに大量のパケットを送りつけて過負荷状態にし、正常なサービスを停止させる。',
          '(C) 画面をロックして身代金を要求する悪意のあるプログラムを感染させる。',
          '(D) ネットワークを流れるパケットを盗聴してパスワードを平文で取得する。'
        ],
        correct: '(A)',
        explanation: '(A)がフィッシング詐欺の説明です。(B)はDoS攻撃、(C)はランサムウェア、(D)はスニッフィング（盗聴）です。'
      }
    ],
    sampleArticles: [
      {
        title: '【1ヶ月で合格】IT未経験者がITパスポートに最短で一発合格する学習ステップ',
        summary: 'テクノロジ系・マネジメント系・ストラテジ系の3分野を効率よく得点源にする時間配分と過去問道場の使い方。',
        date: '2026.04.08',
        tag: '初心者向け'
      },
      {
        title: '最新のシラバス対応！生成AI・DX・ゼロトラストの頻出キーワード解説',
        summary: '新シラバスで出題頻度が急上昇しているAIやセキュリティの最新重要用語をサクッとチェック。',
        date: '2026.04.22',
        tag: 'シラバス対策'
      }
    ],
    sampleGlossary: [
      { term: 'フィッシング (Phishing)', desc: '正規の金融機関やECサイト等を装ったメールで偽サイトへ誘導し、IDやパスワード、カード情報を盗み取る手口。', level: '★★★' },
      { term: 'ランサムウェア', desc: '感染したPCのデータを暗号化してアクセス不能にし、復旧と引き換えに金銭（身代金）を要求するマルウェア。', level: '★★★' },
      { term: 'ディープラーニング', desc: '人間の脳神経回路を模したニューラルネットワークを多層にして、データから高度な特徴量を自律学習する技術。', level: '★★★' },
      { term: 'ゼロトラスト', desc: '「社内ネットワークも含め、いかなる通信も信用しない」ことを前提に、全アクセスを厳格に検証・認証するセキュリティ概念。', level: '★★★' }
    ]
  },
  {
    id: 'boki',
    name: '日商簿記検定 (3級・2級)',
    category: 'ビジネス・会計',
    badgeClass: 'badge-business',
    tagline: 'すべてのビジネスパーソン必須の「会社の共通言語」。財務諸表を読む力を養成。',
    examDate: '随時(CBTネット試験) / 統一試験 年3回',
    passRate: '3級 約40% / 2級 約20%',
    difficulty: '初級〜中級',
    desc: '日商簿記は、企業の経営活動を記録・計算・整理し、財政状態や経営成績を明らかにする会計スキルの国家資格です。経理職だけでなく営業や経営企画、株式投資にも直結します。',
    sampleQuestions: [
      {
        num: 1,
        text: '商品100,000円を売り上げ、代金のうち30,000円は現金で受け取り、残額は掛けとした。この取引の適切な仕訳はどれか。',
        options: [
          '(A) (借) 現金 30,000 / 売掛金 70,000  (貸) 売上 100,000',
          '(B) (借) 売上 100,000  (貸) 現金 30,000 / 買掛金 70,000',
          '(C) (借) 現金 30,000 / 買掛金 70,000  (貸) 売上 100,000',
          '(D) (借) 売掛金 100,000  (貸) 売上 100,000'
        ],
        correct: '(A)',
        explanation: '資産の増加（現金30,000円、売掛金70,000円）を借方に記入し、収益の発生（売上100,000円）を貸方に記入します。'
      },
      {
        num: 2,
        text: '決算整理仕訳において、当期に支払った保険料のうち翌期分24,000円を前払いとして処理する場合の正しい仕訳はどれか。',
        options: [
          '(A) (借) 保険料 24,000  (貸) 前払保険料 24,000',
          '(B) (借) 前払保険料 24,000  (貸) 保険料 24,000',
          '(C) (借) 前払保険料 24,000  (貸) 現金 24,000',
          '(D) (借) 未払保険料 24,000  (貸) 保険料 24,000'
        ],
        correct: '(B)',
        explanation: '当期の費用から翌期分を除外するため保険料を貸方に減額し、資産勘定である前払保険料を借方に計上します。'
      }
    ],
    samplePastQuestions: [
      {
        year: '第169回 簿記3級想定本試験問題（第1問 仕訳）',
        num: 1,
        text: '備品800,000円を購入し、代金は小切手を振り出して支払った。なお、引取運賃10,000円は現金で支払った。',
        options: [
          '(A) (借) 備品 810,000  (貸) 当座預金 800,000 / 現金 10,000',
          '(B) (借) 備品 800,000 / 発送費 10,000  (貸) 当座預金 810,000',
          '(C) (借) 備品 800,000 / 支払手数料 10,000  (貸) 当座預金 800,000 / 現金 10,000',
          '(D) (借) 備品 810,000  (貸) 現金 810,000'
        ],
        correct: '(A)',
        explanation: '固定資産の購入にかかる付随費用（引取運賃など）は取得原価に含めるため、備品の金額は810,000円となります。自己振り出し小切手は当座預金の減少です。'
      }
    ],
    sampleArticles: [
      {
        title: '【簿記3級・2級】仕訳の基本ルール（借方・貸方）を絶対に間違えない思考法',
        summary: '「資産・費用が増えたら左（借方）」「負債・純資産・収益が増えたら右（貸方）」のイメージを感覚的に身につける解説。',
        date: '2026.04.02',
        tag: '基礎マスター'
      },
      {
        title: 'CBTネット試験とペーパー統一試験の違い・おすすめの受験戦略',
        summary: '随時好きな日時に受験できるネット試験のメリットと、PC操作・電卓の活用テクニックをアドバイス。',
        date: '2026.04.16',
        tag: '試験対策'
      }
    ],
    sampleGlossary: [
      { term: '仕訳 (しわけ)', desc: '取引を「借方（左側）」と「貸方（右側）」の勘定科目に分類し、原因と結果を金銭単位で複式記録すること。', level: '★★★' },
      { term: '減価償却', desc: '建物や車両などの固定資産の取得原価を、耐用年数にわたって各会計期間の費用として配分する手続き。', level: '★★★' },
      { term: '貸倒引当金', desc: '売掛金や受取手形などの債権が将来回収不能になるリスクに備えて、あらかじめ見積もって計上しておく準備金。', level: '★★★' },
      { term: '損益計算書 (P/L)', desc: '企業の一会計期間における経営成績（どれだけ利益を出したか、費用を使ったか）を表す財務諸表。', level: '★★★' }
    ]
  }
];

function getHeaderHtml(currentPath = '', isRoot = false) {
  const prefix = isRoot ? '' : '../';
  return `
<header class="header">
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="メニュー">
  <label for="nav-toggle" class="nav-toggle-label" aria-label="メニューを開く">
    <span></span><span></span><span></span>
  </label>
  <nav class="header-nav" id="primary-nav">
    <a href="${prefix}index.html"><i class="fas fa-home"></i> トップ</a>
    <a href="${prefix}toeic/index.html"><i class="fas fa-language"></i> TOEIC</a>
    <a href="${prefix}fp/index.html"><i class="fas fa-coins"></i> FP</a>
    <a href="${prefix}takken/index.html"><i class="fas fa-building"></i> 宅建</a>
    <a href="${prefix}it-passport/index.html"><i class="fas fa-laptop-code"></i> ITパスポート</a>
    <a href="${prefix}boki/index.html"><i class="fas fa-calculator"></i> 簿記</a>
    <a href="${prefix}contact.html"><i class="fas fa-envelope"></i> お問い合わせ</a>
    <a href="${prefix}profile.html"><i class="fas fa-user-circle"></i> 私のプロフィール</a>
  </nav>
  <label for="nav-toggle" class="nav-overlay" aria-hidden="true"></label>
</header>
`;
}

function getFooterHtml(isRoot = false) {
  const prefix = isRoot ? '' : '../';
  return `
<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-col">
      <h4>資格対策ドットコム</h4>
      <p style="font-size:0.88rem; color:#a0aec0; margin-top:5px;">
        TOEIC・FP・宅建・ITパスポート・簿記など、人気の主要資格の練習問題・過去問・コラム・用語集をすべて無料で提供する総合学習プラットフォームです。
      </p>
    </div>
    <div class="footer-col">
      <h4>資格から探す</h4>
      <ul>
        <li><a href="${prefix}toeic/index.html">TOEIC® L&R</a></li>
        <li><a href="${prefix}fp/index.html">FP (ファイナンシャル・プランナー)</a></li>
        <li><a href="${prefix}takken/index.html">宅地建物取引士 (宅建)</a></li>
        <li><a href="${prefix}it-passport/index.html">ITパスポート</a></li>
        <li><a href="${prefix}boki/index.html">日商簿記検定</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>学習コンテンツ</h4>
      <ul>
        <li><a href="${prefix}other-exams.html">取り扱い資格一覧</a></li>
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

function getSubnavHtml(shikakuId, activeTab = 'top') {
  return `
<nav class="subnav-tabs" aria-label="${shikakuId} ナビゲーション">
  <a href="index.html" class="subnav-tab ${activeTab === 'top' ? 'active' : ''}">
    <i class="fas fa-info-circle"></i>
    <span>資格トップ</span>
  </a>
  <a href="problems.html" class="subnav-tab ${activeTab === 'problems' ? 'active' : ''}">
    <i class="fas fa-pencil-alt"></i>
    <span>練習問題</span>
  </a>
  <a href="past-questions.html" class="subnav-tab ${activeTab === 'past-questions' ? 'active' : ''}">
    <i class="fas fa-file-alt"></i>
    <span>過去問</span>
  </a>
  <a href="articles.html" class="subnav-tab ${activeTab === 'articles' ? 'active' : ''}">
    <i class="fas fa-book-open"></i>
    <span>コラム・勉強法</span>
  </a>
  <a href="glossary.html" class="subnav-tab ${activeTab === 'glossary' ? 'active' : ''}">
    <i class="fas fa-spell-check"></i>
    <span>用語集</span>
  </a>
</nav>
`;
}

// 資格ごとの各ページ生成
qualifications.forEach(q => {
  const dir = path.join(__dirname, q.id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 1. index.html (資格トップ)
  const indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} 対策まとめ | 練習問題・過去問・勉強法なら資格対策ドットコム</title>
<meta name="description" content="${q.name}の合格対策決定版！分野別練習問題、過去問演習、独学勉強法コラム、頻出用語集をすべて無料で公開しています。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml(q.id, false)}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li>${q.name}</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} 対策トップ</h1>
      <p>${q.tagline}</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">合格率目安</div>
        <div class="stat-val">${q.passRate}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">難易度</div>
        <div class="stat-val">${q.difficulty}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">試験日程</div>
        <div class="stat-val">${q.examDate}</div>
      </div>
    </div>
  </div>

  ${getSubnavHtml(q.id, 'top')}

  <div class="card">
    <h2>${q.name}とは？ 試験の概要と特徴</h2>
    <p style="font-size:1.05rem; line-height:1.8;">${q.desc}</p>
    <p>資格対策ドットコムでは、初めて学習される方から直前期の総仕上げまで、<strong>「練習問題」「過去問演習」「コラム」「用語集」</strong>の4つのツールを完全無料で活用いただけます。</p>
  </div>

  <h2 style="margin: 30px 0 15px 0;">学習メニュー</h2>
  <div class="shikaku-grid">
    <div class="shikaku-card">
      <div>
        <span class="shikaku-card-badge ${q.badgeClass}"><i class="fas fa-pencil-alt"></i> 演習</span>
        <h3>分野別 練習問題</h3>
        <p>1問1答形式で重要論点をサクサク確認。即座に解説が表示されるため、スキマ時間の学習に最適です。</p>
      </div>
      <a href="problems.html" class="shikaku-card-btn">練習問題を解く</a>
    </div>

    <div class="shikaku-card">
      <div>
        <span class="shikaku-card-badge ${q.badgeClass}"><i class="fas fa-file-alt"></i> 本番対策</span>
        <h3>年度別・本番過去問</h3>
        <p>実際に出題された過去問題や予想問題を厳選。本番同様の演習で実力を試せます。</p>
      </div>
      <a href="past-questions.html" class="shikaku-card-btn">過去問に挑戦</a>
    </div>

    <div class="shikaku-card">
      <div>
        <span class="shikaku-card-badge ${q.badgeClass}"><i class="fas fa-book-open"></i> ノウハウ</span>
        <h3>コラム・合格ロードマップ</h3>
        <p>独学での学習スケジュール、おすすめテキスト、頻出分野の解法テクニックを詳しく解説。</p>
      </div>
      <a href="articles.html" class="shikaku-card-btn">コラムを読む</a>
    </div>

    <div class="shikaku-card">
      <div>
        <span class="shikaku-card-badge ${q.badgeClass}"><i class="fas fa-spell-check"></i> 暗記</span>
        <h3>頻出重要用語集</h3>
        <p>試験によく出る重要キーワード・専門用語を一覧化。直前の総復習や用語チェックに便利です。</p>
      </div>
      <a href="glossary.html" class="shikaku-card-btn">用語集を見る</a>
    </div>
  </div>

  ${q.id === 'toeic' ? `
  <div class="card" style="border-left: 5px solid #4a90e2; background:#f0f7ff;">
    <h3><i class="fas fa-headphones"></i> TOEIC専用の特訓システムも利用可能</h3>
    <p>従来の単語テスト・リーディング演習・リスニング特訓モードも継続してご利用いただけます。</p>
    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
      <a class="btn" href="../study/vocabulary/test.html"><i class="fas fa-font"></i> 単語テスト</a>
      <a class="btn" href="../study/reading/test.html"><i class="fas fa-book-open"></i> リーディング</a>
      <a class="btn" href="../study/listening/test.html"><i class="fas fa-headphones"></i> リスニング</a>
    </div>
  </div>
  ` : ''}

</div>

${getFooterHtml(false)}
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');

  // 2. problems.html (練習問題)
  const problemsHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} 分野別練習問題 | 無料で解ける1問1答 | 資格対策ドットコム</title>
<meta name="description" content="${q.name}の分野別練習問題。選択肢を選んで即座に正誤判定と詳しい解説を確認できます。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml(q.id, false)}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li><a href="index.html">${q.name}</a></li>
    <li>練習問題</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} 分野別練習問題</h1>
      <p>重要ポイントを1問ずつ着実にマスターしましょう（仮置き問題で動作確認可能）</p>
    </div>
  </div>

  ${getSubnavHtml(q.id, 'problems')}

  <div class="card" style="margin-bottom:20px;">
    <h2>一問一答トレーニング</h2>
    <p>選択肢をクリックして「解答する」ボタンを押すと、即座に正誤判定と解説が表示されます。</p>
  </div>

  ${q.sampleQuestions.map(item => `
  <div class="quiz-card" data-answer="${item.correct}">
    <span class="quiz-num-badge">第 ${item.num} 問</span>
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

  <div class="card" style="text-align:center; padding:30px;">
    <h3>さらに多くの問題を追加準備中！</h3>
    <p>現在、出題分野別の問題データベースを順次追加しております。</p>
    <a href="past-questions.html" class="shikaku-card-btn" style="display:inline-block; margin-top:10px;">過去問演習に進む</a>
  </div>
</div>

${getFooterHtml(false)}
<script src="../assets/js/common-quiz.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'problems.html'), problemsHtml, 'utf8');

  // 3. past-questions.html (過去問)
  const pastHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} 過去問演習 | 年度別・本番過去問解説 | 資格対策ドットコム</title>
<meta name="description" content="${q.name}の過去問・模擬試験問題です。本番同様の出題形式で実力判定と丁寧な解説付き。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml(q.id, false)}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li><a href="index.html">${q.name}</a></li>
    <li>過去問</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} 過去問演習</h1>
      <p>本番試験の形式・難易度をリアルに体験しよう</p>
    </div>
  </div>

  ${getSubnavHtml(q.id, 'past-questions')}

  <div class="card">
    <h2>過去問題・模擬演習</h2>
    <p>実際の過去問や本試験想定問題を解いてみましょう。制限時間を意識しながら解くことで本番力が養われます。</p>
  </div>

  ${q.samplePastQuestions.map(item => `
  <div class="quiz-card" data-answer="${item.correct}">
    <span class="quiz-num-badge">${item.year}</span>
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

  <div class="card" style="background:#f8fafc; text-align:center; padding:30px;">
    <h3>過去問アーカイブ</h3>
    <p>過去数回分の過去問データ・解説を順次追加拡充予定です。</p>
  </div>
</div>

${getFooterHtml(false)}
<script src="../assets/js/common-quiz.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'past-questions.html'), pastHtml, 'utf8');

  // 4. articles.html (コラム)
  const articlesHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} コラム・勉強法 | 独学合格ノウハウ | 資格対策ドットコム</title>
<meta name="description" content="${q.name}の合格に向けたコラム・勉強法記事一覧。最短合格スケジュールや参考書選び、頻出ポイントを網羅。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml(q.id, false)}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li><a href="index.html">${q.name}</a></li>
    <li>コラム</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} コラム・勉強法</h1>
      <p>最短で合格ラインに達するためのノウハウと最新試験情報</p>
    </div>
  </div>

  ${getSubnavHtml(q.id, 'articles')}

  <div class="articles-grid">
    ${q.sampleArticles.map(art => `
    <div class="article-card">
      <div class="article-card-body">
        <div>
          <span class="shikaku-card-badge ${q.badgeClass}">${art.tag}</span>
          <h3>${art.title}</h3>
          <p>${art.summary}</p>
        </div>
        <div class="article-meta">
          <span><i class="far fa-calendar-alt"></i> ${art.date}</span>
          <span>資格対策ドットコム編集部</span>
        </div>
      </div>
    </div>
    `).join('')}
  </div>
</div>

${getFooterHtml(false)}
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'articles.html'), articlesHtml, 'utf8');

  // 5. glossary.html (用語集)
  const glossaryHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} 頻出用語集 | 重要キーワードまとめ | 資格対策ドットコム</title>
<meta name="description" content="${q.name}試験によく出る重要用語・キーワードを分かりやすく解説。スキマ時間の暗記・直前総チェックに。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml(q.id, false)}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li><a href="index.html">${q.name}</a></li>
    <li>用語集</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} 頻出用語集</h1>
      <p>本試験で差がつく重要用語・キーコンセプト</p>
    </div>
  </div>

  ${getSubnavHtml(q.id, 'glossary')}

  <div class="card">
    <table class="glossary-table">
      <thead>
        <tr>
          <th style="width: 25%;">用語 / 単語</th>
          <th style="width: 60%;">意味・重要解説</th>
          <th style="width: 15%; text-align:center;">重要度</th>
        </tr>
      </thead>
      <tbody>
        ${q.sampleGlossary.map(item => `
        <tr>
          <td class="glossary-term">${item.term}</td>
          <td class="glossary-desc">${item.desc}</td>
          <td style="text-align:center;"><span class="badge-star">${item.level}</span></td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>

${getFooterHtml(false)}
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'glossary.html'), glossaryHtml, 'utf8');

  console.log(`Generated unified templates for ${q.id}`);
});

console.log('All qualification templates generated successfully!');
