/**
 * 資格対策ドットコム - FP分野・問題数選択＆1問ずつ集中ランダム出題スクリプト
 */
document.addEventListener('DOMContentLoaded', () => {
  const wizardSection = document.getElementById('wizardSection');
  const quizPlaySection = document.getElementById('quizPlaySection');
  const quizCardsContainer = document.getElementById('quizCardsContainer');
  const resultSection = document.getElementById('resultSection');

  // カテゴリチェックボックス
  const allCatCheckbox = document.getElementById('cat-all');
  const specificCatCheckboxes = document.querySelectorAll('.cat-checkbox:not(#cat-all)');

  // 全分野チェック切り替え
  if (allCatCheckbox) {
    allCatCheckbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      specificCatCheckboxes.forEach(cb => {
        cb.checked = isChecked;
        updateItemStyle(cb);
      });
      updateItemStyle(allCatCheckbox);
      validateStartBtn();
    });

    specificCatCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        updateItemStyle(cb);
        const allChecked = Array.from(specificCatCheckboxes).every(c => c.checked);
        allCatCheckbox.checked = allChecked;
        updateItemStyle(allCatCheckbox);
        validateStartBtn();
      });
    });
  }

  function updateItemStyle(checkbox) {
    const parent = checkbox.closest('.category-check-item');
    if (parent) {
      if (checkbox.checked) parent.classList.add('selected');
      else parent.classList.remove('selected');
    }
  }

  // 出題数ボタン (5問, 10問, 15問, 30問, 50問)
  const countBtns = document.querySelectorAll('.count-btn');
  let selectedCount = 10;

  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      countBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedCount = parseInt(btn.getAttribute('data-count'), 10);
    });
  });

  // スタートボタン・印刷ボタン制御
  const startBtn = document.getElementById('startPracticeBtn');
  const printBtn = document.getElementById('printPracticeBtn');
  function validateStartBtn() {
    const anyChecked = Array.from(specificCatCheckboxes).some(cb => cb.checked);
    if (startBtn) startBtn.disabled = !anyChecked;
    if (printBtn) {
      printBtn.disabled = !anyChecked;
      printBtn.style.opacity = anyChecked ? '1' : '0.5';
      printBtn.style.cursor = anyChecked ? 'pointer' : 'not-allowed';
    }
  }

  // ブックマークストレージ
  const bookmarkStorageKey = 'shikaku_bookmarks_v1';
  function getStoredBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(bookmarkStorageKey)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveStoredBookmarks(arr) {
    try {
      localStorage.setItem(bookmarkStorageKey, JSON.stringify(arr));
    } catch (e) {}
  }
  let bookmarks = getStoredBookmarks();

  // シャッフル関数 (Fisher-Yates)
  function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 演習ステート
  let currentActiveQuestions = [];
  let currentIndex = 0;
  let correctCount = 0;

  // モード切り替え（すべての問題 / ブックマークのみ）
  let currentPracticeMode = 'all';
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  const bookmarkEmptyMsg = document.getElementById('bookmarkEmptyMsg');
  const wizardStepCard = document.querySelector('.wizard-step-card');

  function isItemBookmarked(item, qId) {
    const bms = getStoredBookmarks();
    if (bms.includes(qId)) return true;
    // 互換性チェック (fp3-past-XXX と fp3-XXX)
    if (qId.startsWith('fp1-') && bms.includes(qId.replace('fp1-', 'fp1-past-'))) return true;
    if (qId.startsWith('fp1-past-') && bms.includes(qId.replace('fp1-past-', 'fp1-'))) return true;
    if (qId.startsWith('fp2-') && bms.includes(qId.replace('fp2-', 'fp2-past-'))) return true;
    if (qId.startsWith('fp2-past-') && bms.includes(qId.replace('fp2-past-', 'fp2-'))) return true;
    if (qId.startsWith('fp3-') && bms.includes(qId.replace('fp3-', 'fp3-past-'))) return true;
    if (qId.startsWith('fp3-past-') && bms.includes(qId.replace('fp3-past-', 'fp3-'))) return true;
    return false;
  }

  function getItemQid(item) {
    if (item.qid) return item.qid;
    const prefix = window.FP1_QUESTION_POOL ? 'fp1' : (window.FP2_QUESTION_POOL ? 'fp2' : 'fp3');
    return `${prefix}-${item.sessionId || 'prac'}-${item.num}`;
  }

  function updateModeUI() {
    bookmarks = getStoredBookmarks();
    const pool = window.FP1_QUESTION_POOL || window.FP2_QUESTION_POOL || window.FP_QUESTION_POOL || [];
    const bookmarkedPool = pool.filter(q => isItemBookmarked(q, getItemQid(q)));

    let bmSection = document.getElementById('bookmarkQuestionsSection');
    if (!bmSection) {
      bmSection = document.createElement('div');
      bmSection.id = 'bookmarkQuestionsSection';
      // container 内の wizardSection の直後に挿入
      wizardSection.parentNode.insertBefore(bmSection, wizardSection.nextSibling);
    }

    if (currentPracticeMode === 'bookmark') {
      // ウィザード（ステップ1, ステップ2）およびランダム演習画面を非表示
      wizardSection.style.display = 'none';
      quizPlaySection.style.display = 'none';
      if (resultSection) resultSection.style.display = 'none';
      if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'none';
      bmSection.style.display = 'block';

      renderBookmarkQuestionsList(bmSection, bookmarkedPool);
    } else {
      // 通常モード（すべての問題）: ウィザード画面を表示し、ブックマーク一覧画面を非表示
      bmSection.style.display = 'none';
      quizPlaySection.style.display = 'none';
      if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'none';
      wizardSection.style.display = 'block';
      if (wizardStepCard) wizardStepCard.style.display = 'block';
      if (startBtn) {
        startBtn.innerHTML = '<i class="fas fa-play-circle"></i> この条件でランダム練習を開始する';
      }
      validateStartBtn();
    }
  }

  // ブックマーク一覧レンダリング（過去問演習と同様に全問を一括表示）
  function renderBookmarkQuestionsList(bmSection, questions) {
    bmSection.innerHTML = '';
    const total = questions.length;

    if (total === 0) {
      bmSection.innerHTML = `
        <div class="card" style="text-align:center; padding:35px; background:#fffaf0; border:1px solid #feebc8; margin-top:20px;">
          <i class="far fa-star" style="font-size:2rem; color:#d69e2e; margin-bottom:10px;"></i>
          <h3>ブックマークされた問題がありません</h3>
          <p style="color:#744210;">通常モードで問題を解き、右上の「☆ ブックマーク」ボタンを押すと、ここに保存されていつでも苦手問題だけを復習できます。</p>
        </div>
      `;
      return;
    }

    // 上部コントロールバー（ブックマーク件数案内 ＆ 印刷ボタン）
    const headerBar = document.createElement('div');
    headerBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:20px; margin-bottom:12px; padding:12px 18px; background:#ebf8ff; border:1px solid #bee3f8; border-radius:8px;';
    headerBar.innerHTML = `
      <span style="color:#2b6cb0; font-weight:bold; font-size:0.95rem;">
        <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク保存中の問題: <strong>${total}</strong> 問
      </span>
      <button type="button" id="printBookmarkBtn" class="print-quiz-btn" style="padding:10px 18px; background:#38a169; color:white; font-size:0.95rem; font-weight:700; border:none; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:8px; transition:0.2s; box-shadow:0 2px 6px rgba(56,161,105,0.25);">
        <i class="fas fa-print"></i> ブックマークした問題をプリントアウトする
      </button>
    `;
    bmSection.appendChild(headerBar);

    const printBmBtn = headerBar.querySelector('#printBookmarkBtn');
    printBmBtn.addEventListener('click', () => {
      bookmarks = getStoredBookmarks();
      const pool = window.FP1_QUESTION_POOL || window.FP2_QUESTION_POOL || window.FP_QUESTION_POOL || [];
      const currentBms = pool.filter(q => isItemBookmarked(q, getItemQid(q)));
      const grade = window.FP1_QUESTION_POOL ? 'FP1級' : (window.FP2_QUESTION_POOL ? 'FP2級' : 'FP3級');
      openPrintWindow(currentBms, `${grade} ブックマーク復習問題`);
    });

    // 進捗バー
    const progressCard = document.createElement('div');
    progressCard.className = 'progress-card';
    progressCard.style.marginTop = '10px';
    progressCard.innerHTML = `
      <span id="bmProgressText" style="font-size:0.95rem; color:#4a5568;">進捗: <strong>0 / ${total} 問完了</strong> (正答率: 0%)</span>
      <div class="progress-bar-bg">
        <div id="bmProgressFill" class="progress-bar-fill"></div>
      </div>
    `;
    bmSection.appendChild(progressCard);

    let bmAnsweredCount = 0;
    let bmCorrectCount = 0;

    function updateBmProgress() {
      const fill = document.getElementById('bmProgressFill');
      const text = document.getElementById('bmProgressText');
      if (fill && text) {
        const pct = Math.round((bmAnsweredCount / total) * 100);
        fill.style.width = `${pct}%`;
        const accuracy = bmAnsweredCount > 0 ? Math.round((bmCorrectCount / bmAnsweredCount) * 100) : 0;
        text.innerHTML = `進捗: <strong>${bmAnsweredCount} / ${total} 問完了</strong> (正答率: ${accuracy}%)`;
      }
    }

    const cardsContainer = document.createElement('div');
    cardsContainer.id = 'bmCardsContainer';
    bmSection.appendChild(cardsContainer);

    questions.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      const qId = getItemQid(item);
      card.setAttribute('data-qid', qId);

      card.innerHTML = `
        <div class="quiz-header-row">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span class="quiz-num-badge" style="background:#ebf8ff; color:#2b6cb0;">第 ${index + 1} 問</span>
            <span class="shikaku-card-badge ${item.catClass}">${item.catName}</span>
          </div>
          <button type="button" class="bookmark-toggle-btn is-bookmarked">
            <i class="fas fa-star"></i> ブックマーク中
          </button>
        </div>
        <div class="quiz-question-text">${item.text}</div>
        <div class="quiz-options">
          ${item.options.map((opt, i) => `
            <div class="quiz-option" data-value="(${i+1})">${opt}</div>
          `).join('')}
        </div>
        <div class="quiz-explanation-area" style="display:none;">
          <div class="quiz-result-title"></div>
          <div class="quiz-explanation-body"><strong>【解答・解説】</strong><br>${item.explanation}</div>
        </div>
      `;

      // 選択肢クリック・即時判定
      const options = card.querySelectorAll('.quiz-option');
      const expArea = card.querySelector('.quiz-explanation-area');
      const resTitle = card.querySelector('.quiz-result-title');

      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (card.classList.contains('answered')) return;
          card.classList.add('answered');

          const selectedValue = opt.getAttribute('data-value');
          const isCorrect = (selectedValue === item.correct);
          bmAnsweredCount++;
          if (isCorrect) bmCorrectCount++;
          updateBmProgress();

          options.forEach(o => {
            o.classList.add('locked');
            const val = o.getAttribute('data-value');
            if (val === item.correct) {
              o.classList.add('correct-choice');
            } else if (val === selectedValue && !isCorrect) {
              o.classList.add('wrong-choice');
            }
          });

          expArea.style.display = 'block';

          if (isCorrect) {
            expArea.classList.add('is-correct');
            resTitle.innerHTML = '<i class="fas fa-check-circle"></i> 正解！';
          } else {
            expArea.classList.add('is-wrong');
            resTitle.innerHTML = `<i class="fas fa-times-circle"></i> 不正解... （正解: ${item.correct}）`;
          }
        });
      });

      // ブックマークトグル
      const bmBtn = card.querySelector('.bookmark-toggle-btn');
      bmBtn.addEventListener('click', () => {
        bookmarks = getStoredBookmarks();
        const currentStatus = isItemBookmarked(item, qId);
        if (currentStatus) {
          bookmarks = bookmarks.filter(id => id !== qId && id !== qId.replace('fp1-', 'fp1-past-') && id !== qId.replace('fp1-past-', 'fp1-') && id !== qId.replace('fp2-', 'fp2-past-') && id !== qId.replace('fp2-past-', 'fp2-') && id !== qId.replace('fp3-', 'fp3-past-') && id !== qId.replace('fp3-past-', 'fp3-'));
          bmBtn.classList.remove('is-bookmarked');
          bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
        } else {
          bookmarks.push(qId);
          bmBtn.classList.add('is-bookmarked');
          bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
        }
        saveStoredBookmarks(bookmarks);
      });

      cardsContainer.appendChild(card);
    });
  }

  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPracticeMode = btn.getAttribute('data-mode') || 'all';
      updateModeUI();
    });
  });

  // ランダム出題開始
  const questionPool = window.FP1_QUESTION_POOL || window.FP2_QUESTION_POOL || window.FP_QUESTION_POOL;
  if (startBtn && questionPool) {
    startBtn.addEventListener('click', () => {
      const selectedCats = Array.from(specificCatCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      const pool = window.FP1_QUESTION_POOL || window.FP2_QUESTION_POOL || window.FP_QUESTION_POOL || [];
      let candidatePool = pool.filter(q => selectedCats.includes(q.catKey));

      if (currentPracticeMode === 'bookmark') {
        bookmarks = getStoredBookmarks();
        candidatePool = candidatePool.filter(q => isItemBookmarked(q, getItemQid(q)));
      }

      if (candidatePool.length === 0) {
        if (currentPracticeMode === 'bookmark') {
          alert('選択された分野にブックマークされた問題がありません。他の分野を選択するか、通常モードで問題をブックマークしてください。');
        } else {
          alert('選択された分野の問題が見つかりませんでした。別の分野を選択してください。');
        }
        return;
      }

      const shuffled = shuffle(candidatePool);
      currentActiveQuestions = shuffled.slice(0, Math.min(selectedCount, shuffled.length));
      currentIndex = 0;
      correctCount = 0;

      wizardSection.style.display = 'none';
      const modeSwitchContainer = document.querySelector('.mode-switch-container');
      if (modeSwitchContainer) modeSwitchContainer.style.display = 'none';
      if (resultSection) resultSection.style.display = 'none';
      quizPlaySection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      renderCurrentQuestion();
    });
  }

  // 印刷・PDF出力ボタンの処理
  if (printBtn && questionPool) {
    printBtn.addEventListener('click', () => {
      const selectedCats = Array.from(specificCatCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      const pool = window.FP1_QUESTION_POOL || window.FP2_QUESTION_POOL || window.FP_QUESTION_POOL || [];
      let candidatePool = pool.filter(q => selectedCats.includes(q.catKey));

      if (candidatePool.length === 0) {
        alert('選択された分野の問題が見つかりませんでした。別の分野を選択してください。');
        return;
      }

      const shuffled = shuffle(candidatePool);
      const printQuestions = shuffled.slice(0, Math.min(selectedCount, shuffled.length));

      openPrintWindow(printQuestions);
    });
  }

  function openPrintWindow(questions, customTitle) {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const defaultTitle = window.FP1_QUESTION_POOL ? 'FP1級' : (window.FP2_QUESTION_POOL ? 'FP2級' : 'FP3級');
    const examTitle = customTitle || defaultTitle;
    const total = questions.length;

    // 正解一覧表
    const answerTableRows = questions.map((q, idx) => `
      <tr>
        <td style="text-align:center; font-weight:bold; width:18%;">第 ${idx + 1} 問</td>
        <td>${q.catName}</td>
        <td style="text-align:center; font-weight:bold; color:#2b6cb0; font-size:1.1rem; width:22%;">${q.correct}</td>
      </tr>
    `).join('');

    // 問題編HTML生成
    const questionsHtml = questions.map((q, idx) => `
      <div class="print-question-item">
        <div class="print-q-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="print-q-num">第 ${idx + 1} 問</span>
            <span class="print-q-cat">${q.catName}</span>
          </div>
          <span class="print-q-ansbox">解答記入欄：( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span>
        </div>
        <div class="print-q-text">${q.text}</div>
        <div class="print-q-options">
          ${q.options.map((opt, i) => `
            <div class="print-q-opt">
              <span class="print-opt-box">□</span>
              <span class="print-opt-num">(${i + 1})</span>
              <span class="print-opt-text">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // 解答解説編HTML生成
    const explanationsHtml = questions.map((q, idx) => `
      <div class="print-expl-item">
        <div class="print-expl-header">
          <span class="print-q-num">第 ${idx + 1} 問</span>
          <span class="print-expl-correct">正解：<strong>${q.correct}</strong></span>
          <span class="print-q-cat">${q.catName}</span>
        </div>
        <div class="print-expl-body">
          ${q.explanation}
        </div>
      </div>
    `).join('');

    const fullHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>${examTitle} プリント（全${total}問） | 資格対策ドットコム</title>
<style>
  @page {
    size: A4;
    margin: 15mm 15mm 15mm 15mm;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
    color: #1a202c;
    background: #f7fafc;
    line-height: 1.6;
    font-size: 10pt;
  }
  .no-print-bar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background: #2d3748;
    color: white;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 9999;
  }
  .print-btn {
    background: #38a169;
    color: white;
    border: none;
    padding: 10px 24px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(56,161,105,0.25);
    transition: 0.2s;
  }
  .print-btn:hover {
    background: #2f855a;
  }
  .close-btn {
    background: #718096;
    color: white;
    border: none;
    padding: 10px 18px;
    font-size: 0.95rem;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 10px;
  }
  .paper-container {
    max-width: 800px;
    margin: 25px auto;
    background: white;
    padding: 40px 45px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    border-radius: 6px;
  }
  .print-doc-header {
    border-bottom: 2px solid #2d3748;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .print-doc-title {
    font-size: 17pt;
    font-weight: bold;
    margin: 0 0 10px 0;
    color: #1a202c;
    text-align: center;
  }
  .print-meta-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #cbd5e0;
    padding: 10px 16px;
    border-radius: 4px;
    font-size: 9.5pt;
    margin-bottom: 15px;
    background: #f8fafc;
  }
  .print-instruction {
    font-size: 8.8pt;
    color: #4a5568;
    background: #edf2f7;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .print-question-item {
    border-bottom: 1px dashed #cbd5e0;
    padding: 15px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .print-question-item:last-child {
    border-bottom: none;
  }
  .print-q-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .print-q-num {
    font-size: 11pt;
    font-weight: bold;
    color: #2b6cb0;
  }
  .print-q-cat {
    font-size: 8.5pt;
    background: #edf2f7;
    color: #4a5568;
    padding: 2px 8px;
    border-radius: 3px;
    border: 1px solid #e2e8f0;
  }
  .print-q-ansbox {
    font-size: 10pt;
    font-weight: bold;
    border: 1px solid #718096;
    padding: 3px 12px;
    border-radius: 4px;
    background: white;
  }
  .print-q-text {
    font-size: 10pt;
    margin-bottom: 10px;
    line-height: 1.6;
  }
  .print-q-options {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-left: 10px;
  }
  .print-q-opt {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 9.5pt;
  }
  .print-opt-box {
    font-size: 10.5pt;
    color: #a0aec0;
    user-select: none;
  }
  .print-opt-num {
    font-weight: bold;
    min-width: 25px;
  }
  .print-opt-text {
    flex: 1;
  }
  .page-break {
    page-break-before: always;
    break-before: page;
    margin-top: 30px;
    border-top: 3px double #cbd5e0;
    padding-top: 25px;
  }
  .answer-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 25px;
    font-size: 9.5pt;
  }
  .answer-table th, .answer-table td {
    border: 1px solid #cbd5e0;
    padding: 6px 10px;
  }
  .answer-table th {
    background: #edf2f7;
    font-weight: bold;
    color: #2d3748;
  }
  .print-expl-item {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 15px;
    background: #fdfdfd;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .print-expl-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid #edf2f7;
  }
  .print-expl-correct {
    font-size: 10.5pt;
    color: #276749;
    background: #f0fff4;
    padding: 2px 10px;
    border-radius: 4px;
    border: 1px solid #9ae6b4;
  }
  .print-expl-body {
    font-size: 9.5pt;
    line-height: 1.6;
    color: #2d3748;
  }

  @media print {
    body {
      background: white !important;
      font-size: 9.5pt;
    }
    .no-print-bar {
      display: none !important;
    }
    .paper-container {
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }
    .print-doc-title {
      font-size: 15pt;
    }
    .page-break {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
  }
</style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <span style="font-weight:bold; font-size:1.05rem;">📄 ${examTitle} 練習問題 印刷・PDFプレビュー</span>
      <span style="font-size:0.85rem; color:#cbd5e0; margin-left:12px;">※送信先で「PDFに保存」を選択するとPDF保存できます</span>
    </div>
    <div>
      <button type="button" class="print-btn" onclick="window.print();">🖨️ 印刷する（PDF保存）</button>
      <button type="button" class="close-btn" onclick="window.close();">閉じる</button>
    </div>
  </div>

  <div class="paper-container">
    <!-- 【問題編】 -->
    <div class="print-doc-header">
      <h1 class="print-doc-title">${examTitle} 練習問題（問題編）</h1>
    </div>

    <div class="print-questions-list">
      ${questionsHtml}
    </div>

    <!-- 【解答・解説編】改ページ -->
    <div class="page-break">
      <div class="print-doc-header" style="margin-top:10px;">
        <h1 class="print-doc-title">${examTitle} 練習問題 【解答・解説編】</h1>
      </div>

      <h3 style="font-size:11pt; margin-bottom:10px; color:#2d3748;">■ 正解一覧（自己採点用）</h3>
      <table class="answer-table">
        <thead>
          <tr>
            <th>問題</th>
            <th>出題分野</th>
            <th>正解</th>
          </tr>
        </thead>
        <tbody>
          ${answerTableRows}
        </tbody>
      </table>

      <h3 style="font-size:11pt; margin-top:25px; margin-bottom:12px; color:#2d3748;">■ 各問の詳細解説</h3>
      <div class="print-explanations-list">
        ${explanationsHtml}
      </div>
    </div>
  </div>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(fullHtml);
    printWin.document.close();
  }

  // 1問ずつ表示するレンダリング関数
  function renderCurrentQuestion() {
    quizCardsContainer.innerHTML = '';

    if (currentIndex >= currentActiveQuestions.length) {
      // 全問終了
      showCompletionCard();
      return;
    }

    const item = currentActiveQuestions[currentIndex];
    const total = currentActiveQuestions.length;
    const qNum = currentIndex + 1;

    // 進捗バーの更新
    updateProgress(currentIndex, total);

    const qId = getItemQid(item);
    const card = document.createElement('div');
    card.className = 'single-quiz-card';
    card.setAttribute('data-qid', qId);

    const isBookmarked = isItemBookmarked(item, qId);

    card.innerHTML = `
      <div class="quiz-header-row">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <span class="quiz-num-badge" style="font-size:0.95rem; padding:5px 12px;">第 ${qNum} 問 / 全 ${total} 問</span>
          <span class="shikaku-card-badge ${item.catClass}" style="font-size:0.85rem;">${item.catName}</span>
        </div>
        <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}" id="currentBookmarkBtn">
          <i class="${isBookmarked ? 'fas' : 'far'} fa-star"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
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

      <!-- 即時解説エリア -->
      <div class="quiz-explanation-area" style="display:none;">
        <div class="quiz-result-title"></div>
        <p><strong>【解答・解説】</strong><br>${item.explanation}</p>
        <div class="next-question-bar">
          <button type="button" class="next-question-btn" id="nextQuestionBtn">
            ${qNum < total ? '次の問題へ <i class="fas fa-arrow-right"></i>' : '結果を見る <i class="fas fa-check-circle"></i>'}
          </button>
        </div>
      </div>
    `;

    quizCardsContainer.appendChild(card);

    // ブックマーク処理
    const bmBtn = card.querySelector('#currentBookmarkBtn');
    bmBtn.addEventListener('click', () => {
      bookmarks = getStoredBookmarks();
      const currentStatus = isItemBookmarked(item, qId);
      if (currentStatus) {
        // 関連するすべてのキーを解除
        bookmarks = bookmarks.filter(id => id !== qId && id !== qId.replace('fp1-', 'fp1-past-') && id !== qId.replace('fp1-past-', 'fp1-') && id !== qId.replace('fp2-', 'fp2-past-') && id !== qId.replace('fp2-past-', 'fp2-') && id !== qId.replace('fp3-', 'fp3-past-') && id !== qId.replace('fp3-past-', 'fp3-'));
        bmBtn.classList.remove('is-bookmarked');
        bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
      } else {
        bookmarks.push(qId);
        bmBtn.classList.add('is-bookmarked');
        bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
      }
      saveStoredBookmarks(bookmarks);
    });

    // 選択肢クリック時の【即時判定】
    const options = card.querySelectorAll('.quiz-option');
    const explanationArea = card.querySelector('.quiz-explanation-area');
    let answered = false;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        // 全選択肢をロック
        options.forEach(o => o.classList.add('locked'));

        const chosenVal = opt.getAttribute('data-value');
        const isCorrect = (chosenVal === item.correct);

        if (isCorrect) {
          correctCount++;
          opt.classList.add('correct-choice');
        } else {
          opt.classList.add('wrong-choice');
          // 正解の選択肢を緑で強調
          options.forEach(o => {
            if (o.getAttribute('data-value') === item.correct) {
              o.classList.add('correct-choice');
            }
          });
        }

        // 解説の即時表示
        explanationArea.style.display = 'block';
        if (isCorrect) {
          explanationArea.classList.add('is-correct');
          explanationArea.querySelector('.quiz-result-title').innerHTML = '<i class="fas fa-check-circle"></i> 正解！';
        } else {
          explanationArea.classList.add('is-wrong');
          explanationArea.querySelector('.quiz-result-title').innerHTML = `<i class="fas fa-times-circle"></i> 不正解... （正解: ${item.correct}）`;
        }

        // 次へボタンのイベント登録
        const nextBtn = explanationArea.querySelector('#nextQuestionBtn');
        nextBtn.addEventListener('click', () => {
          currentIndex++;
          renderCurrentQuestion();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    });
  }

  function updateProgress(done, total) {
    const fill = document.getElementById('playProgressFill');
    const text = document.getElementById('playProgressText');
    if (fill && text && total > 0) {
      const pct = Math.round((done / total) * 100);
      fill.style.width = `${pct}%`;
      const accuracy = done > 0 ? Math.round((correctCount / done) * 100) : 0;
      text.innerHTML = `進捗: <strong>${done} / ${total} 問完了</strong> (正答率: ${accuracy}%)`;
    }
  }

  function showCompletionCard() {
    const total = currentActiveQuestions.length;
    const accuracy = Math.round((correctCount / total) * 100);

    const fill = document.getElementById('playProgressFill');
    const text = document.getElementById('playProgressText');
    if (fill && text) {
      fill.style.width = '100%';
      text.innerHTML = `進捗: <strong>${total} / ${total} 問完了</strong> (正答率: ${accuracy}%)`;
    }

    const compCard = document.createElement('div');
    compCard.className = 'card';
    compCard.style.cssText = 'text-align:center; padding:40px 25px; border-top:6px solid #38a169; margin-top:10px;';
    compCard.innerHTML = `
      <h2><i class="fas fa-flag-checkered" style="color:#38a169;"></i> 演習完了！ お疲れ様でした</h2>
      <p style="font-size:1.4rem; margin:18px 0;">
        結果: <strong>${correctCount} / ${total} 問正解</strong>（正答率: <span style="color:${accuracy >= 60 ? '#38a169' : '#e53e3e'}; font-weight:bold;">${accuracy}%</span>）
      </p>
      <p style="color:#718096; font-size:1rem; max-width:600px; margin:0 auto 25px auto; line-height:1.6;">
        ${accuracy >= 60 ? '★ 合格ライン（60%以上）をクリアしています！この調子で反復練習を重ねましょう。' : '基礎の復習が必要です。間違えた問題やブックマークした問題を重点的に反復しましょう。'}
      </p>
      <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
        <button type="button" class="btn" id="restartWizardBtn" style="background:#3182ce; color:white; padding:12px 24px; font-size:1.05rem;"><i class="fas fa-redo"></i> 条件を変えてもう一度解く</button>
        <a href="past-questions.html" class="btn" style="background:#2b6cb0; color:white; padding:12px 24px; font-size:1.05rem;"><i class="fas fa-file-alt"></i> 過去問（本番年度別模試）へ</a>
      </div>
    `;
    quizCardsContainer.appendChild(compCard);

    document.getElementById('restartWizardBtn').addEventListener('click', () => {
      quizPlaySection.style.display = 'none';
      wizardSection.style.display = 'block';
      const modeSwitchContainer = document.querySelector('.mode-switch-container');
      if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
      updateModeUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 中断して条件選択に戻るボタン
  const backToWizardBtn = document.getElementById('backToWizardBtn');
  if (backToWizardBtn) {
    backToWizardBtn.addEventListener('click', () => {
      if (confirm('現在の演習を中断して、分野・問題数の選択に戻りますか？')) {
        quizPlaySection.style.display = 'none';
        wizardSection.style.display = 'block';
        const modeSwitchContainer = document.querySelector('.mode-switch-container');
        if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
        updateModeUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
