const fs = require('fs');
const path = require('path');

const qualifications = [
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
    sessions: [
      { id: '2025-05', name: '2025年 5月実施回', count: '学科試験想定 60問', passScore: '60%以上' },
      { id: '2025-01', name: '2025年 1月実施回', count: '学科試験想定 60問', passScore: '60%以上' },
      { id: '2024-09', name: '2024年 9月実施回', count: '学科試験想定 60問', passScore: '60%以上' },
      { id: '2024-05', name: '2024年 5月実施回', count: '学科試験想定 60問', passScore: '60%以上' }
    ],
    sampleQuestions: [
      {
        qid: 'fp-p-01',
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
        qid: 'fp-p-02',
        num: 2,
        text: '贈与税の暦年課税における基礎控除額として、正しいものはどれか。',
        options: ['(A) 年間60万円', '(B) 年間110万円', '(C) 年間200万円', '(D) 年間500万円'],
        correct: '(B)',
        explanation: '贈与税の暦年課税における基礎控除額は、受贈者1人あたり年間110万円です。'
      }
    ],
    samplePastQuestions: [
      {
        sessionId: '2025-05',
        sessionName: '2025年 5月実施回（第1問）',
        qid: 'fp-q-202505-01',
        num: 1,
        text: '金融商品取引法における「投資者保護」の規定に基づき、クーリング・オフ制度が適用される金融取引はどれか。',
        options: ['(A) 投資信託の買付', '(B) 投資顧問契約', '(C) 上場株式の現物取引', '(D) 国債の購入'],
        correct: '(B)',
        explanation: '原則として市場性のある株式や投資信託にはクーリング・オフはありませんが、投資顧問契約の締結にはクーリング・オフが認められています。'
      },
      {
        sessionId: '2025-01',
        sessionName: '2025年 1月実施回（第1問）',
        qid: 'fp-q-202501-01',
        num: 1,
        text: '老齢基礎年金の繰上げ支給を請求した場合の減額率に関する次の記述のうち、正しいものはどれか。',
        options: [
          '(A) 繰上げ月数1月あたり0.4%減額される。',
          '(B) 繰上げ月数1月あたり0.5%減額される。',
          '(C) 繰上げ月数1月あたり0.7%減額される。',
          '(D) 請求した翌月から満額受給に戻る。'
        ],
        correct: '(A)',
        explanation: '令和4年4月以降に60歳に達した方の老齢基礎年金の繰上げ減額率は、1月あたり0.4%です。'
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
    sessions: [
      { id: '2025', name: '令和7年度（2025年）本試験', count: '全50問・四肢択一', passScore: '約36点前後/50点' },
      { id: '2024', name: '令和6年度（2024年）本試験', count: '全50問・四肢択一', passScore: '37点/50点' },
      { id: '2023', name: '令和5年度（2023年）本試験', count: '全50問・四肢択一', passScore: '36点/50点' },
      { id: '2022', name: '令和4年度（2022年）本試験', count: '全50問・四肢択一', passScore: '36点/50点' }
    ],
    sampleQuestions: [
      {
        qid: 'takken-p-01',
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
        qid: 'takken-p-02',
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
        sessionId: '2025',
        sessionName: '令和7年度 本試験（問15 宅建業法）',
        qid: 'takken-q-2025-01',
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
      },
      {
        sessionId: '2024',
        sessionName: '令和6年度 本試験（問1 権利関係）',
        qid: 'takken-q-2024-01',
        num: 1,
        text: 'Aが所有する甲土地をBに売却し、その後Cにも売却した場合の対抗関係に関する次の記述のうち、正しいものはどれか。',
        options: [
          '(A) Bが先に引渡しを受けていれば、Cが先に所有権移転登記を備えてもBが優先する。',
          '(B) Cが登記を備えた場合、Cが背信的悪意者でない限り、Bは自己の所有権をCに対抗できない。',
          '(C) BとCは契約締結日の先後によって優劣が決まる。',
          '(D) 登記の先後に関わらず、代金を全額支払った者が所有権を取得する。'
        ],
        correct: '(B)',
        explanation: '不動産の二重譲渡では、先に登記を備えた方が勝ちます（民法177条）。相手方が背信的悪意者でない限り、登記なくして対抗できません。'
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
    sessions: [
      { id: 'r07', name: '令和7年度 公開問題', count: '100問 (CBT想定)', passScore: '総合600点以上/1000点' },
      { id: 'r06', name: '令和6年度 公開問題', count: '100問 (CBT想定)', passScore: '総合600点以上/1000点' },
      { id: 'r05', name: '令和5年度 公開問題', count: '100問 (CBT想定)', passScore: '総合600点以上/1000点' }
    ],
    sampleQuestions: [
      {
        qid: 'ip-p-01',
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
        qid: 'ip-p-02',
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
        sessionId: 'r07',
        sessionName: '令和7年度 公開問題（問1）',
        qid: 'ip-q-r07-01',
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
      },
      {
        sessionId: 'r06',
        sessionName: '令和6年度 公開問題（問1）',
        qid: 'ip-q-r06-01',
        num: 1,
        text: 'IoT機器が取得したデータをクラウドに集約する前に、ネットワークの末端（エッジ）近くで分散処理するコンピューティング形態はどれか。',
        options: ['(A) エッジコンピューティング', '(B) グリッドコンピューティング', '(C) メインフレーム', '(D) クライアントサーバシステム'],
        correct: '(A)',
        explanation: '末端（エッジ）側でリアルタイムに処理を行う仕組みは(A)エッジコンピューティングです。'
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
    sessions: [
      { id: '169', name: '第169回 簿記検定想定問題', count: '仕訳・帳簿・決算 3問', passScore: '70点以上/100点' },
      { id: '168', name: '第168回 簿記検定想定問題', count: '仕訳・帳簿・決算 3問', passScore: '70点以上/100点' },
      { id: 'net-cbt', name: 'CBTネット試験模試', count: '60分・ネット本番形式', passScore: '70点以上/100点' }
    ],
    sampleQuestions: [
      {
        qid: 'boki-p-01',
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
        qid: 'boki-p-02',
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
        sessionId: '169',
        sessionName: '第169回 簿記3級想定問題（第1問 仕訳）',
        qid: 'boki-q-169-01',
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
      },
      {
        sessionId: 'net-cbt',
        sessionName: 'CBTネット試験模試（第1問 仕訳）',
        qid: 'boki-q-cbt-01',
        num: 1,
        text: '得意先に対する売掛金50,000円が回収不能となったため、貸倒れとして処理する。なお、貸倒引当金の残高は30,000円である。',
        options: [
          '(A) (借) 貸倒引当金 30,000 / 貸倒損失 20,000  (貸) 売掛金 50,000',
          '(B) (借) 貸倒損失 50,000  (貸) 売掛金 50,000',
          '(C) (借) 貸倒引当金 50,000  (貸) 売掛金 50,000',
          '(D) (借) 売掛金 50,000  (貸) 貸倒引当金 30,000 / 貸倒損失 20,000'
        ],
        correct: '(A)',
        explanation: '貸倒引当金の残高30,000円を優先的に取り崩し、不足額20,000円を当期の費用である貸倒損失として処理します。'
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

function getHeaderHtml(prefix = '../') {
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

function getFooterHtml(prefix = '../') {
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
    <i class="fas fa-dumbbell"></i>
    <span>練習問題</span>
  </a>
  <a href="past-questions.html" class="subnav-tab ${activeTab === 'past-questions' ? 'active' : ''}">
    <i class="fas fa-file-alt"></i>
    <span>過去問演習</span>
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

// 資格ごとにページ更新
qualifications.forEach(q => {
  const dir = path.join(__dirname, q.id);

  // 1. problems.html (トレーニング + ブックマーク復習)
  const problemsHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} 練習問題 | トレーニング＆ブックマーク復習 | 資格対策ドットコム</title>
<meta name="description" content="${q.name}の練習問題。トレーニングで重要論点を反復し、苦手な問題はブックマークして集中的に復習できます。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml()}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li><a href="index.html">${q.name}</a></li>
    <li>練習問題</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} 練習問題</h1>
      <p>トレーニングで実力を鍛え、ブックマークした問題を繰り返し復習しましょう</p>
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

  ${getSubnavHtml(q.id, 'problems')}

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

  ${q.sampleQuestions.map(item => `
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
    <h3>さらに問題を追加準備中！</h3>
    <p>順次、単元別の問題をアップデートしていきます。</p>
    <a href="past-questions.html" class="shikaku-card-btn" style="display:inline-block; margin-top:10px;">過去問演習に挑戦する</a>
  </div>
</div>

${getFooterHtml()}
<script src="../assets/js/common-quiz.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'problems.html'), problemsHtml, 'utf8');

  // 2. past-questions.html (試験実施回・年度セレクターUI付き)
  const pastHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q.name} 過去問演習 | 試験実施回・年度別選択 | 資格対策ドットコム</title>
<meta name="description" content="${q.name}の年度別・試験実施回別の過去問演習。解きたい実施回を選択して本番形式の演習と詳しい解説で試験対策ができます。">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body class="with-header">
${getHeaderHtml()}

<div class="container">
  <ul class="breadcrumb">
    <li><a href="../index.html">ホーム</a></li>
    <li><a href="index.html">${q.name}</a></li>
    <li>過去問演習</li>
  </ul>

  <div class="qualification-header">
    <div class="qualification-title-area">
      <span class="shikaku-card-badge ${q.badgeClass}">${q.category}</span>
      <h1>${q.name} 過去問演習</h1>
      <p>試験実施回を選択して、本番さながらの過去問演習に挑戦しましょう</p>
    </div>
    <div class="qualification-stats">
      <div class="stat-box">
        <div class="stat-label">収録年度</div>
        <div class="stat-val">${q.sessions.length}回分</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">解説</div>
        <div class="stat-val">全問付き</div>
      </div>
    </div>
  </div>

  ${getSubnavHtml(q.id, 'past-questions')}

  <!-- 試験実施回セレクターUI -->
  <div class="session-selector-card">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <h2 style="margin:0; font-size:1.25rem;"><i class="fas fa-calendar-check" style="color:#3182ce;"></i> 試験実施回を選択</h2>
      <span style="font-size:0.85rem; color:#718096;">解きたい回をクリックすると問題が切り替わります</span>
    </div>
    <div class="session-grid">
      <button type="button" class="session-btn active" data-session="all">
        <span class="session-name"><i class="fas fa-layer-group"></i> 全ての実施回</span>
        <span class="session-meta">全過去問を横断演習</span>
      </button>
      ${q.sessions.map(s => `
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

  <!-- 過去問題リスト -->
  ${q.samplePastQuestions.map(item => `
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
    <h3>過去問アーカイブを順次拡充中</h3>
    <p>過去5年分の問題データと詳細な解説を順次追加しております。</p>
  </div>
</div>

${getFooterHtml()}
<script src="../assets/js/common-quiz.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'past-questions.html'), pastHtml, 'utf8');

  console.log(`Updated problems & past-questions for ${q.id}`);
});

console.log('All qualifications updated successfully!');
