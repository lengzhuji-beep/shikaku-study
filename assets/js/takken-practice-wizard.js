/**
 * 資格対策ドットコム - 宅地建物取引士 (宅建士) 分野・問題数選択＆1問ずつ集中ランダム出題スクリプト
 */
document.addEventListener('DOMContentLoaded', () => {
  const wizardSection = document.getElementById('wizardSection');
  const quizPlaySection = document.getElementById('quizPlaySection');
  const quizCardsContainer = document.getElementById('quizCardsContainer');
  const resultSection = document.getElementById('resultSection');

  // カテゴリチェックボックス制御（大分類＆中分類）
  const groupChecks = document.querySelectorAll('.cat-group-check');
  const catCheckboxes = document.querySelectorAll('.cat-checkbox');
  const startBtn = document.getElementById('startPracticeBtn');
  const printBtn = document.getElementById('printPracticeBtn');

  function validateStartBtn() {
    const anyChecked = Array.from(document.querySelectorAll('.cat-checkbox:checked')).length > 0;
    [startBtn, printBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = !anyChecked;
      if (!anyChecked) {
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      }
    });
  }

  // 親グループチェックボックス連動
  groupChecks.forEach(check => {
    check.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const group = e.target.closest('.category-group');
      if (group) {
        const items = group.querySelectorAll('.cat-checkbox');
        items.forEach(item => {
          item.checked = isChecked;
        });
      }
      validateStartBtn();
    });
  });

  // 個別チェックボックス変更時の親グループ更新
  catCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const group = cb.closest('.category-group');
      if (group) {
        const parentCheck = group.querySelector('.cat-group-check');
        const items = group.querySelectorAll('.cat-checkbox');
        const allChecked = Array.from(items).every(i => i.checked);
        if (parentCheck) parentCheck.checked = allChecked;
      }
      validateStartBtn();
    });
  });

  // 全項目チェック ON / OFF ボタン
  const btnCheckAll = document.getElementById('btn-check-all');
  if (btnCheckAll) {
    btnCheckAll.addEventListener('click', () => {
      catCheckboxes.forEach(cb => cb.checked = true);
      groupChecks.forEach(gc => gc.checked = true);
      validateStartBtn();
    });
  }

  const btnCheckNone = document.getElementById('btn-check-none');
  if (btnCheckNone) {
    btnCheckNone.addEventListener('click', () => {
      catCheckboxes.forEach(cb => cb.checked = false);
      groupChecks.forEach(gc => gc.checked = false);
      validateStartBtn();
    });
  }

  // 出題数ボタン (10問, 20問, 30問, 50問, 100問)
  const countBtns = document.querySelectorAll('.count-btn');
  let selectedCount = 10;

  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      countBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedCount = parseInt(btn.getAttribute('data-count'), 10);
    });
  });



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

  function isBookmarked(qId) {
    if (bookmarks.includes(qId)) return true;
    if (qId.startsWith('takken-past-') && bookmarks.includes(qId.replace('takken-past-', 'takken-'))) return true;
    if (qId.startsWith('takken-') && bookmarks.includes(qId.replace('takken-', 'takken-past-'))) return true;
    return false;
  }

  // タブ切り替え（「すべての問題」と「ブックマークした問題だけ復習」）
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  const bookmarkListContainer = document.getElementById('bookmarkListContainer');
  const bookmarkEmptyMsg = document.getElementById('bookmarkEmptyMsg');

  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');

      if (mode === 'bookmark') {
        if (wizardSection) wizardSection.style.display = 'none';
        if (quizPlaySection) quizPlaySection.style.display = 'none';
        if (resultSection) resultSection.style.display = 'none';
        renderBookmarkOnlyView();
      } else {
        if (bookmarkListContainer) bookmarkListContainer.style.display = 'none';
        if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'none';
        if (wizardSection) wizardSection.style.display = 'block';
        if (quizPlaySection) quizPlaySection.style.display = 'none';
        if (resultSection) resultSection.style.display = 'none';
      }
    });
  });

  // ブックマーク一覧描画
  function renderBookmarkOnlyView() {
    if (!bookmarkListContainer) return;
    bookmarkListContainer.innerHTML = '';
    const allData = window.TAKKEN_PAST_QUESTIONS || [];
    bookmarks = getStoredBookmarks();

    const bookmarkedQuestions = allData.filter(q => isBookmarked(q.id || `takken-${q.sessionId}-${q.num}`));

    if (bookmarkedQuestions.length === 0) {
      if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'block';
      bookmarkListContainer.style.display = 'none';
      return;
    }

    if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'none';
    bookmarkListContainer.style.display = 'block';

    const headerNote = document.createElement('div');
    headerNote.className = 'card';
    headerNote.style.cssText = 'padding:15px 20px; margin-bottom:20px; background:#edf4f0; border:1px solid #c6e6d4; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;';
    headerNote.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="color:#254337; font-weight:bold; font-size:1.05rem;">
          <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク保存中の問題: ${bookmarkedQuestions.length} 問
        </span>
        <span style="font-size:0.85rem; color:#4a5568;">（星マークで解除）</span>
      </div>
      <button type="button" id="printBookmarkBtn" class="btn" style="background:#38a169; color:white; border:none; padding:8px 18px; border-radius:6px; font-weight:bold; font-size:0.92rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <i class="fas fa-print"></i> ブックマークした問題をプリントアウトする
      </button>
    `;
    bookmarkListContainer.appendChild(headerNote);

    const bmPrintBtn = headerNote.querySelector('#printBookmarkBtn');
    if (bmPrintBtn) {
      bmPrintBtn.addEventListener('click', () => {
        openPrintWindow(bookmarkedQuestions, '宅地建物取引士 (宅建士) ブックマーク復習問題');
      });
    }

    bookmarkedQuestions.forEach((item, index) => {
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
          <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
            <strong>【解答・解説】</strong><br>${item.explanation}
          </div>
        </div>
      `;

      bookmarkListContainer.appendChild(card);

      const bmBtn = card.querySelector('.bookmark-toggle-btn');
      bmBtn.addEventListener('click', () => {
        const idx = bookmarks.indexOf(qId);
        if (idx > -1) {
          bookmarks.splice(idx, 1);
          saveStoredBookmarks(bookmarks);
          card.remove();
          if (bookmarkListContainer.querySelectorAll('.quiz-card').length === 0) {
            renderBookmarkOnlyView();
          }
        }
      });

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

          expArea.style.display = 'block';
        });
      });
    });
  }

  // 出題セッション状態
  let quizQuestions = [];
  let currentQuizIndex = 0;
  let correctAnswersCount = 0;
  let answeredQuestionsCount = 0;

  // 出題開始
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const checkedBoxes = Array.from(document.querySelectorAll('.cat-checkbox:checked'));
      if (checkedBoxes.length === 0) {
        alert('出題する分野を1つ以上選択してください。');
        return;
      }

      const selectedCategories = checkedBoxes.map(cb => cb.value);
      const allData = window.TAKKEN_PAST_QUESTIONS || [];

      // 該当する問題をフィルタリング（fieldKey, fieldName, subCategory, saimoku にマッチ）
      let filtered = allData.filter(q => {
        const sub = (q.subCategory || q.saimoku || '');
        const fKey = (q.fieldKey || '');
        const fName = (q.fieldName || q.kamoku || '');
        return selectedCategories.some(cat => {
          if (fKey === cat) return true;
          if (fName.includes(cat)) return true;
          if (sub.includes(cat)) return true;
          return false;
        });
      });

      if (filtered.length === 0) {
        filtered = allData;
      }

      // ランダムシャッフル
      quizQuestions = [...filtered].sort(() => 0.5 - Math.random());

      // 出題数切り出し
      quizQuestions = quizQuestions.slice(0, selectedCount);

      if (quizQuestions.length === 0) {
        alert('該当する問題が見つかりませんでした。別のカテゴリを選択してください。');
        return;
      }

      // 画面の初期化と切り替え
      currentQuizIndex = 0;
      correctAnswersCount = 0;
      answeredQuestionsCount = 0;

      const modeSwitchContainer = document.querySelector('.mode-switch-container');
      if (modeSwitchContainer) modeSwitchContainer.style.display = 'none';
      if (wizardSection) wizardSection.style.display = 'none';
      if (resultSection) resultSection.style.display = 'none';
      if (quizPlaySection) quizPlaySection.style.display = 'block';

      renderCurrentQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 印刷・PDF出力ボタンの処理
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const checkedBoxes = Array.from(document.querySelectorAll('.cat-checkbox:checked'));
      if (checkedBoxes.length === 0) {
        alert('印刷する分野を1つ以上選択してください。');
        return;
      }

      const selectedCategories = checkedBoxes.map(cb => cb.value);
      const allData = window.TAKKEN_PAST_QUESTIONS || [];

      let filtered = allData.filter(q => {
        const sub = (q.subCategory || q.saimoku || '');
        const fKey = (q.fieldKey || '');
        const fName = (q.fieldName || q.kamoku || '');
        return selectedCategories.some(cat => {
          if (fKey === cat) return true;
          if (fName.includes(cat)) return true;
          if (sub.includes(cat)) return true;
          return false;
        });
      });

      if (filtered.length === 0) filtered = allData;

      // ランダムシャッフルして指定件数取り出し
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      const printQuestions = shuffled.slice(0, Math.min(selectedCount, shuffled.length));

      openPrintWindow(printQuestions);
    });
  }

  // 1問ずつレンダリング
  function renderCurrentQuestion() {
    if (!quizCardsContainer) return;
    quizCardsContainer.innerHTML = '';

    const total = quizQuestions.length;
    if (currentQuizIndex >= total) {
      showFinalResult();
      return;
    }

    const item = quizQuestions[currentQuizIndex];
    const qNum = currentQuizIndex + 1;
    const qId = item.id || `takken-${item.sessionId}-${item.num}`;
    const isItemBookmarked = isBookmarked(qId);

    // プログレスバー更新
    updateProgressUI(answeredQuestionsCount, total);

    const card = document.createElement('div');
    card.className = 'quiz-card single-quiz-card';
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
          <span class="quiz-num-badge" style="font-size:0.95rem; padding:5px 12px; background:#edf4f0; color:#254337;">
            第 ${qNum} 問 / 全 ${total} 問
          </span>
          <span class="shikaku-card-badge ${item.badgeClass || 'badge-cat-rights'}" style="font-size:0.85rem;">
            ${item.fieldName || '宅建'}
          </span>
          ${item.subCategory ? `<span style="font-size:0.8rem; color:#718096; background:#edf2f7; padding:3px 8px; border-radius:4px;">${item.subCategory}</span>` : ''}
          <span style="font-size:0.75rem; color:#a0aec0;">(${item.sessionId}年 第${item.num}問)</span>
        </div>
        <button type="button" class="bookmark-toggle-btn ${isItemBookmarked ? 'is-bookmarked' : ''}" id="currentSingleBmBtn">
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
        <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
          <strong>【解答・解説】</strong><br>${item.explanation}
        </div>
        <div class="next-question-bar" style="margin-top:20px; text-align:right;">
          <button type="button" class="next-question-btn" id="nextQuizBtn" style="padding:12px 28px; font-size:1.05rem; font-weight:bold; background:#345d4d; color:white; border:none; border-radius:9999px; cursor:pointer; box-shadow:0 4px 12px rgba(52,93,77,0.22); transition:0.2s;">
            ${qNum < total ? '次の問題へ <i class="fas fa-arrow-right"></i>' : '結果を見る <i class="fas fa-check-circle"></i>'}
          </button>
        </div>
      </div>
    `;

    quizCardsContainer.appendChild(card);

    // ブックマーク処理
    const bmBtn = card.querySelector('#currentSingleBmBtn');
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

    // 選択肢クリック・判定
    const options = card.querySelectorAll('.quiz-option');
    const expArea = card.querySelector('.quiz-explanation-area');
    const resultTitle = card.querySelector('.quiz-result-title');
    const nextBtn = card.querySelector('#nextQuizBtn');
    let isAnswered = false;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (isAnswered) return;
        isAnswered = true;
        answeredQuestionsCount++;

        const selectedVal = opt.getAttribute('data-value');
        const correctVal = item.answer;
        const isCorrect = (selectedVal === correctVal);
        item._userSelected = selectedVal;
        item._isUserCorrect = isCorrect;

        if (isCorrect) correctAnswersCount++;

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

        expArea.style.display = 'block';
        updateProgressUI(answeredQuestionsCount, total);
      });
    });

    nextBtn.addEventListener('click', () => {
      currentQuizIndex++;
      renderCurrentQuestion();
      window.scrollTo({ top: quizPlaySection.offsetTop - 80, behavior: 'smooth' });
    });
  }

  // プログレスバー更新
  function updateProgressUI(current, total) {
    const playProgressText = document.getElementById('playProgressText');
    const playProgressFill = document.getElementById('playProgressFill');
    if (!playProgressText || !playProgressFill) return;

    const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
    playProgressText.innerText = `進捗: ${current} / ${total} 問 (${pct}%)`;
    playProgressFill.style.width = `${pct}%`;
  }

  // 終了リザルト表示
  function showFinalResult() {
    if (quizPlaySection) quizPlaySection.style.display = 'none';
    if (resultSection) resultSection.style.display = 'block';

    const total = quizQuestions.length;
    const rate = total > 0 ? Math.round((correctAnswersCount / total) * 100) : 0;
    const isPassed = rate >= 70; // 70%以上で合格水準

    const scoreDisplay = document.getElementById('resultScoreText');
    const rateDisplay = document.getElementById('resultRateText');
    const msgDisplay = document.getElementById('resultMessageText');
    const iconDisplay = document.getElementById('resultIcon');

    if (scoreDisplay) scoreDisplay.innerText = `${correctAnswersCount} / ${total} 問`;
    if (rateDisplay) rateDisplay.innerText = `正解率: ${rate}%`;
    if (iconDisplay) iconDisplay.innerHTML = isPassed ? '🎉' : '💪';
    if (msgDisplay) {
      msgDisplay.innerHTML = isPassed
        ? '素晴らしい正解率です！宅建試験の合格水準（約70%以上）に達しています。この調子で演習を重ねましょう！'
        : '演習お疲れ様でした！間違えた問題の解説をしっかり復習し、重要論点の知識を定着させましょう。';
    }

    // 見直しリスト生成
    const reviewListContainer = document.getElementById('resultReviewList');
    if (reviewListContainer) {
      reviewListContainer.innerHTML = quizQuestions.map((q, idx) => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 18px; background:#f7fafc; border-radius:6px; border-left:4px solid ${q._isUserCorrect ? '#48bb78' : '#f56565'};">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-weight:bold; color:#2d3748; min-width:60px;">第 ${idx+1} 問</span>
            <span class="shikaku-card-badge ${q.badgeClass || 'badge-cat-rights'}" style="font-size:0.75rem;">${q.fieldName || '宅建'}</span>
            <span style="font-size:0.9rem; color:#4a5568; max-width:380px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${q.question.replace(/<[^>]+>/g, '').slice(0, 35)}...
            </span>
          </div>
          <div style="display:flex; align-items:center; gap:15px;">
            <span style="font-size:0.85rem; color:#718096;">正解: <strong>${q.answer}</strong></span>
            <span style="font-weight:bold; font-size:0.95rem; color:${q._isUserCorrect ? '#2f855a' : '#c53030'};">
              ${q._isUserCorrect ? '<i class="fas fa-check"></i> 正解' : '<i class="fas fa-times"></i> 不正解'}
            </span>
          </div>
        </div>
      `).join('');
    }

    window.scrollTo({ top: resultSection.offsetTop - 80, behavior: 'smooth' });
  }

  // リトライ＆設定に戻るボタン
  const retryBtn = document.getElementById('btnRetryQuiz');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      currentQuizIndex = 0;
      correctAnswersCount = 0;
      answeredQuestionsCount = 0;
      quizQuestions = [...quizQuestions].sort(() => 0.5 - Math.random());
      if (resultSection) resultSection.style.display = 'none';
      if (quizPlaySection) quizPlaySection.style.display = 'block';
      renderCurrentQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 演習中断して条件選択に戻るボタン
  const backToWizardBtnTop = document.getElementById('backToWizardBtn');
  if (backToWizardBtnTop) {
    backToWizardBtnTop.addEventListener('click', () => {
      if (confirm('現在の演習を中断して、分野・問題数の選択に戻りますか？')) {
        const modeSwitchContainer = document.querySelector('.mode-switch-container');
        if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
        if (quizPlaySection) quizPlaySection.style.display = 'none';
        if (resultSection) resultSection.style.display = 'none';
        if (wizardSection) wizardSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 結果画面から条件選択に戻るボタン
  const backToWizardBtn = document.getElementById('btnBackToWizard');
  if (backToWizardBtn) {
    backToWizardBtn.addEventListener('click', () => {
      const modeSwitchContainer = document.querySelector('.mode-switch-container');
      if (modeSwitchContainer) modeSwitchContainer.style.display = 'flex';
      if (resultSection) resultSection.style.display = 'none';
      if (wizardSection) wizardSection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 印刷ウィンドウ生成関数
  function openPrintWindow(questions, customTitle) {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const examTitle = customTitle || '宅地建物取引士 (宅建士) 練習問題';
    const total = questions.length;

    // 正解一覧表
    const answerTableRows = questions.map((q, idx) => `
      <tr>
        <td style="text-align:center; font-weight:bold; width:18%;">問 ${idx + 1}</td>
        <td>${q.fieldName || '宅建'} ${q.subCategory ? `(${q.subCategory})` : ''}</td>
        <td style="text-align:center; font-weight:bold; color:#254337; font-size:1.1rem; width:22%;">${q.answer}</td>
      </tr>
    `).join('');

    // 問題編HTML生成
    const questionsHtml = questions.map((q, idx) => {
      let optsArray = [];
      if (Array.isArray(q.options)) {
        optsArray = q.options.map((opt, i) => ({ key: `(${i+1})`, text: opt }));
      } else if (q.options && typeof q.options === 'object') {
        optsArray = Object.keys(q.options).map(k => ({ key: k, text: q.options[k] }));
      }

      return `
        <div class="print-question-item">
          <div class="print-q-header">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="print-q-num">問 ${idx + 1}</span>
              <span class="print-q-cat">${q.fieldName || '宅建'} ${q.subCategory ? `· ${q.subCategory}` : ''}</span>
            </div>
            <span class="print-q-ansbox">解答記入欄：( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span>
          </div>
          <div class="print-q-text">${q.question}</div>
          <div class="print-q-options">
            ${optsArray.map(opt => `
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

    // 解答解説編HTML生成
    const explanationsHtml = questions.map((q, idx) => `
      <div class="print-expl-item">
        <div class="print-expl-header">
          <span class="print-q-num">問 ${idx + 1}</span>
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
    background: #38a169;
    color: white;
    border: none;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(56,161,105,0.25);
    transition: 0.2s;
  }
  .no-print-bar button:hover {
    background: #2f855a;
  }
  .print-page-container {
    background: white;
    max-width: 210mm;
    margin: 0 auto 30px auto;
    padding: 20mm;
    box-shadow: 0 0 10px rgba(0,0,0,0.08);
  }
  .print-header {
    border-bottom: 2px solid #254337;
    padding-bottom: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .print-title {
    font-size: 16pt;
    font-weight: bold;
    color: #254337;
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
    color: #254337;
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
    border-left: 4px solid #254337;
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
    background: #edf4f0;
    color: #254337;
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

  validateStartBtn();
});
