/**
 * Shikakus - 日商簿記検定（3級・2級・1級）練習問題ウィザード＆演習レンダラー
 */
document.addEventListener('DOMContentLoaded', () => {
  // 現在の級判定
  const gradeKey = window.BOKI_GRADE || (window.BOKI1_QUESTION_POOL ? '1kyu' : (window.BOKI2_QUESTION_POOL ? '2kyu' : '3kyu'));
  const gradeTitle = gradeKey === '1kyu' ? '日商簿記1級' : (gradeKey === '2kyu' ? '日商簿記2級' : '日商簿記3級');

  // データプールの取得
  const questionPool = (gradeKey === '2kyu' ? window.BOKI2_QUESTION_POOL : (gradeKey === '1kyu' ? window.BOKI1_QUESTION_POOL : window.BOKI3_QUESTION_POOL)) || [];

  const wizardSection = document.getElementById('wizardSection');
  const quizPlaySection = document.getElementById('quizPlaySection');
  const quizCardsContainer = document.getElementById('quizCardsContainer');
  const resultSection = document.getElementById('resultSection');

  // 1. カテゴリチェックボックス
  const catAllCheck = document.getElementById('cat-all');
  const specificCatCheckboxes = document.querySelectorAll('.cat-checkbox');
  const startBtn = document.getElementById('startPracticeBtn');
  const printBtn = document.getElementById('printPracticeBtn');

  function validateButtons() {
    const anyChecked = Array.from(specificCatCheckboxes).some(cb => cb.checked);
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

  if (catAllCheck) {
    catAllCheck.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      specificCatCheckboxes.forEach(cb => {
        cb.checked = isChecked;
        const parent = cb.closest('.category-check-item');
        if (parent) {
          if (isChecked) parent.classList.add('selected');
          else parent.classList.remove('selected');
        }
      });
      const allParent = catAllCheck.closest('.category-check-item');
      if (allParent) {
        if (isChecked) allParent.classList.add('selected');
        else allParent.classList.remove('selected');
      }
      validateButtons();
    });
  }

  specificCatCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const parent = cb.closest('.category-check-item');
      if (parent) {
        if (cb.checked) parent.classList.add('selected');
        else parent.classList.remove('selected');
      }

      if (catAllCheck) {
        const allChecked = Array.from(specificCatCheckboxes).every(c => c.checked);
        catAllCheck.checked = allChecked;
        const allParent = catAllCheck.closest('.category-check-item');
        if (allParent) {
          if (allChecked) allParent.classList.add('selected');
          else allParent.classList.remove('selected');
        }
      }
      validateButtons();
    });
  });

  // グループ別一括選択ボタン（商業簿記 / 工業簿記）
  const groupToggleBtns = document.querySelectorAll('.group-toggle-btn');
  groupToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.category-group-container');
      if (!container) return;
      const groupCheckboxes = container.querySelectorAll('.cat-checkbox');
      const allGroupChecked = Array.from(groupCheckboxes).every(c => c.checked);
      const newStatus = !allGroupChecked;

      groupCheckboxes.forEach(cb => {
        cb.checked = newStatus;
        const parent = cb.closest('.category-check-item');
        if (parent) {
          if (newStatus) parent.classList.add('selected');
          else parent.classList.remove('selected');
        }
      });

      if (catAllCheck) {
        const allChecked = Array.from(specificCatCheckboxes).every(c => c.checked);
        catAllCheck.checked = allChecked;
        const allParent = catAllCheck.closest('.category-check-item');
        if (allParent) {
          if (allChecked) allParent.classList.add('selected');
          else allParent.classList.remove('selected');
        }
      }
      validateButtons();
    });
  });

  // 2. 出題数ボタン
  let selectedCount = 10;
  const countBtns = document.querySelectorAll('.count-btn');
  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      countBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedCount = parseInt(btn.getAttribute('data-count'), 10) || 10;
    });
  });

  // 3. ブックマークストレージ
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
    return `boki-${gradeKey}-${item.sessionId || 'prac'}-${item.num}`;
  }

  function isItemBookmarked(item, qId) {
    const bms = getStoredBookmarks();
    if (bms.includes(qId)) return true;
    if (qId.startsWith('boki-past-') && bms.includes(qId.replace('boki-past-', 'boki-'))) return true;
    if (qId.startsWith('boki-') && bms.includes(qId.replace('boki-', 'boki-past-'))) return true;
    return false;
  }

  // 4. モード切り替え（すべての問題 / ブックマークのみ）
  let currentPracticeMode = 'all';
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  const bookmarkEmptyMsg = document.getElementById('bookmarkEmptyMsg');

  function updateModeUI() {
    bookmarks = getStoredBookmarks();
    const bookmarkedPool = questionPool.filter(q => isItemBookmarked(q, getItemQid(q)));

    let bmSection = document.getElementById('bookmarkQuestionsSection');
    if (!bmSection) {
      bmSection = document.createElement('div');
      bmSection.id = 'bookmarkQuestionsSection';
      wizardSection.parentNode.insertBefore(bmSection, wizardSection.nextSibling);
    }

    if (currentPracticeMode === 'bookmark') {
      wizardSection.style.display = 'none';
      quizPlaySection.style.display = 'none';
      if (resultSection) resultSection.style.display = 'none';
      if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'none';
      bmSection.style.display = 'block';

      renderBookmarkQuestionsList(bmSection, bookmarkedPool);
    } else {
      bmSection.style.display = 'none';
      quizPlaySection.style.display = 'none';
      if (bookmarkEmptyMsg) bookmarkEmptyMsg.style.display = 'none';
      wizardSection.style.display = 'block';
      validateButtons();
    }
  }

  // ブックマーク一覧描画
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

    const headerBar = document.createElement('div');
    headerBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:20px; margin-bottom:12px; padding:12px 18px; background:#edf4f0; border:1px solid #c6e6d4; border-radius:8px;';
    headerBar.innerHTML = `
      <div style="font-size:0.95rem; color:#254337; font-weight:bold;">
        <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク保存中の問題: ${total} 問
      </div>
      <button type="button" id="printBookmarkBtn" class="btn" style="background:#38a169; color:white; border:none; padding:8px 18px; border-radius:6px; font-weight:bold; font-size:0.92rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <i class="fas fa-print"></i> ブックマークした問題をプリントアウトする
      </button>
    `;
    bmSection.appendChild(headerBar);

    const bmPrintBtn = headerBar.querySelector('#printBookmarkBtn');
    if (bmPrintBtn) {
      bmPrintBtn.addEventListener('click', () => {
        openPrintWindow(questions, `${gradeTitle} ブックマーク復習問題`);
      });
    }

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
    cardsContainer.className = 'questions-list-container';
    bmSection.appendChild(cardsContainer);

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
          bmAnsweredCount++;

          const selectedVal = opt.getAttribute('data-value');
          const isCorrect = (selectedVal === item.correct);
          if (isCorrect) bmCorrectCount++;

          optEls.forEach(o => {
            o.classList.add('locked');
            if (o.getAttribute('data-value') === item.correct) {
              o.classList.add('correct-choice');
            }
          });

          expArea.classList.remove('is-correct', 'is-wrong');
          if (isCorrect) {
            opt.classList.add('correct-choice');
            resTitle.innerHTML = '<span style="color:#2f855a; font-weight:bold; font-size:1.15rem;"><i class="fas fa-check-circle"></i> 正解！</span>';
            expArea.classList.add('is-correct');
          } else {
            opt.classList.add('wrong-choice');
            resTitle.innerHTML = `<span style="color:#c53030; font-weight:bold; font-size:1.15rem;"><i class="fas fa-times-circle"></i> 不正解... （正解：${item.correct}）</span>`;
            expArea.classList.add('is-wrong');
          }

          expArea.style.display = 'block';
          updateBmProgress();
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

  // 5. ランダム出題開始
  let currentActiveQuestions = [];
  let currentIndex = 0;
  let correctCount = 0;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  if (startBtn && questionPool) {
    startBtn.addEventListener('click', () => {
      const selectedCats = Array.from(specificCatCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      let candidatePool = questionPool.filter(q => selectedCats.includes(q.catKey));

      if (candidatePool.length === 0) {
        alert('選択された分野の問題が見つかりませんでした。別の分野を選択してください。');
        return;
      }

      const shuffled = shuffle(candidatePool);
      currentActiveQuestions = shuffled.slice(0, Math.min(selectedCount, shuffled.length));
      currentIndex = 0;
      correctCount = 0;

      // 画面の切り替え（モード切替タブとウィザードを隠し、演習画面のみ表示）
      const modeSwitchContainer = document.querySelector('.mode-switch-container');
      if (modeSwitchContainer) modeSwitchContainer.style.display = 'none';
      wizardSection.style.display = 'none';
      if (resultSection) resultSection.style.display = 'none';
      quizPlaySection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      renderCurrentQuestion();
    });
  }

  // 6. 印刷・PDF出力ボタン
  if (printBtn && questionPool) {
    printBtn.addEventListener('click', () => {
      const selectedCats = Array.from(specificCatCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      let candidatePool = questionPool.filter(q => selectedCats.includes(q.catKey));
      if (candidatePool.length === 0) candidatePool = questionPool;

      const shuffled = shuffle(candidatePool);
      const printQuestions = shuffled.slice(0, Math.min(selectedCount, shuffled.length));

      openPrintWindow(printQuestions, `${gradeTitle} 練習問題`);
    });
  }

  // 7. 1問ずつ表示するレンダリング関数
  function renderCurrentQuestion() {
    quizCardsContainer.innerHTML = '';

    if (currentIndex >= currentActiveQuestions.length) {
      showCompletionCard();
      return;
    }

    const item = currentActiveQuestions[currentIndex];
    const total = currentActiveQuestions.length;
    const qNum = currentIndex + 1;

    updatePlayProgress(currentIndex, total);

    const qId = getItemQid(item);
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.setAttribute('data-qid', qId);

    const isBookmarked = isItemBookmarked(item, qId);

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
        <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}" id="currentBookmarkBtn">
          <i class="${isBookmarked ? 'fas' : 'far'} fa-star"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
        </button>
      </div>

      <div class="quiz-question-text">${item.text}</div>
      <div class="quiz-options">${optionsHtml}</div>

      <div class="quiz-explanation-area" style="display:none;" id="currentExplanationArea">
        <div class="quiz-result-title" id="currentResultTitle"></div>
        <div class="quiz-explanation-body" style="padding:15px; background:#f7fafc; border-radius:6px; margin:15px 0;">
          ${item.explanation}
        </div>
        <div style="text-align:right; margin-top:15px;">
          <button type="button" class="btn next-question-btn" id="nextQuestionBtn" style="background:#345d4d; color:white; padding:10px 24px; font-weight:bold; font-size:1rem; border-radius:9999px; border:none; cursor:pointer;">
            ${currentIndex + 1 === total ? '結果を見る <i class="fas fa-check-circle"></i>' : '次の問題へ <i class="fas fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    quizCardsContainer.appendChild(card);

    let answered = false;
    const optEls = card.querySelectorAll('.quiz-option');
    const expArea = card.querySelector('#currentExplanationArea');
    const resTitle = card.querySelector('#currentResultTitle');
    const nextBtn = card.querySelector('#nextQuestionBtn');

    optEls.forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const selectedVal = opt.getAttribute('data-value');
        const isCorrect = (selectedVal === item.correct);
        if (isCorrect) correctCount++;

        optEls.forEach(o => {
          o.classList.add('locked');
          if (o.getAttribute('data-value') === item.correct) {
            o.classList.add('correct-choice');
          }
        });

        expArea.classList.remove('is-correct', 'is-wrong');
        if (isCorrect) {
          opt.classList.add('correct-choice');
          resTitle.innerHTML = '<span style="color:#2f855a; font-weight:bold; font-size:1.15rem;"><i class="fas fa-check-circle"></i> 正解！</span>';
          expArea.classList.add('is-correct');
        } else {
          opt.classList.add('wrong-choice');
          resTitle.innerHTML = `<span style="color:#c53030; font-weight:bold; font-size:1.15rem;"><i class="fas fa-times-circle"></i> 不正解... （正解：${item.correct}）</span>`;
          expArea.classList.add('is-wrong');
        }

        expArea.style.display = 'block';
      });
    });

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      renderCurrentQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const bmBtn = card.querySelector('#currentBookmarkBtn');
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
  }

  function updatePlayProgress(done, total) {
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
        結果: <strong>${correctCount} / ${total} 問正解</strong>（正答率: <span style="color:${accuracy >= 70 ? '#38a169' : '#e53e3e'}; font-weight:bold;">${accuracy}%</span>）
      </p>
      <p style="color:#718096; font-size:1rem; max-width:600px; margin:0 auto 25px auto; line-height:1.6;">
        ${accuracy >= 70 ? '★ 合格基準（70%以上）をクリアしています！この調子で反復練習を続けましょう。' : '基礎の復習が必要です。間違えた問題やブックマークした問題を重点的に反復しましょう。'}
      </p>
      <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
        <button type="button" class="btn" id="restartWizardBtn" style="background:#345d4d; color:white; padding:12px 24px; font-size:1.05rem;"><i class="fas fa-redo"></i> 条件を変えてもう一度解く</button>
        <a href="past-questions.html" class="btn" style="background:#254337; color:white; padding:12px 24px; font-size:1.05rem;"><i class="fas fa-file-alt"></i> 過去問演習へ</a>
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

  // 8. 印刷ウィンドウ生成関数
  function openPrintWindow(questions, customTitle) {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const examTitle = customTitle || `${gradeTitle} 練習問題`;
    const total = questions.length;

    // 正解一覧表
    const answerTableRows = questions.map((q, idx) => `
      <tr>
        <td style="text-align:center; font-weight:bold; width:18%;">第 ${idx + 1} 問</td>
        <td>${q.catName || '簿記'}</td>
        <td style="text-align:center; font-weight:bold; color:#254337; font-size:1.1rem; width:22%;">${q.correct}</td>
      </tr>
    `).join('');

    // 問題編HTML生成
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

    // 解答解説編HTML生成
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
<title>${examTitle} プリント（全${total}問） | Shikakus</title>
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
    background: #345d4d;
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
    background: #254337;
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
      <div class="print-subtitle">Shikakus</div>
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
      <div class="print-subtitle">Shikakus ｜ 正解と詳細解説一覧</div>
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

  validateButtons();
});
