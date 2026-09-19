/**
 * Shikakus - 宅地建物取引士（宅建士）過去問演習
 * 令和7年〜平成23年（全17回・計850問）動的レンダリングスクリプト（ワンタップ即時判定・印刷・合否判定・ブックマーク）
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pastQuestionsContainer');
  const sessionBtns = document.querySelectorAll('.session-btn');
  const startPastExamBtn = document.getElementById('startPastExamBtn');
  const printPastExamBtn = document.getElementById('printPastExamBtn');
  const backToSessionsBtn = document.getElementById('backToSessionsBtn');

  if (!container) return;

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

  let currentSession = '2024'; // デフォルトは2024年本試験
  let currentMode = 'all';

  const sessionSelector = document.querySelector('.session-selector-card');
  const modeSwitchContainer = document.querySelector('.mode-switch-container');
  const progressCard = document.querySelector('.progress-card');

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

  // モード切替タブ
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');

      if (currentMode === 'bookmark') {
        if (sessionSelector) sessionSelector.style.display = 'none';
        if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
        if (progressCard) progressCard.style.display = 'none';
        if (container) container.style.display = 'block';
        currentSession = 'all';
        renderQuestions();
      } else {
        const activeBtn = document.querySelector('.session-btn.active');
        currentSession = activeBtn ? activeBtn.getAttribute('data-session') : '2024';
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
    });
  });

  // 開始ボタン
  if (startPastExamBtn) {
    startPastExamBtn.addEventListener('click', () => {
      hideSelectionUIAndShowQuiz();
      renderQuestions();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 印刷ボタン
  if (printPastExamBtn) {
    printPastExamBtn.addEventListener('click', () => {
      const allData = window.TAKKEN_PAST_QUESTIONS || [];
      const sessionQuestions = allData.filter(q => q.sessionId === currentSession);
      const activeBtn = document.querySelector('.session-btn.active');
      const sName = activeBtn ? activeBtn.querySelector('.session-name').textContent.trim() : `${currentSession}年本試験`;
      openPrintWindow(sessionQuestions, `宅地建物取引士 (宅建士) 過去問演習（${sName}）`);
    });
  }

  let answeredCount = 0;
  let correctCount = 0;

  function isBookmarked(qId) {
    if (bookmarks.includes(qId)) return true;
    if (qId.startsWith('takken-past-') && bookmarks.includes(qId.replace('takken-past-', 'takken-'))) return true;
    if (qId.startsWith('takken-') && bookmarks.includes(qId.replace('takken-', 'takken-past-'))) return true;
    return false;
  }

  function renderQuestions() {
    answeredCount = 0;
    correctCount = 0;
    container.innerHTML = '';

    const allData = window.TAKKEN_PAST_QUESTIONS || [];
    let questions = [];

    if (currentSession === 'all') {
      questions = allData.slice();
    } else {
      questions = allData.filter(q => q.sessionId === currentSession);
    }

    let currentQuestions = [];
    let currentQuestionIndex = 0;

    if (currentMode === 'bookmark') {
      const bmQuestions = allData.filter(q => isBookmarked(q.id || `takken-${q.sessionId}-${q.num}`));
      renderBookmarkList(bmQuestions);
    } else {
      currentQuestions = questions;
      const total = currentQuestions.length;
      updateProgress(0, total);

      if (total === 0) {
        container.innerHTML = `
          <div class="card" style="text-align:center; padding:35px;">
            <p style="color:#718096;">過去問データを読み込み中または該当する問題がありませんでした。</p>
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
        showTakkenResultCard();
        return;
      }

      const item = currentQuestions[currentQuestionIndex];
      const qNum = currentQuestionIndex + 1;
      const qId = item.id || `takken-${item.sessionId}-${item.num}`;
      const isItemBookmarked = isBookmarked(qId);

      const card = document.createElement('div');
      card.className = 'quiz-card single-quiz-card';
      card.setAttribute('data-qid', qId);

      // オプション配列の生成
      let optsArray = [];
      if (Array.isArray(item.options)) {
        optsArray = item.options.map((opt, i) => ({ key: `(${i+1})`, text: opt }));
      } else if (item.options && typeof item.options === 'object') {
        optsArray = Object.keys(item.options).map(k => ({ key: k, text: item.options[k] }));
      }

      card.innerHTML = `
        <div class="quiz-header-row">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="quiz-num-badge" style="font-size:0.95rem; padding:5px 12px; background:#edf4f0; color:#254337;">第 ${item.num || qNum} 問 / 全 ${total} 問</span>
            <span class="shikaku-card-badge ${item.badgeClass || 'badge-cat-rights'}" style="font-size:0.85rem;">${item.fieldName || '宅建'}</span>
            ${item.subCategory ? `<span style="font-size:0.8rem; color:#718096; background:#edf2f7; padding:3px 8px; border-radius:4px;">${item.subCategory}</span>` : ''}
          </div>
          <button type="button" class="bookmark-toggle-btn ${isItemBookmarked ? 'is-bookmarked' : ''}" id="currentTakkenBmBtn">
            <i class="${isItemBookmarked ? 'fas' : 'far'} fa-star"></i> ${isItemBookmarked ? 'ブックマーク中' : 'ブックマーク'}
          </button>
        </div>
        <div class="quiz-question-text">${item.question}</div>
        <div class="quiz-options">
          ${optsArray.map(opt => `
            <div class="quiz-option" data-value="${opt.key}">
              <span class="opt-num" style="font-weight:bold; margin-right:6px;">${opt.key}</span>
              ${opt.text}
            </div>
          `).join('')}
        </div>
        <div class="quiz-explanation-area" style="display:none;">
          <div class="quiz-result-title"></div>
          <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;"></div>
          <div class="next-question-bar" style="margin-top:20px; text-align:right;">
            <button type="button" class="next-question-btn" id="nextTakkenQuestionBtn" style="padding:12px 28px; font-size:1.05rem; font-weight:bold; background:#345d4d; color:white; border:none; border-radius:9999px; cursor:pointer; box-shadow:0 4px 12px rgba(52,93,77,0.22); transition:0.2s;">
              ${qNum < total ? '次の問題へ <i class="fas fa-arrow-right"></i>' : '結果を見る <i class="fas fa-check-circle"></i>'}
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);

      // ブックマーク処理
      const bmBtn = card.querySelector('#currentTakkenBmBtn');
      bmBtn.addEventListener('click', () => {
        const idx = bookmarks.indexOf(qId);
        if (idx > -1) {
          bookmarks.splice(idx, 1);
          bmBtn.classList.remove('is-bookmarked');
          bmBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
        } else {
          bookmarks.push(qId);
          bmBtn.classList.add('is-bookmarked');
          bmBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
        }
        saveStoredBookmarks(bookmarks);
      });

      // 選択肢クリック・判定（ワンタップ即時判定）
      const options = card.querySelectorAll('.quiz-option');
      const expArea = card.querySelector('.quiz-explanation-area');
      const resultTitle = card.querySelector('.quiz-result-title');
      const nextBtn = card.querySelector('#nextTakkenQuestionBtn');
      let isAnswered = false;

      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (isAnswered) return;
          isAnswered = true;
          answeredCount++;

          const selectedVal = opt.getAttribute('data-value');
          const correctVal = item.answer;
          const isCorrect = (selectedVal === correctVal);
          item._userSelected = selectedVal;
          item._isUserCorrect = isCorrect;

          if (isCorrect) correctCount++;

          options.forEach(o => {
            o.classList.add('locked');
            if (o.getAttribute('data-value') === correctVal) {
              o.classList.add('correct-choice');
            }
          });

          expArea.classList.remove('is-correct', 'is-wrong');
          if (isCorrect) {
            opt.classList.add('correct-choice');
            resultTitle.innerHTML = '<span style="color:#2f855a; font-weight:bold; font-size:1.15rem;"><i class="fas fa-check-circle"></i> 正解！</span>';
            expArea.classList.add('is-correct');
          } else {
            opt.classList.add('wrong-choice');
            resultTitle.innerHTML = `<span style="color:#c53030; font-weight:bold; font-size:1.15rem;"><i class="fas fa-times-circle"></i> 不正解... （正解：${correctVal}）</span>`;
            expArea.classList.add('is-wrong');
          }

          const expBody = card.querySelector('.quiz-explanation-body');
          if (expBody) {
            expBody.innerHTML = `<strong>【解答・解説】</strong><br>${item.explanation}`;
          }

          expArea.style.display = 'block';
          updateProgress(answeredCount, total);
        });
      });

      // 次の問題へボタン
      nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        renderSinglePastQuestion();
        window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
      });
    }

    // 合否判定リザルト画面
    function showTakkenResultCard() {
      container.innerHTML = '';
      const total = currentQuestions.length;
      const rate = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      // 宅建の一般的な合格ラインは50問中36問前後 (約72%)
      const isPassed = correctCount >= 36;

      const activeSessBtn = document.querySelector(`.session-btn[data-session="${currentSession}"]`);
      const sessLabel = activeSessBtn ? activeSessBtn.querySelector('.session-name').textContent : '本試験';

      const resCard = document.createElement('div');
      resCard.className = 'card result-card';
      resCard.style.cssText = 'padding:35px; text-align:center; background:#fff; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.08); border:1px solid #e2e8f0;';
      resCard.innerHTML = `
        <div style="font-size:3.5rem; margin-bottom:15px;">${isPassed ? '🎉' : '💪'}</div>
        <h2 style="font-size:1.8rem; margin-bottom:5px; color:#2d3748;">
          ${sessLabel} 演習完了！
        </h2>
        <p style="color:#718096; margin-bottom:25px;">${sessLabel}の全50問演習が終了しました。</p>

        <div style="display:inline-block; padding:20px 40px; background:#f7fafc; border:2px solid ${isPassed ? '#48bb78' : '#cbd5e0'}; border-radius:12px; margin-bottom:25px;">
          <span style="font-size:1.1rem; color:#4a5568; display:block;">得点 / 合否判定</span>
          <span style="font-size:3rem; font-weight:800; color:${isPassed ? '#2f855a' : '#345d4d'};">
            ${correctCount} / ${total} 問
          </span>
          <span style="display:block; font-size:1.3rem; font-weight:700; color:${isPassed ? '#2f855a' : '#e53e3e'}; margin-top:5px;">
            ${isPassed ? '【合格ライン到達（目安: 36問以上）】' : '【不合格ライン（目安: 36問以上）】'}
          </span>
          <span style="font-size:0.95rem; color:#718096; display:block; margin-top:5px;">正解率: ${rate}%</span>
        </div>

        <p style="max-width:600px; margin:0 auto 30px; font-size:1.05rem; color:#4a5568; line-height:1.7;">
          ${isPassed
            ? 'お見事です！本番合格基準をクリアしています。間違えた問題の解説を確認し、知識を万全にして本番に臨みましょう！'
            : 'お疲れ様でした！あと少しで合格ラインです。間違えた問題は見直しリストで解説を読み込み、弱点分野を克服しましょう！'}
        </p>

        <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap; margin-bottom:35px;">
          <button type="button" id="retryExamBtn" class="btn" style="padding:12px 28px; background:#345d4d; color:white; font-weight:bold; font-size:1rem; border-radius:6px; border:none; cursor:pointer;">
            <i class="fas fa-redo"></i> もう一度解く
          </button>
          <button type="button" id="changeSessionBtn" class="btn" style="padding:12px 28px; background:#edf2f7; color:#4a5568; font-weight:bold; font-size:1rem; border-radius:6px; border:1px solid #cbd5e0; cursor:pointer;">
            <i class="fas fa-calendar-alt"></i> 別の年度を選択する
          </button>
        </div>

        <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
        <h3 style="text-align:left; font-size:1.25rem; margin-bottom:15px; color:#2d3748;">
          <i class="fas fa-list-check" style="color:#345d4d;"></i> 回答結果・見直しリスト
        </h3>
        <div style="text-align:left; display:flex; flex-direction:column; gap:10px;">
          ${currentQuestions.map((q, idx) => `
            <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 18px; background:#f7fafc; border-radius:6px; border-left:4px solid ${q._isUserCorrect ? '#48bb78' : '#f56565'};">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-weight:bold; color:#2d3748; min-width:60px;">第 ${q.num || (idx+1)} 問</span>
                <span class="shikaku-card-badge ${q.badgeClass || 'badge-cat-rights'}" style="font-size:0.75rem;">${q.fieldName || '宅建'}</span>
                <span style="font-size:0.9rem; color:#4a5568; max-width:400px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${q.question.replace(/<[^>]+>/g, '').slice(0, 40)}...
                </span>
              </div>
              <div style="display:flex; align-items:center; gap:15px;">
                <span style="font-size:0.85rem; color:#718096;">正解: <strong>${q.answer}</strong></span>
                <span style="font-weight:bold; font-size:0.95rem; color:${q._isUserCorrect ? '#2f855a' : '#c53030'};">
                  ${q._isUserCorrect ? '<i class="fas fa-check"></i> 正解' : '<i class="fas fa-times"></i> 不正解'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.appendChild(resCard);

      resCard.querySelector('#retryExamBtn').addEventListener('click', () => {
        renderQuestions();
        window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
      });

      resCard.querySelector('#changeSessionBtn').addEventListener('click', () => {
        showSelectionUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ブックマーク一覧表示モード（ワンタップ即時判定＋印刷機能）
    function renderBookmarkList(bmQuestions) {
      container.innerHTML = '';
      const total = bmQuestions.length;
      updateProgress(total, total);

      if (total === 0) {
        container.innerHTML = `
          <div class="card" style="text-align:center; padding:35px; background:#fffaf0; border:1px solid #feebc8;">
            <i class="far fa-star" style="font-size:2rem; color:#d69e2e; margin-bottom:10px;"></i>
            <h3 style="color:#744210;">ブックマークされた問題がありません</h3>
            <p style="color:#975a16; font-size:0.95rem;">問題の右上にある「☆ ブックマーク」ボタンを押すと、ここに保存されていつでも集中復習できます。</p>
          </div>
        `;
        return;
      }

      // ブックマーク操作ヘッダー
      const bmHeader = document.createElement('div');
      bmHeader.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px; padding:12px 18px; background:#edf4f0; border:1px solid #c6e6d4; border-radius:8px;';
      bmHeader.innerHTML = `
        <div style="font-size:0.95rem; color:#254337; font-weight:bold;">
          <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク保存中の問題: ${total} 問
        </div>
        <button type="button" id="printBmBtn" class="btn" style="background:#38a169; color:white; border:none; padding:8px 18px; border-radius:6px; font-weight:bold; font-size:0.92rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
          <i class="fas fa-print"></i> ブックマークした問題をプリントアウトする
        </button>
      `;
      container.appendChild(bmHeader);

      bmHeader.querySelector('#printBmBtn').addEventListener('click', () => {
        openPrintWindow(bmQuestions, '宅地建物取引士 (宅建士) 過去問ブックマーク復習問題');
      });

      bmQuestions.forEach((item, index) => {
        const qId = item.id || `takken-${item.sessionId}-${item.num}`;
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.setAttribute('data-qid', qId);

        let optsArray = [];
        if (Array.isArray(item.options)) {
          optsArray = item.options.map((opt, i) => ({ key: `(${i+1})`, text: opt }));
        } else if (item.options && typeof item.options === 'object') {
          optsArray = Object.keys(item.options).map(k => ({ key: k, text: item.options[k] }));
        }

        card.innerHTML = `
          <div class="quiz-header-row">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span class="quiz-num-badge">問 ${index + 1} (${item.sessionId}年 第${item.num}問)</span>
              <span class="shikaku-card-badge ${item.badgeClass || 'badge-cat-rights'}">${item.fieldName || '宅建'}</span>
              ${item.subCategory ? `<span style="font-size:0.8rem; color:#718096; background:#edf2f7; padding:3px 8px; border-radius:4px;">${item.subCategory}</span>` : ''}
            </div>
            <button type="button" class="bookmark-toggle-btn is-bookmarked" data-qid="${qId}">
              <i class="fas fa-star"></i> ブックマーク中
            </button>
          </div>
          <div class="quiz-question-text">${item.question}</div>
          <div class="quiz-options">
            ${optsArray.map(opt => `
              <div class="quiz-option" data-value="${opt.key}">
                <span class="opt-num" style="font-weight:bold; margin-right:6px;">${opt.key}</span>
                ${opt.text}
              </div>
            `).join('')}
          </div>
          <div class="quiz-explanation-area" style="display:none;">
            <div class="quiz-result-title"></div>
            <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;"></div>
          </div>
        `;

        container.appendChild(card);

        // ブックマーク解除イベント
        const bmBtn = card.querySelector('.bookmark-toggle-btn');
        bmBtn.addEventListener('click', () => {
          const idx = bookmarks.indexOf(qId);
          if (idx > -1) {
            bookmarks.splice(idx, 1);
            saveStoredBookmarks(bookmarks);
            card.remove();
            if (container.querySelectorAll('.quiz-card').length === 0) {
              renderQuestions();
            }
          }
        });

        // 選択肢イベント（ワンタップ即時判定）
        const options = card.querySelectorAll('.quiz-option');
        const expArea = card.querySelector('.quiz-explanation-area');
        const resultTitle = card.querySelector('.quiz-result-title');
        let isBmAnswered = false;

        options.forEach(opt => {
          opt.addEventListener('click', () => {
            if (isBmAnswered) return;
            isBmAnswered = true;

            const selectedVal = opt.getAttribute('data-value');
            const correctVal = item.answer;
            const isCorrect = (selectedVal === correctVal);

            options.forEach(o => {
              o.classList.add('locked');
              if (o.getAttribute('data-value') === correctVal) {
                o.classList.add('correct-choice');
              }
            });

            if (isCorrect) {
              opt.classList.add('correct-choice');
              resultTitle.innerHTML = '<span style="color:#2f855a; font-weight:bold; font-size:1.15rem;"><i class="fas fa-check-circle"></i> 正解！</span>';
            } else {
              opt.classList.add('wrong-choice');
              resultTitle.innerHTML = `<span style="color:#c53030; font-weight:bold; font-size:1.15rem;"><i class="fas fa-times-circle"></i> 不正解... （正解：${correctVal}）</span>`;
            }

            const expBody = card.querySelector('.quiz-explanation-body');
            if (expBody) {
              expBody.innerHTML = `<strong>【解答・解説】</strong><br>${item.explanation}`;
            }

            expArea.style.display = 'block';
          });
        });
      });
    }
  }

  function updateProgress(current, total) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (!progressFill || !progressText) return;

    const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
    progressFill.style.width = `${pct}%`;
    progressText.innerText = `進捗: ${current} / ${total} 問完了 (${pct}%)`;
  }

  // 印刷ウィンドウ生成関数
  function openPrintWindow(questions, customTitle) {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const examTitle = customTitle || '宅地建物取引士 (宅建士) 過去問演習';
    const total = questions.length;

    // 正解・解答一覧表
    const answerTableRows = questions.map((q, idx) => `
      <tr>
        <td style="text-align:center; font-weight:bold; width:15%;">第 ${q.num || (idx + 1)} 問</td>
        <td>${q.fieldName || '宅建'} ${q.subCategory ? `<span style="color:#718096; font-size:0.85em;">(${q.subCategory})</span>` : ''}</td>
        <td style="text-align:center; font-weight:bold; color:#254337; font-size:1.1rem; width:20%;">${q.answer}</td>
      </tr>
    `).join('');

    // 問題一覧（マークシート解答記入欄付き）
    const questionsHtml = questions.map((q, idx) => {
      let opts = [];
      if (Array.isArray(q.options)) {
        opts = q.options.map((opt, i) => ({ key: `(${i+1})`, text: opt }));
      } else if (q.options && typeof q.options === 'object') {
        opts = Object.keys(q.options).map(k => ({ key: k, text: q.options[k] }));
      }
      return `
        <div class="print-question-item">
          <div class="print-q-header">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="print-q-num">第 ${q.num || (idx + 1)} 問</span>
              <span class="print-q-cat">${q.fieldName || '宅建'}</span>
              ${q.subCategory ? `<span style="font-size:0.85rem; color:#718096;">${q.subCategory}</span>` : ''}
            </div>
            <span class="print-q-ansbox">解答記入欄：( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span>
          </div>
          <div class="print-q-text">${q.question}</div>
          <div class="print-q-options">
            ${opts.map(opt => `
              <div class="print-q-opt">
                <span class="print-opt-box">□</span>
                <span class="print-opt-num">${opt.key}</span>
                <span class="print-opt-text">${opt.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    // 解説一覧
    const explanationsHtml = questions.map((q, idx) => `
      <div class="print-expl-item">
        <div class="print-expl-header">
          <span class="print-q-num">第 ${q.num || (idx + 1)} 問</span>
          <span class="print-expl-correct">正解：<strong>${q.answer}</strong></span>
          <span class="print-q-cat">${q.fieldName || '宅建'}</span>
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif;
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
    transition: 0.2s;
  }
  .close-btn:hover {
    background: rgba(255,255,255,0.1);
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
    margin: 25px 0 15px 0;
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
    border: 1px dashed #a0aec0;
    padding: 3px 10px;
    border-radius: 4px;
  }
  .print-q-text {
    font-size: 0.95rem;
    margin-bottom: 10px;
    line-height: 1.6;
    color: #2d3748;
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
    color: #4a5568;
  }
  .print-opt-box {
    color: #a0aec0;
    font-size: 0.85rem;
  }
  .print-opt-num {
    font-weight: bold;
    color: #2d3748;
    min-width: 28px;
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
    color: #2f855a;
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
    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
      <strong>🖨️ ${examTitle} プリントプレビュー</strong>
      <span style="font-size:0.85rem; color:#cbd5e0;">（全${total}問・A4印刷対応）</span>
      <span style="font-size:0.82rem; color:#a0aec0;">※ブラウザ設定で「背景のグラフィック」を有効にすると綺麗に印刷できます</span>
    </div>
    <div style="display:flex; align-items:center; gap:10px;">
      <button class="print-btn" onclick="window.print();">🖨️ このページを印刷する (Ctrl + P)</button>
      <button class="close-btn" onclick="window.close();">閉じる</button>
    </div>
  </div>

  <div class="print-paper">
    <!-- 1. 問題用紙 -->
    <div class="print-header">
      <h1 class="print-title">${examTitle} 【問題用紙】</h1>
      <div class="print-subtitle">Shikakus ｜ 出題数: ${total} 問 ｜ 制限時間: 120分 ｜ 合格基準: 50問中36問前後正解</div>
    </div>
    <div class="print-section-title">■ 問題</div>
    ${questionsHtml}

    <!-- 2. 正解・解答一覧表 -->
    <div class="page-break"></div>
    <div class="print-header">
      <h1 class="print-title">${examTitle} 【解答一覧】</h1>
      <div class="print-subtitle">Shikakus ｜ 全 ${total} 問 正解一覧</div>
    </div>
    <div class="print-section-title">■ 正解一覧</div>
    <table class="print-ans-table">
      <thead>
        <tr>
          <th style="width:20%;">問題番号</th>
          <th>出題分野・細目</th>
          <th style="width:20%;">正解</th>
        </tr>
      </thead>
      <tbody>
        ${answerTableRows}
      </tbody>
    </table>

    <!-- 3. 詳細解説 -->
    <div class="page-break"></div>
    <div class="print-header">
      <h1 class="print-title">${examTitle} 【詳細解説】</h1>
      <div class="print-subtitle">Shikakus ｜ 全 ${total} 問 詳細解説</div>
    </div>
    <div class="print-section-title">■ 詳細解説</div>
    ${explanationsHtml}
  </div>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(fullHtml);
    printWin.document.close();
  }
});
