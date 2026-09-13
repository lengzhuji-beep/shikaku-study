/**
 * 資格対策ドットコム - 日商簿記検定（3級・2級・1級）過去問演習レンダラー
 */
document.addEventListener('DOMContentLoaded', () => {
  const gradeKey = window.BOKI_GRADE || (window.BOKI1_PAST_DATA || window.BOKI1_PAST_QUESTIONS ? '1kyu' : (window.BOKI2_PAST_DATA || window.BOKI2_PAST_QUESTIONS ? '2kyu' : '3kyu'));
  const gradeTitle = gradeKey === '1kyu' ? '日商簿記1級' : (gradeKey === '2kyu' ? '日商簿記2級' : '日商簿記3級');

  const container = document.getElementById('pastQuestionsContainer');
  const progressText = document.getElementById('progressText');
  const progressFill = document.getElementById('progressFill');
  const progressCard = document.querySelector('.progress-card');
  const sessionSelectorCard = document.querySelector('.session-selector-card');
  const modeSwitchContainer = document.querySelector('.mode-switch-container');
  const backToSessionsBtn = document.getElementById('backToSessionsBtn');

  const sessionBtns = document.querySelectorAll('.session-btn');
  const startPastExamBtn = document.getElementById('startPastExamBtn');
  const printPastExamBtn = document.getElementById('printPastExamBtn');

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

  function getItemQid(item) {
    if (item.qid) return item.qid;
    return `boki-past-${gradeKey}-${item.sessionId || 'past'}-${item.num}`;
  }

  function isItemBookmarked(item, qId) {
    const bms = getStoredBookmarks();
    if (bms.includes(qId)) return true;
    if (qId.startsWith('boki-past-') && bms.includes(qId.replace('boki-past-', 'boki-'))) return true;
    if (qId.startsWith('boki-') && bms.includes(qId.replace('boki-', 'boki-past-'))) return true;
    return false;
  }

  // 表示切替ロジック（開始時：選択UIを隠して問題のみ表示）
  function hideSelectionUIAndShowQuiz() {
    if (sessionSelectorCard) sessionSelectorCard.style.display = 'none';
    if (modeSwitchContainer) modeSwitchContainer.style.display = 'none';
    if (progressCard) progressCard.style.display = 'block';
    if (container) container.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showSelectionUI() {
    if (sessionSelectorCard) sessionSelectorCard.style.display = 'block';
    if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
    if (progressCard) progressCard.style.display = 'none';
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  let currentMode = 'all';
  let currentSession = '168';
  let sessionQuestions = [];
  let userAnswers = {};

  const pastData = (gradeKey === '2kyu' ? window.BOKI2_PAST_QUESTIONS : (gradeKey === '1kyu' ? window.BOKI1_PAST_QUESTIONS : window.BOKI3_PAST_QUESTIONS)) || [];

  function loadSessionData(sessionKey) {
    currentSession = sessionKey;
    const pastDict = (gradeKey === '2kyu' ? window.BOKI2_PAST_DATA : (gradeKey === '1kyu' ? window.BOKI1_PAST_DATA : window.BOKI3_PAST_DATA));
    if (pastDict && pastDict[sessionKey] && pastDict[sessionKey].questions) {
      sessionQuestions = pastDict[sessionKey].questions;
      userAnswers = {};
      return;
    }
    let matched = pastData.filter(q => String(q.sessionId) === String(sessionKey));
    if (matched.length === 0) {
      matched = pastData;
    }
    sessionQuestions = matched;
    userAnswers = {};
  }

  // 初期実施回の設定
  const activeBtn = document.querySelector('.session-btn.active');
  if (activeBtn) {
    currentSession = activeBtn.getAttribute('data-session') || (gradeKey === '3kyu' || gradeKey === '2kyu' || gradeKey === '1kyu' ? '1' : '168');
  }
  loadSessionData(currentSession);

  // 実施回ボタングループ
  sessionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sessionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sess = btn.getAttribute('data-session');
      loadSessionData(sess);
      showSelectionUI();
    });
  });

  // 開始ボタン
  if (startPastExamBtn) {
    startPastExamBtn.addEventListener('click', () => {
      loadSessionData(currentSession);
      renderQuestions();
      hideSelectionUIAndShowQuiz();
    });
  }

  // 戻るボタン
  if (backToSessionsBtn) {
    backToSessionsBtn.addEventListener('click', () => {
      showSelectionUI();
    });
  }

  // 印刷ボタン
  if (printPastExamBtn) {
    printPastExamBtn.addEventListener('click', () => {
      loadSessionData(currentSession);
      const activeSessBtn = document.querySelector('.session-btn.active');
      const sName = activeSessBtn ? activeSessBtn.querySelector('.session-name').textContent.trim() : `第${currentSession}回`;
      const docType = (gradeKey === '3kyu' || gradeKey === '2kyu' || gradeKey === '1kyu') ? '予想問題集' : '過去問演習';
      openPrintWindow(sessionQuestions, `${gradeTitle} ${docType}（${sName}）`);
    });
  }

  // モード切替タブ
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode') || 'all';

      if (currentMode === 'bookmark') {
        if (sessionSelectorCard) sessionSelectorCard.style.display = 'none';
        if (progressCard) progressCard.style.display = 'block';
        if (container) container.style.display = 'block';
        bookmarks = getStoredBookmarks();
        const bookmarkedList = pastData.filter(q => isItemBookmarked(q, getItemQid(q)));
        renderBookmarkList(bookmarkedList);
      } else {
        showSelectionUI();
      }
    });
  });

  // 進捗更新
  function updateProgress(doneCount, totalCount) {
    if (!progressText || !progressFill || totalCount === 0) return;
    const answered = Object.keys(userAnswers).length;
    let correct = 0;
    sessionQuestions.forEach(q => {
      const qId = getItemQid(q);
      if (userAnswers[qId] && userAnswers[qId] === q.correct) correct++;
    });
    const pct = Math.round((answered / totalCount) * 100);
    const acc = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    progressFill.style.width = `${pct}%`;
    progressText.innerHTML = `進捗: <strong>${answered} / ${totalCount} 問完了</strong> (正答率: ${acc}%)`;
  }

  // 問題レンダリング
  function renderQuestions() {
    container.innerHTML = '';
    const total = sessionQuestions.length;
    updateProgress(0, total);

    sessionQuestions.forEach((item, index) => {
      const qNum = index + 1;
      const qId = getItemQid(item);
      const isBookmarked = isItemBookmarked(item, qId);

      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.setAttribute('data-qid', qId);

      let optionsHtml = '';
      (item.options || []).forEach(opt => {
        const valMatch = opt.match(/^\((\d+)\)/);
        const val = valMatch ? `(${valMatch[1]})` : opt;
        optionsHtml += `<div class="quiz-option" data-value="${val}">${opt}</div>`;
      });

      card.innerHTML = `
        <div class="quiz-header-row">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="quiz-num-badge">第 ${qNum} 問 / 全 ${total} 問</span>
            <span class="shikaku-card-badge ${item.catClass || 'badge-cat-basic'}">${item.catName || '簿記'}</span>
          </div>
          <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}">
            <i class="${isBookmarked ? 'fas' : 'far'} fa-star"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
          </button>
        </div>

        <div class="quiz-question-text">${item.text}</div>
        <div class="quiz-options">${optionsHtml}</div>

        <div class="quiz-explanation-area" style="display:none;">
          <div class="quiz-result-title"></div>
          <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
            ${item.explanation}
          </div>
        </div>
      `;

      container.appendChild(card);

      let answered = false;
      const optEls = card.querySelectorAll('.quiz-option');
      const expArea = card.querySelector('.quiz-explanation-area');
      const resTitle = card.querySelector('.quiz-result-title');

      optEls.forEach(opt => {
        opt.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const selectedVal = opt.getAttribute('data-value');
          userAnswers[qId] = selectedVal;

          const isCorrect = (selectedVal === item.correct);
          optEls.forEach(o => {
            o.classList.add('locked');
            if (o.getAttribute('data-value') === item.correct) {
              o.classList.add('correct-choice');
            }
          });

          if (isCorrect) {
            opt.classList.add('correct-choice');
            resTitle.innerHTML = '<span style="color:#2f855a; font-weight:bold; font-size:1.15rem;"><i class="fas fa-check-circle"></i> 正解！</span>';
          } else {
            opt.classList.add('wrong-choice');
            resTitle.innerHTML = `<span style="color:#c53030; font-weight:bold; font-size:1.15rem;"><i class="fas fa-times-circle"></i> 不正解... （正解：${item.correct}）</span>`;
          }

          expArea.style.display = 'block';
          updateProgress(Object.keys(userAnswers).length, total);

          if (Object.keys(userAnswers).length === total) {
            renderResultSummary();
          }
        });
      });

      const bmBtn = card.querySelector('.bookmark-toggle-btn');
      bmBtn.addEventListener('click', () => {
        bookmarks = getStoredBookmarks();
        const currentStatus = isItemBookmarked(item, qId);
        if (currentStatus) {
          bookmarks = bookmarks.filter(id => id !== qId);
          bmBtn.classList.remove('is-bookmarked');
          bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
        } else {
          bookmarks.push(qId);
          bmBtn.classList.add('is-bookmarked');
          bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
        }
        saveStoredBookmarks(bookmarks);
      });
    });
  }

  // 演習終了後の結果サマリー
  function renderResultSummary() {
    const total = sessionQuestions.length;
    let correct = 0;
    sessionQuestions.forEach(q => {
      const qId = getItemQid(q);
      if (userAnswers[qId] === q.correct) correct++;
    });
    const acc = Math.round((correct / total) * 100);
    const passed = acc >= 70;

    const resCard = document.createElement('div');
    resCard.className = 'card';
    resCard.style.cssText = 'text-align:center; padding:35px 25px; margin-top:25px; border-top:6px solid ' + (passed ? '#38a169;' : '#e53e3e;');
    resCard.innerHTML = `
      <h2><i class="fas ${passed ? 'fa-award' : 'fa-exclamation-circle'}" style="color:${passed ? '#38a169' : '#e53e3e'};"></i> 演習完了</h2>
      <p style="font-size:1.4rem; margin:15px 0;">
        スコア: <strong>${correct} / ${total} 問正解</strong>（正答率: <span style="color:${passed ? '#38a169' : '#e53e3e'}; font-weight:bold;">${acc}%</span>）
      </p>
      <p style="font-size:1.05rem; color:#4a5568; margin-bottom:20px;">
        ${passed ? '合格ライン（70%以上）を達成しました！素晴らしい実力です。' : '合格ライン（70%以上）に届きませんでした。間違えた問題を復習しましょう。'}
      </p>
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        <button type="button" class="btn" id="retryExamBtn" style="background:#3182ce; color:white; padding:10px 20px;">
          <i class="fas fa-redo"></i> この実施回をもう一度解く
        </button>
        <button type="button" class="btn" id="chooseOtherExamBtn" style="background:#718096; color:white; padding:10px 20px;">
          <i class="fas fa-calendar-alt"></i> 他の実施回を選ぶ
        </button>
      </div>
    `;

    container.appendChild(resCard);

    resCard.querySelector('#retryExamBtn').addEventListener('click', () => {
      renderQuestions();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    resCard.querySelector('#chooseOtherExamBtn').addEventListener('click', () => {
      showSelectionUI();
    });
  }

  // ブックマーク一覧レンダリング
  function renderBookmarkList(questions) {
    const total = questions.length;
    if (progressText && progressFill) {
      progressFill.style.width = '0%';
      progressText.innerHTML = `ブックマーク問題: 全 ${total} 問`;
    }

    if (total === 0) {
      container.innerHTML = `
        <div class="card" style="text-align:center; padding:35px; background:#fffaf0; border:1px solid #feebc8; margin-top:20px;">
          <i class="far fa-star" style="font-size:2rem; color:#d69e2e; margin-bottom:10px;"></i>
          <h3>ブックマークされた問題がありません</h3>
          <p style="color:#744210;">問題の右上にある「☆ ブックマーク」ボタンを押すと、ここに保存されていつでも苦手問題だけを復習できます。</p>
        </div>
      `;
      return;
    }

    const headerBar = document.createElement('div');
    headerBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:15px; padding:12px 18px; background:#ebf8ff; border:1px solid #bee3f8; border-radius:8px;';
    headerBar.innerHTML = `
      <div style="font-size:0.95rem; color:#2b6cb0; font-weight:bold;">
        <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク保存中の過去問: ${total} 問
      </div>
      <button type="button" id="printPastBookmarkBtn" class="btn" style="background:#38a169; color:white; border:none; padding:8px 18px; border-radius:6px; font-weight:bold; font-size:0.92rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <i class="fas fa-print"></i> ブックマークした問題をプリントアウトする
      </button>
    `;
    container.innerHTML = '';
    container.appendChild(headerBar);

    const bmPrintBtn = headerBar.querySelector('#printPastBookmarkBtn');
    if (bmPrintBtn) {
      bmPrintBtn.addEventListener('click', () => {
        openPrintWindow(questions, `${gradeTitle} 過去問ブックマーク復習問題`);
      });
    }

    questions.forEach((item, index) => {
      const qNum = index + 1;
      const qId = getItemQid(item);
      const isBookmarked = isItemBookmarked(item, qId);

      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.setAttribute('data-qid', qId);

      let optionsHtml = '';
      (item.options || []).forEach(opt => {
        const valMatch = opt.match(/^\((\d+)\)/);
        const val = valMatch ? `(${valMatch[1]})` : opt;
        optionsHtml += `<div class="quiz-option" data-value="${val}">${opt}</div>`;
      });

      card.innerHTML = `
        <div class="quiz-header-row">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="quiz-num-badge">第 ${qNum} 問</span>
            <span class="shikaku-card-badge ${item.catClass || 'badge-cat-basic'}">${item.catName || '簿記'}</span>
          </div>
          <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}">
            <i class="${isBookmarked ? 'fas' : 'far'} fa-star"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
          </button>
        </div>

        <div class="quiz-question-text">${item.text}</div>
        <div class="quiz-options">${optionsHtml}</div>

        <div class="quiz-explanation-area" style="display:none;">
          <div class="quiz-result-title"></div>
          <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
            ${item.explanation}
          </div>
        </div>
      `;

      let answered = false;
      const optEls = card.querySelectorAll('.quiz-option');
      const expArea = card.querySelector('.quiz-explanation-area');
      const resTitle = card.querySelector('.quiz-result-title');

      optEls.forEach(opt => {
        opt.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const selectedVal = opt.getAttribute('data-value');
          const isCorrect = (selectedVal === item.correct);
          optEls.forEach(o => {
            o.classList.add('locked');
            if (o.getAttribute('data-value') === item.correct) {
              o.classList.add('correct-choice');
            }
          });

          if (isCorrect) {
            opt.classList.add('correct-choice');
            resTitle.innerHTML = '<span style="color:#2f855a; font-weight:bold; font-size:1.15rem;"><i class="fas fa-check-circle"></i> 正解！</span>';
          } else {
            opt.classList.add('wrong-choice');
            resTitle.innerHTML = `<span style="color:#c53030; font-weight:bold; font-size:1.15rem;"><i class="fas fa-times-circle"></i> 不正解... （正解：${item.correct}）</span>`;
          }

          expArea.style.display = 'block';
        });
      });

      const bmBtn = card.querySelector('.bookmark-toggle-btn');
      bmBtn.addEventListener('click', () => {
        bookmarks = getStoredBookmarks();
        const currentStatus = isItemBookmarked(item, qId);
        if (currentStatus) {
          bookmarks = bookmarks.filter(id => id !== qId);
          bmBtn.classList.remove('is-bookmarked');
          bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
        } else {
          bookmarks.push(qId);
          bmBtn.classList.add('is-bookmarked');
          bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
        }
        saveStoredBookmarks(bookmarks);
      });

      container.appendChild(card);
    });
  }

  // 印刷ウィンドウ生成
  function openPrintWindow(questions, customTitle) {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const examTitle = customTitle || `${gradeTitle} 過去問演習`;
    const total = questions.length;

    const answerTableRows = questions.map((q, idx) => `
      <tr>
        <td style="text-align:center; font-weight:bold; width:18%;">第 ${idx + 1} 問</td>
        <td>${q.catName || '簿記'}</td>
        <td style="text-align:center; font-weight:bold; color:#2b6cb0; font-size:1.1rem; width:22%;">${q.correct}</td>
      </tr>
    `).join('');

    const questionsHtml = questions.map((q, idx) => `
      <div class="print-question-item">
        <div class="print-q-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="print-q-num">第 ${idx + 1} 問</span>
            <span class="print-q-cat">${q.catName || '簿記'}</span>
          </div>
          <span class="print-q-ansbox">解答記入欄：( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span>
        </div>
        <div class="print-q-text">${q.text}</div>
        <div class="print-q-options">
          ${(q.options || []).map((opt, i) => `
            <div class="print-q-opt">
              <span class="print-opt-box">□</span>
              <span class="print-opt-num">(${i + 1})</span>
              <span class="print-opt-text">${opt.replace(/^\(\d+\)\s*/, '')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const explanationsHtml = questions.map((q, idx) => `
      <div class="print-expl-item">
        <div class="print-expl-header">
          <span class="print-q-num">第 ${idx + 1} 問</span>
          <span class="print-expl-correct">正解：<strong>${q.correct}</strong></span>
          <span class="print-q-cat">${q.catName || '簿記'}</span>
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
    size: A4 portrait;
    margin: 15mm 15mm 18mm 15mm;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    color: #1a202c;
    background: #f7fafc;
    margin: 0;
    padding: 20px;
    font-size: 10pt;
    line-height: 1.5;
  }
  .no-print-bar {
    background: #2d3748;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .no-print-bar button {
    background: #3182ce;
    color: white;
    border: none;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .no-print-bar button:hover {
    background: #2b6cb0;
  }
  .print-page-container {
    background: white;
    max-width: 210mm;
    margin: 0 auto 30px auto;
    padding: 20mm;
    box-shadow: 0 0 10px rgba(0,0,0,0.08);
  }
  .print-header {
    border-bottom: 2px solid #2b6cb0;
    padding-bottom: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .print-title {
    font-size: 16pt;
    font-weight: bold;
    color: #2b6cb0;
  }
  .print-subtitle {
    font-size: 9pt;
    color: #718096;
  }
  .print-meta-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #edf2f7;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    padding: 8px 15px;
    margin-bottom: 20px;
    font-size: 9pt;
  }
  .print-name-field {
    display: inline-block;
    width: 160px;
    border-bottom: 1px solid #4a5568;
    margin-left: 5px;
  }
  .print-score-field {
    display: inline-block;
    width: 60px;
    border-bottom: 1px solid #4a5568;
    margin-left: 5px;
  }
  .print-question-item {
    padding: 12px 0;
    border-bottom: 1px dashed #cbd5e0;
    page-break-inside: avoid;
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
    color: #2d3748;
    min-width: 24px;
  }
  .print-opt-text {
    flex: 1;
  }
  .page-break {
    page-break-before: always;
    break-before: page;
  }
  .print-section-title {
    font-size: 13pt;
    font-weight: bold;
    color: #2d3748;
    border-left: 4px solid #2b6cb0;
    padding-left: 8px;
    margin: 20px 0 12px 0;
  }
  .print-ans-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 25px;
    font-size: 9pt;
  }
  .print-ans-table th, .print-ans-table td {
    border: 1px solid #cbd5e0;
    padding: 6px 10px;
  }
  .print-ans-table th {
    background: #ebf8ff;
    color: #2b6cb0;
    text-align: center;
  }
  .print-expl-item {
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;
    page-break-inside: avoid;
  }
  .print-expl-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
  }
  .print-expl-correct {
    font-size: 10.5pt;
    color: #c53030;
  }
  .print-expl-body {
    font-size: 9pt;
    color: #4a5568;
    line-height: 1.6;
    background: #f7fafc;
    padding: 8px 12px;
    border-radius: 4px;
    border-left: 3px solid #cbd5e0;
  }
  @media print {
    body {
      background: white;
      padding: 0;
    }
    .no-print-bar {
      display: none !important;
    }
    .print-page-container {
      box-shadow: none;
      padding: 0;
      max-width: 100%;
    }
  }
</style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong>印刷プレビュー（A4推奨）</strong> ｜ 上部と左側に問題編、末尾に解答・解説編をレイアウトしています
    </div>
    <button type="button" onclick="window.print()">
      <i class="fas fa-print"></i> 印刷する（PDF保存）
    </button>
  </div>

  <!-- 【第1部：問題編】 -->
  <div class="print-page-container">
    <div class="print-header">
      <div class="print-title">${examTitle} 【問題編】</div>
      <div class="print-subtitle">資格対策ドットコム</div>
    </div>
    <div class="print-meta-box">
      <div>実施日：${new Date().toLocaleDateString('ja-JP')} ｜ 出題数：全 ${total} 問</div>
      <div>
        氏名：<span class="print-name-field"></span> &nbsp;&nbsp;
        得点：<span class="print-score-field"></span> / ${total}
      </div>
    </div>
    <div class="print-questions-list">
      ${questionsHtml}
    </div>
  </div>

  <!-- ページ区切り -->
  <div class="page-break"></div>

  <!-- 【第2部：解答・解説編】 -->
  <div class="print-page-container">
    <div class="print-header">
      <div class="print-title">${examTitle} 【解答・解説編】</div>
      <div class="print-subtitle">資格対策ドットコム ｜ 正解と詳細解説一覧</div>
    </div>

    <div class="print-section-title">■ 正解一覧</div>
    <table class="print-ans-table">
      <thead>
        <tr>
          <th>問題番号</th>
          <th>分野</th>
          <th>正解</th>
        </tr>
      </thead>
      <tbody>
        ${answerTableRows}
      </tbody>
    </table>

    <div class="print-section-title">■ 詳細解説</div>
    ${explanationsHtml}
  </div>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(fullHtml);
    printWin.document.close();
  }

  // 初期状態では問題を表示せず選択画面を提示
  showSelectionUI();
});
