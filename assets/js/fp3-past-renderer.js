/**
 * Shikakus - FP3級過去問 過去5年分（全15回・900問）動的レンダリングスクリプト
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pastQuestionsContainer');
  const sessionBtns = document.querySelectorAll('.session-btn');
  const catFilterBtns = document.querySelectorAll('.cat-filter-btn');

  if (!container || !window.FP3_PAST_DATA) return;

  const bookmarkStorageKey = 'shikaku_bookmarks_v1';
  function getStoredBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(bookmarkStorageKey)) || [];
    } catch (e) { return []; }
  }
  function saveStoredBookmarks(arr) {
    try { localStorage.setItem(bookmarkStorageKey, JSON.stringify(arr)); } catch (e) {}
  }
  let bookmarks = getStoredBookmarks();

  let currentSession = '2024-01'; // デフォルトは最新2024年1月
  let currentCat = 'all';
  let currentMode = 'all';

  const sessionSelector = document.querySelector('.session-selector-card');
  const modeSwitchContainer = document.querySelector('.mode-switch-container');
  const progressCard = document.querySelector('.progress-card');
  const backToSessionsBtn = document.getElementById('backToSessionsBtn');

  function showSelectionUI() {
    if (sessionSelector) sessionSelector.style.display = 'block';
    if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
    if (progressCard) progressCard.style.display = 'none';
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
  }

  function hideSelectionUIAndShowQuiz() {
    if (sessionSelector) sessionSelector.style.display = 'none';
    if (modeSwitchContainer) modeSwitchContainer.style.display = 'none';
    if (progressCard) progressCard.style.display = 'block';
    if (container) container.style.display = 'block';
  }

  if (backToSessionsBtn) {
    backToSessionsBtn.addEventListener('click', () => {
      showSelectionUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
      
      if (currentMode === 'bookmark') {
        if (sessionSelector) sessionSelector.style.display = 'none';
        if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
        if (progressCard) progressCard.style.display = 'block';
        if (container) container.style.display = 'block';
        currentSession = 'all';
        renderQuestions();
      } else {
        const activeBtn = document.querySelector('.session-btn.active');
        currentSession = activeBtn ? activeBtn.getAttribute('data-session') : '2024-01';
        showSelectionUI();
      }
    });
  });

  // 実施回ボタンのイベント
  sessionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sessionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSession = btn.getAttribute('data-session');
      // 実施回を変更した際は選択UIを表示維持し、問題はまだ表示しない
      showSelectionUI();
    });
  });

  // 6大分野ボタンのイベント
  catFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat');
      renderQuestions();
    });
  });

  let answeredCount = 0;
  let correctCount = 0;

  function renderQuestions() {
    answeredCount = 0;
    correctCount = 0;
    container.innerHTML = '';

    let questions = [];
    if (currentSession === 'all') {
      for (const sid of Object.keys(window.FP3_PAST_DATA)) {
        const qs = window.FP3_PAST_DATA[sid].map(q => ({...q, sessionId: sid}));
        questions.push(...qs);
      }
    } else {
      questions = window.FP3_PAST_DATA[currentSession] || [];
    }

    // 分野フィルター
    if (currentCat !== 'all') {
      questions = questions.filter(q => q.catKey === currentCat);
    }

    function isBookmarked(qId) {
      if (bookmarks.includes(qId)) return true;
      if (qId.startsWith('fp3-past-') && bookmarks.includes(qId.replace('fp3-past-', 'fp3-'))) return true;
      if (qId.startsWith('fp3-') && bookmarks.includes(qId.replace('fp3-', 'fp3-past-'))) return true;
      return false;
    }

    let currentQuestions = [];
    let currentQuestionIndex = 0;

    // ブックマークフィルター
    if (currentMode === 'bookmark') {
      const bmQuestions = questions.filter(q => isBookmarked(`fp3-past-${q.sessionId || currentSession}-${q.num}`));
      renderBookmarkList(bmQuestions);
    } else {
      currentQuestions = questions;
      const total = currentQuestions.length;
      updateProgress(0, total);

      if (total === 0) {
        container.innerHTML = `
          <div class="card" style="text-align:center; padding:35px;">
            <p style="color:#718096;">該当する問題がありませんでした。他の実施回を選択してください。</p>
          </div>
        `;
        return;
      }
      renderSinglePastQuestion();
    }

    // 1問ずつ出題
    function renderSinglePastQuestion() {
      container.innerHTML = '';
      const total = currentQuestions.length;

      if (currentQuestionIndex >= total) {
        showFp3ResultCard();
        return;
      }

      const item = currentQuestions[currentQuestionIndex];
      const qNum = currentQuestionIndex + 1;
      const qId = `fp3-past-${item.sessionId || currentSession}-${item.num}`;
      const isItemBookmarked = isBookmarked(qId);

      const card = document.createElement('div');
      card.className = 'quiz-card single-quiz-card';
      card.setAttribute('data-qid', qId);

      card.innerHTML = `
        <div class="quiz-header-row">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="quiz-num-badge" style="font-size:0.95rem; padding:5px 12px; background:#edf4f0; color:#254337;">第 ${item.num || qNum} 問 / 全 ${total} 問</span>
            <span class="shikaku-card-badge ${item.catClass}" style="font-size:0.85rem;">${item.catName}</span>
          </div>
          <button type="button" class="bookmark-toggle-btn ${isItemBookmarked ? 'is-bookmarked' : ''}" id="currentFp3BmBtn">
            <i class="${isItemBookmarked ? 'fas' : 'far'} fa-star"></i> ${isItemBookmarked ? 'ブックマーク中' : 'ブックマーク'}
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
          <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
            <strong>【解答・解説】</strong><br>${item.explanation}
          </div>
          <div class="next-question-bar" style="margin-top:20px; text-align:right;">
            <button type="button" class="next-question-btn" id="nextFp3QuestionBtn" style="padding:12px 28px; font-size:1.05rem; font-weight:bold; background:#345d4d; color:white; border:none; border-radius:9999px; cursor:pointer; box-shadow:0 4px 12px rgba(52,93,77,0.22); transition:0.2s;">
              ${qNum < total ? '次の問題へ <i class="fas fa-arrow-right"></i>' : '結果を見る <i class="fas fa-check-circle"></i>'}
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);

      // ブックマーク処理
      const bmBtn = card.querySelector('#currentFp3BmBtn');
      bmBtn.addEventListener('click', () => {
        bookmarks = getStoredBookmarks();
        const currentStatus = isBookmarked(qId);
        if (currentStatus) {
          bookmarks = bookmarks.filter(id => id !== qId && id !== qId.replace('fp3-past-', 'fp3-') && id !== qId.replace('fp3-', 'fp3-past-'));
          bmBtn.classList.remove('is-bookmarked');
          bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
        } else {
          bookmarks.push(qId);
          bmBtn.classList.add('is-bookmarked');
          bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
        }
        saveStoredBookmarks(bookmarks);
      });

      // 選択肢クリック・判定
      const options = card.querySelectorAll('.quiz-option');
      const explanationArea = card.querySelector('.quiz-explanation-area');
      let answered = false;

      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const selectedVal = opt.getAttribute('data-value');
          const isCorrect = (selectedVal === item.correct);

          answeredCount++;
          if (isCorrect) correctCount++;
          updateProgress(answeredCount, total);

          options.forEach(o => {
            o.classList.add('locked');
            const val = o.getAttribute('data-value');
            if (val === item.correct) {
              o.classList.add('correct-choice');
            } else if (val === selectedVal && !isCorrect) {
              o.classList.add('wrong-choice');
            }
          });

          explanationArea.style.display = 'block';
          if (isCorrect) {
            explanationArea.classList.add('is-correct');
            explanationArea.querySelector('.quiz-result-title').innerHTML = '<i class="fas fa-check-circle" style="color:#38a169;"></i> 正解！';
          } else {
            explanationArea.classList.add('is-wrong');
            explanationArea.querySelector('.quiz-result-title').innerHTML = `<i class="fas fa-times-circle" style="color:#e53e3e;"></i> 不正解... （正解: ${item.correct}）`;
          }

          const nextBtn = explanationArea.querySelector('#nextFp3QuestionBtn');
          nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            renderSinglePastQuestion();
            const progressCard = document.querySelector('.progress-card');
            if (progressCard) {
              progressCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          });
        });
      });
    }

    // FP3級 結果サマリーカード
    function showFp3ResultCard() {
      container.innerHTML = '';
      const total = currentQuestions.length;
      const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      const isPassed = correctCount >= 36; // 60問中36問以上で合格ライン

      const resCard = document.createElement('div');
      resCard.className = 'card';
      resCard.style.cssText = 'text-align:center; padding:40px 20px; background:white; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.06); margin-top:20px;';

      const activeBtn = document.querySelector('.session-btn.active .session-name');
      const sessionTitle = activeBtn ? activeBtn.textContent.trim() : '過去問演習';

      resCard.innerHTML = `
        <div style="font-size:3.5rem; margin-bottom:15px; color:${isPassed ? '#38a169' : '#e53e3e'};">
          <i class="fas ${isPassed ? 'fa-award' : 'fa-redo-alt'}"></i>
        </div>
        <h2 style="font-size:1.8rem; margin-bottom:10px; color:#2d3748;">
          FP3級 ${sessionTitle} 演習完了！
        </h2>
        <p style="font-size:1.1rem; color:#718096; margin-bottom:25px;">
          ${isPassed ? 'お見事です！合格ライン（36問以上 / 60%）を見事に達成しました！' : '惜しい！合格ラインは36問以上（60%）です。間違えた問題を復習して再挑戦しましょう。'}
        </p>

        <div style="display:flex; justify-content:center; gap:30px; margin-bottom:30px; flex-wrap:wrap;">
          <div style="background:#f7fafc; padding:15px 25px; border-radius:8px; border:1px solid #edf2f7; min-width:140px;">
            <div style="font-size:0.88rem; color:#718096; margin-bottom:5px;">正解数</div>
            <div style="font-size:1.8rem; font-weight:bold; color:#254337;">${correctCount} / ${total} 問</div>
          </div>
          <div style="background:#f7fafc; padding:15px 25px; border-radius:8px; border:1px solid #edf2f7; min-width:140px;">
            <div style="font-size:0.88rem; color:#718096; margin-bottom:5px;">正答率</div>
            <div style="font-size:1.8rem; font-weight:bold; color:${isPassed ? '#38a169' : '#e53e3e'};">${accuracy}%</div>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap;">
          <button type="button" id="retryFp3ExamBtn" class="btn" style="background:#345d4d; color:white; padding:12px 24px; font-weight:bold; border-radius:6px; border:none; cursor:pointer;">
            <i class="fas fa-redo"></i> もう一度この回を解く
          </button>
          <button type="button" id="chooseOtherFp3Btn" class="btn" style="background:#edf2f7; color:#4a5568; padding:12px 24px; font-weight:bold; border-radius:6px; border:1px solid #cbd5e0; cursor:pointer;">
            <i class="fas fa-calendar-alt"></i> 他の実施回を選ぶ
          </button>
        </div>
      `;

      container.appendChild(resCard);

      resCard.querySelector('#retryFp3ExamBtn').addEventListener('click', () => {
        renderQuestions();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      resCard.querySelector('#chooseOtherFp3Btn').addEventListener('click', () => {
        showSelectionUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ブックマーク一覧レンダリング（全問一覧表示）
    function renderBookmarkList(bmQuestions) {
      const total = bmQuestions.length;
      updateProgress(0, total);

      if (total === 0) {
        container.innerHTML = `
          <div class="card" style="text-align:center; padding:35px; background:#fffaf0; border:1px solid #feebc8;">
            <i class="far fa-star" style="font-size:2rem; color:#d69e2e; margin-bottom:10px;"></i>
            <h3>ブックマークされた問題がありません</h3>
            <p style="color:#744210;">問題の右上にある「☆ ブックマーク」ボタンを押すと、ここに保存されていつでも苦手問題だけを復習できます。</p>
          </div>
        `;
        return;
      }

      bmQuestions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        const qId = `fp3-past-${item.sessionId || currentSession}-${item.num}`;
        card.setAttribute('data-qid', qId);

        const isItemBookmarked = isBookmarked(qId);

        card.innerHTML = `
          <div class="quiz-header-row">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="quiz-num-badge" style="background:#edf4f0; color:#254337;">第 ${item.num} 問</span>
              <span class="shikaku-card-badge ${item.catClass}">${item.catName}</span>
            </div>
            <button type="button" class="bookmark-toggle-btn ${isItemBookmarked ? 'is-bookmarked' : ''}">
              <i class="${isItemBookmarked ? 'fas' : 'far'} fa-star"></i> ${isItemBookmarked ? 'ブックマーク中' : 'ブックマーク'}
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
            <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
              <strong>【解答・解説】</strong><br>${item.explanation}
            </div>
          </div>
        `;

        const options = card.querySelectorAll('.quiz-option');
        const explanationArea = card.querySelector('.quiz-explanation-area');
        const bmBtn = card.querySelector('.bookmark-toggle-btn');

        bmBtn.addEventListener('click', () => {
          bookmarks = getStoredBookmarks();
          const currentStatus = isBookmarked(qId);
          if (currentStatus) {
            bookmarks = bookmarks.filter(id => id !== qId && id !== qId.replace('fp3-past-', 'fp3-') && id !== qId.replace('fp3-', 'fp3-past-'));
            bmBtn.classList.remove('is-bookmarked');
            bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
          } else {
            bookmarks.push(qId);
            bmBtn.classList.add('is-bookmarked');
            bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
          }
          saveStoredBookmarks(bookmarks);
        });

        options.forEach(opt => {
          opt.addEventListener('click', () => {
            if (card.classList.contains('answered')) return;
            card.classList.add('answered');

            const selectedVal = opt.getAttribute('data-value');
            const isCorrect = (selectedVal === item.correct);

            answeredCount++;
            if (isCorrect) correctCount++;
            updateProgress(answeredCount, total);

            options.forEach(o => {
              o.classList.add('locked');
              const val = o.getAttribute('data-value');
              if (val === item.correct) {
                o.classList.add('correct-choice');
              } else if (val === selectedVal && !isCorrect) {
                o.classList.add('wrong-choice');
              }
            });

            explanationArea.style.display = 'block';
            if (isCorrect) {
              explanationArea.classList.add('is-correct');
              explanationArea.querySelector('.quiz-result-title').innerHTML = '<i class="fas fa-check-circle" style="color:#38a169;"></i> 正解！';
            } else {
              explanationArea.classList.add('is-wrong');
              explanationArea.querySelector('.quiz-result-title').innerHTML = `<i class="fas fa-times-circle" style="color:#e53e3e;"></i> 不正解... （正解: ${item.correct}）`;
            }
          });
        });

        container.appendChild(card);
      });
    }
  }

  function updateProgress(done, total) {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill && text && total > 0) {
      const pct = Math.round((done / total) * 100);
      fill.style.width = `${pct}%`;
      const accuracy = done > 0 ? Math.round((correctCount / done) * 100) : 0;
      text.innerHTML = `進捗: <strong>${done} / ${total} 問完了</strong> (正答率: ${accuracy}%)`;
    }
  }

  // 過去問スタートボタン・プリントボタンのイベント連携
  const startPastExamBtn = document.getElementById('startPastExamBtn');
  const printPastExamBtn = document.getElementById('printPastExamBtn');

  if (startPastExamBtn) {
    startPastExamBtn.addEventListener('click', () => {
      hideSelectionUIAndShowQuiz();
      renderQuestions();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (printPastExamBtn) {
    printPastExamBtn.addEventListener('click', () => {
      const activeBtn = document.querySelector('.session-btn.active');
      const sessionName = activeBtn ? activeBtn.querySelector('.session-name')?.textContent.trim() : '過去問演習';
      const questions = window.FP3_PAST_DATA[currentSession] || [];

      if (!questions || questions.length === 0) {
        alert('印刷対象の問題データがありません。');
        return;
      }

      openPastExamPrintWindow(questions, `FP3級 学科試験 ${sessionName}`);
    });
  }

  function openPastExamPrintWindow(questions, customTitle) {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const examTitle = customTitle || 'FP3級 過去問演習';
    const total = questions.length;

    // 正解一覧テーブル
    const answerTableRows = questions.map((q, idx) => `
      <tr>
        <td style="text-align:center; font-weight:bold; width:20%;">第 ${idx + 1} 問</td>
        <td>${q.catName || ''}</td>
        <td style="text-align:center; font-weight:bold; color:#254337; font-size:1.1rem; width:25%;">${q.correct}</td>
      </tr>
    `).join('');

    // 問題編HTML生成
    const questionsHtml = questions.map((q, idx) => `
      <div class="print-question-item">
        <div class="print-q-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="print-q-num">第 ${idx + 1} 問</span>
            <span class="print-q-cat">${q.catName || ''}</span>
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
          <span class="print-q-cat">${q.catName || ''}</span>
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
<title>${examTitle} プリント（全${total}問） | Shikakus</title>
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
    padding: 8px 20px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
  }
  .print-btn:hover {
    background: #2f855a;
  }
  .close-btn {
    background: transparent;
    border: 1px solid #718096;
    color: #e2e8f0;
    padding: 7px 15px;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 10px;
  }
  .print-paper {
    max-width: 800px;
    margin: 20px auto;
    background: white;
    padding: 30px 40px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }
  .print-header {
    border-bottom: 2px solid #254337;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .print-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #254337;
    margin: 0 0 4px 0;
  }
  .print-subtitle {
    font-size: 0.85rem;
    color: #718096;
  }
  .print-section-title {
    font-size: 1.15rem;
    font-weight: bold;
    color: #2d3748;
    border-left: 4px solid #345d4d;
    padding-left: 10px;
    margin: 20px 0 15px 0;
  }
  .print-question-item {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 16px;
    page-break-inside: avoid;
    break-inside: avoid;
    background: #fff;
  }
  .print-q-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    border-bottom: 1px dashed #edf2f7;
    padding-bottom: 6px;
  }
  .print-q-num {
    font-weight: bold;
    color: #254337;
    font-size: 0.95rem;
  }
  .print-q-cat {
    font-size: 0.78rem;
    background: #edf2f7;
    color: #4a5568;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .print-q-ansbox {
    font-size: 0.85rem;
    font-weight: bold;
    color: #4a5568;
  }
  .print-q-text {
    font-size: 0.95rem;
    margin-bottom: 10px;
    line-height: 1.6;
  }
  .print-q-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .print-q-opt {
    display: flex;
    align-items: baseline;
    font-size: 0.9rem;
    gap: 6px;
  }
  .print-opt-box {
    color: #a0aec0;
    font-size: 0.85rem;
  }
  .print-opt-num {
    font-weight: bold;
    color: #4a5568;
    min-width: 24px;
  }
  .print-opt-text {
    flex: 1;
  }
  .page-break {
    page-break-before: always;
    break-before: page;
    margin: 40px 0 20px 0;
    border-top: 2px dashed #cbd5e0;
    padding-top: 30px;
  }
  .print-ans-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 25px;
    font-size: 0.88rem;
  }
  .print-ans-table th, .print-ans-table td {
    border: 1px solid #cbd5e0;
    padding: 6px 10px;
  }
  .print-ans-table th {
    background: #edf2f7;
    color: #2d3748;
    font-weight: bold;
  }
  .print-expl-item {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 14px;
    page-break-inside: avoid;
    break-inside: avoid;
    background: #fff;
  }
  .print-expl-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    border-bottom: 1px solid #edf2f7;
    padding-bottom: 5px;
  }
  .print-expl-correct {
    font-size: 0.95rem;
    color: #e53e3e;
  }
  .print-expl-correct strong {
    font-size: 1.05rem;
  }
  .print-expl-body {
    font-size: 0.88rem;
    color: #4a5568;
    line-height: 1.6;
    background: #f7fafc;
    padding: 10px 12px;
    border-radius: 4px;
  }
  @media print {
    body {
      background: white;
    }
    .no-print-bar {
      display: none !important;
    }
    .print-paper {
      box-shadow: none;
      margin: 0;
      padding: 0;
      max-width: 100%;
    }
    .page-break {
      border-top: none;
      padding-top: 0;
      margin: 0;
    }
  }
</style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong>🖨️ ${examTitle} プリントプレビュー</strong>
      <span style="font-size:0.85rem; color:#cbd5e0; margin-left:10px;">（全${total}問・A4印刷対応）</span>
    </div>
    <div>
      <button class="print-btn" onclick="window.print();">🖨️ 印刷 / PDF保存</button>
      <button class="close-btn" onclick="window.close();">閉じる</button>
    </div>
  </div>

  <div class="print-paper">
    <!-- 問題編 -->
    <div class="print-header">
      <h1 class="print-title">${examTitle} 【問題編】</h1>
      <div class="print-subtitle">Shikakus ｜ 制限時間: 120分 ｜ 合格基準: 60問中36問以上正解</div>
    </div>

    <div class="print-section-title">■ 問題</div>
    ${questionsHtml}

    <!-- 解答解説編 -->
    <div class="page-break"></div>
    <div class="print-header">
      <h1 class="print-title">${examTitle} 【解答・解説編】</h1>
      <div class="print-subtitle">Shikakus ｜ 正解と詳細解説一覧</div>
    </div>

    <div class="print-section-title">■ 正解一覧</div>
    <table class="print-ans-table">
      <thead>
        <tr>
          <th>問題番号</th>
          <th>分野</th>
          <th>正解番号</th>
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

  // 初期状態では実施回選択UIを表示し、問題は非表示
  showSelectionUI();
});

