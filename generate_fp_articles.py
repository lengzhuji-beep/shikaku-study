import os
from datetime import datetime

base_dir = os.path.join(os.path.dirname(__file__), 'fp', 'columns')
template_file = os.path.join(base_dir, '01-fp-study-roadmap.html')

with open(template_file, 'r', encoding='utf-8') as f:
    template = f.read()

articles = [
    {
        "file": "04-fp-practical-exam-choice.html",
        "title": "FP実技試験の選び方（きんざい・日本FP協会どちらを選ぶべきか？）",
        "badge": "実技試験対策",
        "desc": "FP試験で迷いがちな「きんざい」と「日本FP協会」の実技試験の選び方を徹底解説。それぞれの出題傾向とおすすめの受験者をわかりやすく比較します。",
        "content": """
      <p>FP試験を受験する際、多くの人が最初に悩むのが「実技試験を『きんざい（金融財政事情研究会）』にするか『日本FP協会』にするか」という選択です。学科試験は共通ですが、実技試験は実施機関によって出題内容や形式が異なります。</p>
      
      <h2>1. 日本FP協会「資産設計提案業務」の特徴</h2>
      <p>日本FP協会が実施する実技試験は「資産設計提案業務」の1種類のみです。出題範囲が広く、FPの6大分野から満遍なく出題されるのが特徴です。</p>
      <ul>
        <li><strong>問題数と形式:</strong> 20問。四肢択一や正誤判定、計算問題がバランスよく出題。</li>
        <li><strong>おすすめな人:</strong> 広く浅く知識を身につけたい人、計算問題よりも知識問題を得意とする人。</li>
      </ul>

      <h2>2. きんざい「個人資産相談業務」「生保顧客資産相談業務」の特徴</h2>
      <p>きんざい（金融財政事情研究会）が実施する実技試験は複数ありますが、代表的なものは「個人資産相談業務」と「生保顧客資産相談業務」です。</p>
      <ul>
        <li><strong>問題数と形式:</strong> 5題（各3問程度）。事例問題に対して計算や法務知識を深く問われます。</li>
        <li><strong>おすすめな人:</strong> 特定の分野を深く掘り下げて学習したい人、保険業界や金融機関にお勤めの人。</li>
      </ul>

      <h2>3. 結論：どちらを選ぶべきか？</h2>
      <p>一般的に、<strong>初学者や独学で幅広いお金の知識をつけたい方には「日本FP協会」</strong>がおすすめです。一方、<strong>仕事で特定の知識（特に保険や金融）を使う方には「きんざい」</strong>が向いています。どちらに合格しても資格としての価値は同じですので、自分の学習スタイルに合わせて選びましょう。</p>
        """
    },
    {
        "file": "05-fp-calculation-formulas.html",
        "title": "FP試験の計算問題対策！絶対に落とせない重要公式10選",
        "badge": "計算問題対策",
        "desc": "FP3級・2級の試験で頻出の計算問題。PER、建ぺい率、老齢基礎年金など、絶対に覚えておくべき重要公式10選をまとめました。",
        "content": """
      <p>FP試験では、単なる知識だけでなく、実際の数字を使った計算問題が必ず出題されます。ここでは、試験で頻出の絶対に落とせない重要公式をピックアップして紹介します。</p>
      
      <h2>1. 金融資産運用：株式投資の指標</h2>
      <ul>
        <li><strong>PER（株価収益率）:</strong> <code>株価 ÷ 1株当たり当期純利益</code>。株価が利益の何倍かを示し、割安・割高を判断します。</li>
        <li><strong>PBR（株価純資産倍率）:</strong> <code>株価 ÷ 1株当たり純資産</code>。株価が純資産の何倍かを示します。</li>
        <li><strong>ROE（自己資本利益率）:</strong> <code>(当期純利益 ÷ 自己資本) × 100</code>。自己資本を使ってどれだけ効率的に利益を上げたかを示します。</li>
      </ul>

      <h2>2. 不動産：建物の制限</h2>
      <ul>
        <li><strong>建蔽率（建ぺい率）の計算:</strong> <code>(建築面積 ÷ 敷地面積) × 100</code>。敷地に対する建物の面積の割合です。</li>
        <li><strong>容積率の計算:</strong> <code>(延べ面積 ÷ 敷地面積) × 100</code>。敷地に対する建物の延床面積の割合です。</li>
      </ul>

      <h2>3. ライフプランニング：年金の計算</h2>
      <p><strong>老齢基礎年金の受給額計算:</strong> <code>満額の年金額 × (保険料納付済月数 ÷ 480ヶ月)</code>。※免除期間がある場合は計算式が複雑になりますので注意が必要です。</p>

      <h2>計算問題攻略のコツ</h2>
      <p>計算問題は、公式を丸暗記するだけでなく、<strong>実際に過去問を解いて電卓を叩く練習</strong>をすることが最も効果的です。本試験では焦って計算ミスをしやすいので、普段から丁寧な計算を心がけましょう。</p>
        """
    },
    {
        "file": "06-fp-new-nisa-2024.html",
        "title": "新NISA完全対応！FP試験で狙われる改正ポイントと基礎知識",
        "badge": "最新法改正",
        "desc": "2024年からスタートした「新NISA」。FP試験でも最重要トピックとなる新制度の概要と、試験で狙われやすいポイントを解説します。",
        "content": """
      <p>2024年1月より、NISA（少額投資非課税制度）が大幅にリニューアルされ、「新NISA」としてスタートしました。FP試験においても、この法改正は最重要トピックの一つです。</p>
      
      <h2>1. 新NISAの主な改正ポイント</h2>
      <p>旧NISA（一般NISA・つみたてNISA）からの主な変更点は以下の通りです。</p>
      <ul>
        <li><strong>非課税保有期間の無期限化:</strong> 従来の5年や20年といった期限がなくなり、無期限で非課税運用が可能になりました。</li>
        <li><strong>投資枠の拡大:</strong> 年間投資枠が大幅に拡充され、成長投資枠が年240万円、つみたて投資枠が年120万円、合計で年360万円まで投資可能になりました。</li>
        <li><strong>生涯非課税限度額の設定:</strong> 1人あたり総額1,800万円（うち成長投資枠は1,200万円）の生涯投資枠が新設されました。</li>
        <li><strong>枠の再利用が可能に:</strong> 商品を売却した場合、その分の非課税枠が翌年以降に復活し、再利用できるようになりました。</li>
      </ul>

      <h2>2. FP試験で狙われる引っかけポイント</h2>
      <p>試験では、旧制度との違いや細かい数字が問われます。「成長投資枠とつみたて投資枠の併用は可能か（可能）」、「非課税枠の再利用はいつからできるか（売却した翌年）」などのポイントを確実に押さえておきましょう。</p>

      <h2>3. 実務への活かし方</h2>
      <p>新NISAは顧客への提案においても強力なツールです。FPとして、顧客のリスク許容度やライフイベントに合わせたポートフォリオの提案ができるよう、制度の仕組みを深く理解しておきましょう。</p>
        """
    },
    {
        "file": "07-fp-trick-questions.html",
        "title": "FP2級・3級の学科試験「引っかけ問題」パターンと対策",
        "badge": "試験対策テクニック",
        "desc": "FP試験で多くの受験生が間違える「引っかけ問題」の典型的なパターンと、それに引っかからないための対策方法を公開します。",
        "content": """
      <p>FP試験の学科試験では、一見簡単そうに見えて実は罠が仕掛けられている「引っかけ問題」が多数出題されます。よくあるパターンを知っておくことで、失点を防ぐことができます。</p>
      
      <h2>1. 典型的な引っかけパターン</h2>
      <ul>
        <li><strong>「すべて」「必ず」などの絶対的表現:</strong> 法律や制度には原則と例外があります。「すべて〇〇である」といった絶対的な表現がある選択肢は、誤り（×）であることが多いです。</li>
        <li><strong>主語のすり替え:</strong> 例えば、「国民年金の第1号被保険者」と「第2号被保険者」の条件が逆になっているなど、主語と述語の組み合わせをすり替えるパターンです。</li>
        <li><strong>数字のわずかな違い:</strong> 「20%」を「15%」にしたり、「5年」を「3年」にしたりするなど、細かい数字を変えてくる問題です。</li>
      </ul>

      <h2>2. 分野別の要注意ポイント</h2>
      <p><strong>タックスプランニング:</strong> 「青色申告特別控除」の要件（55万円か65万円か）や、「医療費控除」の対象となる費用（予防接種は対象外など）は頻出の引っかけポイントです。</p>
      <p><strong>不動産:</strong> 「建ぺい率の緩和要件（角地緩和など）」や、「3,000万円特別控除」と「住宅ローン控除」の併用可否について、正確な理解が求められます。</p>

      <h2>3. 対策：過去問での「理由付け」</h2>
      <p>引っかけ問題に対抗するには、過去問を解く際に「なぜこの選択肢は間違いなのか」を自分の言葉で説明できるようにすることが重要です。答えを覚えるのではなく、間違いの根拠を探す練習をしましょう。</p>
        """
    },
    {
        "file": "08-fp-tax-planning-strategy.html",
        "title": "FP学習で挫折しやすい「タックスプランニング」の攻略法",
        "badge": "苦手分野克服",
        "desc": "FP試験で最も苦手とする人が多い「タックスプランニング（税金）」。所得の種類から各種控除まで、挫折せずに理解するための攻略法を解説。",
        "content": """
      <p>FPの6大分野の中で、多くの受験生が最初に壁にぶつかるのが「タックスプランニング」です。しかし、税金の知識は他の分野（不動産、相続など）の基礎となるため、避けて通ることはできません。</p>
      
      <h2>1. 10種類の「所得」を分類して覚える</h2>
      <p>まずは、所得税における10種類の所得（利子、配当、不動産、事業、給与、退職、山林、譲渡、一時、雑）をしっかり分類しましょう。それぞれの所得の計算方法と、どのような収入がどれに当てはまるのかを整理することが第一歩です。</p>

      <h2>2. 「所得控除」と「税額控除」の違いを理解する</h2>
      <p>試験でよく問われるのがこの違いです。</p>
      <ul>
        <li><strong>所得控除:</strong> 基礎控除、配偶者控除、生命保険料控除など。税金を計算する前の「所得」から差し引くものです。</li>
        <li><strong>税額控除:</strong> 住宅ローン控除など。算出された「税額」から直接差し引くため、節税効果が大きくなります。</li>
      </ul>

      <h2>3. 損益通算できる4つの所得（富士山上）</h2>
      <p>赤字になった場合に他の黒字の所得から差し引くことができる「損益通算」。対象となるのは<strong>不（不動産）事（事業）山（山林）上（譲渡）</strong>の4つです。この語呂合わせは超頻出なので絶対に覚えましょう！</p>

      <h2>4. 焦らず過去問で反復演習を</h2>
      <p>タックスプランニングは範囲が広く細かい数字も多いため、テキストを読んだだけで完璧に理解するのは困難です。「インプットはそこそこに、過去問を解きながら解説を読んで覚える」というアウトプット中心の学習が最も効率的です。</p>
        """
    },
    {
        "file": "09-fp-career-utilization.html",
        "title": "FP資格取得後のキャリアと活用法（就職・転職・独立）",
        "badge": "キャリア・資格活用",
        "desc": "苦労して取得したFP資格、どのように活かす？金融業界への就職・転職から、独立系FPとしての起業、そして自身の家計管理まで、資格の活用法を紹介します。",
        "content": """
      <p>FP（ファイナンシャル・プランナー）資格は、取得して終わりではありません。その知識は、仕事からプライベートまで様々な場面で大いに役立ちます。</p>
      
      <h2>1. 金融業界（銀行・証券・保険）への就職・転職</h2>
      <p>FP資格が最も直接的に評価されるのが金融業界です。顧客に対して資産運用や保険の見直しを提案する際、FPの体系的な知識は不可欠です。特に2級以上を持っていると、一定の知識レベルがあることの証明となり、転職活動において有利に働きます。</p>

      <h2>2. 不動産・住宅メーカーでの活用</h2>
      <p>住宅購入は人生最大の買い物です。不動産業界の営業担当者がFP資格を持っていると、単に物件を売るだけでなく、住宅ローンや税制の優遇措置、購入後のライフプランまでを含めた総合的なアドバイスが可能になり、顧客からの信頼を大きく得ることができます。</p>

      <h2>3. 独立系FPとしての起業</h2>
      <p>特定の金融機関に属さない「独立系FP」として開業する道もあります。公正中立な立場で顧客のライフプランニングや資産相談に乗り、相談料を主な収入源とします。FP1級やCFPといった上位資格と、豊富な実務経験や専門性が求められます。</p>

      <h2>4. 最大のメリットは「自分自身の家計防衛」</h2>
      <p>仕事に直結しなくても、FPの知識は「自分と家族のお金を守り、増やす」ために最大限に活かされます。無駄な保険の見直し、NISAやiDeCoを活用した資産形成、住宅ローンの賢い組み方など、一生モノの金融リテラシーが身につくことが、FP資格取得の最大のメリットと言えるでしょう。</p>
        """
    }
]

