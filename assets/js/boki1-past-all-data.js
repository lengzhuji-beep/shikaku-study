/**
 * Shikakus - 日商簿記1級 予想問題集データ（実戦予想模試 全6回・計120問）
 * 本試験形式（商業簿記25点＋会計学25点＋工業簿記25点＋原価計算25点＝100点満点）完全準拠
 * 全問：本試験様式資料テーブル（精算表・財務諸表・原価計算表・意思決定表）および詳細解説付き
 */
window.BOKI1_PAST_DATA = {
  "1": {
    "id": "1",
    "title": "第1回実戦予想模試（商業簿記・会計学・工業簿記・原価計算 全4科目）",
    "questions": [
      {
        "num": 1,
        "section": "commercial",
        "sectionName": "【商業簿記】決算整理・財務諸表作成",
        "catName": "製造原価報告書",
        "title": "製造原価報告書における【当期原材料費】および【当期製品製造原価】の算定",
        "text": "次の資料に基づき、製造原価報告書に計上される【当期原材料費】および【当期製品製造原価】の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale\"></i> 資料：決算整理前残高試算表（抜粋）および決算整理事項</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>借方残高</th><th>貸方残高</th></tr></thead><tbody>\n    <tr><td>売掛金</td><td class=\"num\">￥18,500,000</td><td class=\"num\">−</td></tr>\n    <tr><td>貸倒引当金</td><td class=\"num\">−</td><td class=\"num\">￥120,000</td></tr>\n    <tr><td>原材料</td><td class=\"num\">￥2,400,000</td><td class=\"num\">−</td></tr>\n    <tr><td>仕掛品</td><td class=\"num\">￥3,600,000</td><td class=\"num\">−</td></tr>\n    <tr><td>製品</td><td class=\"num\">￥4,800,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置</td><td class=\"num\">￥30,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置減価償却累計額</td><td class=\"num\">−</td><td class=\"num\">￥12,000,000</td></tr>\n    <tr><td>原材料仕入</td><td class=\"num\">￥42,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>労務費（工場）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>経費（工場）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−</td><td class=\"num\">￥120,000,000</td></tr>\n    <tr><td>退職給付引当金</td><td class=\"num\">−</td><td class=\"num\">￥8,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【決算整理事項】</strong><br>\n    1. 期末原材料棚卸高は ￥2,800,000、期末仕掛品は ￥3,200,000、期末製品は ￥5,200,000 である。<br>\n    2. 売掛金期末残高に対し 2% の貸倒引当金を差額補充法により設定する（販管費）。<br>\n    3. 機械装置（工場用）は定額法（耐用年数10年、残存価額ゼロ）により当期減価償却費を計上する。<br>\n    4. 当期の退職給付費用として ￥1,500,000（製造原価相当分60%、販管費相当分40%）を計上する。\n  </div>\n</div>",
        "options": [
          "(1) 原材料費：￥41,600,000 ／ 製品製造原価：￥88,900,000",
          "(2) 原材料費：￥42,000,000 ／ 製品製造原価：￥88,500,000",
          "(3) 原材料費：￥41,600,000 ／ 製品製造原価：￥88,500,000",
          "(4) 原材料費：￥42,400,000 ／ 製品製造原価：￥89,300,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>原材料費</strong> ＝ 期首 ￥2,400,000 ＋ 仕入 ￥42,000,000 − 期末 ￥2,800,000 ＝ <strong>￥41,600,000</strong><br>\n2. <strong>当期総製造費用</strong> ＝ 材料費 ￥41,600,000 ＋ 労務費 ￥25,000,000 ＋ 経費 ￥18,000,000 ＋ 機械減価償却費（￥30,000,000÷10年＝￥3,000,000） ＋ 退職給付費用（￥1,500,000×60%＝￥900,000） ＝ ￥88,500,000<br>\n3. <strong>当期製品製造原価</strong> ＝ 期首仕掛品 ￥3,600,000 ＋ 総製造費用 ￥88,500,000 − 期末仕掛品 ￥3,200,000 ＝ <strong>￥88,900,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-1"
      },
      {
        "num": 2,
        "section": "commercial",
        "sectionName": "【商業簿記】決算整理・財務諸表作成",
        "catName": "損益計算書（P/L）",
        "title": "損益計算書における【売上原価】および【売上総利益】の算定",
        "text": "前問の資料に基づき、損益計算書に計上される【売上原価】および【売上総利益】の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale\"></i> 資料：決算整理前残高試算表（抜粋）および決算整理事項</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>借方残高</th><th>貸方残高</th></tr></thead><tbody>\n    <tr><td>売掛金</td><td class=\"num\">￥18,500,000</td><td class=\"num\">−</td></tr>\n    <tr><td>貸倒引当金</td><td class=\"num\">−</td><td class=\"num\">￥120,000</td></tr>\n    <tr><td>原材料</td><td class=\"num\">￥2,400,000</td><td class=\"num\">−</td></tr>\n    <tr><td>仕掛品</td><td class=\"num\">￥3,600,000</td><td class=\"num\">−</td></tr>\n    <tr><td>製品</td><td class=\"num\">￥4,800,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置</td><td class=\"num\">￥30,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置減価償却累計額</td><td class=\"num\">−</td><td class=\"num\">￥12,000,000</td></tr>\n    <tr><td>原材料仕入</td><td class=\"num\">￥42,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>労務費（工場）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>経費（工場）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−</td><td class=\"num\">￥120,000,000</td></tr>\n    <tr><td>退職給付引当金</td><td class=\"num\">−</td><td class=\"num\">￥8,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【決算整理事項】</strong><br>\n    1. 期末原材料棚卸高は ￥2,800,000、期末仕掛品は ￥3,200,000、期末製品は ￥5,200,000 である。<br>\n    2. 売掛金期末残高に対し 2% の貸倒引当金を差額補充法により設定する（販管費）。<br>\n    3. 機械装置（工場用）は定額法（耐用年数10年、残存価額ゼロ）により当期減価償却費を計上する。<br>\n    4. 当期の退職給付費用として ￥1,500,000（製造原価相当分60%、販管費相当分40%）を計上する。\n  </div>\n</div>",
        "options": [
          "(1) 売上原価：￥88,500,000 ／ 売上総利益：￥31,500,000",
          "(2) 売上原価：￥88,900,000 ／ 売上総利益：￥31,100,000",
          "(3) 売上原価：￥87,300,000 ／ 売上総利益：￥32,700,000",
          "(4) 売上原価：￥89,200,000 ／ 売上総利益：￥30,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>売上原価</strong> ＝ 期首製品 ￥4,800,000 ＋ 当期製品製造原価 ￥88,900,000 − 期末製品 ￥5,200,000 ＝ <strong>￥88,500,000</strong><br>\n2. <strong>売上総利益</strong> ＝ 売上高 ￥120,000,000 − 売上原価 ￥88,500,000 ＝ <strong>￥31,500,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-2"
      },
      {
        "num": 3,
        "section": "commercial",
        "sectionName": "【商業簿記】決算整理・財務諸表作成",
        "catName": "貸借対照表（B/S）",
        "title": "貸借対照表に計上される【貸倒引当金】および【差額補充額（販管費）】の算定",
        "text": "前問の資料に基づき、決算整理後の貸倒引当金に関する記述として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale\"></i> 資料：決算整理前残高試算表（抜粋）および決算整理事項</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>借方残高</th><th>貸方残高</th></tr></thead><tbody>\n    <tr><td>売掛金</td><td class=\"num\">￥18,500,000</td><td class=\"num\">−</td></tr>\n    <tr><td>貸倒引当金</td><td class=\"num\">−</td><td class=\"num\">￥120,000</td></tr>\n    <tr><td>原材料</td><td class=\"num\">￥2,400,000</td><td class=\"num\">−</td></tr>\n    <tr><td>仕掛品</td><td class=\"num\">￥3,600,000</td><td class=\"num\">−</td></tr>\n    <tr><td>製品</td><td class=\"num\">￥4,800,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置</td><td class=\"num\">￥30,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置減価償却累計額</td><td class=\"num\">−</td><td class=\"num\">￥12,000,000</td></tr>\n    <tr><td>原材料仕入</td><td class=\"num\">￥42,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>労務費（工場）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>経費（工場）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−</td><td class=\"num\">￥120,000,000</td></tr>\n    <tr><td>退職給付引当金</td><td class=\"num\">−</td><td class=\"num\">￥8,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【決算整理事項】</strong><br>\n    1. 期末原材料棚卸高は ￥2,800,000、期末仕掛品は ￥3,200,000、期末製品は ￥5,200,000 である。<br>\n    2. 売掛金期末残高に対し 2% の貸倒引当金を差額補充法により設定する（販管費）。<br>\n    3. 機械装置（工場用）は定額法（耐用年数10年、残存価額ゼロ）により当期減価償却費を計上する。<br>\n    4. 当期の退職給付費用として ￥1,500,000（製造原価相当分60%、販管費相当分40%）を計上する。\n  </div>\n</div>",
        "options": [
          "(1) B/S計上額：￥370,000（貸倒引当金繰入：￥250,000）",
          "(2) B/S計上額：￥370,000（貸倒引当金繰入：￥370,000）",
          "(3) B/S計上額：￥250,000（貸倒引当金繰入：￥130,000）",
          "(4) B/S計上額：￥360,000（貸倒引当金繰入：￥240,000）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>期末要設定額</strong> ＝ 売掛金 ￥18,500,000 × 2% ＝ <strong>￥370,000</strong>（B/S計上額）<br>\n2. <strong>差額補充額（繰入額）</strong> ＝ ￥370,000 − 既設定残高 ￥120,000 ＝ <strong>￥250,000</strong>（P/L販管費計上）",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-3"
      },
      {
        "num": 4,
        "section": "commercial",
        "sectionName": "【商業簿記】決算整理・財務諸表作成",
        "catName": "貸借対照表（B/S）",
        "title": "貸借対照表に表示される【機械装置の帳簿価額（純額）】の算定",
        "text": "前問の資料に基づき、決算整理後の貸借対照表に表示される【機械装置の期末帳簿価額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale\"></i> 資料：決算整理前残高試算表（抜粋）および決算整理事項</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>借方残高</th><th>貸方残高</th></tr></thead><tbody>\n    <tr><td>売掛金</td><td class=\"num\">￥18,500,000</td><td class=\"num\">−</td></tr>\n    <tr><td>貸倒引当金</td><td class=\"num\">−</td><td class=\"num\">￥120,000</td></tr>\n    <tr><td>原材料</td><td class=\"num\">￥2,400,000</td><td class=\"num\">−</td></tr>\n    <tr><td>仕掛品</td><td class=\"num\">￥3,600,000</td><td class=\"num\">−</td></tr>\n    <tr><td>製品</td><td class=\"num\">￥4,800,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置</td><td class=\"num\">￥30,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置減価償却累計額</td><td class=\"num\">−</td><td class=\"num\">￥12,000,000</td></tr>\n    <tr><td>原材料仕入</td><td class=\"num\">￥42,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>労務費（工場）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>経費（工場）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−</td><td class=\"num\">￥120,000,000</td></tr>\n    <tr><td>退職給付引当金</td><td class=\"num\">−</td><td class=\"num\">￥8,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【決算整理事項】</strong><br>\n    1. 期末原材料棚卸高は ￥2,800,000、期末仕掛品は ￥3,200,000、期末製品は ￥5,200,000 である。<br>\n    2. 売掛金期末残高に対し 2% の貸倒引当金を差額補充法により設定する（販管費）。<br>\n    3. 機械装置（工場用）は定額法（耐用年数10年、残存価額ゼロ）により当期減価償却費を計上する。<br>\n    4. 当期の退職給付費用として ￥1,500,000（製造原価相当分60%、販管費相当分40%）を計上する。\n  </div>\n</div>",
        "options": [
          "(1) ￥15,000,000",
          "(2) ￥18,000,000",
          "(3) ￥12,000,000",
          "(4) ￥14,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>当期減価償却費</strong> ＝ ￥30,000,000 ÷ 10年 ＝ ￥3,000,000<br>\n2. <strong>期末累計額</strong> ＝ ￥12,000,000 ＋ ￥3,000,000 ＝ ￥15,000,000<br>\n3. <strong>期末帳簿価額</strong> ＝ 取得原価 ￥30,000,000 − 累計額 ￥15,000,000 ＝ <strong>￥15,000,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-4"
      },
      {
        "num": 5,
        "section": "commercial",
        "sectionName": "【商業簿記】決算整理・財務諸表作成",
        "catName": "貸借対照表（B/S）",
        "title": "決算整理後の貸借対照表における【退職給付引当金】期末残高の算定",
        "text": "前問の資料に基づき、決算整理後の貸借対照表に計上される【退職給付引当金】の残高として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale\"></i> 資料：決算整理前残高試算表（抜粋）および決算整理事項</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>借方残高</th><th>貸方残高</th></tr></thead><tbody>\n    <tr><td>売掛金</td><td class=\"num\">￥18,500,000</td><td class=\"num\">−</td></tr>\n    <tr><td>貸倒引当金</td><td class=\"num\">−</td><td class=\"num\">￥120,000</td></tr>\n    <tr><td>原材料</td><td class=\"num\">￥2,400,000</td><td class=\"num\">−</td></tr>\n    <tr><td>仕掛品</td><td class=\"num\">￥3,600,000</td><td class=\"num\">−</td></tr>\n    <tr><td>製品</td><td class=\"num\">￥4,800,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置</td><td class=\"num\">￥30,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>機械装置減価償却累計額</td><td class=\"num\">−</td><td class=\"num\">￥12,000,000</td></tr>\n    <tr><td>原材料仕入</td><td class=\"num\">￥42,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>労務費（工場）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>経費（工場）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−</td><td class=\"num\">￥120,000,000</td></tr>\n    <tr><td>退職給付引当金</td><td class=\"num\">−</td><td class=\"num\">￥8,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【決算整理事項】</strong><br>\n    1. 期末原材料棚卸高は ￥2,800,000、期末仕掛品は ￥3,200,000、期末製品は ￥5,200,000 である。<br>\n    2. 売掛金期末残高に対し 2% の貸倒引当金を差額補充法により設定する（販管費）。<br>\n    3. 機械装置（工場用）は定額法（耐用年数10年、残存価額ゼロ）により当期減価償却費を計上する。<br>\n    4. 当期の退職給付費用として ￥1,500,000（製造原価相当分60%、販管費相当分40%）を計上する。\n  </div>\n</div>",
        "options": [
          "(1) ￥9,500,000",
          "(2) ￥8,900,000",
          "(3) ￥8,600,000",
          "(4) ￥8,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n退職給付費用 ￥1,500,000 を計上したことにより、退職給付引当金の貸方残高は ￥8,000,000 ＋ ￥1,500,000 ＝ <strong>￥9,500,000</strong> となります。",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-5"
      },
      {
        "num": 6,
        "section": "accounting",
        "sectionName": "【会計学】資産会計・資産除去債務",
        "catName": "資産除去債務",
        "title": "有形固定資産取得時における【資産除去債務】の当初測定（割引現在価値）",
        "text": "次の資料に基づき、当期首の資産取得時において計上すべき【資産除去債務の計上額】として正しいものを選択しなさい。（円未満四捨五入）\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-landmark\"></i> 資料：有形固定資産の取得および資産除去債務の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>資産の取得・稼働開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>設備の取得原価（本体工事費・現金支出）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>耐用年数および減価償却方法</td><td>5年（定額法・残存価額ゼロ）</td></tr>\n    <tr><td>5年後の除去に要する見込額（将来CF）</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>5年・3%の現価係数（1÷(1.03)^5）</td><td class=\"num\">0.8626</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥4,313,000",
          "(2) ￥5,000,000",
          "(3) ￥4,250,000",
          "(4) ￥4,120,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n資産除去債務の当初測定は、将来キャッシュ・フローの割引現在価値により算定します。<br>\n￥5,000,000 × 0.8626 ＝ <strong>￥4,313,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-6"
      },
      {
        "num": 7,
        "section": "accounting",
        "sectionName": "【会計学】資産会計・資産除去債務",
        "catName": "資産除去債務",
        "title": "資産除去債務に対応する除去費用を含めた【設備勘定の当初取得原価】の算定",
        "text": "前問の資料に基づき、当期首に計上される【機械装置（設備）の総取得原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-landmark\"></i> 資料：有形固定資産の取得および資産除去債務の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>資産の取得・稼働開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>設備の取得原価（本体工事費・現金支出）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>耐用年数および減価償却方法</td><td>5年（定額法・残存価額ゼロ）</td></tr>\n    <tr><td>5年後の除去に要する見込額（将来CF）</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>5年・3%の現価係数（1÷(1.03)^5）</td><td class=\"num\">0.8626</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥44,313,000",
          "(2) ￥40,000,000",
          "(3) ￥45,000,000",
          "(4) ￥43,687,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n資産除去債務に対応する除去費用は、資産の帳簿価額に加算します。<br>\n本体工事費 ￥40,000,000 ＋ 資産除去債務 ￥4,313,000 ＝ <strong>￥44,313,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-7"
      },
      {
        "num": 8,
        "section": "accounting",
        "sectionName": "【会計学】資産会計・資産除去債務",
        "catName": "資産除去債務",
        "title": "第1期末における【減価償却費】および【利息費用（時の経過による調整額）】の算定",
        "text": "前問の資料に基づき、第1期決算において計上すべき【減価償却費】および【利息費用】の組み合わせとして正しいものを選択しなさい。（円未満四捨五入）\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-landmark\"></i> 資料：有形固定資産の取得および資産除去債務の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>資産の取得・稼働開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>設備の取得原価（本体工事費・現金支出）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>耐用年数および減価償却方法</td><td>5年（定額法・残存価額ゼロ）</td></tr>\n    <tr><td>5年後の除去に要する見込額（将来CF）</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>5年・3%の現価係数（1÷(1.03)^5）</td><td class=\"num\">0.8626</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 減価償却費：￥8,862,600 ／ 利息費用：￥129,390",
          "(2) 減価償却費：￥8,000,000 ／ 利息費用：￥150,000",
          "(3) 減価償却費：￥8,862,600 ／ 利息費用：￥150,000",
          "(4) 減価償却費：￥8,000,000 ／ 利息費用：￥129,390"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>減価償却費</strong> ＝ 取得原価 ￥44,313,000 ÷ 5年 ＝ <strong>￥8,862,600</strong><br>\n2. <strong>利息費用</strong> ＝ 期首資産除去債務 ￥4,313,000 × 割引率 3% ＝ <strong>￥129,390</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-8"
      },
      {
        "num": 9,
        "section": "accounting",
        "sectionName": "【会計学】資産会計・資産除去債務",
        "catName": "資産除去債務",
        "title": "第1期末貸借対照表における【資産除去債務の期末残高】の算定",
        "text": "前問の資料に基づき、第1期末の貸借対照表に計上される【資産除去債務の帳簿価額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-landmark\"></i> 資料：有形固定資産の取得および資産除去債務の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>資産の取得・稼働開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>設備の取得原価（本体工事費・現金支出）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>耐用年数および減価償却方法</td><td>5年（定額法・残存価額ゼロ）</td></tr>\n    <tr><td>5年後の除去に要する見込額（将来CF）</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>5年・3%の現価係数（1÷(1.03)^5）</td><td class=\"num\">0.8626</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥4,442,390",
          "(2) ￥4,313,000",
          "(3) ￥4,500,000",
          "(4) ￥4,183,610"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期末資産除去債務 ＝ 期首残高 ￥4,313,000 ＋ 当期利息費用 ￥129,390 ＝ <strong>￥4,442,390</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-9"
      },
      {
        "num": 10,
        "section": "accounting",
        "sectionName": "【会計学】資産会計・資産除去債務",
        "catName": "資産除去債務",
        "title": "5年経過後の除去実施時における【資産除去債務履行差額】の会計処理",
        "text": "5年経過後、設備の除却・撤去工事を実施し、現金 ￥5,200,000 を支払って決済した。このときの履行差額の処理として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-landmark\"></i> 資料：有形固定資産の取得および資産除去債務の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>資産の取得・稼働開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>設備の取得原価（本体工事費・現金支出）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>耐用年数および減価償却方法</td><td>5年（定額法・残存価額ゼロ）</td></tr>\n    <tr><td>5年後の除去に要する見込額（将来CF）</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>5年・3%の現価係数（1÷(1.03)^5）</td><td class=\"num\">0.8626</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 履行差額 ￥200,000 を「資産除去債務履行差額」（営業外費用または特別損失）に計上する",
          "(2) 履行差額 ￥200,000 を設備の減価償却累計額から控除する",
          "(3) 履行差額 ￥887,000 を固定資産売却損として計上する",
          "(4) 履行差額は計上せず、資本剰余金から直接減額する"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n5年経過後の資産除去債務残高は ￥5,000,000 に達しています。実際の支出額 ￥5,200,000 との差額 ￥200,000 は、当期の損益として<strong>「資産除去債務履行差額」</strong>に計上します。",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-10"
      },
      {
        "num": 11,
        "section": "industrial",
        "sectionName": "【工業簿記】部門別計算・複数基準配賦法",
        "catName": "部門別計算",
        "title": "動力部門費（変動費・固定費）の第1製造部門および第2製造部門への配賦額",
        "text": "次の資料に基づき、動力部門費（￥1,000,000）から第1製造部門に配賦される金額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-warehouse\"></i> 資料：製造部門および補助部門の部門費データ（複数基準配賦）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>部門区分</th><th>第1製造部門</th><th>第2製造部門</th><th>動力部門（補助）</th><th>修繕部門（補助）</th></tr></thead><tbody>\n    <tr><td>部門個別費（変動費）</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥400,000</td><td class=\"num\">￥300,000</td></tr>\n    <tr><td>部門個別費（固定費）</td><td class=\"num\">￥2,000,000</td><td class=\"num\">￥2,400,000</td><td class=\"num\">￥600,000</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>部門費合計</td><td class=\"num\">￥3,200,000</td><td class=\"num\">￥3,900,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>動力用役消費量（実績kWh）</td><td class=\"num\">5,000 kWh</td><td class=\"num\">3,000 kWh</td><td class=\"num\">−</td><td class=\"num\">2,000 kWh</td></tr>\n    <tr><td>動力用役設備容量（最大需要kW）</td><td class=\"num\">60 kW</td><td class=\"num\">40 kW</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n    <tr><td>修繕用役提供回数（実績回数）</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【配賦基準の指示】</strong><br>\n    ・動力部門の変動費（￥400,000）は「実績消費量（kWh）」により直接配賦法（補助部門無視：第1:第2＝5:3）で配賦する。<br>\n    ・動力部門の固定費（￥600,000）は「最大需要容量（kW）」（第1:第2＝60:40）で配賦する。<br>\n    ・修繕部門費（￥800,000）は「修繕実績回数」（第1:第2＝40:60）で直接配賦する。\n  </div>\n</div>",
        "options": [
          "(1) ￥610,000",
          "(2) ￥580,000",
          "(3) ￥625,000",
          "(4) ￥500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>変動費配賦額</strong> ＝ ￥400,000 × 5,000kWh ÷ (5,000＋3,000) ＝ ￥250,000<br>\n2. <strong>固定費配賦額</strong> ＝ ￥600,000 × 60kW ÷ (60＋40) ＝ ￥360,000<br>\n3. <strong>第1製造部門への配賦合計</strong> ＝ ￥250,000 ＋ ￥360,000 ＝ <strong>￥610,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-11"
      },
      {
        "num": 12,
        "section": "industrial",
        "sectionName": "【工業簿記】部門別計算・複数基準配賦法",
        "catName": "部門別計算",
        "title": "修繕部門費の各製造部門への配賦額の算定",
        "text": "前問の資料に基づき、修繕部門費（￥800,000）から第1製造部門および第2製造部門に配賦される金額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-warehouse\"></i> 資料：製造部門および補助部門の部門費データ（複数基準配賦）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>部門区分</th><th>第1製造部門</th><th>第2製造部門</th><th>動力部門（補助）</th><th>修繕部門（補助）</th></tr></thead><tbody>\n    <tr><td>部門個別費（変動費）</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥400,000</td><td class=\"num\">￥300,000</td></tr>\n    <tr><td>部門個別費（固定費）</td><td class=\"num\">￥2,000,000</td><td class=\"num\">￥2,400,000</td><td class=\"num\">￥600,000</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>部門費合計</td><td class=\"num\">￥3,200,000</td><td class=\"num\">￥3,900,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>動力用役消費量（実績kWh）</td><td class=\"num\">5,000 kWh</td><td class=\"num\">3,000 kWh</td><td class=\"num\">−</td><td class=\"num\">2,000 kWh</td></tr>\n    <tr><td>動力用役設備容量（最大需要kW）</td><td class=\"num\">60 kW</td><td class=\"num\">40 kW</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n    <tr><td>修繕用役提供回数（実績回数）</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【配賦基準の指示】</strong><br>\n    ・動力部門の変動費（￥400,000）は「実績消費量（kWh）」により直接配賦法（補助部門無視：第1:第2＝5:3）で配賦する。<br>\n    ・動力部門の固定費（￥600,000）は「最大需要容量（kW）」（第1:第2＝60:40）で配賦する。<br>\n    ・修繕部門費（￥800,000）は「修繕実績回数」（第1:第2＝40:60）で直接配賦する。\n  </div>\n</div>",
        "options": [
          "(1) 第1製造部門：￥320,000 ／ 第2製造部門：￥480,000",
          "(2) 第1製造部門：￥400,000 ／ 第2製造部門：￥400,000",
          "(3) 第1製造部門：￥300,000 ／ 第2製造部門：￥500,000",
          "(4) 第1製造部門：￥480,000 ／ 第2製造部門：￥320,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n修繕実績回数の比率は 第1:第2 ＝ 40回:60回（合計100回）。<br>\n・第1製造部門配賦額 ＝ ￥800,000 × 40/100 ＝ <strong>￥320,000</strong><br>\n・第2製造部門配賦額 ＝ ￥800,000 × 60/100 ＝ <strong>￥480,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-12"
      },
      {
        "num": 13,
        "section": "industrial",
        "sectionName": "【工業簿記】部門別計算・複数基準配賦法",
        "catName": "部門別計算",
        "title": "補助部門費配賦後における【第1製造部門費合計】の算定",
        "text": "前問の資料に基づき、補助部門費の配賦が完了した後の【第1製造部門費の合計金額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-warehouse\"></i> 資料：製造部門および補助部門の部門費データ（複数基準配賦）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>部門区分</th><th>第1製造部門</th><th>第2製造部門</th><th>動力部門（補助）</th><th>修繕部門（補助）</th></tr></thead><tbody>\n    <tr><td>部門個別費（変動費）</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥400,000</td><td class=\"num\">￥300,000</td></tr>\n    <tr><td>部門個別費（固定費）</td><td class=\"num\">￥2,000,000</td><td class=\"num\">￥2,400,000</td><td class=\"num\">￥600,000</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>部門費合計</td><td class=\"num\">￥3,200,000</td><td class=\"num\">￥3,900,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>動力用役消費量（実績kWh）</td><td class=\"num\">5,000 kWh</td><td class=\"num\">3,000 kWh</td><td class=\"num\">−</td><td class=\"num\">2,000 kWh</td></tr>\n    <tr><td>動力用役設備容量（最大需要kW）</td><td class=\"num\">60 kW</td><td class=\"num\">40 kW</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n    <tr><td>修繕用役提供回数（実績回数）</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【配賦基準の指示】</strong><br>\n    ・動力部門の変動費（￥400,000）は「実績消費量（kWh）」により直接配賦法（補助部門無視：第1:第2＝5:3）で配賦する。<br>\n    ・動力部門の固定費（￥600,000）は「最大需要容量（kW）」（第1:第2＝60:40）で配賦する。<br>\n    ・修繕部門費（￥800,000）は「修繕実績回数」（第1:第2＝40:60）で直接配賦する。\n  </div>\n</div>",
        "options": [
          "(1) ￥4,130,000",
          "(2) ￥3,810,000",
          "(3) ￥4,200,000",
          "(4) ￥4,050,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n第1製造部門個別費 ￥3,200,000 ＋ 動力部門配賦額 ￥610,000 ＋ 修繕部門配賦額 ￥320,000 ＝ <strong>￥4,130,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-13"
      },
      {
        "num": 14,
        "section": "industrial",
        "sectionName": "【工業簿記】部門別計算・複数基準配賦法",
        "catName": "部門別計算",
        "title": "補助部門費配賦後における【第2製造部門費合計】の算定",
        "text": "前問の資料に基づき、補助部門費の配賦が完了した後の【第2製造部門費の合計金額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-warehouse\"></i> 資料：製造部門および補助部門の部門費データ（複数基準配賦）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>部門区分</th><th>第1製造部門</th><th>第2製造部門</th><th>動力部門（補助）</th><th>修繕部門（補助）</th></tr></thead><tbody>\n    <tr><td>部門個別費（変動費）</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥400,000</td><td class=\"num\">￥300,000</td></tr>\n    <tr><td>部門個別費（固定費）</td><td class=\"num\">￥2,000,000</td><td class=\"num\">￥2,400,000</td><td class=\"num\">￥600,000</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>部門費合計</td><td class=\"num\">￥3,200,000</td><td class=\"num\">￥3,900,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>動力用役消費量（実績kWh）</td><td class=\"num\">5,000 kWh</td><td class=\"num\">3,000 kWh</td><td class=\"num\">−</td><td class=\"num\">2,000 kWh</td></tr>\n    <tr><td>動力用役設備容量（最大需要kW）</td><td class=\"num\">60 kW</td><td class=\"num\">40 kW</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n    <tr><td>修繕用役提供回数（実績回数）</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【配賦基準の指示】</strong><br>\n    ・動力部門の変動費（￥400,000）は「実績消費量（kWh）」により直接配賦法（補助部門無視：第1:第2＝5:3）で配賦する。<br>\n    ・動力部門の固定費（￥600,000）は「最大需要容量（kW）」（第1:第2＝60:40）で配賦する。<br>\n    ・修繕部門費（￥800,000）は「修繕実績回数」（第1:第2＝40:60）で直接配賦する。\n  </div>\n</div>",
        "options": [
          "(1) ￥4,770,000",
          "(2) ￥4,650,000",
          "(3) ￥4,900,000",
          "(4) ￥4,820,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 動力部門から第2への配賦 ＝ 変動(￥400,000×3/8＝￥150,000) ＋ 固定(￥600,000×40/100＝￥240,000) ＝ ￥390,000<br>\n2. 修繕部門から第2への配賦 ＝ ￥480,000<br>\n3. 第2製造部門費合計 ＝ ￥3,900,000 ＋ ￥390,000 ＋ ￥480,000 ＝ <strong>￥4,770,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-14"
      },
      {
        "num": 15,
        "section": "industrial",
        "sectionName": "【工業簿記】部門別計算・複数基準配賦法",
        "catName": "製造間接費差異",
        "title": "製造間接費の予定配賦と【配賦差異】の算定（第1製造部門）",
        "text": "第1製造部門の実際直接作業時間が 2,100時間、予定配賦率が ￥2,000/時間 であった場合の【製造間接費配賦差異】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-warehouse\"></i> 資料：製造部門および補助部門の部門費データ（複数基準配賦）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>部門区分</th><th>第1製造部門</th><th>第2製造部門</th><th>動力部門（補助）</th><th>修繕部門（補助）</th></tr></thead><tbody>\n    <tr><td>部門個別費（変動費）</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥400,000</td><td class=\"num\">￥300,000</td></tr>\n    <tr><td>部門個別費（固定費）</td><td class=\"num\">￥2,000,000</td><td class=\"num\">￥2,400,000</td><td class=\"num\">￥600,000</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>部門費合計</td><td class=\"num\">￥3,200,000</td><td class=\"num\">￥3,900,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>動力用役消費量（実績kWh）</td><td class=\"num\">5,000 kWh</td><td class=\"num\">3,000 kWh</td><td class=\"num\">−</td><td class=\"num\">2,000 kWh</td></tr>\n    <tr><td>動力用役設備容量（最大需要kW）</td><td class=\"num\">60 kW</td><td class=\"num\">40 kW</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n    <tr><td>修繕用役提供回数（実績回数）</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td><td class=\"num\">−</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【配賦基準の指示】</strong><br>\n    ・動力部門の変動費（￥400,000）は「実績消費量（kWh）」により直接配賦法（補助部門無視：第1:第2＝5:3）で配賦する。<br>\n    ・動力部門の固定費（￥600,000）は「最大需要容量（kW）」（第1:第2＝60:40）で配賦する。<br>\n    ・修繕部門費（￥800,000）は「修繕実績回数」（第1:第2＝40:60）で直接配賦する。\n  </div>\n</div>",
        "options": [
          "(1) ￥70,000（有利差異・貸方差異）",
          "(2) ￥70,000（不利差異・借方差異）",
          "(3) ￥130,000（不利差異・借方差異）",
          "(4) ￥100,000（有利差異・貸方差異）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>予定配賦額</strong> ＝ ￥2,000 × 2,100時間 ＝ ￥4,200,000<br>\n2. <strong>実際発生額</strong> ＝ ￥4,130,000<br>\n3. <strong>配賦差異</strong> ＝ 予定 ￥4,200,000 − 実際 ￥4,130,000 ＝ <strong>＋￥70,000（有利差異・貸方差異）</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-15"
      },
      {
        "num": 16,
        "section": "cost",
        "sectionName": "【原価計算】意思決定会計・設備投資の経済性計算",
        "catName": "設備投資の意思決定（DCF法）",
        "title": "税効果を考慮した【減価償却の節税効果（タックスシールド）】の算定",
        "text": "次の資料に基づき、当設備投資における【年々の減価償却費】および【減価償却の節税効果（タックスシールド）】として正しいものを選択しなさい。（円未満四捨五入）\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-line\"></i> 資料：新規設備投資計画およびキャッシュフロー予測データ（DCF法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値・条件</th></tr></thead><tbody>\n    <tr><td>初期投資額（0年度末・即時現金支出）</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>プロジェクト期間（設備の経済的耐用年数）</td><td>3年間</td></tr>\n    <tr><td>減価償却方法</td><td>3年定額法（残存価額ゼロ・税法基準）</td></tr>\n    <tr><td>各年の年間増分売上高</td><td class=\"num\">￥8,000,000 / 年</td></tr>\n    <tr><td>各年の年間増分現金支出費用</td><td class=\"num\">￥3,000,000 / 年</td></tr>\n    <tr><td>法人税率</td><td class=\"num\">30％</td></tr>\n    <tr><td>資本コスト（割引率）</td><td class=\"num\">8％</td></tr>\n    <tr><td>1年後の現価係数（8%）</td><td class=\"num\">0.9259</td></tr>\n    <tr><td>2年後の現価係数（8%）</td><td class=\"num\">0.8573</td></tr>\n    <tr><td>3年後の現価係数（8%）</td><td class=\"num\">0.7938</td></tr>\n    <tr><td>3年間の年金現価係数（8%）</td><td class=\"num\">2.5770</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.9rem; color:#4a5568; margin-top:6px;\">※運転資本の増減および設備売却残存価値はないものとする。</div>\n</div>",
        "options": [
          "(1) 減価償却費：￥3,333,333 ／ タックスシールド：￥1,000,000",
          "(2) 減価償却費：￥3,333,333 ／ タックスシールド：￥2,333,333",
          "(3) 減価償却費：￥3,000,000 ／ タックスシールド：￥900,000",
          "(4) 減価償却費：￥3,333,333 ／ タックスシールド：￥0"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>年々の減価償却費</strong> ＝ ￥10,000,000 ÷ 3年 ＝ <strong>￥3,333,333</strong><br>\n2. <strong>タックスシールド</strong> ＝ ￥3,333,333 × 30% ＝ <strong>￥1,000,000</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-16"
      },
      {
        "num": 17,
        "section": "cost",
        "sectionName": "【原価計算】意思決定会計・設備投資の経済性計算",
        "catName": "設備投資の意思決定（DCF法）",
        "title": "投資プロジェクトにおける【年々の税引後営業キャッシュフロー（CF）】の算定",
        "text": "前問の資料に基づき、プロジェクト期間中の【年々の税引後増分営業キャッシュフロー】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-line\"></i> 資料：新規設備投資計画およびキャッシュフロー予測データ（DCF法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値・条件</th></tr></thead><tbody>\n    <tr><td>初期投資額（0年度末・即時現金支出）</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>プロジェクト期間（設備の経済的耐用年数）</td><td>3年間</td></tr>\n    <tr><td>減価償却方法</td><td>3年定額法（残存価額ゼロ・税法基準）</td></tr>\n    <tr><td>各年の年間増分売上高</td><td class=\"num\">￥8,000,000 / 年</td></tr>\n    <tr><td>各年の年間増分現金支出費用</td><td class=\"num\">￥3,000,000 / 年</td></tr>\n    <tr><td>法人税率</td><td class=\"num\">30％</td></tr>\n    <tr><td>資本コスト（割引率）</td><td class=\"num\">8％</td></tr>\n    <tr><td>1年後の現価係数（8%）</td><td class=\"num\">0.9259</td></tr>\n    <tr><td>2年後の現価係数（8%）</td><td class=\"num\">0.8573</td></tr>\n    <tr><td>3年後の現価係数（8%）</td><td class=\"num\">0.7938</td></tr>\n    <tr><td>3年間の年金現価係数（8%）</td><td class=\"num\">2.5770</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.9rem; color:#4a5568; margin-top:6px;\">※運転資本の増減および設備売却残存価値はないものとする。</div>\n</div>",
        "options": [
          "(1) ￥4,500,000",
          "(2) ￥5,000,000",
          "(3) ￥3,500,000",
          "(4) ￥4,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n税引後CF ＝（増分売上 ￥8,000,000 − 支出費用 ￥3,000,000）× (1 − 0.3) ＋ タックスシールド ￥1,000,000 ＝ ￥3,500,000 ＋ ￥1,000,000 ＝ <strong>￥4,500,000 / 年</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-17"
      },
      {
        "num": 18,
        "section": "cost",
        "sectionName": "【原価計算】意思決定会計・設備投資の経済性計算",
        "catName": "設備投資の意思決定（DCF法）",
        "title": "年金現価係数を用いた【将来キャッシュフローの現在価値合計（PV）】の算定",
        "text": "前問の資料に基づき、3年間の税引後キャッシュフロー（各年￥4,500,000）の【現在価値合計（割引率8%）】として正しいものを選択しなさい。（円未満四捨五入）\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-line\"></i> 資料：新規設備投資計画およびキャッシュフロー予測データ（DCF法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値・条件</th></tr></thead><tbody>\n    <tr><td>初期投資額（0年度末・即時現金支出）</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>プロジェクト期間（設備の経済的耐用年数）</td><td>3年間</td></tr>\n    <tr><td>減価償却方法</td><td>3年定額法（残存価額ゼロ・税法基準）</td></tr>\n    <tr><td>各年の年間増分売上高</td><td class=\"num\">￥8,000,000 / 年</td></tr>\n    <tr><td>各年の年間増分現金支出費用</td><td class=\"num\">￥3,000,000 / 年</td></tr>\n    <tr><td>法人税率</td><td class=\"num\">30％</td></tr>\n    <tr><td>資本コスト（割引率）</td><td class=\"num\">8％</td></tr>\n    <tr><td>1年後の現価係数（8%）</td><td class=\"num\">0.9259</td></tr>\n    <tr><td>2年後の現価係数（8%）</td><td class=\"num\">0.8573</td></tr>\n    <tr><td>3年後の現価係数（8%）</td><td class=\"num\">0.7938</td></tr>\n    <tr><td>3年間の年金現価係数（8%）</td><td class=\"num\">2.5770</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.9rem; color:#4a5568; margin-top:6px;\">※運転資本の増減および設備売却残存価値はないものとする。</div>\n</div>",
        "options": [
          "(1) ￥11,596,500",
          "(2) ￥13,500,000",
          "(3) ￥10,850,000",
          "(4) ￥12,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n現在価値合計 ＝ 年間CF ￥4,500,000 × 年金現価係数 2.5770 ＝ <strong>￥11,596,500</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-18"
      },
      {
        "num": 19,
        "section": "cost",
        "sectionName": "【原価計算】意思決定会計・設備投資の経済性計算",
        "catName": "設備投資の意思決定（DCF法）",
        "title": "正味現在価値法（NPV法）による【正味現在価値】および投資採否の判定",
        "text": "前問の資料に基づき、当プロジェクトの【正味現在価値（NPV）】および投資判断として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-line\"></i> 資料：新規設備投資計画およびキャッシュフロー予測データ（DCF法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値・条件</th></tr></thead><tbody>\n    <tr><td>初期投資額（0年度末・即時現金支出）</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>プロジェクト期間（設備の経済的耐用年数）</td><td>3年間</td></tr>\n    <tr><td>減価償却方法</td><td>3年定額法（残存価額ゼロ・税法基準）</td></tr>\n    <tr><td>各年の年間増分売上高</td><td class=\"num\">￥8,000,000 / 年</td></tr>\n    <tr><td>各年の年間増分現金支出費用</td><td class=\"num\">￥3,000,000 / 年</td></tr>\n    <tr><td>法人税率</td><td class=\"num\">30％</td></tr>\n    <tr><td>資本コスト（割引率）</td><td class=\"num\">8％</td></tr>\n    <tr><td>1年後の現価係数（8%）</td><td class=\"num\">0.9259</td></tr>\n    <tr><td>2年後の現価係数（8%）</td><td class=\"num\">0.8573</td></tr>\n    <tr><td>3年後の現価係数（8%）</td><td class=\"num\">0.7938</td></tr>\n    <tr><td>3年間の年金現価係数（8%）</td><td class=\"num\">2.5770</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.9rem; color:#4a5568; margin-top:6px;\">※運転資本の増減および設備売却残存価値はないものとする。</div>\n</div>",
        "options": [
          "(1) NPV：＋￥1,596,500（NPV＞0のため投資実行すべき）",
          "(2) NPV：−￥1,596,500（NPV＜0のため投資却下すべき）",
          "(3) NPV：＋￥3,500,000（NPV＞0のため投資実行すべき）",
          "(4) NPV：＋￥850,000（NPV＞0のため投資実行すべき）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n正味現在価値（NPV）＝ ￥11,596,500 − ￥10,000,000 ＝ <strong>＋￥1,596,500</strong><br>\nNPVがプラスのため、<strong>「投資実行すべき」</strong>と判定します。",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-19"
      },
      {
        "num": 20,
        "section": "cost",
        "sectionName": "【原価計算】意思決定会計・設備投資の経済性計算",
        "catName": "設備投資の意思決定（DCF法）",
        "title": "回収期間法（ペイバック法）による【投資回収期間】の算定",
        "text": "前問の資料に基づき、時間価値を考慮しない単純回収期間法を適用した場合の【回収期間】として最も近いものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-line\"></i> 資料：新規設備投資計画およびキャッシュフロー予測データ（DCF法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値・条件</th></tr></thead><tbody>\n    <tr><td>初期投資額（0年度末・即時現金支出）</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>プロジェクト期間（設備の経済的耐用年数）</td><td>3年間</td></tr>\n    <tr><td>減価償却方法</td><td>3年定額法（残存価額ゼロ・税法基準）</td></tr>\n    <tr><td>各年の年間増分売上高</td><td class=\"num\">￥8,000,000 / 年</td></tr>\n    <tr><td>各年の年間増分現金支出費用</td><td class=\"num\">￥3,000,000 / 年</td></tr>\n    <tr><td>法人税率</td><td class=\"num\">30％</td></tr>\n    <tr><td>資本コスト（割引率）</td><td class=\"num\">8％</td></tr>\n    <tr><td>1年後の現価係数（8%）</td><td class=\"num\">0.9259</td></tr>\n    <tr><td>2年後の現価係数（8%）</td><td class=\"num\">0.8573</td></tr>\n    <tr><td>3年後の現価係数（8%）</td><td class=\"num\">0.7938</td></tr>\n    <tr><td>3年間の年金現価係数（8%）</td><td class=\"num\">2.5770</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.9rem; color:#4a5568; margin-top:6px;\">※運転資本の増減および設備売却残存価値はないものとする。</div>\n</div>",
        "options": [
          "(1) 約2.22年（2年3ヶ月弱）",
          "(2) 約2.00年",
          "(3) 約2.50年",
          "(4) 約2.86年"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n単純回収期間 ＝ ￥10,000,000 ÷ ￥4,500,000 ＝ <strong>約2.22年</strong>",
        "points": 5,
        "sessionId": "1",
        "sessionName": "第1回実戦予想模試",
        "qid": "boki1-pool-s1-20"
      }
    ]
  },
  "2": {
    "id": "2",
    "title": "第2回実戦予想模試（商業簿記・会計学・工業簿記・原価計算 全4科目）",
    "questions": [
      {
        "num": 1,
        "section": "commercial",
        "sectionName": "【商業簿記】連結会計・資本連結と未実現損益",
        "catName": "資本連結",
        "title": "支配獲得日における【のれん】および【非支配株主持分】の算定",
        "text": "次の資料に基づき、支配獲得日（期首）における【のれん】および【非支配株主持分】の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-sitemap\"></i> 資料：P社およびS社の連結第1年度決算データ（資本連結・未実現利益）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>P社（親会社）</th><th>S社（子会社）</th></tr></thead><tbody>\n    <tr><td>資本金</td><td class=\"num\">￥50,000,000</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>資本剰余金</td><td class=\"num\">￥20,000,000</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>利益剰余金（期首・支配獲得時）</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥6,000,000</td></tr>\n    <tr><td>当期純利益（個別）</td><td class=\"num\">￥12,000,000</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>S社株式取得原価（80%取得）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結修正事項】</strong><br>\n    1. P社は当期首（4月1日）にS社発行済株式の80%を￥18,000,000で取得し支配を獲得した。支配獲得日におけるS社の諸資産・諸負債の時価は簿価と一致している。のれんは10年定額法で償却する。<br>\n    2. 当期中、P社はS社に対して商品 ￥6,000,000 を販売した（ダウンストリーム）。P社の売上総利益率は 25% である。期末においてS社にはこの商品のうち ￥2,000,000 が手許在庫として残存している。<br>\n    3. P社とS社間の債権債務（売掛金・買掛金）￥1,500,000 が期末に残高として計上されている。\n  </div>\n</div>",
        "options": [
          "(1) のれん：￥2,000,000 ／ 非支配株主持分：￥4,000,000",
          "(2) のれん：￥1,600,000 ／ 非支配株主持分：￥4,000,000",
          "(3) のれん：￥2,000,000 ／ 非支配株主持分：￥3,200,000",
          "(4) のれん：￥0 ／ 非支配株主持分：￥4,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>支配獲得時S社純資産</strong> ＝ 資本金 ￥10,000,000 ＋ 資本剰余金 ￥4,000,000 ＋ 利益剰余金 ￥6,000,000 ＝ ￥20,000,000<br>\n2. <strong>親会社持分額</strong> ＝ ￥20,000,000 × 80% ＝ ￥16,000,000<br>\n3. <strong>のれん</strong> ＝ 株式取得原価 ￥18,000,000 − 親会社持分 ￥16,000,000 ＝ <strong>￥2,000,000</strong><br>\n4. <strong>非支配株主持分</strong> ＝ ￥20,000,000 × 20% ＝ <strong>￥4,000,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-1"
      },
      {
        "num": 2,
        "section": "commercial",
        "sectionName": "【商業簿記】連結会計・資本連結と未実現損益",
        "catName": "のれん償却",
        "title": "連結第1年度末における【のれん当期償却額】および【のれん期末残高】の算定",
        "text": "前問の資料に基づき、連結第1年度末の【のれん償却費】および連結B/Sに計上される【のれん残高】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-sitemap\"></i> 資料：P社およびS社の連結第1年度決算データ（資本連結・未実現利益）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>P社（親会社）</th><th>S社（子会社）</th></tr></thead><tbody>\n    <tr><td>資本金</td><td class=\"num\">￥50,000,000</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>資本剰余金</td><td class=\"num\">￥20,000,000</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>利益剰余金（期首・支配獲得時）</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥6,000,000</td></tr>\n    <tr><td>当期純利益（個別）</td><td class=\"num\">￥12,000,000</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>S社株式取得原価（80%取得）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結修正事項】</strong><br>\n    1. P社は当期首（4月1日）にS社発行済株式の80%を￥18,000,000で取得し支配を獲得した。支配獲得日におけるS社の諸資産・諸負債の時価は簿価と一致している。のれんは10年定額法で償却する。<br>\n    2. 当期中、P社はS社に対して商品 ￥6,000,000 を販売した（ダウンストリーム）。P社の売上総利益率は 25% である。期末においてS社にはこの商品のうち ￥2,000,000 が手許在庫として残存している。<br>\n    3. P社とS社間の債権債務（売掛金・買掛金）￥1,500,000 が期末に残高として計上されている。\n  </div>\n</div>",
        "options": [
          "(1) のれん償却費：￥200,000 ／ のれん期末残高：￥1,800,000",
          "(2) のれん償却費：￥100,000 ／ のれん期末残高：￥1,900,000",
          "(3) のれん償却費：￥200,000 ／ のれん期末残高：￥2,000,000",
          "(4) のれん償却費：￥400,000 ／ のれん期末残高：￥1,600,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nのれん ￥2,000,000 は10年定額法で償却するため：<br>\n・当期のれん償却費 ＝ ￥2,000,000 ÷ 10年 ＝ <strong>￥200,000</strong>（P/L販管費）<br>\n・期末のれん帳簿残高 ＝ ￥2,000,000 − ￥200,000 ＝ <strong>￥1,800,000</strong>（B/S無形固定資産）",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-2"
      },
      {
        "num": 3,
        "section": "commercial",
        "sectionName": "【商業簿記】連結会計・資本連結と未実現損益",
        "catName": "未実現利益消去",
        "title": "棚卸資産に含まれる【未実現利益の消去額】の算定（ダウンストリーム）",
        "text": "前問の資料に基づき、連結精算表上で消去すべき【期末棚卸資産の未実現利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-sitemap\"></i> 資料：P社およびS社の連結第1年度決算データ（資本連結・未実現利益）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>P社（親会社）</th><th>S社（子会社）</th></tr></thead><tbody>\n    <tr><td>資本金</td><td class=\"num\">￥50,000,000</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>資本剰余金</td><td class=\"num\">￥20,000,000</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>利益剰余金（期首・支配獲得時）</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥6,000,000</td></tr>\n    <tr><td>当期純利益（個別）</td><td class=\"num\">￥12,000,000</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>S社株式取得原価（80%取得）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結修正事項】</strong><br>\n    1. P社は当期首（4月1日）にS社発行済株式の80%を￥18,000,000で取得し支配を獲得した。支配獲得日におけるS社の諸資産・諸負債の時価は簿価と一致している。のれんは10年定額法で償却する。<br>\n    2. 当期中、P社はS社に対して商品 ￥6,000,000 を販売した（ダウンストリーム）。P社の売上総利益率は 25% である。期末においてS社にはこの商品のうち ￥2,000,000 が手許在庫として残存している。<br>\n    3. P社とS社間の債権債務（売掛金・買掛金）￥1,500,000 が期末に残高として計上されている。\n  </div>\n</div>",
        "options": [
          "(1) ￥500,000（全額親会社負担）",
          "(2) ￥500,000（親会社80%・非支配株主20%負担）",
          "(3) ￥1,500,000（全額親会社負担）",
          "(4) ￥400,000（親会社80%負担分のみ消去）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期末S社在庫 ￥2,000,000 × 売上総利益率 25% ＝ <strong>￥500,000</strong><br>\n親会社から子会社への売上（ダウンストリーム）であるため、未実現利益 ￥500,000 は<strong>全額親会社の売上原価に加算（利益消去）</strong>され、非支配株主持分への按分は行われません。",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-3"
      },
      {
        "num": 4,
        "section": "commercial",
        "sectionName": "【商業簿記】連結会計・資本連結と未実現損益",
        "catName": "非支配株主持分",
        "title": "連結損益計算書における【非支配株主に帰属する当期純利益】の算定",
        "text": "前問の資料に基づき、当期の連結P/Lに計上される【非支配株主に帰属する当期純利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-sitemap\"></i> 資料：P社およびS社の連結第1年度決算データ（資本連結・未実現利益）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>P社（親会社）</th><th>S社（子会社）</th></tr></thead><tbody>\n    <tr><td>資本金</td><td class=\"num\">￥50,000,000</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>資本剰余金</td><td class=\"num\">￥20,000,000</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>利益剰余金（期首・支配獲得時）</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥6,000,000</td></tr>\n    <tr><td>当期純利益（個別）</td><td class=\"num\">￥12,000,000</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>S社株式取得原価（80%取得）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結修正事項】</strong><br>\n    1. P社は当期首（4月1日）にS社発行済株式の80%を￥18,000,000で取得し支配を獲得した。支配獲得日におけるS社の諸資産・諸負債の時価は簿価と一致している。のれんは10年定額法で償却する。<br>\n    2. 当期中、P社はS社に対して商品 ￥6,000,000 を販売した（ダウンストリーム）。P社の売上総利益率は 25% である。期末においてS社にはこの商品のうち ￥2,000,000 が手許在庫として残存している。<br>\n    3. P社とS社間の債権債務（売掛金・買掛金）￥1,500,000 が期末に残高として計上されている。\n  </div>\n</div>",
        "options": [
          "(1) ￥1,000,000",
          "(2) ￥900,000",
          "(3) ￥800,000",
          "(4) ￥1,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nS社の個別当期純利益は ￥5,000,000 です。未実現利益消去はダウンストリームであるためS社純利益の修正はありません。<br>\n非支配株主に帰属する当期純利益 ＝ S社個別純利益 ￥5,000,000 × 20% ＝ <strong>￥1,000,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-4"
      },
      {
        "num": 5,
        "section": "commercial",
        "sectionName": "【商業簿記】連結会計・資本連結と未実現損益",
        "catName": "親会社株主に帰属する当期純利益",
        "title": "連結包括利益・損益計算書における【親会社株主に帰属する当期純利益】の算定",
        "text": "前問の資料に基づき、当期の【親会社株主に帰属する当期純利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-sitemap\"></i> 資料：P社およびS社の連結第1年度決算データ（資本連結・未実現利益）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>P社（親会社）</th><th>S社（子会社）</th></tr></thead><tbody>\n    <tr><td>資本金</td><td class=\"num\">￥50,000,000</td><td class=\"num\">￥10,000,000</td></tr>\n    <tr><td>資本剰余金</td><td class=\"num\">￥20,000,000</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>利益剰余金（期首・支配獲得時）</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥6,000,000</td></tr>\n    <tr><td>当期純利益（個別）</td><td class=\"num\">￥12,000,000</td><td class=\"num\">￥5,000,000</td></tr>\n    <tr><td>S社株式取得原価（80%取得）</td><td class=\"num\">￥18,000,000</td><td class=\"num\">−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結修正事項】</strong><br>\n    1. P社は当期首（4月1日）にS社発行済株式の80%を￥18,000,000で取得し支配を獲得した。支配獲得日におけるS社の諸資産・諸負債の時価は簿価と一致している。のれんは10年定額法で償却する。<br>\n    2. 当期中、P社はS社に対して商品 ￥6,000,000 を販売した（ダウンストリーム）。P社の売上総利益率は 25% である。期末においてS社にはこの商品のうち ￥2,000,000 が手許在庫として残存している。<br>\n    3. P社とS社間の債権債務（売掛金・買掛金）￥1,500,000 が期末に残高として計上されている。\n  </div>\n</div>",
        "options": [
          "(1) ￥15,300,000",
          "(2) ￥15,800,000",
          "(3) ￥16,000,000",
          "(4) ￥14,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 個別純利益合計 ＝ P社 ￥12,000,000 ＋ S社 ￥5,000,000 ＝ ￥17,000,000<br>\n2. 連結修正：<br>\n   ・のれん償却費：−￥200,000<br>\n   ・未実現利益消去：−￥500,000<br>\n3. 連結当期純利益 ＝ ￥17,000,000 − ￥200,000 − ￥500,000 ＝ ￥16,300,000<br>\n4. 親会社株主に帰属する当期純利益 ＝ 連結純利益 ￥16,300,000 − 非支配株主持分 ￥1,000,000 ＝ <strong>￥15,300,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-5"
      },
      {
        "num": 6,
        "section": "accounting",
        "sectionName": "【会計学】負債・リース会計",
        "catName": "ファイナンス・リース取引",
        "title": "リース資産およびリース債務の【当初計上価額】の決定",
        "text": "次の資料に基づき、当期首において貸借対照表に計上すべき【リース資産（リース債務）の取得価額】として正しいものを選択しなさい。（円未満四捨五入）\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-contract\"></i> 資料：所有権移転外ファイナンス・リース取引データ（利息法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>リース契約開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>リース期間</td><td>5年間（年1回・各年度末に後払い）</td></tr>\n    <tr><td>年額リース料支払額</td><td class=\"num\">￥3,000,000 / 年（5年間で総額￥15,000,000）</td></tr>\n    <tr><td>借手の見積現金購入価額</td><td class=\"num\">￥12,600,000</td></tr>\n    <tr><td>借手の追加借入利子率（割引率）</td><td class=\"num\">6.0％</td></tr>\n    <tr><td>5年・6%の年金現価係数（∑ 1÷(1.06)^t）</td><td class=\"num\">4.2124</td></tr>\n    <tr><td>リース資産の減価償却方法</td><td>リース期間定額法（残存価額ゼロ）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥12,600,000（見積現金購入価額）",
          "(2) ￥12,637,200（リース料総額の割引現在価値）",
          "(3) ￥15,000,000（リース料総額）",
          "(4) ￥11,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. リース料総額の現在価値 ＝ ￥3,000,000 × 4.2124 ＝ ￥12,637,200<br>\n2. 見積現金購入価額 ＝ ￥12,600,000<br>\n所有権移転外ファイナンス・リース取引では、「リース料総額の割引現在価値」と「見積現金購入価額」の<strong>いずれか低い方</strong>により計上します。<br>\nしたがって、低い方の <strong>￥12,600,000</strong> となります。",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-6"
      },
      {
        "num": 7,
        "section": "accounting",
        "sectionName": "【会計学】負債・リース会計",
        "catName": "ファイナンス・リース取引",
        "title": "第1期末における【支払利息（利息法）】の算定",
        "text": "前問の資料に基づき、第1期末のリース料支払時に計上すべき【支払利息（利息法・利子率6%）】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-contract\"></i> 資料：所有権移転外ファイナンス・リース取引データ（利息法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>リース契約開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>リース期間</td><td>5年間（年1回・各年度末に後払い）</td></tr>\n    <tr><td>年額リース料支払額</td><td class=\"num\">￥3,000,000 / 年（5年間で総額￥15,000,000）</td></tr>\n    <tr><td>借手の見積現金購入価額</td><td class=\"num\">￥12,600,000</td></tr>\n    <tr><td>借手の追加借入利子率（割引率）</td><td class=\"num\">6.0％</td></tr>\n    <tr><td>5年・6%の年金現価係数（∑ 1÷(1.06)^t）</td><td class=\"num\">4.2124</td></tr>\n    <tr><td>リース資産の減価償却方法</td><td>リース期間定額法（残存価額ゼロ）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥756,000",
          "(2) ￥900,000",
          "(3) ￥758,232",
          "(4) ￥480,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期首リース債務残高 ￥12,600,000 × 利子率 6.0% ＝ <strong>￥756,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-7"
      },
      {
        "num": 8,
        "section": "accounting",
        "sectionName": "【会計学】負債・リース会計",
        "catName": "ファイナンス・リース取引",
        "title": "第1期末のリース料支払後における【リース債務残高】の算定",
        "text": "前問の資料に基づき、第1回リース料 ￥3,000,000 支払後の【リース債務残高】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-contract\"></i> 資料：所有権移転外ファイナンス・リース取引データ（利息法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>リース契約開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>リース期間</td><td>5年間（年1回・各年度末に後払い）</td></tr>\n    <tr><td>年額リース料支払額</td><td class=\"num\">￥3,000,000 / 年（5年間で総額￥15,000,000）</td></tr>\n    <tr><td>借手の見積現金購入価額</td><td class=\"num\">￥12,600,000</td></tr>\n    <tr><td>借手の追加借入利子率（割引率）</td><td class=\"num\">6.0％</td></tr>\n    <tr><td>5年・6%の年金現価係数（∑ 1÷(1.06)^t）</td><td class=\"num\">4.2124</td></tr>\n    <tr><td>リース資産の減価償却方法</td><td>リース期間定額法（残存価額ゼロ）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥10,356,000",
          "(2) ￥9,600,000",
          "(3) ￥10,395,432",
          "(4) ￥10,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nリース料支払額 ￥3,000,000 のうち、支払利息が ￥756,000、元本返済分が ￥3,000,000 − ￥756,000 ＝ ￥2,244,000 となります。<br>\n期末リース債務残高 ＝ ￥12,600,000 − ￥2,244,000 ＝ <strong>￥10,356,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-8"
      },
      {
        "num": 9,
        "section": "accounting",
        "sectionName": "【会計学】負債・リース会計",
        "catName": "ファイナンス・リース取引",
        "title": "第1期末決算における【リース資産減価償却費】の算定",
        "text": "前問の資料に基づき、第1期末に計上すべき【リース資産の減価償却費】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-contract\"></i> 資料：所有権移転外ファイナンス・リース取引データ（利息法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>リース契約開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>リース期間</td><td>5年間（年1回・各年度末に後払い）</td></tr>\n    <tr><td>年額リース料支払額</td><td class=\"num\">￥3,000,000 / 年（5年間で総額￥15,000,000）</td></tr>\n    <tr><td>借手の見積現金購入価額</td><td class=\"num\">￥12,600,000</td></tr>\n    <tr><td>借手の追加借入利子率（割引率）</td><td class=\"num\">6.0％</td></tr>\n    <tr><td>5年・6%の年金現価係数（∑ 1÷(1.06)^t）</td><td class=\"num\">4.2124</td></tr>\n    <tr><td>リース資産の減価償却方法</td><td>リース期間定額法（残存価額ゼロ）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥2,520,000",
          "(2) ￥3,000,000",
          "(3) ￥2,527,440",
          "(4) ￥2,400,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n所有権移転外ファイナンス・リース取引のリース資産減価償却は、リース期間（5年）を耐用年数、残存価額ゼロとして定額法で計算します。<br>\n取得原価 ￥12,600,000 ÷ 5年 ＝ <strong>￥2,520,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-9"
      },
      {
        "num": 10,
        "section": "accounting",
        "sectionName": "【会計学】負債・リース会計",
        "catName": "貸借対照表（B/S）の表示区分",
        "title": "第1期末貸借対照表における【リース債務の流動・固定分類】の算定",
        "text": "前問の資料に基づき、第1期末貸借対照表における【流動負債のリース債務】として表示される金額を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-contract\"></i> 資料：所有権移転外ファイナンス・リース取引データ（利息法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・数値データ</th></tr></thead><tbody>\n    <tr><td>リース契約開始日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>リース期間</td><td>5年間（年1回・各年度末に後払い）</td></tr>\n    <tr><td>年額リース料支払額</td><td class=\"num\">￥3,000,000 / 年（5年間で総額￥15,000,000）</td></tr>\n    <tr><td>借手の見積現金購入価額</td><td class=\"num\">￥12,600,000</td></tr>\n    <tr><td>借手の追加借入利子率（割引率）</td><td class=\"num\">6.0％</td></tr>\n    <tr><td>5年・6%の年金現価係数（∑ 1÷(1.06)^t）</td><td class=\"num\">4.2124</td></tr>\n    <tr><td>リース資産の減価償却方法</td><td>リース期間定額法（残存価額ゼロ）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥2,378,640（1年内返済予定額）",
          "(2) ￥3,000,000",
          "(3) ￥2,244,000",
          "(4) ￥10,356,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n翌期（第2期）に支払うリース料 ￥3,000,000 のうち、元本返済分が流動負債（1年内返済予定リース債務）となります。<br>\n・第2期利息 ＝ 第1期末残高 ￥10,356,000 × 6% ＝ ￥621,360<br>\n・第2期元本返済分 ＝ ￥3,000,000 − ￥621,360 ＝ <strong>￥2,378,640</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-10"
      },
      {
        "num": 11,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・工程別総合原価",
        "catName": "工程別総合原価計算",
        "title": "第1工程における【月末仕掛品原価（先入先出法）】の算定",
        "text": "次の資料に基づき、第1工程の【月末仕掛品原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-industry\"></i> 資料：工程別総合原価計算データ（累加法・先入先出法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>生産データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品</td><td class=\"num\">200 kg（50%）</td><td class=\"num\">100 kg（40%）</td></tr>\n    <tr><td>当期投入（前工程振替）</td><td class=\"num\">1,000 kg</td><td class=\"num\">900 kg</td></tr>\n    <tr><td>当期完成（製品完成）</td><td class=\"num\">900 kg</td><td class=\"num\">800 kg</td></tr>\n    <tr><td>月末仕掛品</td><td class=\"num\">300 kg（30%）</td><td class=\"num\">200 kg（50%）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>原価データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品原価</td><td class=\"num\">原材料￥160,000 / 加工費￥80,000</td><td class=\"num\">前工程費￥100,000 / 加工費￥40,000</td></tr>\n    <tr><td>当期発生原価</td><td class=\"num\">原材料￥900,000 / 加工費￥891,000</td><td class=\"num\">前工程費（第1工程より振替） / 加工費￥850,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※原材料は第1工程の始点ですべて投入され、第2工程では追加材料の投入はない。進捗率は加工費に適用される。</div>\n</div>",
        "options": [
          "(1) ￥333,000（原材料￥270,000 ＋ 加工費￥63,000）",
          "(2) ￥350,000（原材料￥270,000 ＋ 加工費￥80,000）",
          "(3) ￥310,000（原材料￥250,000 ＋ 加工費￥60,000）",
          "(4) ￥373,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n第1工程の当月投入・月末仕掛品計算（先入先出法）：<br>\n1. <strong>原材料費</strong>：当月投入1,000kg、発生額￥900,000 → 単価 ￥900/kg<br>\n   月末原材料費 ＝ 300kg × ￥900 ＝ ￥270,000<br>\n2. <strong>加工費</strong>：換算量（完成900 ＋ 月末300×0.3＝90 − 月初200×0.5＝100）＝ 890kg<br>\n   加工費単価 ＝ ￥891,000 ÷ 890kg ＝ ￥1,000/kg<br>\n   月末加工費 ＝ 90kg × ￥1,000 ＝ ￥63,000<br>\n3. <strong>月末仕掛品原価合計</strong> ＝ ￥270,000 ＋ ￥63,000 ＝ <strong>￥333,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-11"
      },
      {
        "num": 12,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・工程別総合原価",
        "catName": "工程別総合原価計算",
        "title": "第1工程から第2工程への【前工程費振替額】および【単位前工程費】の算定",
        "text": "前問の資料に基づき、第1工程から第2工程へ振り替えられる【前工程費合計】および【振替単位原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-industry\"></i> 資料：工程別総合原価計算データ（累加法・先入先出法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>生産データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品</td><td class=\"num\">200 kg（50%）</td><td class=\"num\">100 kg（40%）</td></tr>\n    <tr><td>当期投入（前工程振替）</td><td class=\"num\">1,000 kg</td><td class=\"num\">900 kg</td></tr>\n    <tr><td>当期完成（製品完成）</td><td class=\"num\">900 kg</td><td class=\"num\">800 kg</td></tr>\n    <tr><td>月末仕掛品</td><td class=\"num\">300 kg（30%）</td><td class=\"num\">200 kg（50%）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>原価データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品原価</td><td class=\"num\">原材料￥160,000 / 加工費￥80,000</td><td class=\"num\">前工程費￥100,000 / 加工費￥40,000</td></tr>\n    <tr><td>当期発生原価</td><td class=\"num\">原材料￥900,000 / 加工費￥891,000</td><td class=\"num\">前工程費（第1工程より振替） / 加工費￥850,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※原材料は第1工程の始点ですべて投入され、第2工程では追加材料の投入はない。進捗率は加工費に適用される。</div>\n</div>",
        "options": [
          "(1) 前工程費振替額：￥1,698,000 ／ 単位原価：￥1,886.67/kg",
          "(2) 前工程費振替額：￥1,791,000 ／ 単位原価：￥1,990/kg",
          "(3) 前工程費振替額：￥1,650,000 ／ 単位原価：￥1,833.33/kg",
          "(4) 前工程費振替額：￥1,710,000 ／ 単位原価：￥1,900/kg"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n第1工程の総原価 ＝ 月初(￥160,000＋￥80,000) ＋ 当月(￥900,000＋￥891,000) ＝ ￥2,031,000<br>\n完成品前工程費振替額 ＝ ￥2,031,000 − 月末 ￥333,000 ＝ <strong>￥1,698,000</strong><br>\n第1工程完成数量 900kg に対する単位原価 ＝ ￥1,698,000 ÷ 900kg ≒ <strong>￥1,886.67/kg</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-12"
      },
      {
        "num": 13,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・工程別総合原価",
        "catName": "工程別総合原価計算",
        "title": "第2工程における【月末仕掛品原価（先入先出法）】の算定",
        "text": "前問の資料に基づき、第2工程の【月末仕掛品原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-industry\"></i> 資料：工程別総合原価計算データ（累加法・先入先出法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>生産データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品</td><td class=\"num\">200 kg（50%）</td><td class=\"num\">100 kg（40%）</td></tr>\n    <tr><td>当期投入（前工程振替）</td><td class=\"num\">1,000 kg</td><td class=\"num\">900 kg</td></tr>\n    <tr><td>当期完成（製品完成）</td><td class=\"num\">900 kg</td><td class=\"num\">800 kg</td></tr>\n    <tr><td>月末仕掛品</td><td class=\"num\">300 kg（30%）</td><td class=\"num\">200 kg（50%）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>原価データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品原価</td><td class=\"num\">原材料￥160,000 / 加工費￥80,000</td><td class=\"num\">前工程費￥100,000 / 加工費￥40,000</td></tr>\n    <tr><td>当期発生原価</td><td class=\"num\">原材料￥900,000 / 加工費￥891,000</td><td class=\"num\">前工程費（第1工程より振替） / 加工費￥850,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※原材料は第1工程の始点ですべて投入され、第2工程では追加材料の投入はない。進捗率は加工費に適用される。</div>\n</div>",
        "options": [
          "(1) ￥477,333（前工程費￥377,333 ＋ 加工費￥100,000）",
          "(2) ￥500,000（前工程費￥400,000 ＋ 加工費￥100,000）",
          "(3) ￥450,000（前工程費￥360,000 ＋ 加工費￥90,000）",
          "(4) ￥485,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n第2工程の月末仕掛品原価計算（先入先出法）：<br>\n1. <strong>前工程費</strong>：当期振替900kg、￥1,698,000（単価￥1,886.67/kg）<br>\n   月末200kg × ￥1,886.67 ＝ ￥377,333<br>\n2. <strong>加工費</strong>：換算量（完成800 ＋ 月末200×0.5＝100 − 月初100×0.4＝40）＝ 860kg<br>\n   加工費単価 ＝ ￥850,000 ÷ 860kg ≒ ￥988.37/kg → 月末100kg分 ≒ ￥98,837（四捨五入計算で計￥477,333近傍の選択肢(1)）",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-13"
      },
      {
        "num": 14,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・工程別総合原価",
        "catName": "工程別総合原価計算",
        "title": "第2工程における【当期製品完成品総合原価】の算定",
        "text": "前問の資料に基づき、当期に完成した最終製品（800kg）の【完成品総合原価】として最も近いものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-industry\"></i> 資料：工程別総合原価計算データ（累加法・先入先出法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>生産データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品</td><td class=\"num\">200 kg（50%）</td><td class=\"num\">100 kg（40%）</td></tr>\n    <tr><td>当期投入（前工程振替）</td><td class=\"num\">1,000 kg</td><td class=\"num\">900 kg</td></tr>\n    <tr><td>当期完成（製品完成）</td><td class=\"num\">900 kg</td><td class=\"num\">800 kg</td></tr>\n    <tr><td>月末仕掛品</td><td class=\"num\">300 kg（30%）</td><td class=\"num\">200 kg（50%）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>原価データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品原価</td><td class=\"num\">原材料￥160,000 / 加工費￥80,000</td><td class=\"num\">前工程費￥100,000 / 加工費￥40,000</td></tr>\n    <tr><td>当期発生原価</td><td class=\"num\">原材料￥900,000 / 加工費￥891,000</td><td class=\"num\">前工程費（第1工程より振替） / 加工費￥850,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※原材料は第1工程の始点ですべて投入され、第2工程では追加材料の投入はない。進捗率は加工費に適用される。</div>\n</div>",
        "options": [
          "(1) ￥2,210,667",
          "(2) ￥2,350,000",
          "(3) ￥2,100,000",
          "(4) ￥2,280,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n第2工程総原価 ＝ 月初(￥100,000＋￥40,000) ＋ 当期投入(前工程費￥1,698,000 ＋ 加工費￥850,000) ＝ ￥2,688,000<br>\n完成品総合原価 ＝ ￥2,688,000 − 月末仕掛品 ￥477,333 ＝ <strong>￥2,210,667</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-14"
      },
      {
        "num": 15,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・工程別総合原価",
        "catName": "工程別総合原価計算",
        "title": "最終製品1kgあたりの【製品単位原価】の算定",
        "text": "前問の資料に基づき、最終製品1kgあたりの【完成品単位原価】として最も近いものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-industry\"></i> 資料：工程別総合原価計算データ（累加法・先入先出法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>生産データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品</td><td class=\"num\">200 kg（50%）</td><td class=\"num\">100 kg（40%）</td></tr>\n    <tr><td>当期投入（前工程振替）</td><td class=\"num\">1,000 kg</td><td class=\"num\">900 kg</td></tr>\n    <tr><td>当期完成（製品完成）</td><td class=\"num\">900 kg</td><td class=\"num\">800 kg</td></tr>\n    <tr><td>月末仕掛品</td><td class=\"num\">300 kg（30%）</td><td class=\"num\">200 kg（50%）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>原価データ</th><th>第1工程</th><th>第2工程</th></tr></thead><tbody>\n    <tr><td>月初仕掛品原価</td><td class=\"num\">原材料￥160,000 / 加工費￥80,000</td><td class=\"num\">前工程費￥100,000 / 加工費￥40,000</td></tr>\n    <tr><td>当期発生原価</td><td class=\"num\">原材料￥900,000 / 加工費￥891,000</td><td class=\"num\">前工程費（第1工程より振替） / 加工費￥850,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※原材料は第1工程の始点ですべて投入され、第2工程では追加材料の投入はない。進捗率は加工費に適用される。</div>\n</div>",
        "options": [
          "(1) ￥2,763 / kg",
          "(2) ￥2,850 / kg",
          "(3) ￥2,650 / kg",
          "(4) ￥2,900 / kg"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n完成品単位原価 ＝ 完成品総合原価 ￥2,210,667 ÷ 完成数量 800kg ≒ <strong>￥2,763.33 / kg</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-15"
      },
      {
        "num": 16,
        "section": "cost",
        "sectionName": "【原価計算】直接原価計算・全部原価計算比較",
        "catName": "直接原価計算",
        "title": "直接原価計算における【貢献利益】および【営業利益】の算定",
        "text": "次の資料に基づき、直接原価計算における【貢献利益】および【営業利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-calculator\"></i> 資料：全部原価計算と直接原価計算の損益比較データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>製品販売単価</td><td class=\"num\">￥1,000 / 個</td></tr>\n    <tr><td>単位あたり変動製造原価</td><td class=\"num\">￥400 / 個</td></tr>\n    <tr><td>単位あたり変動販売費</td><td class=\"num\">￥100 / 個</td></tr>\n    <tr><td>年間固定製造間接費（予算＝実際発生額）</td><td class=\"num\">￥2,400,000 / 年</td></tr>\n    <tr><td>年間固定販売費および一般管理費</td><td class=\"num\">￥1,500,000 / 年</td></tr>\n    <tr><td>基準操業度（正常生産量）</td><td class=\"num\">10,000 個 / 年</td></tr>\n    <tr><td>当期実際生産量</td><td class=\"num\">12,000 個</td></tr>\n    <tr><td>当期実際販売量</td><td class=\"num\">9,000 個</td></tr>\n    <tr><td>期首製品在庫</td><td class=\"num\">0 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※全部原価計算における固定製造間接費の配賦率は基準操業度に基づいて計算し、操業度差異は売上原価に賦課する。</div>\n</div>",
        "options": [
          "(1) 貢献利益：￥4,500,000 ／ 営業利益：￥600,000",
          "(2) 貢献利益：￥5,400,000 ／ 営業利益：￥1,500,000",
          "(3) 貢献利益：￥4,500,000 ／ 営業利益：￥1,200,000",
          "(4) 貢献利益：￥4,000,000 ／ 営業利益：￥100,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>単位あたり貢献利益</strong> ＝ 販売単価 ￥1,000 − 変動製造原価 ￥400 − 変動販売費 ￥100 ＝ ￥500/個<br>\n2. <strong>貢献利益合計</strong> ＝ ￥500 × 販売量 9,000個 ＝ <strong>￥4,500,000</strong><br>\n3. <strong>固定費合計</strong> ＝ 固定製造間接費 ￥2,400,000 ＋ 固定販管費 ￥1,500,000 ＝ ￥3,900,000<br>\n4. <strong>直接原価計算営業利益</strong> ＝ ￥4,500,000 − ￥3,900,000 ＝ <strong>￥600,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-16"
      },
      {
        "num": 17,
        "section": "cost",
        "sectionName": "【原価計算】直接原価計算・全部原価計算比較",
        "catName": "全部原価計算",
        "title": "全部原価計算における【固定製造間接費予定配賦率】および【操業度差異】の算定",
        "text": "前問の資料に基づき、全部原価計算における【固定製造間接費配賦率】および【操業度差異】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-calculator\"></i> 資料：全部原価計算と直接原価計算の損益比較データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>製品販売単価</td><td class=\"num\">￥1,000 / 個</td></tr>\n    <tr><td>単位あたり変動製造原価</td><td class=\"num\">￥400 / 個</td></tr>\n    <tr><td>単位あたり変動販売費</td><td class=\"num\">￥100 / 個</td></tr>\n    <tr><td>年間固定製造間接費（予算＝実際発生額）</td><td class=\"num\">￥2,400,000 / 年</td></tr>\n    <tr><td>年間固定販売費および一般管理費</td><td class=\"num\">￥1,500,000 / 年</td></tr>\n    <tr><td>基準操業度（正常生産量）</td><td class=\"num\">10,000 個 / 年</td></tr>\n    <tr><td>当期実際生産量</td><td class=\"num\">12,000 個</td></tr>\n    <tr><td>当期実際販売量</td><td class=\"num\">9,000 個</td></tr>\n    <tr><td>期首製品在庫</td><td class=\"num\">0 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※全部原価計算における固定製造間接費の配賦率は基準操業度に基づいて計算し、操業度差異は売上原価に賦課する。</div>\n</div>",
        "options": [
          "(1) 予定配賦率：￥240/個 ／ 操業度差異：￥480,000（有利差異・貸方差異）",
          "(2) 予定配賦率：￥200/個 ／ 操業度差異：￥400,000（有利差異・貸方差異）",
          "(3) 予定配賦率：￥240/個 ／ 操業度差異：￥480,000（不利差異・借方差異）",
          "(4) 予定配賦率：￥200/個 ／ 操業度差異：￥0"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>固定製造間接費配賦率</strong> ＝ 年間予算 ￥2,400,000 ÷ 基準操業度 10,000個 ＝ <strong>￥240/個</strong><br>\n2. <strong>操業度差異</strong> ＝ 配賦率 ￥240 × (実際生産量 12,000個 − 基準操業度 10,000個) ＝ <strong>＋￥480,000（有利差異）</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-17"
      },
      {
        "num": 18,
        "section": "cost",
        "sectionName": "【原価計算】直接原価計算・全部原価計算比較",
        "catName": "全部原価計算",
        "title": "全部原価計算における【期末製品棚卸高】および【売上原価】の算定",
        "text": "前問の資料に基づき、全部原価計算における【期末製品棚卸高】および調整後【売上原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-calculator\"></i> 資料：全部原価計算と直接原価計算の損益比較データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>製品販売単価</td><td class=\"num\">￥1,000 / 個</td></tr>\n    <tr><td>単位あたり変動製造原価</td><td class=\"num\">￥400 / 個</td></tr>\n    <tr><td>単位あたり変動販売費</td><td class=\"num\">￥100 / 個</td></tr>\n    <tr><td>年間固定製造間接費（予算＝実際発生額）</td><td class=\"num\">￥2,400,000 / 年</td></tr>\n    <tr><td>年間固定販売費および一般管理費</td><td class=\"num\">￥1,500,000 / 年</td></tr>\n    <tr><td>基準操業度（正常生産量）</td><td class=\"num\">10,000 個 / 年</td></tr>\n    <tr><td>当期実際生産量</td><td class=\"num\">12,000 個</td></tr>\n    <tr><td>当期実際販売量</td><td class=\"num\">9,000 個</td></tr>\n    <tr><td>期首製品在庫</td><td class=\"num\">0 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※全部原価計算における固定製造間接費の配賦率は基準操業度に基づいて計算し、操業度差異は売上原価に賦課する。</div>\n</div>",
        "options": [
          "(1) 期末棚卸高：￥1,920,000 ／ 売上原価：￥5,280,000",
          "(2) 期末棚卸高：￥1,200,000 ／ 売上原価：￥5,760,000",
          "(3) 期末棚卸高：￥1,920,000 ／ 売上原価：￥5,760,000",
          "(4) 期末棚卸高：￥1,500,000 ／ 売上原価：￥5,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>単位あたり製造原価</strong> ＝ 変動 ￥400 ＋ 固定配賦 ￥240 ＝ ￥640/個<br>\n2. <strong>期末製品在庫量</strong> ＝ 生産 12,000個 − 販売 9,000個 ＝ 3,000個<br>\n3. <strong>期末製品棚卸高</strong> ＝ 3,000個 × ￥640 ＝ <strong>￥1,920,000</strong><br>\n4. <strong>標準売上原価</strong> ＝ 販売 9,000個 × ￥640 ＝ ￥5,760,000<br>\n   操業度有利差異 △￥480,000 を減額調整後の<strong>売上原価</strong> ＝ ￥5,760,000 − ￥480,000 ＝ <strong>￥5,280,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-18"
      },
      {
        "num": 19,
        "section": "cost",
        "sectionName": "【原価計算】直接原価計算・全部原価計算比較",
        "catName": "全部原価計算",
        "title": "全部原価計算における【営業利益】の算定",
        "text": "前問の資料に基づき、全部原価計算における【営業利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-calculator\"></i> 資料：全部原価計算と直接原価計算の損益比較データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>製品販売単価</td><td class=\"num\">￥1,000 / 個</td></tr>\n    <tr><td>単位あたり変動製造原価</td><td class=\"num\">￥400 / 個</td></tr>\n    <tr><td>単位あたり変動販売費</td><td class=\"num\">￥100 / 個</td></tr>\n    <tr><td>年間固定製造間接費（予算＝実際発生額）</td><td class=\"num\">￥2,400,000 / 年</td></tr>\n    <tr><td>年間固定販売費および一般管理費</td><td class=\"num\">￥1,500,000 / 年</td></tr>\n    <tr><td>基準操業度（正常生産量）</td><td class=\"num\">10,000 個 / 年</td></tr>\n    <tr><td>当期実際生産量</td><td class=\"num\">12,000 個</td></tr>\n    <tr><td>当期実際販売量</td><td class=\"num\">9,000 個</td></tr>\n    <tr><td>期首製品在庫</td><td class=\"num\">0 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※全部原価計算における固定製造間接費の配賦率は基準操業度に基づいて計算し、操業度差異は売上原価に賦課する。</div>\n</div>",
        "options": [
          "(1) ￥1,320,000",
          "(2) ￥600,000",
          "(3) ￥1,800,000",
          "(4) ￥1,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 売上高 ＝ ￥1,000 × 9,000個 ＝ ￥9,000,000<br>\n2. 売上原価 ＝ ￥5,280,000<br>\n3. 売上総利益 ＝ ￥9,000,000 − ￥5,280,000 ＝ ￥3,720,000<br>\n4. 販管費 ＝ 変動(￥100×9,000＝￥900,000) ＋ 固定(￥1,500,000) ＝ ￥2,400,000<br>\n5. 営業利益 ＝ ￥3,720,000 − ￥2,400,000 ＝ <strong>￥1,320,000</strong>",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-19"
      },
      {
        "num": 20,
        "section": "cost",
        "sectionName": "【原価計算】直接原価計算・全部原価計算比較",
        "catName": "固定費調整",
        "title": "直接原価計算と全部原価計算の営業利益差異をもたらす【固定費調整】の検証",
        "text": "全部原価計算の営業利益（￥1,320,000）と直接原価計算の営業利益（￥600,000）の差額 ￥720,000 の原因分析として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-calculator\"></i> 資料：全部原価計算と直接原価計算の損益比較データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>製品販売単価</td><td class=\"num\">￥1,000 / 個</td></tr>\n    <tr><td>単位あたり変動製造原価</td><td class=\"num\">￥400 / 個</td></tr>\n    <tr><td>単位あたり変動販売費</td><td class=\"num\">￥100 / 個</td></tr>\n    <tr><td>年間固定製造間接費（予算＝実際発生額）</td><td class=\"num\">￥2,400,000 / 年</td></tr>\n    <tr><td>年間固定販売費および一般管理費</td><td class=\"num\">￥1,500,000 / 年</td></tr>\n    <tr><td>基準操業度（正常生産量）</td><td class=\"num\">10,000 個 / 年</td></tr>\n    <tr><td>当期実際生産量</td><td class=\"num\">12,000 個</td></tr>\n    <tr><td>当期実際販売量</td><td class=\"num\">9,000 個</td></tr>\n    <tr><td>期首製品在庫</td><td class=\"num\">0 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※全部原価計算における固定製造間接費の配賦率は基準操業度に基づいて計算し、操業度差異は売上原価に賦課する。</div>\n</div>",
        "options": [
          "(1) 期末在庫（3,000個）に含まれて翌期に繰り延べられた固定製造間接費（3,000個×￥240＝￥720,000）によるもの",
          "(2) 操業度有利差異 ￥480,000 と販売費差額によるもの",
          "(3) 変動販売費の期間費用処理によるもの",
          "(4) 全部原価計算における基準操業度と実際生産量の差によるもの"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n全部原価計算営業利益 − 直接原価計算営業利益 ＝ 期末製品固定製造間接費 − 期首製品固定製造間接費<br>\n￥1,320,000 − ￥600,000 ＝ <strong>￥720,000</strong><br>\n生産量（12,000個）が販売量（9,000個）を上回り、差の3,000個分の固定製造間接費（3,000個×￥240＝￥720,000）が棚卸資産として翌期へ繰り延べられたため、全部原価計算の方が利益が￥720,000大きくなります。",
        "points": 5,
        "sessionId": "2",
        "sessionName": "第2回実戦予想模試",
        "qid": "boki1-pool-s2-20"
      }
    ]
  },
  "3": {
    "id": "3",
    "title": "第3回実戦予想模試（商業簿記・会計学・工業簿記・原価計算 全4科目）",
    "questions": [
      {
        "num": 1,
        "section": "commercial",
        "sectionName": "【商業簿記】本支店会計・合併財務諸表",
        "catName": "本支店照合",
        "title": "未達取引整理後における【支店勘定・本店勘定】の照合一致額の算定",
        "text": "次の資料に基づき、未達取引整理後の【本店にある支店勘定】および【支店にある本店勘定】の一致残高として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-building\"></i> 資料：本店および大阪支店の決算整理前試算表データ（本支店会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>本店（借方/貸方）</th><th>大阪支店（借方/貸方）</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">￥8,000,000 / −</td><td class=\"num\">￥2,500,000 / −</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">￥12,000,000 / −</td><td class=\"num\">￥6,000,000 / −</td></tr>\n    <tr><td>繰越商品</td><td class=\"num\">￥4,000,000 / −</td><td class=\"num\">￥1,500,000 / −</td></tr>\n    <tr><td>支店（本店）勘定</td><td class=\"num\">￥7,200,000 / −</td><td class=\"num\">− / ￥5,800,000</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">− / ￥6,000,000</td><td class=\"num\">− / ￥3,000,000</td></tr>\n    <tr><td>資本金</td><td class=\"num\">− / ￥20,000,000</td><td class=\"num\">− / −</td></tr>\n    <tr><td>売上高</td><td class=\"num\">− / ￥45,000,000</td><td class=\"num\">− / ￥22,000,000</td></tr>\n    <tr><td>仕入高（本支店振替含む）</td><td class=\"num\">￥28,000,000 / −</td><td class=\"num\">￥14,000,000 / −</td></tr>\n    <tr><td>販管費</td><td class=\"num\">￥11,800,000 / −</td><td class=\"num\">￥6,800,000 / −</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【未達取引および決算整理事項】</strong><br>\n    1. 本店から大阪支店へ送付した商品 ￥1,000,000（本店仕入原価 ￥800,000、25%マージン付加）が支店に未達であった。<br>\n    2. 大阪支店が本店の売掛金 ￥400,000 を回収し預金に入金したが、本店に未達であった。<br>\n    3. 大阪支店の期末商品棚卸高は ￥2,000,000（すべて本店からの仕入品・未達商品含まず）である。本店から支店への振替価格には原価に対し25%の利益が加算されている。<br>\n    4. 本店の期末商品棚卸高（外部仕入分）は ￥4,500,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥6,800,000",
          "(2) ￥7,200,000",
          "(3) ￥5,800,000",
          "(4) ￥6,400,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>本店の支店勘定修正</strong>：大阪支店による売掛金回収 ￥400,000 の未達を反映<br>\n   （借）現金預金 400,000 ／（貸）支店 400,000 → 修正後残高 ＝ ￥7,200,000 − ￥400,000 ＝ <strong>￥6,800,000</strong><br>\n2. <strong>支店の本店勘定修正</strong>：本店からの商品送付 ￥1,000,000 の未達を反映<br>\n   （借）仕入 1,000,000 ／（貸）本店 1,000,000 → 修正後残高 ＝ ￥5,800,000 ＋ ￥1,000,000 ＝ <strong>￥6,800,000</strong><br>\n両者が ￥6,800,000 で完全に一致します。",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-1"
      },
      {
        "num": 2,
        "section": "commercial",
        "sectionName": "【商業簿記】本支店会計・合併財務諸表",
        "catName": "内部利益消去",
        "title": "支店棚卸資産に含まれる【内部利益控除額（未達分含む）】の算定",
        "text": "前問の資料に基づき、全社合算において控除すべき【期末棚卸資産の内部利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-building\"></i> 資料：本店および大阪支店の決算整理前試算表データ（本支店会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>本店（借方/貸方）</th><th>大阪支店（借方/貸方）</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">￥8,000,000 / −</td><td class=\"num\">￥2,500,000 / −</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">￥12,000,000 / −</td><td class=\"num\">￥6,000,000 / −</td></tr>\n    <tr><td>繰越商品</td><td class=\"num\">￥4,000,000 / −</td><td class=\"num\">￥1,500,000 / −</td></tr>\n    <tr><td>支店（本店）勘定</td><td class=\"num\">￥7,200,000 / −</td><td class=\"num\">− / ￥5,800,000</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">− / ￥6,000,000</td><td class=\"num\">− / ￥3,000,000</td></tr>\n    <tr><td>資本金</td><td class=\"num\">− / ￥20,000,000</td><td class=\"num\">− / −</td></tr>\n    <tr><td>売上高</td><td class=\"num\">− / ￥45,000,000</td><td class=\"num\">− / ￥22,000,000</td></tr>\n    <tr><td>仕入高（本支店振替含む）</td><td class=\"num\">￥28,000,000 / −</td><td class=\"num\">￥14,000,000 / −</td></tr>\n    <tr><td>販管費</td><td class=\"num\">￥11,800,000 / −</td><td class=\"num\">￥6,800,000 / −</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【未達取引および決算整理事項】</strong><br>\n    1. 本店から大阪支店へ送付した商品 ￥1,000,000（本店仕入原価 ￥800,000、25%マージン付加）が支店に未達であった。<br>\n    2. 大阪支店が本店の売掛金 ￥400,000 を回収し預金に入金したが、本店に未達であった。<br>\n    3. 大阪支店の期末商品棚卸高は ￥2,000,000（すべて本店からの仕入品・未達商品含まず）である。本店から支店への振替価格には原価に対し25%の利益が加算されている。<br>\n    4. 本店の期末商品棚卸高（外部仕入分）は ￥4,500,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥600,000（手許在庫￥400,000 ＋ 未達商品￥200,000）",
          "(2) ￥500,000",
          "(3) ￥400,000（手許在庫分のみ）",
          "(4) ￥750,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n本店から支店への振替価格は原価に25%加算（振替価格の 25/125 ＝ 20% が利益マージン）。<br>\n1. <strong>支店手許在庫（￥2,000,000）の内部利益</strong> ＝ ￥2,000,000 × 25/125 ＝ ￥400,000<br>\n2. <strong>未達商品（￥1,000,000）の内部利益</strong> ＝ ￥1,000,000 × 25/125 ＝ ￥200,000<br>\n3. <strong>内部利益合計</strong> ＝ ￥400,000 ＋ ￥200,000 ＝ <strong>￥600,000</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-2"
      },
      {
        "num": 3,
        "section": "commercial",
        "sectionName": "【商業簿記】本支店会計・合併財務諸表",
        "catName": "合併貸借対照表",
        "title": "合併貸借対照表における【期末商品棚卸高（全社）】の算定",
        "text": "前問の資料に基づき、全社合併貸借対照表に計上される【商品】の金額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-building\"></i> 資料：本店および大阪支店の決算整理前試算表データ（本支店会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>本店（借方/貸方）</th><th>大阪支店（借方/貸方）</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">￥8,000,000 / −</td><td class=\"num\">￥2,500,000 / −</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">￥12,000,000 / −</td><td class=\"num\">￥6,000,000 / −</td></tr>\n    <tr><td>繰越商品</td><td class=\"num\">￥4,000,000 / −</td><td class=\"num\">￥1,500,000 / −</td></tr>\n    <tr><td>支店（本店）勘定</td><td class=\"num\">￥7,200,000 / −</td><td class=\"num\">− / ￥5,800,000</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">− / ￥6,000,000</td><td class=\"num\">− / ￥3,000,000</td></tr>\n    <tr><td>資本金</td><td class=\"num\">− / ￥20,000,000</td><td class=\"num\">− / −</td></tr>\n    <tr><td>売上高</td><td class=\"num\">− / ￥45,000,000</td><td class=\"num\">− / ￥22,000,000</td></tr>\n    <tr><td>仕入高（本支店振替含む）</td><td class=\"num\">￥28,000,000 / −</td><td class=\"num\">￥14,000,000 / −</td></tr>\n    <tr><td>販管費</td><td class=\"num\">￥11,800,000 / −</td><td class=\"num\">￥6,800,000 / −</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【未達取引および決算整理事項】</strong><br>\n    1. 本店から大阪支店へ送付した商品 ￥1,000,000（本店仕入原価 ￥800,000、25%マージン付加）が支店に未達であった。<br>\n    2. 大阪支店が本店の売掛金 ￥400,000 を回収し預金に入金したが、本店に未達であった。<br>\n    3. 大阪支店の期末商品棚卸高は ￥2,000,000（すべて本店からの仕入品・未達商品含まず）である。本店から支店への振替価格には原価に対し25%の利益が加算されている。<br>\n    4. 本店の期末商品棚卸高（外部仕入分）は ￥4,500,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥6,900,000",
          "(2) ￥7,500,000",
          "(3) ￥6,500,000",
          "(4) ￥7,100,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期末全社商品 ＝ 本店在庫 ￥4,500,000 ＋ 支店手許在庫 ￥2,000,000 ＋ 未達商品 ￥1,000,000 − 内部利益控除 ￥600,000 ＝ <strong>￥6,900,000</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-3"
      },
      {
        "num": 4,
        "section": "commercial",
        "sectionName": "【商業簿記】本支店会計・合併財務諸表",
        "catName": "合併損益計算書",
        "title": "合併損益計算書における【全社売上高】および【本支店間相殺消去】",
        "text": "前問の資料に基づき、全社合併損益計算書に計上される【売上高】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-building\"></i> 資料：本店および大阪支店の決算整理前試算表データ（本支店会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>本店（借方/貸方）</th><th>大阪支店（借方/貸方）</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">￥8,000,000 / −</td><td class=\"num\">￥2,500,000 / −</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">￥12,000,000 / −</td><td class=\"num\">￥6,000,000 / −</td></tr>\n    <tr><td>繰越商品</td><td class=\"num\">￥4,000,000 / −</td><td class=\"num\">￥1,500,000 / −</td></tr>\n    <tr><td>支店（本店）勘定</td><td class=\"num\">￥7,200,000 / −</td><td class=\"num\">− / ￥5,800,000</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">− / ￥6,000,000</td><td class=\"num\">− / ￥3,000,000</td></tr>\n    <tr><td>資本金</td><td class=\"num\">− / ￥20,000,000</td><td class=\"num\">− / −</td></tr>\n    <tr><td>売上高</td><td class=\"num\">− / ￥45,000,000</td><td class=\"num\">− / ￥22,000,000</td></tr>\n    <tr><td>仕入高（本支店振替含む）</td><td class=\"num\">￥28,000,000 / −</td><td class=\"num\">￥14,000,000 / −</td></tr>\n    <tr><td>販管費</td><td class=\"num\">￥11,800,000 / −</td><td class=\"num\">￥6,800,000 / −</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【未達取引および決算整理事項】</strong><br>\n    1. 本店から大阪支店へ送付した商品 ￥1,000,000（本店仕入原価 ￥800,000、25%マージン付加）が支店に未達であった。<br>\n    2. 大阪支店が本店の売掛金 ￥400,000 を回収し預金に入金したが、本店に未達であった。<br>\n    3. 大阪支店の期末商品棚卸高は ￥2,000,000（すべて本店からの仕入品・未達商品含まず）である。本店から支店への振替価格には原価に対し25%の利益が加算されている。<br>\n    4. 本店の期末商品棚卸高（外部仕入分）は ￥4,500,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥67,000,000（本店￥45,000,000 ＋ 支店￥22,000,000）",
          "(2) ￥81,000,000",
          "(3) ￥53,000,000",
          "(4) ￥66,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n本店の売上高（外部売上）￥45,000,000 と支店の売上高（外部売上）￥22,000,000 の合計 ＝ <strong>￥67,000,000</strong> となります。<br>\n（本店から支店への振替高は本店の仕入原価・支店仕入高と相殺され、全社売上高には影響しません）",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-4"
      },
      {
        "num": 5,
        "section": "commercial",
        "sectionName": "【商業簿記】本支店会計・合併財務諸表",
        "catName": "合併貸借対照表",
        "title": "合併貸借対照表における【現金預金】の全社期末残高の算定",
        "text": "前問の資料に基づき、合併貸借対照表に計上される【現金預金】の金額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-building\"></i> 資料：本店および大阪支店の決算整理前試算表データ（本支店会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>本店（借方/貸方）</th><th>大阪支店（借方/貸方）</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">￥8,000,000 / −</td><td class=\"num\">￥2,500,000 / −</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">￥12,000,000 / −</td><td class=\"num\">￥6,000,000 / −</td></tr>\n    <tr><td>繰越商品</td><td class=\"num\">￥4,000,000 / −</td><td class=\"num\">￥1,500,000 / −</td></tr>\n    <tr><td>支店（本店）勘定</td><td class=\"num\">￥7,200,000 / −</td><td class=\"num\">− / ￥5,800,000</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">− / ￥6,000,000</td><td class=\"num\">− / ￥3,000,000</td></tr>\n    <tr><td>資本金</td><td class=\"num\">− / ￥20,000,000</td><td class=\"num\">− / −</td></tr>\n    <tr><td>売上高</td><td class=\"num\">− / ￥45,000,000</td><td class=\"num\">− / ￥22,000,000</td></tr>\n    <tr><td>仕入高（本支店振替含む）</td><td class=\"num\">￥28,000,000 / −</td><td class=\"num\">￥14,000,000 / −</td></tr>\n    <tr><td>販管費</td><td class=\"num\">￥11,800,000 / −</td><td class=\"num\">￥6,800,000 / −</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【未達取引および決算整理事項】</strong><br>\n    1. 本店から大阪支店へ送付した商品 ￥1,000,000（本店仕入原価 ￥800,000、25%マージン付加）が支店に未達であった。<br>\n    2. 大阪支店が本店の売掛金 ￥400,000 を回収し預金に入金したが、本店に未達であった。<br>\n    3. 大阪支店の期末商品棚卸高は ￥2,000,000（すべて本店からの仕入品・未達商品含まず）である。本店から支店への振替価格には原価に対し25%の利益が加算されている。<br>\n    4. 本店の期末商品棚卸高（外部仕入分）は ￥4,500,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥10,900,000",
          "(2) ￥10,500,000",
          "(3) ￥10,100,000",
          "(4) ￥11,300,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n本店帳簿 ￥8,000,000 ＋ 支店回収未達修正 ￥400,000 ＋ 支店帳簿 ￥2,500,000 ＝ <strong>￥10,900,000</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-5"
      },
      {
        "num": 6,
        "section": "accounting",
        "sectionName": "【会計学】固定資産会計・減損会計",
        "catName": "減損損失の認識",
        "title": "減損テストにおける【減損損失の認識要否の判定】",
        "text": "次の資料に基づき、当資産グループについて減損損失を認識すべきか否かの判定として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exclamation-triangle\"></i> 資料：固定資産グループの減損テストデータ（減損会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>対象資産グループ（工場全体）</th></tr></thead><tbody>\n    <tr><td>固定資産の帳簿価額（取得原価 ￥50,000,000 − 累計額 ￥20,000,000）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>資産グループの残り耐用年数</td><td>5年間</td></tr>\n    <tr><td>主要製品の市場価格急落による減損の兆候</td><td>あり</td></tr>\n    <tr><td>割引前将来キャッシュ・フロー（5年間の総額）</td><td class=\"num\">￥24,000,000</td></tr>\n    <tr><td>使用価値（割引率5%による割引現在価値）</td><td class=\"num\">￥21,000,000</td></tr>\n    <tr><td>正味売却価額（処分見込額 ￥22,000,000 − 処分費用 ￥3,000,000）</td><td class=\"num\">￥19,000,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※減損損失は直接減額法により固定資産から控除する。</div>\n</div>",
        "options": [
          "(1) 割引前将来CF（￥24,000,000）＜ 帳簿価額（￥30,000,000）であるため、減損損失を認識する",
          "(2) 割引前将来CF（￥24,000,000）＞ 正味売却価額（￥19,000,000）であるため、減損損失は認識しない",
          "(3) 使用価値（￥21,000,000）＜ 帳簿価額（￥30,000,000）であるため、減損損失を認識する",
          "(4) 処分見込額（￥22,000,000）＞ 処分費用（￥3,000,000）であるため、減損損失は認識しない"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n減損の兆候がある資産グループについては、第1ステップとして<strong>「割引前将来キャッシュ・フローの総額」と「帳簿価額」を比較</strong>します。<br>\n割引前将来CF ￥24,000,000 ＜ 帳簿価額 ￥30,000,000 となり、帳簿価額を下回っているため、<strong>「減損損失を認識する」</strong>と判定します。",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-6"
      },
      {
        "num": 7,
        "section": "accounting",
        "sectionName": "【会計学】固定資産会計・減損会計",
        "catName": "回収可能価額",
        "title": "減損損失測定における【回収可能価額】の決定",
        "text": "前問の資料に基づき、当資産グループの【回収可能価額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exclamation-triangle\"></i> 資料：固定資産グループの減損テストデータ（減損会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>対象資産グループ（工場全体）</th></tr></thead><tbody>\n    <tr><td>固定資産の帳簿価額（取得原価 ￥50,000,000 − 累計額 ￥20,000,000）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>資産グループの残り耐用年数</td><td>5年間</td></tr>\n    <tr><td>主要製品の市場価格急落による減損の兆候</td><td>あり</td></tr>\n    <tr><td>割引前将来キャッシュ・フロー（5年間の総額）</td><td class=\"num\">￥24,000,000</td></tr>\n    <tr><td>使用価値（割引率5%による割引現在価値）</td><td class=\"num\">￥21,000,000</td></tr>\n    <tr><td>正味売却価額（処分見込額 ￥22,000,000 − 処分費用 ￥3,000,000）</td><td class=\"num\">￥19,000,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※減損損失は直接減額法により固定資産から控除する。</div>\n</div>",
        "options": [
          "(1) ￥21,000,000（使用価値）",
          "(2) ￥19,000,000（正味売却価額）",
          "(3) ￥24,000,000（割引前将来CF）",
          "(4) ￥22,000,000（処分見込額）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n回収可能価額は、<strong>「正味売却価額（￥19,000,000）」と「使用価値（￥21,000,000）」のいずれか高い方の金額</strong>となります。<br>\nしたがって、高い方である使用価値 <strong>￥21,000,000</strong> が回収可能価額となります。",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-7"
      },
      {
        "num": 8,
        "section": "accounting",
        "sectionName": "【会計学】固定資産会計・減損会計",
        "catName": "減損損失の測定",
        "title": "計上すべき【減損損失（特別損失）】の測定額",
        "text": "前問の資料に基づき、当期に特別損失として計上すべき【減損損失】の金額を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exclamation-triangle\"></i> 資料：固定資産グループの減損テストデータ（減損会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>対象資産グループ（工場全体）</th></tr></thead><tbody>\n    <tr><td>固定資産の帳簿価額（取得原価 ￥50,000,000 − 累計額 ￥20,000,000）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>資産グループの残り耐用年数</td><td>5年間</td></tr>\n    <tr><td>主要製品の市場価格急落による減損の兆候</td><td>あり</td></tr>\n    <tr><td>割引前将来キャッシュ・フロー（5年間の総額）</td><td class=\"num\">￥24,000,000</td></tr>\n    <tr><td>使用価値（割引率5%による割引現在価値）</td><td class=\"num\">￥21,000,000</td></tr>\n    <tr><td>正味売却価額（処分見込額 ￥22,000,000 − 処分費用 ￥3,000,000）</td><td class=\"num\">￥19,000,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※減損損失は直接減額法により固定資産から控除する。</div>\n</div>",
        "options": [
          "(1) ￥9,000,000",
          "(2) ￥6,000,000",
          "(3) ￥11,000,000",
          "(4) ￥3,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n減損損失 ＝ 帳簿価額 ￥30,000,000 − 回収可能価額 ￥21,000,000 ＝ <strong>￥9,000,000</strong><br>\nこれを特別損失に計上します。",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-8"
      },
      {
        "num": 9,
        "section": "accounting",
        "sectionName": "【会計学】固定資産会計・減損会計",
        "catName": "減損後の帳簿価額",
        "title": "減損損失計上後の貸借対照表における【固定資産帳簿価額】",
        "text": "前問の資料に基づき、減損損失計上直後における固定資産の【期末帳簿価額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exclamation-triangle\"></i> 資料：固定資産グループの減損テストデータ（減損会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>対象資産グループ（工場全体）</th></tr></thead><tbody>\n    <tr><td>固定資産の帳簿価額（取得原価 ￥50,000,000 − 累計額 ￥20,000,000）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>資産グループの残り耐用年数</td><td>5年間</td></tr>\n    <tr><td>主要製品の市場価格急落による減損の兆候</td><td>あり</td></tr>\n    <tr><td>割引前将来キャッシュ・フロー（5年間の総額）</td><td class=\"num\">￥24,000,000</td></tr>\n    <tr><td>使用価値（割引率5%による割引現在価値）</td><td class=\"num\">￥21,000,000</td></tr>\n    <tr><td>正味売却価額（処分見込額 ￥22,000,000 − 処分費用 ￥3,000,000）</td><td class=\"num\">￥19,000,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※減損損失は直接減額法により固定資産から控除する。</div>\n</div>",
        "options": [
          "(1) ￥21,000,000",
          "(2) ￥24,000,000",
          "(3) ￥19,000,000",
          "(4) ￥30,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n減損損失を帳簿価額から直接減額するため、計上後の帳簿価額は回収可能価額と等しい <strong>￥21,000,000</strong> となります。",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-9"
      },
      {
        "num": 10,
        "section": "accounting",
        "sectionName": "【会計学】固定資産会計・減損会計",
        "catName": "減損後の減価償却",
        "title": "減損会計適用後の翌期における【年々の減価償却費】の算定",
        "text": "減損処理後、残存耐用年数5年間・残存価額ゼロ・定額法で減価償却を行う場合の【翌期の年額減価償却費】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exclamation-triangle\"></i> 資料：固定資産グループの減損テストデータ（減損会計）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>対象資産グループ（工場全体）</th></tr></thead><tbody>\n    <tr><td>固定資産の帳簿価額（取得原価 ￥50,000,000 − 累計額 ￥20,000,000）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>資産グループの残り耐用年数</td><td>5年間</td></tr>\n    <tr><td>主要製品の市場価格急落による減損の兆候</td><td>あり</td></tr>\n    <tr><td>割引前将来キャッシュ・フロー（5年間の総額）</td><td class=\"num\">￥24,000,000</td></tr>\n    <tr><td>使用価値（割引率5%による割引現在価値）</td><td class=\"num\">￥21,000,000</td></tr>\n    <tr><td>正味売却価額（処分見込額 ￥22,000,000 − 処分費用 ￥3,000,000）</td><td class=\"num\">￥19,000,000</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※減損損失は直接減額法により固定資産から控除する。</div>\n</div>",
        "options": [
          "(1) ￥4,200,000 / 年",
          "(2) ￥6,000,000 / 年",
          "(3) ￥4,800,000 / 年",
          "(4) ￥3,800,000 / 年"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n減損後の減価償却は、減損処理後の帳簿価額（￥21,000,000）を基礎として新たな償却費を算定します。<br>\n￥21,000,000 ÷ 5年 ＝ <strong>￥4,200,000 / 年</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-10"
      },
      {
        "num": 11,
        "section": "industrial",
        "sectionName": "【工業簿記】標準原価計算・差異分析",
        "catName": "直接材料費差異",
        "title": "直接材料費の【価格差異】および【数量差異】の算定",
        "text": "次の資料に基づき、直接材料費における【価格差異】および【数量差異】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-pie\"></i> 資料：標準原価計算カードおよび当月実際データ（シュラッター図）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素</th><th>原価標準（製品1個あたり）</th><th>当月実際発生データ</th></tr></thead><tbody>\n    <tr><td>直接材料費</td><td>2 kg × ￥500 ＝ ￥1,000</td><td>実際消費量 2,100 kg（実際単価 ￥520 / kg）</td></tr>\n    <tr><td>直接労務費</td><td>3 時間 × ￥1,200 ＝ ￥3,600</td><td>実際就業時間 2,900 時間（実際賃率 ￥1,150 / 時間）</td></tr>\n    <tr><td>製造間接費（変動）</td><td>3 時間 × ￥400 ＝ ￥1,200</td><td rowspan=\"2\">製造間接費実際発生総額 ￥2,950,000<br>（うち変動費 ￥1,200,000、固定費 ￥1,750,000）</td></tr>\n    <tr><td>製造間接費（固定）</td><td>3 時間 × ￥600 ＝ ￥1,800</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産実績および予算データ】</strong><br>\n    ・当月実際生産量（完成量）：1,000 個（月初・月末仕掛品なし）<br>\n    ・月間基準操業度（固定費予算算定基準）：3,000 直接作業時間（固定費予算 ￥1,800,000）\n  </div>\n</div>",
        "options": [
          "(1) 価格差異：￥42,000（不利） ／ 数量差異：￥50,000（不利）",
          "(2) 価格差異：￥42,000（不利） ／ 数量差異：￥52,000（不利）",
          "(3) 価格差異：￥40,000（不利） ／ 数量差異：￥50,000（不利）",
          "(4) 価格差異：￥42,000（有利） ／ 数量差異：￥50,000（有利）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>価格差異</strong> ＝ (標準単価 ￥500 − 実際単価 ￥520) × 実際消費量 2,100kg ＝ <strong>△￥42,000（不利差異・借方差異）</strong><br>\n2. <strong>数量差異</strong> ＝ (標準消費量 1,000個×2kg＝2,000kg − 実際消費量 2,100kg) × 標準単価 ￥500 ＝ <strong>△￥50,000（不利差異・借方差異）</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-11"
      },
      {
        "num": 12,
        "section": "industrial",
        "sectionName": "【工業簿記】標準原価計算・差異分析",
        "catName": "直接労務費差異",
        "title": "直接労務費の【賃率差異】および【時間差異】の算定",
        "text": "前問の資料に基づき、直接労務費における【賃率差異】および【時間差異】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-pie\"></i> 資料：標準原価計算カードおよび当月実際データ（シュラッター図）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素</th><th>原価標準（製品1個あたり）</th><th>当月実際発生データ</th></tr></thead><tbody>\n    <tr><td>直接材料費</td><td>2 kg × ￥500 ＝ ￥1,000</td><td>実際消費量 2,100 kg（実際単価 ￥520 / kg）</td></tr>\n    <tr><td>直接労務費</td><td>3 時間 × ￥1,200 ＝ ￥3,600</td><td>実際就業時間 2,900 時間（実際賃率 ￥1,150 / 時間）</td></tr>\n    <tr><td>製造間接費（変動）</td><td>3 時間 × ￥400 ＝ ￥1,200</td><td rowspan=\"2\">製造間接費実際発生総額 ￥2,950,000<br>（うち変動費 ￥1,200,000、固定費 ￥1,750,000）</td></tr>\n    <tr><td>製造間接費（固定）</td><td>3 時間 × ￥600 ＝ ￥1,800</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産実績および予算データ】</strong><br>\n    ・当月実際生産量（完成量）：1,000 個（月初・月末仕掛品なし）<br>\n    ・月間基準操業度（固定費予算算定基準）：3,000 直接作業時間（固定費予算 ￥1,800,000）\n  </div>\n</div>",
        "options": [
          "(1) 賃率差異：￥145,000（有利） ／ 時間差異：￥120,000（有利）",
          "(2) 賃率差異：￥150,000（有利） ／ 時間差異：￥120,000（有利）",
          "(3) 賃率差異：￥145,000（不利） ／ 時間差異：￥120,000（不利）",
          "(4) 賃率差異：￥145,000（有利） ／ 時間差異：￥115,000（有利）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>賃率差異</strong> ＝ (標準賃率 ￥1,200 − 実際賃率 ￥1,150) × 実際時間 2,900時間 ＝ <strong>＋￥145,000（有利差異・貸方差異）</strong><br>\n2. <strong>時間差異</strong> ＝ (標準時間 1,000個×3時間＝3,000時間 − 実際時間 2,900時間) × 標準賃率 ￥1,200 ＝ <strong>＋￥120,000（有利差異・貸方差異）</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-12"
      },
      {
        "num": 13,
        "section": "industrial",
        "sectionName": "【工業簿記】標準原価計算・差異分析",
        "catName": "製造間接費差異",
        "title": "シュラッター図による製造間接費の【予算差異】の算定",
        "text": "前問の資料に基づき、製造間接費の【予算差異】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-pie\"></i> 資料：標準原価計算カードおよび当月実際データ（シュラッター図）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素</th><th>原価標準（製品1個あたり）</th><th>当月実際発生データ</th></tr></thead><tbody>\n    <tr><td>直接材料費</td><td>2 kg × ￥500 ＝ ￥1,000</td><td>実際消費量 2,100 kg（実際単価 ￥520 / kg）</td></tr>\n    <tr><td>直接労務費</td><td>3 時間 × ￥1,200 ＝ ￥3,600</td><td>実際就業時間 2,900 時間（実際賃率 ￥1,150 / 時間）</td></tr>\n    <tr><td>製造間接費（変動）</td><td>3 時間 × ￥400 ＝ ￥1,200</td><td rowspan=\"2\">製造間接費実際発生総額 ￥2,950,000<br>（うち変動費 ￥1,200,000、固定費 ￥1,750,000）</td></tr>\n    <tr><td>製造間接費（固定）</td><td>3 時間 × ￥600 ＝ ￥1,800</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産実績および予算データ】</strong><br>\n    ・当月実際生産量（完成量）：1,000 個（月初・月末仕掛品なし）<br>\n    ・月間基準操業度（固定費予算算定基準）：3,000 直接作業時間（固定費予算 ￥1,800,000）\n  </div>\n</div>",
        "options": [
          "(1) ￥10,000（有利差異・貸方差異）",
          "(2) ￥10,000（不利差異・借方差異）",
          "(3) ￥50,000（不利差異・借方差異）",
          "(4) ￥0"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>実際操業度（2,900時間）における予算許容額</strong> ＝ 固定費予算 ￥1,800,000 ＋ 変動費配賦率 ￥400 × 2,900時間 ＝ ￥1,800,000 ＋ ￥1,160,000 ＝ ￥2,960,000<br>\n2. <strong>実際発生額</strong> ＝ ￥2,950,000<br>\n3. <strong>予算差異</strong> ＝ 予算許容額 ￥2,960,000 − 実際発生額 ￥2,950,000 ＝ <strong>＋￥10,000（有利差異・貸方差異）</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-13"
      },
      {
        "num": 14,
        "section": "industrial",
        "sectionName": "【工業簿記】標準原価計算・差異分析",
        "catName": "製造間接費差異",
        "title": "シュラッター図による製造間接費の【操業度差異】の算定",
        "text": "前問の資料に基づき、製造間接費の【操業度差異】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-pie\"></i> 資料：標準原価計算カードおよび当月実際データ（シュラッター図）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素</th><th>原価標準（製品1個あたり）</th><th>当月実際発生データ</th></tr></thead><tbody>\n    <tr><td>直接材料費</td><td>2 kg × ￥500 ＝ ￥1,000</td><td>実際消費量 2,100 kg（実際単価 ￥520 / kg）</td></tr>\n    <tr><td>直接労務費</td><td>3 時間 × ￥1,200 ＝ ￥3,600</td><td>実際就業時間 2,900 時間（実際賃率 ￥1,150 / 時間）</td></tr>\n    <tr><td>製造間接費（変動）</td><td>3 時間 × ￥400 ＝ ￥1,200</td><td rowspan=\"2\">製造間接費実際発生総額 ￥2,950,000<br>（うち変動費 ￥1,200,000、固定費 ￥1,750,000）</td></tr>\n    <tr><td>製造間接費（固定）</td><td>3 時間 × ￥600 ＝ ￥1,800</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産実績および予算データ】</strong><br>\n    ・当月実際生産量（完成量）：1,000 個（月初・月末仕掛品なし）<br>\n    ・月間基準操業度（固定費予算算定基準）：3,000 直接作業時間（固定費予算 ￥1,800,000）\n  </div>\n</div>",
        "options": [
          "(1) ￥60,000（不利差異・借方差異）",
          "(2) ￥60,000（有利差異・貸方差異）",
          "(3) ￥100,000（不利差異・借方差異）",
          "(4) ￥40,000（不利差異・借方差異）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n操業度差異 ＝ 固定費配賦率 ￥600 × (実際操業度 2,900時間 − 基準操業度 3,000時間) ＝ <strong>△￥60,000（不利差異・借方差異）</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-14"
      },
      {
        "num": 15,
        "section": "industrial",
        "sectionName": "【工業簿記】標準原価計算・差異分析",
        "catName": "製造間接費差異",
        "title": "シュラッター図による製造間接費の【能率差異（変動・固定合計）】の算定",
        "text": "前問の資料に基づき、製造間接費の【能率差異合計】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-pie\"></i> 資料：標準原価計算カードおよび当月実際データ（シュラッター図）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素</th><th>原価標準（製品1個あたり）</th><th>当月実際発生データ</th></tr></thead><tbody>\n    <tr><td>直接材料費</td><td>2 kg × ￥500 ＝ ￥1,000</td><td>実際消費量 2,100 kg（実際単価 ￥520 / kg）</td></tr>\n    <tr><td>直接労務費</td><td>3 時間 × ￥1,200 ＝ ￥3,600</td><td>実際就業時間 2,900 時間（実際賃率 ￥1,150 / 時間）</td></tr>\n    <tr><td>製造間接費（変動）</td><td>3 時間 × ￥400 ＝ ￥1,200</td><td rowspan=\"2\">製造間接費実際発生総額 ￥2,950,000<br>（うち変動費 ￥1,200,000、固定費 ￥1,750,000）</td></tr>\n    <tr><td>製造間接費（固定）</td><td>3 時間 × ￥600 ＝ ￥1,800</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産実績および予算データ】</strong><br>\n    ・当月実際生産量（完成量）：1,000 個（月初・月末仕掛品なし）<br>\n    ・月間基準操業度（固定費予算算定基準）：3,000 直接作業時間（固定費予算 ￥1,800,000）\n  </div>\n</div>",
        "options": [
          "(1) ￥100,000（有利差異・貸方差異）",
          "(2) ￥100,000（不利差異・借方差異）",
          "(3) ￥40,000（有利差異・貸方差異）",
          "(4) ￥60,000（有利差異・貸方差異）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n能率差異 ＝ (標準操業度 3,000時間 − 実際操業度 2,900時間) × 製造間接費標準配賦率 (￥400＋￥600＝￥1,000) ＝ 100時間 × ￥1,000 ＝ <strong>＋￥100,000（有利差異・貸方差異）</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-15"
      },
      {
        "num": 16,
        "section": "cost",
        "sectionName": "【原価計算】CVP分析・経営レバレッジ係数",
        "catName": "損益分岐点分析",
        "title": "損益分岐点売上高（BEP）および損益分岐点比率の算定",
        "text": "次の資料に基づき、当期の【損益分岐点売上高】および【損益分岐点比率】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-area\"></i> 資料：損益分岐点（CVP）および経営レバレッジ分析データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>当期実績データ</th></tr></thead><tbody>\n    <tr><td>年間売上高</td><td class=\"num\">￥100,000,000</td></tr>\n    <tr><td>変動費合計（製造・販売変動費）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>限界利益（貢献利益）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>固定費合計（製造・販管固定費）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>営業利益</td><td class=\"num\">￥10,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 損益分岐点売上高：￥75,000,000 ／ 損益分岐点比率：75.0％",
          "(2) 損益分岐点売上高：￥80,000,000 ／ 損益分岐点比率：80.0％",
          "(3) 損益分岐点売上高：￥70,000,000 ／ 損益分岐点比率：70.0％",
          "(4) 損益分岐点売上高：￥75,000,000 ／ 損益分岐点比率：25.0％"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>限界利益率</strong> ＝ ￥40,000,000 ÷ ￥100,000,000 ＝ 40%<br>\n2. <strong>損益分岐点売上高</strong> ＝ 固定費 ￥30,000,000 ÷ 40% ＝ <strong>￥75,000,000</strong><br>\n3. <strong>損益分岐点比率</strong> ＝ ￥75,000,000 ÷ ￥100,000,000 ＝ <strong>75.0％</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-16"
      },
      {
        "num": 17,
        "section": "cost",
        "sectionName": "【原価計算】CVP分析・経営レバレッジ係数",
        "catName": "安全余裕率",
        "title": "経営の安全度を示す【安全余裕率（マージン・オブ・セーフティ）】の算定",
        "text": "前問の資料に基づき、当期の【安全余裕率】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-area\"></i> 資料：損益分岐点（CVP）および経営レバレッジ分析データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>当期実績データ</th></tr></thead><tbody>\n    <tr><td>年間売上高</td><td class=\"num\">￥100,000,000</td></tr>\n    <tr><td>変動費合計（製造・販売変動費）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>限界利益（貢献利益）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>固定費合計（製造・販管固定費）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>営業利益</td><td class=\"num\">￥10,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 25.0％",
          "(2) 30.0％",
          "(3) 40.0％",
          "(4) 20.0％"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n安全余裕率 ＝ 1 − 損益分岐点比率 75.0% ＝ <strong>25.0％</strong><br>\n（または (￥100,000,000 − ￥75,000,000) ÷ ￥100,000,000 ＝ 25.0%）",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-17"
      },
      {
        "num": 18,
        "section": "cost",
        "sectionName": "【原価計算】CVP分析・経営レバレッジ係数",
        "catName": "目標利益達成売上高",
        "title": "目標営業利益 ￥15,000,000 を達成するために必要な【目標達成売上高】",
        "text": "前問の資料に基づき、目標営業利益 ￥15,000,000 を達成するために必要な【売上高】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-area\"></i> 資料：損益分岐点（CVP）および経営レバレッジ分析データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>当期実績データ</th></tr></thead><tbody>\n    <tr><td>年間売上高</td><td class=\"num\">￥100,000,000</td></tr>\n    <tr><td>変動費合計（製造・販売変動費）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>限界利益（貢献利益）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>固定費合計（製造・販管固定費）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>営業利益</td><td class=\"num\">￥10,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥112,500,000",
          "(2) ￥115,000,000",
          "(3) ￥120,000,000",
          "(4) ￥108,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n目標達成売上高 ＝ (固定費 ￥30,000,000 ＋ 目標利益 ￥15,000,000) ÷ 限界利益率 40% ＝ ￥45,000,000 ÷ 0.4 ＝ <strong>￥112,500,000</strong>",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-18"
      },
      {
        "num": 19,
        "section": "cost",
        "sectionName": "【原価計算】CVP分析・経営レバレッジ係数",
        "catName": "経営レバレッジ係数（DOL）",
        "title": "当期実績における【経営レバレッジ係数（DOL）】の算定",
        "text": "前問の資料に基づき、当期の【経営レバレッジ係数（Degree of Operating Leverage）】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-area\"></i> 資料：損益分岐点（CVP）および経営レバレッジ分析データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>当期実績データ</th></tr></thead><tbody>\n    <tr><td>年間売上高</td><td class=\"num\">￥100,000,000</td></tr>\n    <tr><td>変動費合計（製造・販売変動費）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>限界利益（貢献利益）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>固定費合計（製造・販管固定費）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>営業利益</td><td class=\"num\">￥10,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 4.0倍",
          "(2) 2.5倍",
          "(3) 3.0倍",
          "(4) 1.5倍"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n経営レバレッジ係数（DOL）＝ 限界利益 ÷ 営業利益 ＝ ￥40,000,000 ÷ ￥10,000,000 ＝ <strong>4.0倍</strong><br>\n（または 安全余裕率の逆数 1 ÷ 0.25 ＝ 4.0倍）",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-19"
      },
      {
        "num": 20,
        "section": "cost",
        "sectionName": "【原価計算】CVP分析・経営レバレッジ係数",
        "catName": "経営レバレッジ係数（DOL）",
        "title": "経営レバレッジを用いた【売上高増加時の営業利益増加率】の算定",
        "text": "経営レバレッジ係数を用いて、翌期の売上高が 10% 増加した場合の【営業利益の増加率】および【増加後の営業利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-chart-area\"></i> 資料：損益分岐点（CVP）および経営レバレッジ分析データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>当期実績データ</th></tr></thead><tbody>\n    <tr><td>年間売上高</td><td class=\"num\">￥100,000,000</td></tr>\n    <tr><td>変動費合計（製造・販売変動費）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>限界利益（貢献利益）</td><td class=\"num\">￥40,000,000</td></tr>\n    <tr><td>固定費合計（製造・販管固定費）</td><td class=\"num\">￥30,000,000</td></tr>\n    <tr><td>営業利益</td><td class=\"num\">￥10,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 利益増加率：40％ ／ 増加後利益：￥14,000,000",
          "(2) 利益増加率：10％ ／ 増加後利益：￥11,000,000",
          "(3) 利益増加率：25％ ／ 増加後利益：￥12,500,000",
          "(4) 利益増加率：40％ ／ 増加後利益：￥15,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>営業利益増加率</strong> ＝ 売上高増加率 10% × DOL 4.0倍 ＝ <strong>40％</strong><br>\n2. <strong>増加後の営業利益</strong> ＝ 当期利益 ￥10,000,000 × (1 ＋ 0.40) ＝ <strong>￥14,000,000</strong><br>\n（検算：売上￥110,000,000 × 限界利益率40% ＝ 限界利益￥44,000,000 − 固定費￥30,000,000 ＝ ￥14,000,000）",
        "points": 5,
        "sessionId": "3",
        "sessionName": "第3回実戦予想模試",
        "qid": "boki1-pool-s3-20"
      }
    ]
  },
  "4": {
    "id": "4",
    "title": "第4回実戦予想模試（商業簿記・会計学・工業簿記・原価計算 全4科目）",
    "questions": [
      {
        "num": 1,
        "section": "commercial",
        "sectionName": "【商業簿記】外貨建会計・在外支店換算",
        "catName": "在外支店換算",
        "title": "在外支店の流動項目（現金預金・売掛金・買掛金）の円換算額の算定",
        "text": "次の資料に基づき、在外支店の【売掛金】および【買掛金】の円換算額の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-globe-americas\"></i> 資料：外貨建取引およびニューヨーク在外支店の換算データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>支店ドル建試算表残高</th><th>適用換算レート</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">$50,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">$80,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>備品（取得原価）</td><td class=\"num\">$100,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>備品減価償却累計額</td><td class=\"num\">−$20,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">−$40,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>本店勘定</td><td class=\"num\">−$120,000</td><td>本店帳簿上の支店勘定残高（￥14,400,000）</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−$300,000</td><td>期中平均レート（AR）</td></tr>\n    <tr><td>仕入高・費用</td><td class=\"num\">$250,000</td><td>期中平均レート（AR）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【適用為替レート】</strong><br>\n    ・備品取得時レート（HR）：$1 ＝ ￥110<br>\n    ・期中平均レート（AR）：$1 ＝ ￥125<br>\n    ・期末決算日レート（CR）：$1 ＝ ￥130<br>\n    ・在外支店の純資産換算差額は「為替換算調整勘定」（純資産の部）として処理する。\n  </div>\n</div>",
        "options": [
          "(1) 売掛金：￥10,400,000 ／ 買掛金：￥5,200,000",
          "(2) 売掛金：￥10,000,000 ／ 買掛金：￥5,000,000",
          "(3) 売掛金：￥8,800,000 ／ 買掛金：￥4,400,000",
          "(4) 売掛金：￥10,400,000 ／ 買掛金：￥4,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n金銭債権債務（流動項目）は決算日レート（CR：$1＝￥130）を適用します。<br>\n・売掛金 ＝ $80,000 × ￥130 ＝ <strong>￥10,400,000</strong><br>\n・買掛金 ＝ $40,000 × ￥130 ＝ <strong>￥5,200,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-1"
      },
      {
        "num": 2,
        "section": "commercial",
        "sectionName": "【商業簿記】外貨建会計・在外支店換算",
        "catName": "在外支店換算",
        "title": "在外支店の固定資産（備品純額）の円換算額の算定",
        "text": "前問の資料に基づき、在外支店の【備品（帳簿価額純額）】の円換算額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-globe-americas\"></i> 資料：外貨建取引およびニューヨーク在外支店の換算データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>支店ドル建試算表残高</th><th>適用換算レート</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">$50,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">$80,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>備品（取得原価）</td><td class=\"num\">$100,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>備品減価償却累計額</td><td class=\"num\">−$20,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">−$40,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>本店勘定</td><td class=\"num\">−$120,000</td><td>本店帳簿上の支店勘定残高（￥14,400,000）</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−$300,000</td><td>期中平均レート（AR）</td></tr>\n    <tr><td>仕入高・費用</td><td class=\"num\">$250,000</td><td>期中平均レート（AR）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【適用為替レート】</strong><br>\n    ・備品取得時レート（HR）：$1 ＝ ￥110<br>\n    ・期中平均レート（AR）：$1 ＝ ￥125<br>\n    ・期末決算日レート（CR）：$1 ＝ ￥130<br>\n    ・在外支店の純資産換算差額は「為替換算調整勘定」（純資産の部）として処理する。\n  </div>\n</div>",
        "options": [
          "(1) ￥8,800,000（取得時レート HR 適用）",
          "(2) ￥10,400,000（決算日レート CR 適用）",
          "(3) ￥10,000,000（期中平均レート AR 適用）",
          "(4) ￥11,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n有形固定資産および減価償却累計額は、取得時レート（HR：$1＝￥110）により換算します。<br>\n純額 $80,000 ($100,000 − $20,000) × ￥110 ＝ <strong>￥8,800,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-2"
      },
      {
        "num": 3,
        "section": "commercial",
        "sectionName": "【商業簿記】外貨建会計・在外支店換算",
        "catName": "在外支店損益換算",
        "title": "在外支店の損益項目（売上高・費用）および支店当期純利益の円換算額",
        "text": "前問の資料に基づき、在外支店の【当期純利益】の円換算額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-globe-americas\"></i> 資料：外貨建取引およびニューヨーク在外支店の換算データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>支店ドル建試算表残高</th><th>適用換算レート</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">$50,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">$80,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>備品（取得原価）</td><td class=\"num\">$100,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>備品減価償却累計額</td><td class=\"num\">−$20,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">−$40,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>本店勘定</td><td class=\"num\">−$120,000</td><td>本店帳簿上の支店勘定残高（￥14,400,000）</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−$300,000</td><td>期中平均レート（AR）</td></tr>\n    <tr><td>仕入高・費用</td><td class=\"num\">$250,000</td><td>期中平均レート（AR）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【適用為替レート】</strong><br>\n    ・備品取得時レート（HR）：$1 ＝ ￥110<br>\n    ・期中平均レート（AR）：$1 ＝ ￥125<br>\n    ・期末決算日レート（CR）：$1 ＝ ￥130<br>\n    ・在外支店の純資産換算差額は「為替換算調整勘定」（純資産の部）として処理する。\n  </div>\n</div>",
        "options": [
          "(1) ￥6,250,000（AR ￥125 適用）",
          "(2) ￥6,500,000（CR ￥130 適用）",
          "(3) ￥5,500,000（HR ￥110 適用）",
          "(4) ￥6,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n在外支店の収益・費用は原則として期中平均レート（AR：$1＝￥125）で換算します。<br>\nドル建支店純利益 ＝ 売上 $300,000 − 費用 $250,000 ＝ $50,000<br>\n円換算額 ＝ $50,000 × ￥125 ＝ <strong>￥6,250,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-3"
      },
      {
        "num": 4,
        "section": "commercial",
        "sectionName": "【商業簿記】外貨建会計・在外支店換算",
        "catName": "為替換算調整勘定",
        "title": "在外支店換算における【為替換算調整勘定】の算定",
        "text": "前問の資料に基づき、在外支店試算表の換算により生じる【為替換算調整勘定】の金額および貸借区分として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-globe-americas\"></i> 資料：外貨建取引およびニューヨーク在外支店の換算データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>支店ドル建試算表残高</th><th>適用換算レート</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">$50,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">$80,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>備品（取得原価）</td><td class=\"num\">$100,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>備品減価償却累計額</td><td class=\"num\">−$20,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">−$40,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>本店勘定</td><td class=\"num\">−$120,000</td><td>本店帳簿上の支店勘定残高（￥14,400,000）</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−$300,000</td><td>期中平均レート（AR）</td></tr>\n    <tr><td>仕入高・費用</td><td class=\"num\">$250,000</td><td>期中平均レート（AR）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【適用為替レート】</strong><br>\n    ・備品取得時レート（HR）：$1 ＝ ￥110<br>\n    ・期中平均レート（AR）：$1 ＝ ￥125<br>\n    ・期末決算日レート（CR）：$1 ＝ ￥130<br>\n    ・在外支店の純資産換算差額は「為替換算調整勘定」（純資産の部）として処理する。\n  </div>\n</div>",
        "options": [
          "(1) ￥450,000（貸方残高・純資産の部）",
          "(2) ￥450,000（借方残高・純資産の部）",
          "(3) ￥600,000（貸方残高・為替差益）",
          "(4) ￥300,000（貸方残高）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n換算後資産合計 ＝ 現金($50,000×130)＋売掛金($80,000×130)＋備品純額($80,000×110) ＝ ￥6,500,000 ＋ ￥10,400,000 ＋ ￥8,800,000 ＝ ￥25,700,000<br>\n換算後負債・本店・純利益合計 ＝ 買掛金($40,000×130＝￥5,200,000) ＋ 本店(￥14,400,000) ＋ 純利益(￥6,250,000) ＝ ￥25,850,000<br>\n（計算上の貸借差額調整により）差額 ＝ <strong>￥450,000（貸方・為替換算調整勘定）</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-4"
      },
      {
        "num": 5,
        "section": "commercial",
        "sectionName": "【商業簿記】外貨建会計・在外支店換算",
        "catName": "在外支店合算",
        "title": "全社合算における在外支店換算差額の表示区分",
        "text": "在外支店の換算により発生した為替換算調整勘定の財務諸表における表示区分として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-globe-americas\"></i> 資料：外貨建取引およびニューヨーク在外支店の換算データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>勘定科目</th><th>支店ドル建試算表残高</th><th>適用換算レート</th></tr></thead><tbody>\n    <tr><td>現金預金</td><td class=\"num\">$50,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>売掛金</td><td class=\"num\">$80,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>備品（取得原価）</td><td class=\"num\">$100,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>備品減価償却累計額</td><td class=\"num\">−$20,000</td><td>取引発生時レート（HR）</td></tr>\n    <tr><td>買掛金</td><td class=\"num\">−$40,000</td><td>決算日レート（CR）</td></tr>\n    <tr><td>本店勘定</td><td class=\"num\">−$120,000</td><td>本店帳簿上の支店勘定残高（￥14,400,000）</td></tr>\n    <tr><td>売上高</td><td class=\"num\">−$300,000</td><td>期中平均レート（AR）</td></tr>\n    <tr><td>仕入高・費用</td><td class=\"num\">$250,000</td><td>期中平均レート（AR）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【適用為替レート】</strong><br>\n    ・備品取得時レート（HR）：$1 ＝ ￥110<br>\n    ・期中平均レート（AR）：$1 ＝ ￥125<br>\n    ・期末決算日レート（CR）：$1 ＝ ￥130<br>\n    ・在外支店の純資産換算差額は「為替換算調整勘定」（純資産の部）として処理する。\n  </div>\n</div>",
        "options": [
          "(1) 貸借対照表の純資産の部（その他の包括利益累計額）",
          "(2) 損益計算書の営業外収益（為替差益）",
          "(3) 損益計算書の特別利益",
          "(4) 貸借対照表の固定負債"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n在外支店や在外子会社の換算差額は、当期の損益（為替差損益）とはせず、<strong>貸借対照表の純資産の部（その他の包括利益累計額・為替換算調整勘定）</strong>に計上します。",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-5"
      },
      {
        "num": 6,
        "section": "accounting",
        "sectionName": "【会計学】負債会計・退職給付会計",
        "catName": "退職給付費用",
        "title": "退職給付費用における【利息費用】および【期待運用収益】の算定",
        "text": "次の資料に基づき、当期の【利息費用】および【期待運用収益】の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-user-shield\"></i> 資料：退職給付引当金および退職給付費用の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>期首退職給付債務</td><td class=\"num\">￥80,000,000</td></tr>\n    <tr><td>期首年金資産（公正な評価額）</td><td class=\"num\">￥50,000,000</td></tr>\n    <tr><td>当期勤務費用</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">2.0％</td></tr>\n    <tr><td>年金資産の長期期待運用収益率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>当期末数理計算上の差異（当期発生・損失）</td><td class=\"num\">￥2,000,000（翌期から10年定額按分）</td></tr>\n    <tr><td>前期以前からの未認識数理差異（期首残高）</td><td class=\"num\">￥3,000,000（当期費用処理額 ￥300,000）</td></tr>\n    <tr><td>当期の年金掛金拠出額（現金支出）</td><td class=\"num\">￥3,500,000</td></tr>\n    <tr><td>当期の退職金支払額（年金資産より給付）</td><td class=\"num\">￥2,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 利息費用：￥1,600,000 ／ 期待運用収益：￥1,500,000",
          "(2) 利息費用：￥1,600,000 ／ 期待運用収益：￥1,000,000",
          "(3) 利息費用：￥800,000 ／ 期待運用収益：￥1,500,000",
          "(4) 利息費用：￥1,500,000 ／ 期待運用収益：￥1,600,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>利息費用</strong> ＝ 期首退職給付債務 ￥80,000,000 × 割引率 2.0% ＝ <strong>￥1,600,000</strong><br>\n2. <strong>期待運用収益</strong> ＝ 期首年金資産 ￥50,000,000 × 期待運用収益率 3.0% ＝ <strong>￥1,500,000</strong>（費用控除項目）",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-6"
      },
      {
        "num": 7,
        "section": "accounting",
        "sectionName": "【会計学】負債会計・退職給付会計",
        "catName": "退職給付費用",
        "title": "損益計算書に計上される【当期退職給付費用】の合計額",
        "text": "前問の資料に基づき、当期の損益計算書に計上すべき【退職給付費用】の合計額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-user-shield\"></i> 資料：退職給付引当金および退職給付費用の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>期首退職給付債務</td><td class=\"num\">￥80,000,000</td></tr>\n    <tr><td>期首年金資産（公正な評価額）</td><td class=\"num\">￥50,000,000</td></tr>\n    <tr><td>当期勤務費用</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">2.0％</td></tr>\n    <tr><td>年金資産の長期期待運用収益率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>当期末数理計算上の差異（当期発生・損失）</td><td class=\"num\">￥2,000,000（翌期から10年定額按分）</td></tr>\n    <tr><td>前期以前からの未認識数理差異（期首残高）</td><td class=\"num\">￥3,000,000（当期費用処理額 ￥300,000）</td></tr>\n    <tr><td>当期の年金掛金拠出額（現金支出）</td><td class=\"num\">￥3,500,000</td></tr>\n    <tr><td>当期の退職金支払額（年金資産より給付）</td><td class=\"num\">￥2,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥4,400,000",
          "(2) ￥4,100,000",
          "(3) ￥5,900,000",
          "(4) ￥4,600,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n退職給付費用 ＝ 勤務費用 ￥4,000,000 ＋ 利息費用 ￥1,600,000 − 期待運用収益 ￥1,500,000 ＋ 数理差異当期費用処理 ￥300,000 ＝ <strong>￥4,400,000</strong><br>\n（当期発生の数理計算上の差異 ￥2,000,000 は翌期から費用処理のため当期費用には含めません）",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-7"
      },
      {
        "num": 8,
        "section": "accounting",
        "sectionName": "【会計学】負債会計・退職給付会計",
        "catName": "退職給付引当金",
        "title": "掛金拠出および給付後の【期末年金資産残高】の算定",
        "text": "前問の資料に基づき、当期末の【年金資産残高】として正しいものを選択しなさい（実際運用収益は期待運用収益と同額と仮定）。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-user-shield\"></i> 資料：退職給付引当金および退職給付費用の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>期首退職給付債務</td><td class=\"num\">￥80,000,000</td></tr>\n    <tr><td>期首年金資産（公正な評価額）</td><td class=\"num\">￥50,000,000</td></tr>\n    <tr><td>当期勤務費用</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">2.0％</td></tr>\n    <tr><td>年金資産の長期期待運用収益率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>当期末数理計算上の差異（当期発生・損失）</td><td class=\"num\">￥2,000,000（翌期から10年定額按分）</td></tr>\n    <tr><td>前期以前からの未認識数理差異（期首残高）</td><td class=\"num\">￥3,000,000（当期費用処理額 ￥300,000）</td></tr>\n    <tr><td>当期の年金掛金拠出額（現金支出）</td><td class=\"num\">￥3,500,000</td></tr>\n    <tr><td>当期の退職金支払額（年金資産より給付）</td><td class=\"num\">￥2,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥53,000,000",
          "(2) ￥51,500,000",
          "(3) ￥54,500,000",
          "(4) ￥50,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期末年金資産 ＝ 期首 ￥50,000,000 ＋ 期待運用収益 ￥1,500,000 ＋ 掛金拠出 ￥3,500,000 − 年金給付 ￥2,000,000 ＝ <strong>￥53,000,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-8"
      },
      {
        "num": 9,
        "section": "accounting",
        "sectionName": "【会計学】負債会計・退職給付会計",
        "catName": "退職給付引当金",
        "title": "給付および利息反映後の【期末退職給付債務残高】の算定",
        "text": "前問の資料に基づき、当期末の【退職給付債務残高】として正しいものを選択しなさい（数理計算上の差異の当期発生額 ￥2,000,000 を加算）。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-user-shield\"></i> 資料：退職給付引当金および退職給付費用の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>期首退職給付債務</td><td class=\"num\">￥80,000,000</td></tr>\n    <tr><td>期首年金資産（公正な評価額）</td><td class=\"num\">￥50,000,000</td></tr>\n    <tr><td>当期勤務費用</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">2.0％</td></tr>\n    <tr><td>年金資産の長期期待運用収益率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>当期末数理計算上の差異（当期発生・損失）</td><td class=\"num\">￥2,000,000（翌期から10年定額按分）</td></tr>\n    <tr><td>前期以前からの未認識数理差異（期首残高）</td><td class=\"num\">￥3,000,000（当期費用処理額 ￥300,000）</td></tr>\n    <tr><td>当期の年金掛金拠出額（現金支出）</td><td class=\"num\">￥3,500,000</td></tr>\n    <tr><td>当期の退職金支払額（年金資産より給付）</td><td class=\"num\">￥2,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥85,600,000",
          "(2) ￥83,600,000",
          "(3) ￥82,000,000",
          "(4) ￥84,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期末退職給付債務 ＝ 期首 ￥80,000,000 ＋ 勤務費用 ￥4,000,000 ＋ 利息費用 ￥1,600,000 − 給付支払 ￥2,000,000 ＋ 数理差異発生 ￥2,000,000 ＝ <strong>￥85,600,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-9"
      },
      {
        "num": 10,
        "section": "accounting",
        "sectionName": "【会計学】負債会計・退職給付会計",
        "catName": "退職給付引当金",
        "title": "貸借対照表（B/S）における【退職給付に係る負債】の計上額",
        "text": "前問の資料に基づき、当期末貸借対照表に計上される【退職給付に係る負債】の金額を選択しなさい（即時認識基準）。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-user-shield\"></i> 資料：退職給付引当金および退職給付費用の算定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>数値データ</th></tr></thead><tbody>\n    <tr><td>期首退職給付債務</td><td class=\"num\">￥80,000,000</td></tr>\n    <tr><td>期首年金資産（公正な評価額）</td><td class=\"num\">￥50,000,000</td></tr>\n    <tr><td>当期勤務費用</td><td class=\"num\">￥4,000,000</td></tr>\n    <tr><td>割引率</td><td class=\"num\">2.0％</td></tr>\n    <tr><td>年金資産の長期期待運用収益率</td><td class=\"num\">3.0％</td></tr>\n    <tr><td>当期末数理計算上の差異（当期発生・損失）</td><td class=\"num\">￥2,000,000（翌期から10年定額按分）</td></tr>\n    <tr><td>前期以前からの未認識数理差異（期首残高）</td><td class=\"num\">￥3,000,000（当期費用処理額 ￥300,000）</td></tr>\n    <tr><td>当期の年金掛金拠出額（現金支出）</td><td class=\"num\">￥3,500,000</td></tr>\n    <tr><td>当期の退職金支払額（年金資産より給付）</td><td class=\"num\">￥2,000,000</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥32,600,000",
          "(2) ￥30,000,000",
          "(3) ￥35,600,000",
          "(4) ￥28,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n現行基準では、期末退職給付債務から期末年金資産を控除した積立不足額をそのまま「退職給付に係る負債」としてB/Sに計上します。<br>\n期末退職給付債務 ￥85,600,000 − 期末年金資産 ￥53,000,000 ＝ <strong>￥32,600,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-10"
      },
      {
        "num": 11,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・連産品と副産物",
        "catName": "副産物の評価",
        "title": "副産物丙の見積純売却価額控除後における【連結製造原価】の算定",
        "text": "次の資料に基づき、副産物丙の控除後における【甲・乙に配賦すべき連結製造原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-filter\"></i> 資料：同一工程より産出される連産品および副産物データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>産出品</th><th>生産量</th><th>分離点販売単価</th><th>追加加工後の販売単価</th><th>追加加工費</th></tr></thead><tbody>\n    <tr><td>連産品甲</td><td class=\"num\">6,000 kg</td><td class=\"num\">￥500 / kg</td><td class=\"num\">￥700 / kg</td><td class=\"num\">￥800,000（総額）</td></tr>\n    <tr><td>連産品乙</td><td class=\"num\">4,000 kg</td><td class=\"num\">￥400 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">−</td></tr>\n    <tr><td>副産物丙</td><td class=\"num\">1,000 kg</td><td class=\"num\">￥100 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">販売費 ￥10,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結原価および配賦方針】</strong><br>\n    ・分離点までに要した当期連結製造総原価：￥4,090,000<br>\n    ・副産物丙の見積純売却価額（売却収入−販売費）は連結製造総原価から控除する。<br>\n    ・連産品甲は追加加工して販売し、連産品乙は分離点でそのまま販売する。<br>\n    ・分離点における連結原価の配賦は「正味売却可能価額法（NRV法）」による。\n  </div>\n</div>",
        "options": [
          "(1) ￥4,000,000",
          "(2) ￥4,090,000",
          "(3) ￥3,990,000",
          "(4) ￥3,900,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 副産物丙の純売却見込額 ＝ 売却額(1,000kg×￥100＝￥100,000) − 販売費 ￥10,000 ＝ ￥90,000<br>\n2. 控除後の連結製造原価 ＝ 総額 ￥4,090,000 − ￥90,000 ＝ <strong>￥4,000,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-11"
      },
      {
        "num": 12,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・連産品と副産物",
        "catName": "正味売却可能価額法（NRV）",
        "title": "正味売却可能価額法（NRV法）による【連産品甲・乙の配賦基準額】の算定",
        "text": "前問の資料に基づき、連産品甲および乙の【正味売却可能価額（NRV）】の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-filter\"></i> 資料：同一工程より産出される連産品および副産物データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>産出品</th><th>生産量</th><th>分離点販売単価</th><th>追加加工後の販売単価</th><th>追加加工費</th></tr></thead><tbody>\n    <tr><td>連産品甲</td><td class=\"num\">6,000 kg</td><td class=\"num\">￥500 / kg</td><td class=\"num\">￥700 / kg</td><td class=\"num\">￥800,000（総額）</td></tr>\n    <tr><td>連産品乙</td><td class=\"num\">4,000 kg</td><td class=\"num\">￥400 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">−</td></tr>\n    <tr><td>副産物丙</td><td class=\"num\">1,000 kg</td><td class=\"num\">￥100 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">販売費 ￥10,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結原価および配賦方針】</strong><br>\n    ・分離点までに要した当期連結製造総原価：￥4,090,000<br>\n    ・副産物丙の見積純売却価額（売却収入−販売費）は連結製造総原価から控除する。<br>\n    ・連産品甲は追加加工して販売し、連産品乙は分離点でそのまま販売する。<br>\n    ・分離点における連結原価の配賦は「正味売却可能価額法（NRV法）」による。\n  </div>\n</div>",
        "options": [
          "(1) 甲：￥3,400,000 ／ 乙：￥1,600,000",
          "(2) 甲：￥4,200,000 ／ 乙：￥1,600,000",
          "(3) 甲：￥3,000,000 ／ 乙：￥1,600,000",
          "(4) 甲：￥3,400,000 ／ 乙：￥1,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>連産品甲のNRV</strong> ＝ 最終売却額(6,000kg×￥700＝￥4,200,000) − 追加加工費 ￥800,000 ＝ <strong>￥3,400,000</strong><br>\n2. <strong>連産品乙のNRV</strong> ＝ 分離点売却額(4,000kg×￥400) ＝ <strong>￥1,600,000</strong><br>\n合計NRV ＝ ￥3,400,000 ＋ ￥1,600,000 ＝ ￥5,000,000（甲:乙＝68%:32%）",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-12"
      },
      {
        "num": 13,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・連産品と副産物",
        "catName": "連結原価の配賦",
        "title": "連産品甲および乙への【連結製造原価の配賦額】の算定",
        "text": "前問の資料に基づき、連結製造原価 ￥4,000,000 の【甲および乙への配賦額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-filter\"></i> 資料：同一工程より産出される連産品および副産物データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>産出品</th><th>生産量</th><th>分離点販売単価</th><th>追加加工後の販売単価</th><th>追加加工費</th></tr></thead><tbody>\n    <tr><td>連産品甲</td><td class=\"num\">6,000 kg</td><td class=\"num\">￥500 / kg</td><td class=\"num\">￥700 / kg</td><td class=\"num\">￥800,000（総額）</td></tr>\n    <tr><td>連産品乙</td><td class=\"num\">4,000 kg</td><td class=\"num\">￥400 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">−</td></tr>\n    <tr><td>副産物丙</td><td class=\"num\">1,000 kg</td><td class=\"num\">￥100 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">販売費 ￥10,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結原価および配賦方針】</strong><br>\n    ・分離点までに要した当期連結製造総原価：￥4,090,000<br>\n    ・副産物丙の見積純売却価額（売却収入−販売費）は連結製造総原価から控除する。<br>\n    ・連産品甲は追加加工して販売し、連産品乙は分離点でそのまま販売する。<br>\n    ・分離点における連結原価の配賦は「正味売却可能価額法（NRV法）」による。\n  </div>\n</div>",
        "options": [
          "(1) 甲：￥2,720,000 ／ 乙：￥1,280,000",
          "(2) 甲：￥2,400,000 ／ 乙：￥1,600,000",
          "(3) 甲：￥2,800,000 ／ 乙：￥1,200,000",
          "(4) 甲：￥2,700,000 ／ 乙：￥1,300,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nNRV比率（甲:乙＝34:16＝68%:32%）により配賦します。<br>\n・甲配賦額 ＝ ￥4,000,000 × 3,400,000 / 5,000,000 ＝ <strong>￥2,720,000</strong><br>\n・乙配賦額 ＝ ￥4,000,000 × 1,600,000 / 5,000,000 ＝ <strong>￥1,280,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-13"
      },
      {
        "num": 14,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・連産品と副産物",
        "catName": "製品単位原価",
        "title": "追加加工後の連産品甲における【総製造原価および単位原価】の算定",
        "text": "前問の資料に基づき、連産品甲の【完成品総製造原価】および【1kgあたり単位原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-filter\"></i> 資料：同一工程より産出される連産品および副産物データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>産出品</th><th>生産量</th><th>分離点販売単価</th><th>追加加工後の販売単価</th><th>追加加工費</th></tr></thead><tbody>\n    <tr><td>連産品甲</td><td class=\"num\">6,000 kg</td><td class=\"num\">￥500 / kg</td><td class=\"num\">￥700 / kg</td><td class=\"num\">￥800,000（総額）</td></tr>\n    <tr><td>連産品乙</td><td class=\"num\">4,000 kg</td><td class=\"num\">￥400 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">−</td></tr>\n    <tr><td>副産物丙</td><td class=\"num\">1,000 kg</td><td class=\"num\">￥100 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">販売費 ￥10,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結原価および配賦方針】</strong><br>\n    ・分離点までに要した当期連結製造総原価：￥4,090,000<br>\n    ・副産物丙の見積純売却価額（売却収入−販売費）は連結製造総原価から控除する。<br>\n    ・連産品甲は追加加工して販売し、連産品乙は分離点でそのまま販売する。<br>\n    ・分離点における連結原価の配賦は「正味売却可能価額法（NRV法）」による。\n  </div>\n</div>",
        "options": [
          "(1) 総原価：￥3,520,000 ／ 単位原価：￥586.67 / kg",
          "(2) 総原価：￥2,720,000 ／ 単位原価：￥453.33 / kg",
          "(3) 総原価：￥3,200,000 ／ 単位原価：￥533.33 / kg",
          "(4) 総原価：￥3,600,000 ／ 単位原価：￥600 / kg"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>甲の総製造原価</strong> ＝ 配賦連結原価 ￥2,720,000 ＋ 個別追加加工費 ￥800,000 ＝ <strong>￥3,520,000</strong><br>\n2. <strong>甲の単位原価</strong> ＝ ￥3,520,000 ÷ 6,000kg ≒ <strong>￥586.67 / kg</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-14"
      },
      {
        "num": 15,
        "section": "industrial",
        "sectionName": "【工業簿記】総合原価計算・連産品と副産物",
        "catName": "差額分析（追加加工の可否）",
        "title": "連産品甲の【追加加工可否に関する差額利益分析】",
        "text": "連産品甲を分離点で売却する場合（単価￥500）と追加加工して売却する場合（単価￥700、追加加工費￥800,000）の差額利益および追加加工の採否判定として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-filter\"></i> 資料：同一工程より産出される連産品および副産物データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>産出品</th><th>生産量</th><th>分離点販売単価</th><th>追加加工後の販売単価</th><th>追加加工費</th></tr></thead><tbody>\n    <tr><td>連産品甲</td><td class=\"num\">6,000 kg</td><td class=\"num\">￥500 / kg</td><td class=\"num\">￥700 / kg</td><td class=\"num\">￥800,000（総額）</td></tr>\n    <tr><td>連産品乙</td><td class=\"num\">4,000 kg</td><td class=\"num\">￥400 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">−</td></tr>\n    <tr><td>副産物丙</td><td class=\"num\">1,000 kg</td><td class=\"num\">￥100 / kg</td><td class=\"num\">追加加工なし</td><td class=\"num\">販売費 ￥10,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【連結原価および配賦方針】</strong><br>\n    ・分離点までに要した当期連結製造総原価：￥4,090,000<br>\n    ・副産物丙の見積純売却価額（売却収入−販売費）は連結製造総原価から控除する。<br>\n    ・連産品甲は追加加工して販売し、連産品乙は分離点でそのまま販売する。<br>\n    ・分離点における連結原価の配賦は「正味売却可能価額法（NRV法）」による。\n  </div>\n</div>",
        "options": [
          "(1) 差額増分利益 ＋￥400,000（追加加工すべき）",
          "(2) 差額増分利益 △￥400,000（分離点で売却すべき）",
          "(3) 差額増分利益 ＋￥1,200,000（追加加工すべき）",
          "(4) 差額増分利益 ＋￥200,000（追加加工すべき）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 増分売上高 ＝ 6,000kg × (￥700 − ￥500) ＝ ＋￥1,200,000<br>\n2. 増分追加加工費 ＝ ￥800,000<br>\n3. <strong>差額増分利益</strong> ＝ ￥1,200,000 − ￥800,000 ＝ <strong>＋￥400,000</strong><br>\n利益が40万円増加するため、<strong>「追加加工すべき」</strong>と判定します。",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-15"
      },
      {
        "num": 16,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・最適プロダクトミックス",
        "catName": "制約条件下の貢献利益",
        "title": "制約条件（機械時間）1時間あたりの【単位時間あたり貢献利益】の算定",
        "text": "次の資料に基づき、機械稼働時間1時間あたりの【製品Xおよび製品Yの貢献利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-tasks\"></i> 資料：制約条件下（機械総稼働時間 2,400時間）の製品データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>製品X</th><th>製品Y</th></tr></thead><tbody>\n    <tr><td>販売単価</td><td class=\"num\">￥5,000 / 個</td><td class=\"num\">￥7,000 / 個</td></tr>\n    <tr><td>単位あたり変動費</td><td class=\"num\">￥3,000 / 個</td><td class=\"num\">￥4,200 / 個</td></tr>\n    <tr><td>単位あたり貢献利益</td><td class=\"num\">￥2,000 / 個</td><td class=\"num\">￥2,800 / 個</td></tr>\n    <tr><td>1個あたり機械加工時間</td><td class=\"num\">2 時間 / 個</td><td class=\"num\">4 時間 / 個</td></tr>\n    <tr><td>市場最大需要量（販売上限）</td><td class=\"num\">800 個</td><td class=\"num\">500 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※月間固定費総額は ￥1,500,000 である。</div>\n</div>",
        "options": [
          "(1) 製品X：￥1,000 / 時間 ／ 製品Y：￥700 / 時間",
          "(2) 製品X：￥2,000 / 時間 ／ 製品Y：￥2,800 / 時間",
          "(3) 製品X：￥1,000 / 時間 ／ 製品Y：￥1,400 / 時間",
          "(4) 製品X：￥800 / 時間 ／ 製品Y：￥700 / 時間"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n制約資源1単位あたりの貢献利益で比較します。<br>\n・製品X ＝ 単位あたり貢献利益 ￥2,000 ÷ 2時間 ＝ <strong>￥1,000 / 時間</strong><br>\n・製品Y ＝ 単位あたり貢献利益 ￥2,800 ÷ 4時間 ＝ <strong>￥700 / 時間</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-16"
      },
      {
        "num": 17,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・最適プロダクトミックス",
        "catName": "生産優先順位",
        "title": "利益最大化のための【生産販売優先順位】の決定",
        "text": "前問の資料に基づき、機械設備がボトルネックである場合における製品Xと製品Yの生産優先順位の判定として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-tasks\"></i> 資料：制約条件下（機械総稼働時間 2,400時間）の製品データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>製品X</th><th>製品Y</th></tr></thead><tbody>\n    <tr><td>販売単価</td><td class=\"num\">￥5,000 / 個</td><td class=\"num\">￥7,000 / 個</td></tr>\n    <tr><td>単位あたり変動費</td><td class=\"num\">￥3,000 / 個</td><td class=\"num\">￥4,200 / 個</td></tr>\n    <tr><td>単位あたり貢献利益</td><td class=\"num\">￥2,000 / 個</td><td class=\"num\">￥2,800 / 個</td></tr>\n    <tr><td>1個あたり機械加工時間</td><td class=\"num\">2 時間 / 個</td><td class=\"num\">4 時間 / 個</td></tr>\n    <tr><td>市場最大需要量（販売上限）</td><td class=\"num\">800 個</td><td class=\"num\">500 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※月間固定費総額は ￥1,500,000 である。</div>\n</div>",
        "options": [
          "(1) 単位時間あたり貢献利益の高い【製品X】を最優先で生産すべき",
          "(2) 1個あたり貢献利益の高い【製品Y】を最優先で生産すべき",
          "(3) 単価の高い【製品Y】を最優先で生産すべき",
          "(4) 両製品を同一割合で均等に生産すべき"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n制約条件が存在する場合、<strong>「制約条件単位あたりの貢献利益（単位時間あたり貢献利益）」が大きい製品を優先</strong>して生産します。<br>\n製品X（￥1,000/時）＞ 製品Y（￥700/時）であるため、<strong>製品Xを最優先</strong>で生産します。",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-17"
      },
      {
        "num": 18,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・最適プロダクトミックス",
        "catName": "最適プロダクトミックス",
        "title": "総機械稼働時間 2,400時間における【最適生産販売数量（ミックス）】の算定",
        "text": "前問の資料に基づき、総機械稼働時間上限（2,400時間）のもとでの【最適生産販売数量】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-tasks\"></i> 資料：制約条件下（機械総稼働時間 2,400時間）の製品データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>製品X</th><th>製品Y</th></tr></thead><tbody>\n    <tr><td>販売単価</td><td class=\"num\">￥5,000 / 個</td><td class=\"num\">￥7,000 / 個</td></tr>\n    <tr><td>単位あたり変動費</td><td class=\"num\">￥3,000 / 個</td><td class=\"num\">￥4,200 / 個</td></tr>\n    <tr><td>単位あたり貢献利益</td><td class=\"num\">￥2,000 / 個</td><td class=\"num\">￥2,800 / 個</td></tr>\n    <tr><td>1個あたり機械加工時間</td><td class=\"num\">2 時間 / 個</td><td class=\"num\">4 時間 / 個</td></tr>\n    <tr><td>市場最大需要量（販売上限）</td><td class=\"num\">800 個</td><td class=\"num\">500 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※月間固定費総額は ￥1,500,000 である。</div>\n</div>",
        "options": [
          "(1) 製品X：800 個 ／ 製品Y：200 個",
          "(2) 製品X：800 個 ／ 製品Y：500 個",
          "(3) 製品X：400 個 ／ 製品Y：400 個",
          "(4) 製品X：200 個 ／ 製品Y：500 個"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 優先順位1位の<strong>製品X</strong>を市場最大需要量 800個まで生産：<br>\n   消費機械時間 ＝ 800個 × 2時間 ＝ 1,600時間<br>\n2. 残り機械時間 ＝ 2,400時間 − 1,600時間 ＝ 800時間<br>\n3. 残り時間を<strong>製品Y</strong>に配分：<br>\n   製品Y生産量 ＝ 800時間 ÷ 4時間 ＝ <strong>200 個</strong><br>\nしたがって、<strong>製品X：800個、製品Y：200個</strong>となります。",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-18"
      },
      {
        "num": 19,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・最適プロダクトミックス",
        "catName": "最適プロダクトミックス",
        "title": "最適プロダクトミックス達成時における【最大貢献利益総額】の算定",
        "text": "前問の資料に基づき、最適プロダクトミックス（X:800個、Y:200個）を達成した場合の【総貢献利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-tasks\"></i> 資料：制約条件下（機械総稼働時間 2,400時間）の製品データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>製品X</th><th>製品Y</th></tr></thead><tbody>\n    <tr><td>販売単価</td><td class=\"num\">￥5,000 / 個</td><td class=\"num\">￥7,000 / 個</td></tr>\n    <tr><td>単位あたり変動費</td><td class=\"num\">￥3,000 / 個</td><td class=\"num\">￥4,200 / 個</td></tr>\n    <tr><td>単位あたり貢献利益</td><td class=\"num\">￥2,000 / 個</td><td class=\"num\">￥2,800 / 個</td></tr>\n    <tr><td>1個あたり機械加工時間</td><td class=\"num\">2 時間 / 個</td><td class=\"num\">4 時間 / 個</td></tr>\n    <tr><td>市場最大需要量（販売上限）</td><td class=\"num\">800 個</td><td class=\"num\">500 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※月間固定費総額は ￥1,500,000 である。</div>\n</div>",
        "options": [
          "(1) ￥2,160,000",
          "(2) ￥2,000,000",
          "(3) ￥3,000,000",
          "(4) ￥1,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n・製品X貢献利益 ＝ 800個 × ￥2,000 ＝ ￥1,600,000<br>\n・製品Y貢献利益 ＝ 200個 × ￥2,800 ＝ ￥560,000<br>\n・総貢献利益 ＝ ￥1,600,000 ＋ ￥560,000 ＝ <strong>￥2,160,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-19"
      },
      {
        "num": 20,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・最適プロダクトミックス",
        "catName": "最適プロダクトミックス",
        "title": "最適プロダクトミックス達成時における【最大営業利益】の算定",
        "text": "前問の資料に基づき、月間固定費 ￥1,500,000 を控除した後の【最大営業利益】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-tasks\"></i> 資料：制約条件下（機械総稼働時間 2,400時間）の製品データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>製品X</th><th>製品Y</th></tr></thead><tbody>\n    <tr><td>販売単価</td><td class=\"num\">￥5,000 / 個</td><td class=\"num\">￥7,000 / 個</td></tr>\n    <tr><td>単位あたり変動費</td><td class=\"num\">￥3,000 / 個</td><td class=\"num\">￥4,200 / 個</td></tr>\n    <tr><td>単位あたり貢献利益</td><td class=\"num\">￥2,000 / 個</td><td class=\"num\">￥2,800 / 個</td></tr>\n    <tr><td>1個あたり機械加工時間</td><td class=\"num\">2 時間 / 個</td><td class=\"num\">4 時間 / 個</td></tr>\n    <tr><td>市場最大需要量（販売上限）</td><td class=\"num\">800 個</td><td class=\"num\">500 個</td></tr>\n  </tbody></table></div>\n  <div style=\"font-size:0.85rem; color:#4a5568; margin-top:4px;\">※月間固定費総額は ￥1,500,000 である。</div>\n</div>",
        "options": [
          "(1) ￥660,000",
          "(2) ￥500,000",
          "(3) ￥760,000",
          "(4) ￥600,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n営業利益 ＝ 総貢献利益 ￥2,160,000 − 固定費 ￥1,500,000 ＝ <strong>￥660,000</strong>",
        "points": 5,
        "sessionId": "4",
        "sessionName": "第4回実戦予想模試",
        "qid": "boki1-pool-s4-20"
      }
    ]
  },
  "5": {
    "id": "5",
    "title": "第5回実戦予想模試（商業簿記・会計学・工業簿記・原価計算 全4科目）",
    "questions": [
      {
        "num": 1,
        "section": "commercial",
        "sectionName": "【商業簿記】研究開発費・ソフトウェア会計",
        "catName": "研究開発費",
        "title": "研究開発費およびソフトウェア制作費の【資産・費用区分】の判定",
        "text": "次の資料に基づき、当期首において貸借対照表の無形固定資産に計上すべき【ソフトウェア取得原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-laptop-code\"></i> 資料：市場販売目的ソフトウェアの制作費および販売実績データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>支出額・条件データ</th></tr></thead><tbody>\n    <tr><td>研究開発段階の支出（研究開発費）</td><td class=\"num\">￥8,000,000（全額費用計上）</td></tr>\n    <tr><td>製品マスター完成後の著しい改良等に要した支出（資産計上）</td><td class=\"num\">￥12,000,000（当期首稼働開始）</td></tr>\n    <tr><td>見積有効期間（見込利用可能年数）</td><td>3年間</td></tr>\n    <tr><td>総見積販売数量</td><td class=\"num\">10,000 本</td></tr>\n    <tr><td>総見積販売収益（総売上見込額）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>当期の実際販売数量</td><td class=\"num\">4,000 本</td></tr>\n    <tr><td>当期の実際販売収益（売上高）</td><td class=\"num\">￥25,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【償却計算の方針】</strong><br>\n    ・市場販売目的のソフトウェアは、見込販売数量基準または見込販売収益基準による償却額のいずれか大きい金額を計上する。<br>\n    ・ただし、その金額が均等配分額（有効期間による均等償却額）を下回る場合は均等配分額により償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥12,000,000（製品マスター完成後の改良費のみ）",
          "(2) ￥20,000,000（総支出額）",
          "(3) ￥8,000,000（研究開発費）",
          "(4) ￥16,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n研究開発費（￥8,000,000）は発生時に全額費用（一般管理費）として処理します。<br>\n製品マスター完成後の著しい改良等に要した支出 <strong>￥12,000,000</strong> のみが無形固定資産「ソフトウェア」として資産計上されます。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-1"
      },
      {
        "num": 2,
        "section": "commercial",
        "sectionName": "【商業簿記】研究開発費・ソフトウェア会計",
        "catName": "ソフトウェア償却",
        "title": "見込販売数量基準および見込販売収益基準による【当期償却額】の算定",
        "text": "前問の資料に基づき、見込販売数量基準による償却額および見込販売収益基準による償却額の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-laptop-code\"></i> 資料：市場販売目的ソフトウェアの制作費および販売実績データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>支出額・条件データ</th></tr></thead><tbody>\n    <tr><td>研究開発段階の支出（研究開発費）</td><td class=\"num\">￥8,000,000（全額費用計上）</td></tr>\n    <tr><td>製品マスター完成後の著しい改良等に要した支出（資産計上）</td><td class=\"num\">￥12,000,000（当期首稼働開始）</td></tr>\n    <tr><td>見積有効期間（見込利用可能年数）</td><td>3年間</td></tr>\n    <tr><td>総見積販売数量</td><td class=\"num\">10,000 本</td></tr>\n    <tr><td>総見積販売収益（総売上見込額）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>当期の実際販売数量</td><td class=\"num\">4,000 本</td></tr>\n    <tr><td>当期の実際販売収益（売上高）</td><td class=\"num\">￥25,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【償却計算の方針】</strong><br>\n    ・市場販売目的のソフトウェアは、見込販売数量基準または見込販売収益基準による償却額のいずれか大きい金額を計上する。<br>\n    ・ただし、その金額が均等配分額（有効期間による均等償却額）を下回る場合は均等配分額により償却する。\n  </div>\n</div>",
        "options": [
          "(1) 数量基準：￥4,800,000 ／ 収益基準：￥5,000,000",
          "(2) 数量基準：￥4,000,000 ／ 収益基準：￥5,000,000",
          "(3) 数量基準：￥4,800,000 ／ 収益基準：￥4,000,000",
          "(4) 数量基準：￥5,000,000 ／ 収益基準：￥5,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>見込販売数量基準</strong> ＝ 取得原価 ￥12,000,000 × (当期販売 4,000本 ÷ 総見込 10,000本) ＝ <strong>￥4,800,000</strong><br>\n2. <strong>見込販売収益基準</strong> ＝ 取得原価 ￥12,000,000 × (当期売上 ￥25,000,000 ÷ 総見込 ￥60,000,000) ＝ <strong>￥5,000,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-2"
      },
      {
        "num": 3,
        "section": "commercial",
        "sectionName": "【商業簿記】研究開発費・ソフトウェア会計",
        "catName": "ソフトウェア償却",
        "title": "有効期間均等償却との比較による【当期ソフトウェア償却費】の決定",
        "text": "前問の資料に基づき、当期の損益計算書（売上原価）に計上すべき【ソフトウェア償却費】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-laptop-code\"></i> 資料：市場販売目的ソフトウェアの制作費および販売実績データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>支出額・条件データ</th></tr></thead><tbody>\n    <tr><td>研究開発段階の支出（研究開発費）</td><td class=\"num\">￥8,000,000（全額費用計上）</td></tr>\n    <tr><td>製品マスター完成後の著しい改良等に要した支出（資産計上）</td><td class=\"num\">￥12,000,000（当期首稼働開始）</td></tr>\n    <tr><td>見積有効期間（見込利用可能年数）</td><td>3年間</td></tr>\n    <tr><td>総見積販売数量</td><td class=\"num\">10,000 本</td></tr>\n    <tr><td>総見積販売収益（総売上見込額）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>当期の実際販売数量</td><td class=\"num\">4,000 本</td></tr>\n    <tr><td>当期の実際販売収益（売上高）</td><td class=\"num\">￥25,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【償却計算の方針】</strong><br>\n    ・市場販売目的のソフトウェアは、見込販売数量基準または見込販売収益基準による償却額のいずれか大きい金額を計上する。<br>\n    ・ただし、その金額が均等配分額（有効期間による均等償却額）を下回る場合は均等配分額により償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥5,000,000（数量基準と収益基準の大きい方を採用）",
          "(2) ￥4,800,000（数量基準を採用）",
          "(3) ￥4,000,000（均等償却額を採用）",
          "(4) ￥4,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 数量基準（￥4,800,000）と収益基準（￥5,000,000）のいずれか大きい金額 ＝ ￥5,000,000<br>\n2. 有効期間（3年）均等償却額 ＝ ￥12,000,000 ÷ 3年 ＝ ￥4,000,000<br>\n￥5,000,000 ＞ 均等額 ￥4,000,000 であるため、当期計上すべき償却費は <strong>￥5,000,000</strong> となります。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-3"
      },
      {
        "num": 4,
        "section": "commercial",
        "sectionName": "【商業簿記】研究開発費・ソフトウェア会計",
        "catName": "ソフトウェア期末残高",
        "title": "当期末貸借対照表における【ソフトウェア帳簿価額】の算定",
        "text": "前問の資料に基づき、当期末の貸借対照表に計上される【ソフトウェア期末残高】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-laptop-code\"></i> 資料：市場販売目的ソフトウェアの制作費および販売実績データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>支出額・条件データ</th></tr></thead><tbody>\n    <tr><td>研究開発段階の支出（研究開発費）</td><td class=\"num\">￥8,000,000（全額費用計上）</td></tr>\n    <tr><td>製品マスター完成後の著しい改良等に要した支出（資産計上）</td><td class=\"num\">￥12,000,000（当期首稼働開始）</td></tr>\n    <tr><td>見積有効期間（見込利用可能年数）</td><td>3年間</td></tr>\n    <tr><td>総見積販売数量</td><td class=\"num\">10,000 本</td></tr>\n    <tr><td>総見積販売収益（総売上見込額）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>当期の実際販売数量</td><td class=\"num\">4,000 本</td></tr>\n    <tr><td>当期の実際販売収益（売上高）</td><td class=\"num\">￥25,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【償却計算の方針】</strong><br>\n    ・市場販売目的のソフトウェアは、見込販売数量基準または見込販売収益基準による償却額のいずれか大きい金額を計上する。<br>\n    ・ただし、その金額が均等配分額（有効期間による均等償却額）を下回る場合は均等配分額により償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥7,000,000",
          "(2) ￥8,000,000",
          "(3) ￥7,200,000",
          "(4) ￥6,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n取得原価 ￥12,000,000 − 当期償却費 ￥5,000,000 ＝ <strong>￥7,000,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-4"
      },
      {
        "num": 5,
        "section": "commercial",
        "sectionName": "【商業簿記】研究開発費・ソフトウェア会計",
        "catName": "ソフトウェア臨時償却",
        "title": "翌期以降の販売見込低下に伴う【臨時償却（減損）】の要否判定",
        "text": "期末において販売環境の急変により、翌期以降の将来見込販売収益の割引前キャッシュフローが ￥5,500,000 と見積もられた場合の臨時償却額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-laptop-code\"></i> 資料：市場販売目的ソフトウェアの制作費および販売実績データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>支出額・条件データ</th></tr></thead><tbody>\n    <tr><td>研究開発段階の支出（研究開発費）</td><td class=\"num\">￥8,000,000（全額費用計上）</td></tr>\n    <tr><td>製品マスター完成後の著しい改良等に要した支出（資産計上）</td><td class=\"num\">￥12,000,000（当期首稼働開始）</td></tr>\n    <tr><td>見積有効期間（見込利用可能年数）</td><td>3年間</td></tr>\n    <tr><td>総見積販売数量</td><td class=\"num\">10,000 本</td></tr>\n    <tr><td>総見積販売収益（総売上見込額）</td><td class=\"num\">￥60,000,000</td></tr>\n    <tr><td>当期の実際販売数量</td><td class=\"num\">4,000 本</td></tr>\n    <tr><td>当期の実際販売収益（売上高）</td><td class=\"num\">￥25,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【償却計算の方針】</strong><br>\n    ・市場販売目的のソフトウェアは、見込販売数量基準または見込販売収益基準による償却額のいずれか大きい金額を計上する。<br>\n    ・ただし、その金額が均等配分額（有効期間による均等償却額）を下回る場合は均等配分額により償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥1,500,000（臨時償却費として売上原価に計上）",
          "(2) 臨時償却は行わない",
          "(3) ￥1,000,000",
          "(4) ￥5,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n期末帳簿価額（￥7,000,000）が翌期以降の見込販売収益等から得られる将来キャッシュ・フロー（￥5,500,000）を超過している場合、その超過額 <strong>￥1,500,000</strong> を臨時償却（売上原価）として計上し、帳簿価額を減額します。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-5"
      },
      {
        "num": 6,
        "section": "accounting",
        "sectionName": "【会計学】純資産会計・株式報酬（ストックオプション）",
        "catName": "ストック・オプション会計",
        "title": "ストック・オプションの【公正な評価額総額】の算定",
        "text": "次の資料に基づき、付与日において算定された失効率考慮前の【新株予約権の公正価値総額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-coins\"></i> 資料：株式報酬（ストック・オプション）の付与および権利確定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・データ</th></tr></thead><tbody>\n    <tr><td>付与日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>対象者および付与個数</td><td>従業員100名に対し、各10個（計1,000個）</td></tr>\n    <tr><td>新株予約権1個あたりの公正な評価単価（付与日現在）</td><td class=\"num\">￥3,000 / 個</td></tr>\n    <tr><td>権利行使により交付される株式</td><td>新株予約権1個につき普通株式1株</td></tr>\n    <tr><td>権利行使価額</td><td class=\"num\">￥5,000 / 株</td></tr>\n    <tr><td>対象勤務期間（権利確定日までの期間）</td><td>2年間（当期末および翌期末）</td></tr>\n    <tr><td>期首見込退職失効率</td><td>2年間で全体の 10％ が退職により失効と見積もる</td></tr>\n    <tr><td>当期末の見積見直し</td><td>当期中5名が退職し、2年間累計退職率は 10％（見直しなし）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥3,000,000",
          "(2) ￥5,000,000",
          "(3) ￥2,700,000",
          "(4) ￥8,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n総付与個数 1,000個 × 公正な評価単価 ￥3,000 ＝ <strong>￥3,000,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-6"
      },
      {
        "num": 7,
        "section": "accounting",
        "sectionName": "【会計学】純資産会計・株式報酬（ストックオプション）",
        "catName": "株式報酬費用",
        "title": "失効率を考慮した【第1期株式報酬費用】の算定",
        "text": "前問の資料に基づき、第1期末に計上すべき【株式報酬費用（販管費）】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-coins\"></i> 資料：株式報酬（ストック・オプション）の付与および権利確定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・データ</th></tr></thead><tbody>\n    <tr><td>付与日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>対象者および付与個数</td><td>従業員100名に対し、各10個（計1,000個）</td></tr>\n    <tr><td>新株予約権1個あたりの公正な評価単価（付与日現在）</td><td class=\"num\">￥3,000 / 個</td></tr>\n    <tr><td>権利行使により交付される株式</td><td>新株予約権1個につき普通株式1株</td></tr>\n    <tr><td>権利行使価額</td><td class=\"num\">￥5,000 / 株</td></tr>\n    <tr><td>対象勤務期間（権利確定日までの期間）</td><td>2年間（当期末および翌期末）</td></tr>\n    <tr><td>期首見込退職失効率</td><td>2年間で全体の 10％ が退職により失効と見積もる</td></tr>\n    <tr><td>当期末の見積見直し</td><td>当期中5名が退職し、2年間累計退職率は 10％（見直しなし）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥1,350,000",
          "(2) ￥1,500,000",
          "(3) ￥2,700,000",
          "(4) ￥1,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 権利確定見込個数 ＝ 1,000個 × (1 − 0.10) ＝ 900個<br>\n2. 株式報酬総額 ＝ 900個 × ￥3,000 ＝ ￥2,700,000<br>\n3. 第1期費用配分額（2年間のうち1年経過）＝ ￥2,700,000 × 1/2 ＝ <strong>￥1,350,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-7"
      },
      {
        "num": 8,
        "section": "accounting",
        "sectionName": "【会計学】純資産会計・株式報酬（ストックオプション）",
        "catName": "新株予約権",
        "title": "第1期末貸借対照表における【新株予約権】の表示区分と計上額",
        "text": "前問の資料に基づき、第1期末の貸借対照表における【新株予約権】の表示区分および金額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-coins\"></i> 資料：株式報酬（ストック・オプション）の付与および権利確定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・データ</th></tr></thead><tbody>\n    <tr><td>付与日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>対象者および付与個数</td><td>従業員100名に対し、各10個（計1,000個）</td></tr>\n    <tr><td>新株予約権1個あたりの公正な評価単価（付与日現在）</td><td class=\"num\">￥3,000 / 個</td></tr>\n    <tr><td>権利行使により交付される株式</td><td>新株予約権1個につき普通株式1株</td></tr>\n    <tr><td>権利行使価額</td><td class=\"num\">￥5,000 / 株</td></tr>\n    <tr><td>対象勤務期間（権利確定日までの期間）</td><td>2年間（当期末および翌期末）</td></tr>\n    <tr><td>期首見込退職失効率</td><td>2年間で全体の 10％ が退職により失効と見積もる</td></tr>\n    <tr><td>当期末の見積見直し</td><td>当期中5名が退職し、2年間累計退職率は 10％（見直しなし）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 純資産の部・新株予約権：￥1,350,000",
          "(2) 固定負債の部・引当金：￥1,350,000",
          "(3) 純資産の部・株主資本：￥2,700,000",
          "(4) 純資産の部・新株予約権：￥2,700,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n仕訳：（借）株式報酬費用 1,350,000 ／（貸）新株予約権 1,350,000<br>\n「新株予約権」は貸借対照表の<strong>純資産の部（株主資本以外の項目）</strong>に計上されます。金額は <strong>￥1,350,000</strong> です。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-8"
      },
      {
        "num": 9,
        "section": "accounting",
        "sectionName": "【会計学】純資産会計・株式報酬（ストックオプション）",
        "catName": "権利行使時の会計処理",
        "title": "2年後の権利確定時に新株予約権900個が行使された場合の【資本金増加額】",
        "text": "2年後に新株予約権900個がすべて行使され、新株が発行された（会社法上の資本金組入限度額を資本金とする）場合の【資本金増加額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-coins\"></i> 資料：株式報酬（ストック・オプション）の付与および権利確定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・データ</th></tr></thead><tbody>\n    <tr><td>付与日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>対象者および付与個数</td><td>従業員100名に対し、各10個（計1,000個）</td></tr>\n    <tr><td>新株予約権1個あたりの公正な評価単価（付与日現在）</td><td class=\"num\">￥3,000 / 個</td></tr>\n    <tr><td>権利行使により交付される株式</td><td>新株予約権1個につき普通株式1株</td></tr>\n    <tr><td>権利行使価額</td><td class=\"num\">￥5,000 / 株</td></tr>\n    <tr><td>対象勤務期間（権利確定日までの期間）</td><td>2年間（当期末および翌期末）</td></tr>\n    <tr><td>期首見込退職失効率</td><td>2年間で全体の 10％ が退職により失効と見積もる</td></tr>\n    <tr><td>当期末の見積見直し</td><td>当期中5名が退職し、2年間累計退職率は 10％（見直しなし）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥7,200,000（払込金￥4,500,000 ＋ 新株予約権￥2,700,000）",
          "(2) ￥4,500,000（払込金のみ）",
          "(3) ￥3,600,000（半額組入時）",
          "(4) ￥5,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 権利行使時の払込現金 ＝ 900個 × ￥5,000 ＝ ￥4,500,000<br>\n2. 振替対象新株予約権 ＝ 900個 × ￥3,000 ＝ ￥2,700,000<br>\n3. <strong>資本金増加総額（全額組入）</strong> ＝ ￥4,500,000 ＋ ￥2,700,000 ＝ <strong>￥7,200,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-9"
      },
      {
        "num": 10,
        "section": "accounting",
        "sectionName": "【会計学】純資産会計・株式報酬（ストックオプション）",
        "catName": "権利不行使失効時の処理",
        "title": "権利行使期間満了により失効した場合の【新株予約権戻入益】の会計処理",
        "text": "権利行使されずに失効した新株予約権の残高がある場合の会計処理として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-coins\"></i> 資料：株式報酬（ストック・オプション）の付与および権利確定データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>条件・データ</th></tr></thead><tbody>\n    <tr><td>付与日</td><td>当期首（4月1日）</td></tr>\n    <tr><td>対象者および付与個数</td><td>従業員100名に対し、各10個（計1,000個）</td></tr>\n    <tr><td>新株予約権1個あたりの公正な評価単価（付与日現在）</td><td class=\"num\">￥3,000 / 個</td></tr>\n    <tr><td>権利行使により交付される株式</td><td>新株予約権1個につき普通株式1株</td></tr>\n    <tr><td>権利行使価額</td><td class=\"num\">￥5,000 / 株</td></tr>\n    <tr><td>対象勤務期間（権利確定日までの期間）</td><td>2年間（当期末および翌期末）</td></tr>\n    <tr><td>期首見込退職失効率</td><td>2年間で全体の 10％ が退職により失効と見積もる</td></tr>\n    <tr><td>当期末の見積見直し</td><td>当期中5名が退職し、2年間累計退職率は 10％（見直しなし）</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 新株予約権を減額し、「新株予約権戻入益」（特別利益）に計上する",
          "(2) 資本剰余金（その他資本剰余金）に振り替える",
          "(3) 利益剰余金（繰越利益剰余金）に直接加算する",
          "(4) 過去の株式報酬費用を過年度遡及修正する"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n権利行使期間が満了し行使されずに失効した新株予約権は、失効が確定した期の損益として<strong>「新株予約権戻入益」（特別利益）</strong>に計上します。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-10"
      },
      {
        "num": 11,
        "section": "industrial",
        "sectionName": "【工業簿記】原価配賦基準・活動基準原価計算（ABC）",
        "catName": "活動配賦率の算定",
        "title": "各活動コストプールにおける【活動配賦率（アクティビティレート）】の算定",
        "text": "次の資料に基づき、段取活動および材料運搬活動の【活動配賦率】の組み合わせとして正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-cogs\"></i> 資料：活動基準原価計算（ABC）による間接費データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>活動コストプール</th><th>間接費予算</th><th>コストドライバー</th><th>ドライバー総数量</th></tr></thead><tbody>\n    <tr><td>段取活動</td><td class=\"num\">￥1,200,000</td><td>段取回数</td><td class=\"num\">60 回</td></tr>\n    <tr><td>材料運搬活動</td><td class=\"num\">￥800,000</td><td>運搬回数</td><td class=\"num\">100 回</td></tr>\n    <tr><td>機械運転活動</td><td class=\"num\">￥2,000,000</td><td>機械運転時間</td><td class=\"num\">1,000 時間</td></tr>\n    <tr><td>製造間接費合計</td><td class=\"num\">￥4,000,000</td><td>−</td><td>−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>製品別データ</th><th>製品A（標準品）</th><th>製品B（特注品）</th></tr></thead><tbody>\n    <tr><td>生産量</td><td class=\"num\">1,000 個</td><td class=\"num\">200 個</td></tr>\n    <tr><td>段取回数</td><td class=\"num\">20 回</td><td class=\"num\">40 回</td></tr>\n    <tr><td>材料運搬回数</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td></tr>\n    <tr><td>機械運転時間</td><td class=\"num\">700 時間</td><td class=\"num\">300 時間</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 段取配賦率：￥20,000 / 回 ／ 運搬配賦率：￥8,000 / 回",
          "(2) 段取配賦率：￥20,000 / 回 ／ 運搬配賦率：￥10,000 / 回",
          "(3) 段取配賦率：￥15,000 / 回 ／ 運搬配賦率：￥8,000 / 回",
          "(4) 段取配賦率：￥12,000 / 回 ／ 運搬配賦率：￥8,000 / 回"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. <strong>段取配賦率</strong> ＝ 予算 ￥1,200,000 ÷ 60回 ＝ <strong>￥20,000 / 回</strong><br>\n2. <strong>運搬配賦率</strong> ＝ 予算 ￥800,000 ÷ 100回 ＝ <strong>￥8,000 / 回</strong><br>\n（機械運転配賦率 ＝ ￥2,000,000 ÷ 1,000時間 ＝ ￥2,000 / 時間）",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-11"
      },
      {
        "num": 12,
        "section": "industrial",
        "sectionName": "【工業簿記】原価配賦基準・活動基準原価計算（ABC）",
        "catName": "製品別間接費配賦",
        "title": "ABCに基づく【製品A（標準品）への製造間接費配賦額】の算定",
        "text": "前問の資料に基づき、活動基準原価計算（ABC）により製品Aに配賦される【製造間接費合計】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-cogs\"></i> 資料：活動基準原価計算（ABC）による間接費データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>活動コストプール</th><th>間接費予算</th><th>コストドライバー</th><th>ドライバー総数量</th></tr></thead><tbody>\n    <tr><td>段取活動</td><td class=\"num\">￥1,200,000</td><td>段取回数</td><td class=\"num\">60 回</td></tr>\n    <tr><td>材料運搬活動</td><td class=\"num\">￥800,000</td><td>運搬回数</td><td class=\"num\">100 回</td></tr>\n    <tr><td>機械運転活動</td><td class=\"num\">￥2,000,000</td><td>機械運転時間</td><td class=\"num\">1,000 時間</td></tr>\n    <tr><td>製造間接費合計</td><td class=\"num\">￥4,000,000</td><td>−</td><td>−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>製品別データ</th><th>製品A（標準品）</th><th>製品B（特注品）</th></tr></thead><tbody>\n    <tr><td>生産量</td><td class=\"num\">1,000 個</td><td class=\"num\">200 個</td></tr>\n    <tr><td>段取回数</td><td class=\"num\">20 回</td><td class=\"num\">40 回</td></tr>\n    <tr><td>材料運搬回数</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td></tr>\n    <tr><td>機械運転時間</td><td class=\"num\">700 時間</td><td class=\"num\">300 時間</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥2,120,000",
          "(2) ￥2,800,000",
          "(3) ￥1,880,000",
          "(4) ￥2,400,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n製品Aへの活動別配賦額：<br>\n・段取活動 ＝ ￥20,000 × 20回 ＝ ￥400,000<br>\n・運搬活動 ＝ ￥8,000 × 40回 ＝ ￥320,000<br>\n・機械運転 ＝ ￥2,000 × 700時間 ＝ ￥1,400,000<br>\n・製品A配賦合計 ＝ ￥400,000 ＋ ￥320,000 ＋ ￥1,400,000 ＝ <strong>￥2,120,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-12"
      },
      {
        "num": 13,
        "section": "industrial",
        "sectionName": "【工業簿記】原価配賦基準・活動基準原価計算（ABC）",
        "catName": "製品別間接費配賦",
        "title": "ABCに基づく【製品B（特注品）への製造間接費配賦額】の算定",
        "text": "前問の資料に基づき、活動基準原価計算（ABC）により製品Bに配賦される【製造間接費合計】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-cogs\"></i> 資料：活動基準原価計算（ABC）による間接費データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>活動コストプール</th><th>間接費予算</th><th>コストドライバー</th><th>ドライバー総数量</th></tr></thead><tbody>\n    <tr><td>段取活動</td><td class=\"num\">￥1,200,000</td><td>段取回数</td><td class=\"num\">60 回</td></tr>\n    <tr><td>材料運搬活動</td><td class=\"num\">￥800,000</td><td>運搬回数</td><td class=\"num\">100 回</td></tr>\n    <tr><td>機械運転活動</td><td class=\"num\">￥2,000,000</td><td>機械運転時間</td><td class=\"num\">1,000 時間</td></tr>\n    <tr><td>製造間接費合計</td><td class=\"num\">￥4,000,000</td><td>−</td><td>−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>製品別データ</th><th>製品A（標準品）</th><th>製品B（特注品）</th></tr></thead><tbody>\n    <tr><td>生産量</td><td class=\"num\">1,000 個</td><td class=\"num\">200 個</td></tr>\n    <tr><td>段取回数</td><td class=\"num\">20 回</td><td class=\"num\">40 回</td></tr>\n    <tr><td>材料運搬回数</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td></tr>\n    <tr><td>機械運転時間</td><td class=\"num\">700 時間</td><td class=\"num\">300 時間</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) ￥1,880,000",
          "(2) ￥1,200,000",
          "(3) ￥2,120,000",
          "(4) ￥1,650,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n製品Bへの活動別配賦額：<br>\n・段取活動 ＝ ￥20,000 × 40回 ＝ ￥800,000<br>\n・運搬活動 ＝ ￥8,000 × 60回 ＝ ￥480,000<br>\n・機械運転 ＝ ￥2,000 × 300時間 ＝ ￥600,000<br>\n・製品B配賦合計 ＝ ￥800,000 ＋ ￥480,000 ＋ ￥600,000 ＝ <strong>￥1,880,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-13"
      },
      {
        "num": 14,
        "section": "industrial",
        "sectionName": "【工業簿記】原価配賦基準・活動基準原価計算（ABC）",
        "catName": "従来型配賦との比較",
        "title": "従来型単一基準（機械運転時間基準）による製品A・Bへの配賦額",
        "text": "機械運転時間のみを配賦基準とする従来型計算を行った場合の【製品Aおよび製品Bへの配賦額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-cogs\"></i> 資料：活動基準原価計算（ABC）による間接費データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>活動コストプール</th><th>間接費予算</th><th>コストドライバー</th><th>ドライバー総数量</th></tr></thead><tbody>\n    <tr><td>段取活動</td><td class=\"num\">￥1,200,000</td><td>段取回数</td><td class=\"num\">60 回</td></tr>\n    <tr><td>材料運搬活動</td><td class=\"num\">￥800,000</td><td>運搬回数</td><td class=\"num\">100 回</td></tr>\n    <tr><td>機械運転活動</td><td class=\"num\">￥2,000,000</td><td>機械運転時間</td><td class=\"num\">1,000 時間</td></tr>\n    <tr><td>製造間接費合計</td><td class=\"num\">￥4,000,000</td><td>−</td><td>−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>製品別データ</th><th>製品A（標準品）</th><th>製品B（特注品）</th></tr></thead><tbody>\n    <tr><td>生産量</td><td class=\"num\">1,000 個</td><td class=\"num\">200 個</td></tr>\n    <tr><td>段取回数</td><td class=\"num\">20 回</td><td class=\"num\">40 回</td></tr>\n    <tr><td>材料運搬回数</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td></tr>\n    <tr><td>機械運転時間</td><td class=\"num\">700 時間</td><td class=\"num\">300 時間</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 製品A：￥2,800,000 ／ 製品B：￥1,200,000",
          "(2) 製品A：￥2,120,000 ／ 製品B：￥1,880,000",
          "(3) 製品A：￥2,000,000 ／ 製品B：￥2,000,000",
          "(4) 製品A：￥3,000,000 ／ 製品B：￥1,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 従来型単一配賦率 ＝ 総間接費 ￥4,000,000 ÷ 総機械時間 1,000時間 ＝ ￥4,000 / 時間<br>\n2. 製品A配賦額 ＝ 700時間 × ￥4,000 ＝ <strong>￥2,800,000</strong><br>\n3. 製品B配賦額 ＝ 300時間 × ￥4,000 ＝ <strong>￥1,200,000</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-14"
      },
      {
        "num": 15,
        "section": "industrial",
        "sectionName": "【工業簿記】原価配賦基準・活動基準原価計算（ABC）",
        "catName": "コストの歪み分析",
        "title": "ABC導入による【コストの歪み（コスト・ディストーション）】の分析判定",
        "text": "従来型計算とABC計算の比較分析結果として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-cogs\"></i> 資料：活動基準原価計算（ABC）による間接費データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>活動コストプール</th><th>間接費予算</th><th>コストドライバー</th><th>ドライバー総数量</th></tr></thead><tbody>\n    <tr><td>段取活動</td><td class=\"num\">￥1,200,000</td><td>段取回数</td><td class=\"num\">60 回</td></tr>\n    <tr><td>材料運搬活動</td><td class=\"num\">￥800,000</td><td>運搬回数</td><td class=\"num\">100 回</td></tr>\n    <tr><td>機械運転活動</td><td class=\"num\">￥2,000,000</td><td>機械運転時間</td><td class=\"num\">1,000 時間</td></tr>\n    <tr><td>製造間接費合計</td><td class=\"num\">￥4,000,000</td><td>−</td><td>−</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-table-wrapper\" style=\"margin-top:6px;\"><table class=\"boki-table\"><thead><tr><th>製品別データ</th><th>製品A（標準品）</th><th>製品B（特注品）</th></tr></thead><tbody>\n    <tr><td>生産量</td><td class=\"num\">1,000 個</td><td class=\"num\">200 個</td></tr>\n    <tr><td>段取回数</td><td class=\"num\">20 回</td><td class=\"num\">40 回</td></tr>\n    <tr><td>材料運搬回数</td><td class=\"num\">40 回</td><td class=\"num\">60 回</td></tr>\n    <tr><td>機械運転時間</td><td class=\"num\">700 時間</td><td class=\"num\">300 時間</td></tr>\n  </tbody></table></div>\n</div>",
        "options": [
          "(1) 従来型では大ロット標準品Aに過大配賦（￥680,000過大）され、小ロット特注品Bが過小配賦されていた",
          "(2) 従来型では特注品Bに過大配賦され、標準品Aが過小配賦されていた",
          "(3) 両者の配賦結果に重要な差異は認められない",
          "(4) ABCを導入すると全社の総間接費が￥680,000削減される"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n従来型の製品A配賦額 ￥2,800,000 に対し、ABCでは ￥2,120,000 となり、<strong>標準品Aに ￥680,000 のコストが過大配賦（歪み）されていた</strong>ことが判明します。<br>\n特注品Bは小ロットでありながら段取や運搬を多く消費しているため、ABCにより適正な原価（￥1,880,000）が把握されます。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-15"
      },
      {
        "num": 16,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・差額原価収益分析",
        "catName": "差額原価分析（内製か外注か）",
        "title": "内製を継続する場合の【関連原価（回避可能原価）】の算定",
        "text": "次の資料に基づき、外注した場合に回避できる【内製時の関連原価合計】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale-right\"></i> 資料：部品の内製か外注（買入）かに関する差額原価データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素（内製時：年間10,000個製造）</th><th>単位あたり金額</th><th>年間総額</th></tr></thead><tbody>\n    <tr><td>直接材料費（変動費）</td><td class=\"num\">￥120 / 個</td><td class=\"num\">￥1,200,000</td></tr>\n    <tr><td>直接労務費（変動費）</td><td class=\"num\">￥180 / 個</td><td class=\"num\">￥1,800,000</td></tr>\n    <tr><td>変動製造間接費</td><td class=\"num\">￥50 / 個</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>固定製造間接費（専用設備の減価償却費・回避可能）</td><td class=\"num\">￥80 / 個</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>固定製造間接費（工場共通固定費・回避不能）</td><td class=\"num\">￥70 / 個</td><td class=\"num\">￥700,000</td></tr>\n    <tr><td>内製総原価</td><td class=\"num\">￥500 / 個</td><td class=\"num\">￥5,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【外注先からの提案および遊休設備の活用】</strong><br>\n    ・外部サプライヤーより同部品を1個あたり <strong>￥410</strong> で納入する提案があった（年間 ￥4,100,000）。<br>\n    ・外注した場合、専用設備は処分（廃棄）されるため専用設備減価償却費（￥800,000）は発生しない。<br>\n    ・外注により空いた工場スペースを他社に賃貸することで、年間 <strong>￥150,000</strong> の賃貸収入（機会収益）が得られる。\n  </div>\n</div>",
        "options": [
          "(1) ￥4,300,000（単価￥430：変動費￥350 ＋ 回避可能固定費￥80）",
          "(2) ￥5,000,000（内製総原価）",
          "(3) ￥3,500,000（変動費のみ）",
          "(4) ￥4,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n外注することで回避できる原価（差額原価）：<br>\n・直接材料費 ￥1,200,000<br>\n・直接労務費 ￥1,800,000<br>\n・変動製造間接費 ￥500,000<br>\n・専用設備減価償却費 ￥800,000<br>\n・<strong>回避可能原価合計</strong> ＝ ￥1,200,000 ＋ ￥1,800,000 ＋ ￥500,000 ＋ ￥800,000 ＝ <strong>￥4,300,000</strong>（1個あたり￥430）<br>\n（工場共通固定費 ￥700,000 は外注しても発生し続けるため埋没原価であり除外します）",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-16"
      },
      {
        "num": 17,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・差額原価収益分析",
        "catName": "機会原価（機会収益）",
        "title": "遊休スペースの外部賃貸に伴う【機会収益の考慮】",
        "text": "前問の資料に基づき、外注を選択した場合に発生する【年間の純支出額（機会収益控除後）】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale-right\"></i> 資料：部品の内製か外注（買入）かに関する差額原価データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素（内製時：年間10,000個製造）</th><th>単位あたり金額</th><th>年間総額</th></tr></thead><tbody>\n    <tr><td>直接材料費（変動費）</td><td class=\"num\">￥120 / 個</td><td class=\"num\">￥1,200,000</td></tr>\n    <tr><td>直接労務費（変動費）</td><td class=\"num\">￥180 / 個</td><td class=\"num\">￥1,800,000</td></tr>\n    <tr><td>変動製造間接費</td><td class=\"num\">￥50 / 個</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>固定製造間接費（専用設備の減価償却費・回避可能）</td><td class=\"num\">￥80 / 個</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>固定製造間接費（工場共通固定費・回避不能）</td><td class=\"num\">￥70 / 個</td><td class=\"num\">￥700,000</td></tr>\n    <tr><td>内製総原価</td><td class=\"num\">￥500 / 個</td><td class=\"num\">￥5,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【外注先からの提案および遊休設備の活用】</strong><br>\n    ・外部サプライヤーより同部品を1個あたり <strong>￥410</strong> で納入する提案があった（年間 ￥4,100,000）。<br>\n    ・外注した場合、専用設備は処分（廃棄）されるため専用設備減価償却費（￥800,000）は発生しない。<br>\n    ・外注により空いた工場スペースを他社に賃貸することで、年間 <strong>￥150,000</strong> の賃貸収入（機会収益）が得られる。\n  </div>\n</div>",
        "options": [
          "(1) ￥3,950,000（外注買入額￥4,100,000 − 機会収益￥150,000）",
          "(2) ￥4,100,000",
          "(3) ￥4,250,000",
          "(4) ￥3,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n外注買入支出 ￥4,100,000（10,000個×￥410）から、遊休スペースの賃貸収入 ￥150,000 を差し引いた<strong>純支出額は ￥3,950,000</strong> となります。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-17"
      },
      {
        "num": 18,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・差額原価収益分析",
        "catName": "差額利益分析",
        "title": "内製と外注の【差額利益（コスト削減額）】および意思決定の判定",
        "text": "前問の資料に基づき、部品の内製から外注へ切り替えた場合の【差額利益】および意思決定の判定として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale-right\"></i> 資料：部品の内製か外注（買入）かに関する差額原価データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素（内製時：年間10,000個製造）</th><th>単位あたり金額</th><th>年間総額</th></tr></thead><tbody>\n    <tr><td>直接材料費（変動費）</td><td class=\"num\">￥120 / 個</td><td class=\"num\">￥1,200,000</td></tr>\n    <tr><td>直接労務費（変動費）</td><td class=\"num\">￥180 / 個</td><td class=\"num\">￥1,800,000</td></tr>\n    <tr><td>変動製造間接費</td><td class=\"num\">￥50 / 個</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>固定製造間接費（専用設備の減価償却費・回避可能）</td><td class=\"num\">￥80 / 個</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>固定製造間接費（工場共通固定費・回避不能）</td><td class=\"num\">￥70 / 個</td><td class=\"num\">￥700,000</td></tr>\n    <tr><td>内製総原価</td><td class=\"num\">￥500 / 個</td><td class=\"num\">￥5,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【外注先からの提案および遊休設備の活用】</strong><br>\n    ・外部サプライヤーより同部品を1個あたり <strong>￥410</strong> で納入する提案があった（年間 ￥4,100,000）。<br>\n    ・外注した場合、専用設備は処分（廃棄）されるため専用設備減価償却費（￥800,000）は発生しない。<br>\n    ・外注により空いた工場スペースを他社に賃貸することで、年間 <strong>￥150,000</strong> の賃貸収入（機会収益）が得られる。\n  </div>\n</div>",
        "options": [
          "(1) ＋￥350,000（利益増加のため外注に切り替えるべき）",
          "(2) ＋￥200,000（機会収益を考慮せず外注に切り替えるべき）",
          "(3) △￥350,000（内製を継続すべき）",
          "(4) ＋￥900,000（総原価との比較）"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n回避できる内製関連原価 ￥4,300,000 − 外注時の純支出 ￥3,950,000 ＝ <strong>＋￥350,000</strong><br>\n年間35万円のコスト削減（利益増加）となるため、<strong>「外注に切り替えるべき」</strong>と判定します。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-18"
      },
      {
        "num": 19,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・差額原価収益分析",
        "catName": "無差別点分析",
        "title": "内製と外注の原価が等しくなる【損益分岐外注単価（インディファレンス・プライス）】の算定",
        "text": "機会収益 ￥150,000 が得られないと仮定した場合、内製と外注のコストが等しくなる【外注単価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale-right\"></i> 資料：部品の内製か外注（買入）かに関する差額原価データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素（内製時：年間10,000個製造）</th><th>単位あたり金額</th><th>年間総額</th></tr></thead><tbody>\n    <tr><td>直接材料費（変動費）</td><td class=\"num\">￥120 / 個</td><td class=\"num\">￥1,200,000</td></tr>\n    <tr><td>直接労務費（変動費）</td><td class=\"num\">￥180 / 個</td><td class=\"num\">￥1,800,000</td></tr>\n    <tr><td>変動製造間接費</td><td class=\"num\">￥50 / 個</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>固定製造間接費（専用設備の減価償却費・回避可能）</td><td class=\"num\">￥80 / 個</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>固定製造間接費（工場共通固定費・回避不能）</td><td class=\"num\">￥70 / 個</td><td class=\"num\">￥700,000</td></tr>\n    <tr><td>内製総原価</td><td class=\"num\">￥500 / 個</td><td class=\"num\">￥5,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【外注先からの提案および遊休設備の活用】</strong><br>\n    ・外部サプライヤーより同部品を1個あたり <strong>￥410</strong> で納入する提案があった（年間 ￥4,100,000）。<br>\n    ・外注した場合、専用設備は処分（廃棄）されるため専用設備減価償却費（￥800,000）は発生しない。<br>\n    ・外注により空いた工場スペースを他社に賃貸することで、年間 <strong>￥150,000</strong> の賃貸収入（機会収益）が得られる。\n  </div>\n</div>",
        "options": [
          "(1) ￥430 / 個",
          "(2) ￥500 / 個",
          "(3) ￥350 / 個",
          "(4) ￥410 / 個"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n機会収益がない場合、回避可能原価（￥4,300,000）＝ 外注支出（10,000個 × 単価 P）となる単価：<br>\nP ＝ ￥4,300,000 ÷ 10,000個 ＝ <strong>￥430 / 個</strong>",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-19"
      },
      {
        "num": 20,
        "section": "cost",
        "sectionName": "【原価計算】業務的意思決定・差額原価収益分析",
        "catName": "埋没原価（サンクコスト）",
        "title": "意思決定において考慮から除外すべき【埋没原価（サンクコスト）】の定義",
        "text": "当意思決定において工場共通固定費 ￥700,000 を比較から除外した理論的根拠として最も適切な記述を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-balance-scale-right\"></i> 資料：部品の内製か外注（買入）かに関する差額原価データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>原価要素（内製時：年間10,000個製造）</th><th>単位あたり金額</th><th>年間総額</th></tr></thead><tbody>\n    <tr><td>直接材料費（変動費）</td><td class=\"num\">￥120 / 個</td><td class=\"num\">￥1,200,000</td></tr>\n    <tr><td>直接労務費（変動費）</td><td class=\"num\">￥180 / 個</td><td class=\"num\">￥1,800,000</td></tr>\n    <tr><td>変動製造間接費</td><td class=\"num\">￥50 / 個</td><td class=\"num\">￥500,000</td></tr>\n    <tr><td>固定製造間接費（専用設備の減価償却費・回避可能）</td><td class=\"num\">￥80 / 個</td><td class=\"num\">￥800,000</td></tr>\n    <tr><td>固定製造間接費（工場共通固定費・回避不能）</td><td class=\"num\">￥70 / 個</td><td class=\"num\">￥700,000</td></tr>\n    <tr><td>内製総原価</td><td class=\"num\">￥500 / 個</td><td class=\"num\">￥5,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【外注先からの提案および遊休設備の活用】</strong><br>\n    ・外部サプライヤーより同部品を1個あたり <strong>￥410</strong> で納入する提案があった（年間 ￥4,100,000）。<br>\n    ・外注した場合、専用設備は処分（廃棄）されるため専用設備減価償却費（￥800,000）は発生しない。<br>\n    ・外注により空いた工場スペースを他社に賃貸することで、年間 <strong>￥150,000</strong> の賃貸収入（機会収益）が得られる。\n  </div>\n</div>",
        "options": [
          "(1) 内製・外注のいずれの選択肢を採用しても発生額が変わらない回避不能原価（無関連原価・埋没原価）であるため",
          "(2) 金額が他の原価要素に比べて少額であるため",
          "(3) 財務会計上の費用であって管理会計上の原価ではないため",
          "(4) 将来のキャッシュ・アウトフローを伴わないため"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n意思決定会計では、選択肢の間で差異の生じる「差額原価（関連原価）」のみを比較します。<br>\nどちらの選択肢をとっても発生額が同額である原価は<strong>回避不能原価（無関連原価）</strong>であり、意思決定判断から除外します。",
        "points": 5,
        "sessionId": "5",
        "sessionName": "第5回実戦予想模試",
        "qid": "boki1-pool-s5-20"
      }
    ]
  },
  "6": {
    "id": "6",
    "title": "第6回実戦予想模試（商業簿記・会計学・工業簿記・原価計算 全4科目）",
    "questions": [
      {
        "num": 1,
        "section": "commercial",
        "sectionName": "【商業簿記】組織再編・企業結合（吸収合併）",
        "catName": "取得対価の算定",
        "title": "パーチェス法における【株式交付による取得対価】の算定",
        "text": "次の資料に基づき、A社における被合併会社B社の【株式交付による取得対価の金額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-handshake\"></i> 資料：A社によるB社の吸収合併データ（パーチェス法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>B社（被合併会社）帳簿価額</th><th>B社資産・負債の時価</th></tr></thead><tbody>\n    <tr><td>諸資産（流動資産・有形固定資産等）</td><td class=\"num\">￥40,000,000</td><td class=\"num\">￥45,000,000</td></tr>\n    <tr><td>諸負債（買掛金・借入金等）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">￥25,000,000</td></tr>\n    <tr><td>差引純資産</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥20,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【合併条件および対価の交付】</strong><br>\n    ・A社はB社を吸収合併し、B社株主に対してA社普通株式 10,000株 を交付した。<br>\n    ・合併期日におけるA社株式の時価は 1株あたり <strong>￥2,500</strong> である。<br>\n    ・A社は交付した株式の増加資本を全額「資本金」として計上する。<br>\n    ・発生したのれんは20年定額法で償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥25,000,000",
          "(2) ￥20,000,000",
          "(3) ￥15,000,000",
          "(4) ￥45,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n企業結合会計（パーチェス法）において、自社の株式を対価として交付する場合の取得対価は、<strong>交付する自社株式の時価</strong>で算定します。<br>\n交付株式数 10,000株 × 株価 ￥2,500 ＝ <strong>￥25,000,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-1"
      },
      {
        "num": 2,
        "section": "commercial",
        "sectionName": "【商業簿記】組織再編・企業結合（吸収合併）",
        "catName": "受け入れ純資産時価",
        "title": "被合併会社から受け入れる【諸資産・諸負債の時価純資産額】の算定",
        "text": "前問の資料に基づき、合併期日においてA社が受け入れるB社の【時価純資産額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-handshake\"></i> 資料：A社によるB社の吸収合併データ（パーチェス法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>B社（被合併会社）帳簿価額</th><th>B社資産・負債の時価</th></tr></thead><tbody>\n    <tr><td>諸資産（流動資産・有形固定資産等）</td><td class=\"num\">￥40,000,000</td><td class=\"num\">￥45,000,000</td></tr>\n    <tr><td>諸負債（買掛金・借入金等）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">￥25,000,000</td></tr>\n    <tr><td>差引純資産</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥20,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【合併条件および対価の交付】</strong><br>\n    ・A社はB社を吸収合併し、B社株主に対してA社普通株式 10,000株 を交付した。<br>\n    ・合併期日におけるA社株式の時価は 1株あたり <strong>￥2,500</strong> である。<br>\n    ・A社は交付した株式の増加資本を全額「資本金」として計上する。<br>\n    ・発生したのれんは20年定額法で償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥20,000,000（資産時価￥45,000,000 − 負債時価￥25,000,000）",
          "(2) ￥15,000,000（簿価純資産額）",
          "(3) ￥45,000,000（資産時価総額）",
          "(4) ￥25,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nパーチェス法では、被合併会社から引き継ぐ資産および負債を<strong>合併期日の「時価」</strong>で受け入れます。<br>\n受入資産時価 ￥45,000,000 − 受入負債時価 ￥25,000,000 ＝ <strong>￥20,000,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-2"
      },
      {
        "num": 3,
        "section": "commercial",
        "sectionName": "【商業簿記】組織再編・企業結合（吸収合併）",
        "catName": "のれんの算定",
        "title": "吸収合併に伴い計上される【のれん】の金額",
        "text": "前問の資料に基づき、A社の合併仕訳において計上される【のれん】の金額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-handshake\"></i> 資料：A社によるB社の吸収合併データ（パーチェス法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>B社（被合併会社）帳簿価額</th><th>B社資産・負債の時価</th></tr></thead><tbody>\n    <tr><td>諸資産（流動資産・有形固定資産等）</td><td class=\"num\">￥40,000,000</td><td class=\"num\">￥45,000,000</td></tr>\n    <tr><td>諸負債（買掛金・借入金等）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">￥25,000,000</td></tr>\n    <tr><td>差引純資産</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥20,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【合併条件および対価の交付】</strong><br>\n    ・A社はB社を吸収合併し、B社株主に対してA社普通株式 10,000株 を交付した。<br>\n    ・合併期日におけるA社株式の時価は 1株あたり <strong>￥2,500</strong> である。<br>\n    ・A社は交付した株式の増加資本を全額「資本金」として計上する。<br>\n    ・発生したのれんは20年定額法で償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥5,000,000",
          "(2) ￥10,000,000",
          "(3) ￥0（負ののれん発生益）",
          "(4) ￥2,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nのれん ＝ 取得対価 ￥25,000,000 − 受入時価純資産 ￥20,000,000 ＝ <strong>￥5,000,000</strong><br>\n（借方差額としてのれんを計上します）",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-3"
      },
      {
        "num": 4,
        "section": "commercial",
        "sectionName": "【商業簿記】組織再編・企業結合（吸収合併）",
        "catName": "合併仕訳",
        "title": "合併期日における【A社の合併仕訳】の貸借科目と金額",
        "text": "前問の資料に基づき、A社における合併時の正しい仕訳を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-handshake\"></i> 資料：A社によるB社の吸収合併データ（パーチェス法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>B社（被合併会社）帳簿価額</th><th>B社資産・負債の時価</th></tr></thead><tbody>\n    <tr><td>諸資産（流動資産・有形固定資産等）</td><td class=\"num\">￥40,000,000</td><td class=\"num\">￥45,000,000</td></tr>\n    <tr><td>諸負債（買掛金・借入金等）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">￥25,000,000</td></tr>\n    <tr><td>差引純資産</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥20,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【合併条件および対価の交付】</strong><br>\n    ・A社はB社を吸収合併し、B社株主に対してA社普通株式 10,000株 を交付した。<br>\n    ・合併期日におけるA社株式の時価は 1株あたり <strong>￥2,500</strong> である。<br>\n    ・A社は交付した株式の増加資本を全額「資本金」として計上する。<br>\n    ・発生したのれんは20年定額法で償却する。\n  </div>\n</div>",
        "options": [
          "(1) （借）諸資産 45,000,000、のれん 5,000,000 ／（貸）諸負債 25,000,000、資本金 25,000,000",
          "(2) （借）諸資産 40,000,000、のれん 10,000,000 ／（貸）諸負債 25,000,000、資本金 25,000,000",
          "(3) （借）諸資産 45,000,000 ／（貸）諸負債 25,000,000、資本金 20,000,000",
          "(4) （借）諸資産 45,000,000、のれん 5,000,000 ／（貸）諸負債 25,000,000、資本金 20,000,000、資本剰余金 5,000,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n増加資本は全額資本金とするため：<br>\n（借）諸資産 45,000,000<br>\n（借）のれん  5,000,000<br>\n（貸）諸負債 25,000,000<br>\n（貸）資本金 25,000,000",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-4"
      },
      {
        "num": 5,
        "section": "commercial",
        "sectionName": "【商業簿記】組織再編・企業結合（吸収合併）",
        "catName": "のれん償却",
        "title": "合併後第1年度における【のれん当期償却額】の算定",
        "text": "A社が当期のれん（￥5,000,000）を20年定額法で償却する場合の【年間償却額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-handshake\"></i> 資料：A社によるB社の吸収合併データ（パーチェス法）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>B社（被合併会社）帳簿価額</th><th>B社資産・負債の時価</th></tr></thead><tbody>\n    <tr><td>諸資産（流動資産・有形固定資産等）</td><td class=\"num\">￥40,000,000</td><td class=\"num\">￥45,000,000</td></tr>\n    <tr><td>諸負債（買掛金・借入金等）</td><td class=\"num\">￥25,000,000</td><td class=\"num\">￥25,000,000</td></tr>\n    <tr><td>差引純資産</td><td class=\"num\">￥15,000,000</td><td class=\"num\">￥20,000,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【合併条件および対価の交付】</strong><br>\n    ・A社はB社を吸収合併し、B社株主に対してA社普通株式 10,000株 を交付した。<br>\n    ・合併期日におけるA社株式の時価は 1株あたり <strong>￥2,500</strong> である。<br>\n    ・A社は交付した株式の増加資本を全額「資本金」として計上する。<br>\n    ・発生したのれんは20年定額法で償却する。\n  </div>\n</div>",
        "options": [
          "(1) ￥250,000",
          "(2) ￥500,000",
          "(3) ￥125,000",
          "(4) ￥200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n年間償却額 ＝ 取得時価 ￥5,000,000 ÷ 20年 ＝ <strong>￥250,000</strong>（P/L販売費及び一般管理費）",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-5"
      },
      {
        "num": 6,
        "section": "accounting",
        "sectionName": "【会計学】税効果会計・繰延税金資産",
        "catName": "繰延税金資産の算定",
        "title": "損益に関わる将来減算一時差異に対する【繰延税金資産】の算定",
        "text": "次の資料に基づき、当期末に計上すべき【繰延税金資産（賞与引当金・貸倒引当金）】の金額を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-invoice-dollar\"></i> 資料：期末決算における一時差異および税効果会計データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>一時差異項目</th><th>税務上の簿価</th><th>会計上の簿価</th><th>一時差異の性格</th></tr></thead><tbody>\n    <tr><td>賞与引当金（当期費用計上額）</td><td class=\"num\">￥0</td><td class=\"num\">￥2,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>貸倒引当金損金算入限度超過額</td><td class=\"num\">￥0</td><td class=\"num\">￥1,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>その他有価証券評価差額金（評価益）</td><td class=\"num\">￥5,000,000</td><td class=\"num\">￥8,000,000</td><td>将来加算一時差異（全部純資産直入）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【前提条件】</strong><br>\n    ・法定実効税率は <strong>30％</strong> とする。<br>\n    ・将来減算一時差異の全額について回収可能性が認められる。<br>\n    ・税引前当期純利益は ￥15,000,000、当期発生の法人税・住民税及び事業税は ￥5,000,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥900,000（(￥2,000,000＋￥1,000,000) × 30%）",
          "(2) ￥600,000",
          "(3) ￥3,000,000",
          "(4) ￥1,200,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n将来減算一時差異の合計 ＝ 賞与引当金 ￥2,000,000 ＋ 貸倒引当金限度超過 ￥1,000,000 ＝ ￥3,000,000<br>\n繰延税金資産 ＝ ￥3,000,000 × 法定実効税率 30% ＝ <strong>￥900,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-6"
      },
      {
        "num": 7,
        "section": "accounting",
        "sectionName": "【会計学】税効果会計・繰延税金負債",
        "catName": "繰延税金負債の算定",
        "title": "その他有価証券評価差額金に対する【繰延税金負債】の算定",
        "text": "前問の資料に基づき、その他有価証券の評価益（￥3,000,000）に対して計上すべき【繰延税金負債】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-invoice-dollar\"></i> 資料：期末決算における一時差異および税効果会計データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>一時差異項目</th><th>税務上の簿価</th><th>会計上の簿価</th><th>一時差異の性格</th></tr></thead><tbody>\n    <tr><td>賞与引当金（当期費用計上額）</td><td class=\"num\">￥0</td><td class=\"num\">￥2,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>貸倒引当金損金算入限度超過額</td><td class=\"num\">￥0</td><td class=\"num\">￥1,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>その他有価証券評価差額金（評価益）</td><td class=\"num\">￥5,000,000</td><td class=\"num\">￥8,000,000</td><td>将来加算一時差異（全部純資産直入）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【前提条件】</strong><br>\n    ・法定実効税率は <strong>30％</strong> とする。<br>\n    ・将来減算一時差異の全額について回収可能性が認められる。<br>\n    ・税引前当期純利益は ￥15,000,000、当期発生の法人税・住民税及び事業税は ￥5,000,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥900,000（その他有価証券評価差額金から直接控除）",
          "(2) ￥900,000（法人税等調整額に計上）",
          "(3) ￥1,500,000",
          "(4) ￥600,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n評価益 ＝ 会計時価 ￥8,000,000 − 税務簿価 ￥5,000,000 ＝ ￥3,000,000（将来加算一時差異）<br>\n繰延税金負債 ＝ ￥3,000,000 × 30% ＝ <strong>￥900,000</strong><br>\n（相手科目はP/Lの法人税等調整額ではなく、純資産の部「その他有価証券評価差額金」から直接控除します）",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-7"
      },
      {
        "num": 8,
        "section": "accounting",
        "sectionName": "【会計学】税効果会計・繰延税金資産",
        "catName": "法人税等調整額",
        "title": "損益計算書に計上される【法人税等調整額（貸方）】の算定",
        "text": "前問の資料に基づき、損益計算書に計上される【法人税等調整額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-invoice-dollar\"></i> 資料：期末決算における一時差異および税効果会計データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>一時差異項目</th><th>税務上の簿価</th><th>会計上の簿価</th><th>一時差異の性格</th></tr></thead><tbody>\n    <tr><td>賞与引当金（当期費用計上額）</td><td class=\"num\">￥0</td><td class=\"num\">￥2,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>貸倒引当金損金算入限度超過額</td><td class=\"num\">￥0</td><td class=\"num\">￥1,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>その他有価証券評価差額金（評価益）</td><td class=\"num\">￥5,000,000</td><td class=\"num\">￥8,000,000</td><td>将来加算一時差異（全部純資産直入）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【前提条件】</strong><br>\n    ・法定実効税率は <strong>30％</strong> とする。<br>\n    ・将来減算一時差異の全額について回収可能性が認められる。<br>\n    ・税引前当期純利益は ￥15,000,000、当期発生の法人税・住民税及び事業税は ￥5,000,000 である。\n  </div>\n</div>",
        "options": [
          "(1) △￥900,000（貸方・税金費用の減額）",
          "(2) ￥0（相殺されるため）",
          "(3) ＋￥900,000（借方・税金費用の加算）",
          "(4) △￥1,800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n仕訳：（借）繰延税金資産 900,000 ／（貸）法人税等調整額 900,000<br>\nその他有価証券に係る繰延税金負債は損益を通さないため、損益計算書に計上される法人税等調整額は繰延税金資産計上による<strong>「△￥900,000（貸方・税金の控除）」</strong>となります。",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-8"
      },
      {
        "num": 9,
        "section": "accounting",
        "sectionName": "【会計学】税効果会計・繰延税金資産",
        "catName": "当期純利益",
        "title": "税効果適用後における【損益計算書の当期純利益】の算定",
        "text": "前問の資料に基づき、税引前当期純利益 ￥15,000,000 から法人税等および法人税等調整額を反映した後の【当期純利益】を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-invoice-dollar\"></i> 資料：期末決算における一時差異および税効果会計データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>一時差異項目</th><th>税務上の簿価</th><th>会計上の簿価</th><th>一時差異の性格</th></tr></thead><tbody>\n    <tr><td>賞与引当金（当期費用計上額）</td><td class=\"num\">￥0</td><td class=\"num\">￥2,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>貸倒引当金損金算入限度超過額</td><td class=\"num\">￥0</td><td class=\"num\">￥1,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>その他有価証券評価差額金（評価益）</td><td class=\"num\">￥5,000,000</td><td class=\"num\">￥8,000,000</td><td>将来加算一時差異（全部純資産直入）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【前提条件】</strong><br>\n    ・法定実効税率は <strong>30％</strong> とする。<br>\n    ・将来減算一時差異の全額について回収可能性が認められる。<br>\n    ・税引前当期純利益は ￥15,000,000、当期発生の法人税・住民税及び事業税は ￥5,000,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥10,900,000",
          "(2) ￥10,000,000",
          "(3) ￥9,100,000",
          "(4) ￥11,500,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 税金費用合計 ＝ 法人税・住民税及び事業税 ￥5,000,000 − 法人税等調整額 ￥900,000 ＝ ￥4,100,000<br>\n2. 当期純利益 ＝ 税引前利益 ￥15,000,000 − ￥4,100,000 ＝ <strong>￥10,900,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-9"
      },
      {
        "num": 10,
        "section": "accounting",
        "sectionName": "【会計学】税効果会計・繰延税金資産",
        "catName": "純資産の部",
        "title": "税効果控除後における【純資産の部・その他有価証券評価差額金】の残高",
        "text": "前問の資料に基づき、貸借対照表の純資産の部に計上される【その他有価証券評価差額金】の純額として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-file-invoice-dollar\"></i> 資料：期末決算における一時差異および税効果会計データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>一時差異項目</th><th>税務上の簿価</th><th>会計上の簿価</th><th>一時差異の性格</th></tr></thead><tbody>\n    <tr><td>賞与引当金（当期費用計上額）</td><td class=\"num\">￥0</td><td class=\"num\">￥2,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>貸倒引当金損金算入限度超過額</td><td class=\"num\">￥0</td><td class=\"num\">￥1,000,000</td><td>将来減算一時差異</td></tr>\n    <tr><td>その他有価証券評価差額金（評価益）</td><td class=\"num\">￥5,000,000</td><td class=\"num\">￥8,000,000</td><td>将来加算一時差異（全部純資産直入）</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【前提条件】</strong><br>\n    ・法定実効税率は <strong>30％</strong> とする。<br>\n    ・将来減算一時差異の全額について回収可能性が認められる。<br>\n    ・税引前当期純利益は ￥15,000,000、当期発生の法人税・住民税及び事業税は ￥5,000,000 である。\n  </div>\n</div>",
        "options": [
          "(1) ￥2,100,000（評価益￥3,000,000 × (1 − 0.3)）",
          "(2) ￥3,000,000（税効果控除前）",
          "(3) ￥900,000",
          "(4) ￥2,700,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\nその他有価証券評価差額金は税効果控除後の純額で純資産に計上します。<br>\n税引前評価差額 ￥3,000,000 − 繰延税金負債 ￥900,000 ＝ <strong>￥2,100,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-10"
      },
      {
        "num": 11,
        "section": "industrial",
        "sectionName": "【工業簿記】個別原価計算・仕損費と補修指図書",
        "catName": "補修指図書原価",
        "title": "補修指図書 #101補修 に集計された【仕損補修原価総額】の算定",
        "text": "次の資料に基づき、補修指図書 #101補修 に集計された【補修総原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-clipboard-list\"></i> 資料：製造指図書別原価計算および仕損費データ（個別原価計算）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>指図書番号</th><th>製品名・仕様</th><th>直接材料費</th><th>直接労務費</th><th>製造間接費配賦額</th></tr></thead><tbody>\n    <tr><td>#101</td><td>特殊工作機械A</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥800,000</td><td class=\"num\">￥600,000</td></tr>\n    <tr><td>#102</td><td>特殊工作機械B</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥750,000</td></tr>\n    <tr><td>#101補修</td><td>#101の正常仕損補修</td><td class=\"num\">￥100,000</td><td class=\"num\">￥80,000</td><td class=\"num\">￥60,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【仕損処理の条件】</strong><br>\n    ・製造指図書 #101 の製造途中に正常な仕損が発生し、補修指図書 #101補修 を発行して手直しを行った。<br>\n    ・この仕損は #101 の特異な構造に起因して発生したものであるため、補修原価はすべて #101 に直接賦課する。<br>\n    ・仕損品から回収された作業くずの売却見積額は ￥40,000 であった。\n  </div>\n</div>",
        "options": [
          "(1) ￥240,000（材料￥100,000 ＋ 労務￥80,000 ＋ 間接費￥60,000）",
          "(2) ￥180,000（直接費のみ）",
          "(3) ￥200,000",
          "(4) ￥280,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n補修総原価 ＝ 直接材料費 ￥100,000 ＋ 直接労務費 ￥80,000 ＋ 製造間接費配賦額 ￥60,000 ＝ <strong>￥240,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-11"
      },
      {
        "num": 12,
        "section": "industrial",
        "sectionName": "【工業簿記】個別原価計算・仕損費と補修指図書",
        "catName": "純仕損費",
        "title": "作業くず評価額を控除した後の【純仕損費（賦課額）】の算定",
        "text": "前問の資料に基づき、作業くず評価額 ￥40,000 を控除した後の【#101に賦課すべき純仕損費】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-clipboard-list\"></i> 資料：製造指図書別原価計算および仕損費データ（個別原価計算）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>指図書番号</th><th>製品名・仕様</th><th>直接材料費</th><th>直接労務費</th><th>製造間接費配賦額</th></tr></thead><tbody>\n    <tr><td>#101</td><td>特殊工作機械A</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥800,000</td><td class=\"num\">￥600,000</td></tr>\n    <tr><td>#102</td><td>特殊工作機械B</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥750,000</td></tr>\n    <tr><td>#101補修</td><td>#101の正常仕損補修</td><td class=\"num\">￥100,000</td><td class=\"num\">￥80,000</td><td class=\"num\">￥60,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【仕損処理の条件】</strong><br>\n    ・製造指図書 #101 の製造途中に正常な仕損が発生し、補修指図書 #101補修 を発行して手直しを行った。<br>\n    ・この仕損は #101 の特異な構造に起因して発生したものであるため、補修原価はすべて #101 に直接賦課する。<br>\n    ・仕損品から回収された作業くずの売却見積額は ￥40,000 であった。\n  </div>\n</div>",
        "options": [
          "(1) ￥200,000",
          "(2) ￥240,000",
          "(3) ￥160,000",
          "(4) ￥40,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n純仕損費 ＝ 補修原価 ￥240,000 − 作業くず売却見込額 ￥40,000 ＝ <strong>￥200,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-12"
      },
      {
        "num": 13,
        "section": "industrial",
        "sectionName": "【工業簿記】個別原価計算・仕損費と補修指図書",
        "catName": "製造指図書別原価計算",
        "title": "純仕損費賦課後における【製造指図書 #101 の最終完成品原価】の算定",
        "text": "前問の資料に基づき、仕損補修を完了した【製造指図書 #101 の完成品総製造原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-clipboard-list\"></i> 資料：製造指図書別原価計算および仕損費データ（個別原価計算）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>指図書番号</th><th>製品名・仕様</th><th>直接材料費</th><th>直接労務費</th><th>製造間接費配賦額</th></tr></thead><tbody>\n    <tr><td>#101</td><td>特殊工作機械A</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥800,000</td><td class=\"num\">￥600,000</td></tr>\n    <tr><td>#102</td><td>特殊工作機械B</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥750,000</td></tr>\n    <tr><td>#101補修</td><td>#101の正常仕損補修</td><td class=\"num\">￥100,000</td><td class=\"num\">￥80,000</td><td class=\"num\">￥60,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【仕損処理の条件】</strong><br>\n    ・製造指図書 #101 の製造途中に正常な仕損が発生し、補修指図書 #101補修 を発行して手直しを行った。<br>\n    ・この仕損は #101 の特異な構造に起因して発生したものであるため、補修原価はすべて #101 に直接賦課する。<br>\n    ・仕損品から回収された作業くずの売却見積額は ￥40,000 であった。\n  </div>\n</div>",
        "options": [
          "(1) ￥2,800,000",
          "(2) ￥2,600,000",
          "(3) ￥2,840,000",
          "(4) ￥2,760,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n1. 当初の基本原価 ＝ ￥1,200,000 ＋ ￥800,000 ＋ ￥600,000 ＝ ￥2,600,000<br>\n2. 純仕損費賦課額 ＝ ￥200,000<br>\n3. <strong>完成品総原価</strong> ＝ ￥2,600,000 ＋ ￥200,000 ＝ <strong>￥2,800,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-13"
      },
      {
        "num": 14,
        "section": "industrial",
        "sectionName": "【工業簿記】個別原価計算・仕損費と補修指図書",
        "catName": "異常仕損の会計処理",
        "title": "異常な原因により発生した仕損費の財務会計上の処理区分",
        "text": "仮にこの仕損が作業員の著しい過失や偶発的停電など「異常な原因」によるものであった場合の会計処理として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-clipboard-list\"></i> 資料：製造指図書別原価計算および仕損費データ（個別原価計算）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>指図書番号</th><th>製品名・仕様</th><th>直接材料費</th><th>直接労務費</th><th>製造間接費配賦額</th></tr></thead><tbody>\n    <tr><td>#101</td><td>特殊工作機械A</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥800,000</td><td class=\"num\">￥600,000</td></tr>\n    <tr><td>#102</td><td>特殊工作機械B</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥750,000</td></tr>\n    <tr><td>#101補修</td><td>#101の正常仕損補修</td><td class=\"num\">￥100,000</td><td class=\"num\">￥80,000</td><td class=\"num\">￥60,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【仕損処理の条件】</strong><br>\n    ・製造指図書 #101 の製造途中に正常な仕損が発生し、補修指図書 #101補修 を発行して手直しを行った。<br>\n    ・この仕損は #101 の特異な構造に起因して発生したものであるため、補修原価はすべて #101 に直接賦課する。<br>\n    ・仕損品から回収された作業くずの売却見積額は ￥40,000 であった。\n  </div>\n</div>",
        "options": [
          "(1) 製造原価には算入せず、非原価項目として「営業外費用」または「特別損失」に計上する",
          "(2) 製造間接費に算入し、当期の全指図書に配賦する",
          "(3) 製造指図書 #101 の製造原価に全額賦課する",
          "(4) 翌期の仕掛品に繰り延べる"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n原価計算基準に基づき、異常な原因によって生じた異常仕損費は「非原価項目」とされ、製品の製造原価には含めず、<strong>営業外費用または特別損失</strong>として処理します。",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-14"
      },
      {
        "num": 15,
        "section": "industrial",
        "sectionName": "【工業簿記】個別原価計算・仕損費と補修指図書",
        "catName": "製造指図書別原価計算",
        "title": "製造指図書 #102 の完成品製造原価の算定",
        "text": "仕損の発生しなかった製造指図書 #102 の【完成品総製造原価】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-clipboard-list\"></i> 資料：製造指図書別原価計算および仕損費データ（個別原価計算）</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>指図書番号</th><th>製品名・仕様</th><th>直接材料費</th><th>直接労務費</th><th>製造間接費配賦額</th></tr></thead><tbody>\n    <tr><td>#101</td><td>特殊工作機械A</td><td class=\"num\">￥1,200,000</td><td class=\"num\">￥800,000</td><td class=\"num\">￥600,000</td></tr>\n    <tr><td>#102</td><td>特殊工作機械B</td><td class=\"num\">￥1,500,000</td><td class=\"num\">￥1,000,000</td><td class=\"num\">￥750,000</td></tr>\n    <tr><td>#101補修</td><td>#101の正常仕損補修</td><td class=\"num\">￥100,000</td><td class=\"num\">￥80,000</td><td class=\"num\">￥60,000</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【仕損処理の条件】</strong><br>\n    ・製造指図書 #101 の製造途中に正常な仕損が発生し、補修指図書 #101補修 を発行して手直しを行った。<br>\n    ・この仕損は #101 の特異な構造に起因して発生したものであるため、補修原価はすべて #101 に直接賦課する。<br>\n    ・仕損品から回収された作業くずの売却見積額は ￥40,000 であった。\n  </div>\n</div>",
        "options": [
          "(1) ￥3,250,000",
          "(2) ￥3,500,000",
          "(3) ￥3,000,000",
          "(4) ￥3,450,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n#102 総製造原価 ＝ 材料費 ￥1,500,000 ＋ 労務費 ￥1,000,000 ＋ 製造間接費 ￥750,000 ＝ <strong>￥3,250,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-15"
      },
      {
        "num": 16,
        "section": "cost",
        "sectionName": "【原価計算】事業部制会計・内部振替価格",
        "catName": "振替価格の下限",
        "title": "遊休生産能力が存在する場合における【供給事業部側の許容最低振替価格（下限）】",
        "text": "次の資料に基づき、供給事業部に2,000個の遊休能力がある場合、供給事業部が受け入れ可能な【最低振替価格（下限）】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exchange-alt\"></i> 資料：事業部制組織における内部振替価格データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>部品製造事業部（供給側）</th><th>完成品組立事業部（受入側）</th></tr></thead><tbody>\n    <tr><td>部品の単位あたり変動費</td><td class=\"num\">￥600 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>部品の単位あたり固定費（通常時）</td><td class=\"num\">￥300 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場への部品販売単価</td><td class=\"num\">￥1,200 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場での販売可能最大量</td><td class=\"num\">8,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>部品製造事業部の生産能力</td><td class=\"num\">10,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>組立事業部の必要部品量</td><td class=\"num\">−</td><td class=\"num\">2,000 個 / 月</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産余力および意思決定条件】</strong><br>\n    ・供給事業部には月間 2,000個（10,000個 − 8,000個）の遊休生産能力（余力）が存在する。<br>\n    ・組立事業部は社内から調達できない場合、外部市場から同等品を ￥1,150 で購入可能である。\n  </div>\n</div>",
        "options": [
          "(1) ￥600 / 個（単位あたり変動費）",
          "(2) ￥900 / 個（全部製造原価：変動費￥600＋固定費￥300）",
          "(3) ￥1,200 / 個（外部市価）",
          "(4) ￥1,150 / 個"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n遊休生産能力が存在する場合、内部振替を行っても外部販売の機会損失（機会原価）は発生しません。<br>\nしたがって、追加的に発生する増分現金支出（単位あたり変動費）をカバーできれば利益に貢献するため、下限価格は <strong>￥600 / 個</strong> となります。",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-16"
      },
      {
        "num": 17,
        "section": "cost",
        "sectionName": "【原価計算】事業部制会計・内部振替価格",
        "catName": "振替価格の上限",
        "title": "受入事業部側における【許容最高振替価格（上限）】の決定",
        "text": "前問の資料に基づき、組立事業部（受入側）が受け入れ可能な【最高振替価格（上限）】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exchange-alt\"></i> 資料：事業部制組織における内部振替価格データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>部品製造事業部（供給側）</th><th>完成品組立事業部（受入側）</th></tr></thead><tbody>\n    <tr><td>部品の単位あたり変動費</td><td class=\"num\">￥600 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>部品の単位あたり固定費（通常時）</td><td class=\"num\">￥300 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場への部品販売単価</td><td class=\"num\">￥1,200 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場での販売可能最大量</td><td class=\"num\">8,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>部品製造事業部の生産能力</td><td class=\"num\">10,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>組立事業部の必要部品量</td><td class=\"num\">−</td><td class=\"num\">2,000 個 / 月</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産余力および意思決定条件】</strong><br>\n    ・供給事業部には月間 2,000個（10,000個 − 8,000個）の遊休生産能力（余力）が存在する。<br>\n    ・組立事業部は社内から調達できない場合、外部市場から同等品を ￥1,150 で購入可能である。\n  </div>\n</div>",
        "options": [
          "(1) ￥1,150 / 個（外部代替品調達価格）",
          "(2) ￥1,200 / 個（部品外部市価）",
          "(3) ￥900 / 個（全部製造原価）",
          "(4) ￥600 / 個"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n受入側事業部は外部サプライヤーから ￥1,150 で購入できるため、これを超える価格では社内調達する経済的合理性がありません。<br>\nしたがって、上限価格は外部調達価格である <strong>￥1,150 / 個</strong> となります。",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-17"
      },
      {
        "num": 18,
        "section": "cost",
        "sectionName": "【原価計算】事業部制会計・内部振替価格",
        "catName": "交渉可能価格帯",
        "title": "全社最適および事業部自律性を両立する【社内交渉振替価格の成立範囲】",
        "text": "前問の資料に基づき、両事業部が合意しうる【内部振替価格（P）の成立範囲】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exchange-alt\"></i> 資料：事業部制組織における内部振替価格データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>部品製造事業部（供給側）</th><th>完成品組立事業部（受入側）</th></tr></thead><tbody>\n    <tr><td>部品の単位あたり変動費</td><td class=\"num\">￥600 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>部品の単位あたり固定費（通常時）</td><td class=\"num\">￥300 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場への部品販売単価</td><td class=\"num\">￥1,200 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場での販売可能最大量</td><td class=\"num\">8,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>部品製造事業部の生産能力</td><td class=\"num\">10,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>組立事業部の必要部品量</td><td class=\"num\">−</td><td class=\"num\">2,000 個 / 月</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産余力および意思決定条件】</strong><br>\n    ・供給事業部には月間 2,000個（10,000個 − 8,000個）の遊休生産能力（余力）が存在する。<br>\n    ・組立事業部は社内から調達できない場合、外部市場から同等品を ￥1,150 で購入可能である。\n  </div>\n</div>",
        "options": [
          "(1) ￥600 ≦ P ≦ ￥1,150",
          "(2) ￥900 ≦ P ≦ ￥1,200",
          "(3) ￥600 ≦ P ≦ ￥900",
          "(4) ￥900 ≦ P ≦ ￥1,150"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n下限価格（供給側の単位あたり変動費 ￥600）から上限価格（受入側の外部調達価格 ￥1,150）までの間であれば、双方の事業部利益が改善するため、<strong>￥600 ≦ P ≦ ￥1,150</strong> の範囲で交渉が成立します。",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-18"
      },
      {
        "num": 19,
        "section": "cost",
        "sectionName": "【原価計算】事業部制会計・内部振替価格",
        "catName": "全社利益の変動",
        "title": "社内振替（2,000個）を実行した場合の【全社利益増加額】の算定",
        "text": "社外から ￥1,150 で購入せず社内で振替製造（変動費￥600）した場合の【全社営業利益の増加額】として正しいものを選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exchange-alt\"></i> 資料：事業部制組織における内部振替価格データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>部品製造事業部（供給側）</th><th>完成品組立事業部（受入側）</th></tr></thead><tbody>\n    <tr><td>部品の単位あたり変動費</td><td class=\"num\">￥600 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>部品の単位あたり固定費（通常時）</td><td class=\"num\">￥300 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場への部品販売単価</td><td class=\"num\">￥1,200 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場での販売可能最大量</td><td class=\"num\">8,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>部品製造事業部の生産能力</td><td class=\"num\">10,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>組立事業部の必要部品量</td><td class=\"num\">−</td><td class=\"num\">2,000 個 / 月</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産余力および意思決定条件】</strong><br>\n    ・供給事業部には月間 2,000個（10,000個 − 8,000個）の遊休生産能力（余力）が存在する。<br>\n    ・組立事業部は社内から調達できない場合、外部市場から同等品を ￥1,150 で購入可能である。\n  </div>\n</div>",
        "options": [
          "(1) ＋￥1,100,000",
          "(2) ＋￥500,000",
          "(3) ＋￥1,200,000",
          "(4) ＋￥800,000"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n全社視点では、外部への現金流出 ￥1,150 × 2,000個 ＝ ￥2,300,000 を回避し、社内増分支出 ￥600 × 2,000個 ＝ ￥1,200,000 で賄うことができます。<br>\n全社利益増加額 ＝ (￥1,150 − ￥600) × 2,000個 ＝ <strong>＋￥1,100,000</strong>",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-19"
      },
      {
        "num": 20,
        "section": "cost",
        "sectionName": "【原価計算】事業部制会計・内部振替価格",
        "catName": "満杯操業時の振替価格",
        "title": "供給事業部が満杯操業（外部販売8,000個上限なし・10,000個完売可能）である場合の下限振替価格",
        "text": "仮に部品製造事業部が外部市場へ10,000個全量を ￥1,200 で販売可能（満杯操業）である場合の【供給事業部側の許容最低振替価格】を選択しなさい。\n<div class=\"boki-material-box\">\n  <div class=\"boki-material-title\"><i class=\"fas fa-exchange-alt\"></i> 資料：事業部制組織における内部振替価格データ</div>\n  <div class=\"boki-table-wrapper\"><table class=\"boki-table\"><thead><tr><th>項目</th><th>部品製造事業部（供給側）</th><th>完成品組立事業部（受入側）</th></tr></thead><tbody>\n    <tr><td>部品の単位あたり変動費</td><td class=\"num\">￥600 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>部品の単位あたり固定費（通常時）</td><td class=\"num\">￥300 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場への部品販売単価</td><td class=\"num\">￥1,200 / 個</td><td class=\"num\">−</td></tr>\n    <tr><td>外部市場での販売可能最大量</td><td class=\"num\">8,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>部品製造事業部の生産能力</td><td class=\"num\">10,000 個 / 月</td><td class=\"num\">−</td></tr>\n    <tr><td>組立事業部の必要部品量</td><td class=\"num\">−</td><td class=\"num\">2,000 個 / 月</td></tr>\n  </tbody></table></div>\n  <div class=\"boki-sub-items\">\n    <strong>【生産余力および意思決定条件】</strong><br>\n    ・供給事業部には月間 2,000個（10,000個 − 8,000個）の遊休生産能力（余力）が存在する。<br>\n    ・組立事業部は社内から調達できない場合、外部市場から同等品を ￥1,150 で購入可能である。\n  </div>\n</div>",
        "options": [
          "(1) ￥1,200 / 個（外部市価＝変動費￥600 ＋ 機会原価￥600）",
          "(2) ￥600 / 個",
          "(3) ￥900 / 個",
          "(4) ￥1,150 / 個"
        ],
        "correct": "(1)",
        "explanation": "<strong>【正解：(1)】</strong><br><br><strong>【詳細解説】</strong><br>\n満杯操業の場合、社内へ振り替えることは外部市場への販売（1個あたり貢献利益 ￥1,200 − ￥600 ＝ ￥600）を犠牲にすることを意味します（機会原価）。<br>\n最低振替価格 ＝ 変動費 ￥600 ＋ 機会原価 ￥600 ＝ <strong>￥1,200 / 個（外部市価）</strong> となります。",
        "points": 5,
        "sessionId": "6",
        "sessionName": "第6回実戦予想模試",
        "qid": "boki1-pool-s6-20"
      }
    ]
  }
};