import re

for a in articles:
    new_content = template
    # Replace head title
    new_content = re.sub(r'<title>.*?</title>', f'<title>{a["title"]} | 資格対策ドットコム</title>', new_content, flags=re.DOTALL)
    # Replace meta description
    new_content = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{a["desc"]}">', new_content, flags=re.DOTALL)
    # Replace H1
    new_content = re.sub(r'<h1>.*?</h1>', f'<h1>{a["title"]}</h1>', new_content, flags=re.DOTALL)
    # Replace badge
    new_content = re.sub(r'<span class="shikaku-card-badge.*?">.*?</span>', f'<span class="shikaku-card-badge badge-finance" style="font-size:0.9rem; padding:6px 14px; margin-bottom:12px; display:inline-block;">{a["badge"]}</span>', new_content, flags=re.DOTALL)
    
    date_str = datetime.now().strftime("%Y年%m月%d日")
    new_content = re.sub(r'<p class="meta-info">.*?</p>', f'<p class="meta-info">公開日: {date_str} | 執筆: 資格対策ドットコム FP試験対策チーム</p>', new_content, flags=re.DOTALL)
    
    # Replace main article content
    start_tag = '<div class="article-content">'
    end_tag = '<a href="../articles.html" class="back-to-list">'
    
    start_idx = new_content.find(start_tag) + len(start_tag)
    end_idx = new_content.find(end_tag)
    
    bottom_cta = """
      <div class="card" style="text-align:center; padding:25px; background:#ebf8ff; border:1px solid #bee3f8; margin-top:35px;">
        <h3 style="margin-top:0; color:#2b6cb0;"><i class="fas fa-graduation-cap"></i> 今すぐ学習をスタートしましょう！</h3>
        <p style="color:#4a5568;">まずは練習問題で自分の現在の理解度をチェックしてみませんか？</p>
        <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap; margin-top:15px;">
          <a href="../3kyu/problems.html" class="shikaku-card-btn" style="background:#38a169; max-width:240px;"><i class="fas fa-dumbbell"></i> FP3級 練習問題へ</a>
          <a href="../2kyu/problems.html" class="shikaku-card-btn" style="background:#3182ce; max-width:240px;"><i class="fas fa-dumbbell"></i> FP2級 練習問題へ</a>
        </div>
      </div>
    """
    
    new_content = new_content[:start_idx] + "\n" + a["content"] + "\n" + bottom_cta + "\n      " + new_content[end_idx:]
    
    with open(os.path.join(base_dir, a["file"]), 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Created", a["file"])

articles_html_path = os.path.join(os.path.dirname(__file__), 'fp', 'articles.html')
with open(articles_html_path, 'r', encoding='utf-8') as f:
    articles_html = f.read()

grid_end = articles_html.rfind('</div>\\n</div>\\n\\n\\n<footer')
if grid_end == -1:
    grid_end = articles_html.rfind('</div>\\n</div>')

if grid_end == -1:
    grid_end = articles_html.rfind('  </div>\\n</div>')
    
# Better finding: the end of .articles-grid
# we can just find '  </div>\n</div>\n\n\n<footer'
split_str = '  </div>\n</div>\n\n\n<footer'
parts = articles_html.split(split_str)

new_cards = ""
for a in articles:
    new_cards += f'''
    <a href="columns/{a["file"]}" class="article-card">
      <div class="article-card-body">
        <div>
          <span class="shikaku-card-badge badge-finance">{a["badge"]}</span>
          <h3>{a["title"]}</h3>
          <p>{a["desc"]}</p>
        </div>
        <div class="article-meta">
          <span><i class="far fa-calendar-alt"></i> 2026.09.06</span>
          <span>資格対策ドットコム編集部</span>
        </div>
      </div>
    </a>
'''

with open(articles_html_path, 'w', encoding='utf-8') as f:
    f.write(parts[0] + new_cards + split_str + parts[1])

print("Updated articles.html")
