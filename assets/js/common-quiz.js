/**
 * 資格対策ドットコム - 共通クイズ・問題回答＆ブックマーク＆進捗管理スクリプト
 */
document.addEventListener('DOMContentLoaded', () => {
  const quizCards = document.querySelectorAll('.quiz-card');
  const bookmarkStorageKey = 'shikaku_bookmarks_v1';

  // ブックマーク一覧取得
  function getStoredBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(bookmarkStorageKey)) || [];
    } catch (e) {
      return [];
    }
  }

  // ブックマーク保存
  function saveStoredBookmarks(arr) {
    try {
      localStorage.setItem(bookmarkStorageKey, JSON.stringify(arr));
    } catch (e) {}
  }

  let bookmarks = getStoredBookmarks();

  // 進捗管理
  let answeredCount = 0;
  let correctCount = 0;
  const totalQuestions = quizCards.length;

  function updateProgress() {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill && text && totalQuestions > 0) {
      const pct = Math.round((answeredCount / totalQuestions) * 100);
      fill.style.width = `${pct}%`;
      const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
      text.innerHTML = `進捗: <strong>${answeredCount} / ${totalQuestions} 問</strong> (正答率: ${accuracy}%)`;
    }
  }

  updateProgress();

  quizCards.forEach(card => {
    const qId = card.getAttribute('data-qid');
    const options = card.querySelectorAll('.quiz-option');
    const answerBtn = card.querySelector('.quiz-answer-btn');
    const explanationArea = card.querySelector('.quiz-explanation-area');
    const correctAnswer = card.getAttribute('data-answer');
    const bookmarkBtn = card.querySelector('.bookmark-toggle-btn');

    // ブックマーク状態の初期化
    if (bookmarkBtn && qId) {
      if (bookmarks.includes(qId)) {
        bookmarkBtn.classList.add('is-bookmarked');
        bookmarkBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
      } else {
        bookmarkBtn.classList.remove('is-bookmarked');
        bookmarkBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
      }

      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bookmarks = getStoredBookmarks();
        if (bookmarks.includes(qId)) {
          bookmarks = bookmarks.filter(id => id !== qId);
          bookmarkBtn.classList.remove('is-bookmarked');
          bookmarkBtn.innerHTML = '<i class="far fa-star"></i> ブックマーク';
        } else {
          bookmarks.push(qId);
          bookmarkBtn.classList.add('is-bookmarked');
          bookmarkBtn.innerHTML = '<i class="fas fa-star"></i> ブックマーク中';
        }
        saveStoredBookmarks(bookmarks);

        // ブックマークフィルターがONの場合は表示更新
        const activeTab = document.querySelector('.mode-switch-btn.active');
        if (activeTab && activeTab.getAttribute('data-mode') === 'bookmark') {
          if (document.querySelectorAll('.session-btn').length > 0 || document.querySelectorAll('.cat-filter-btn').length > 0) {
            applyCombinedFilter();
          } else {
            filterQuestions('bookmark');
          }
        }
      });
    }

    let selectedOption = null;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (card.classList.contains('answered')) return;
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedOption = opt.getAttribute('data-value');
        if (answerBtn) {
          answerBtn.removeAttribute('disabled');
        }
      });
    });

    if (answerBtn) {
      answerBtn.addEventListener('click', () => {
        if (!selectedOption || card.classList.contains('answered')) return;
        card.classList.add('answered');
        answerBtn.setAttribute('disabled', 'true');
        answerBtn.style.display = 'none';

        const isCorrect = (selectedOption === correctAnswer);
        if (explanationArea) {
          // Temporarily add is-correct so updateProgress can count it before displaying
          if (isCorrect) explanationArea.classList.add('is-correct');
          else explanationArea.classList.add('is-wrong');
        }
        updateProgress();

        if (explanationArea) {
          explanationArea.style.display = 'block';
          if (isCorrect) {
            explanationArea.classList.add('is-correct');
            explanationArea.querySelector('.quiz-result-title').innerHTML = '<i class="fas fa-check-circle"></i> 正解！';
          } else {
            explanationArea.classList.add('is-wrong');
            explanationArea.querySelector('.quiz-result-title').innerHTML = `<i class="fas fa-times-circle"></i> 不正解... （正解: ${correctAnswer}）`;
          }
        }
      });
    }
  });

  // モード切り替え（トレーニング / ブックマークのみ）
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  function filterQuestions(mode) {
    const currentBookmarks = getStoredBookmarks();
    let visibleCount = 0;

    quizCards.forEach(card => {
      const qId = card.getAttribute('data-qid');
      if (mode === 'bookmark') {
        if (currentBookmarks.includes(qId)) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      } else {
        // 通常のトレーニングモード（全問表示）
        card.style.display = 'block';
        visibleCount++;
      }
    });

    const emptyMsg = document.getElementById('bookmarkEmptyMsg');
    if (emptyMsg) {
      if (mode === 'bookmark' && visibleCount === 0) {
        emptyMsg.style.display = 'block';
      } else {
        emptyMsg.style.display = 'none';
      }
    }
    updateProgress();
  }

  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (document.querySelectorAll('.session-btn').length > 0 || document.querySelectorAll('.cat-filter-btn').length > 0) {
        applyCombinedFilter();
      } else {
        const mode = btn.getAttribute('data-mode');
        filterQuestions(mode);
      }
    });
  });

  // 過去問: 実施回セレクター切り替え
  const sessionBtns = document.querySelectorAll('.session-btn');
  if (sessionBtns.length > 0) {
    sessionBtns.forEach(sBtn => {
      sBtn.addEventListener('click', () => {
        sessionBtns.forEach(b => b.classList.remove('active'));
        sBtn.classList.add('active');
        applyCombinedFilter();
      });
    });
  }

  // 6大分野フィルター切り替え
  const catFilterBtns = document.querySelectorAll('.cat-filter-btn');
  if (catFilterBtns.length > 0) {
    catFilterBtns.forEach(cBtn => {
      cBtn.addEventListener('click', () => {
        catFilterBtns.forEach(b => b.classList.remove('active'));
        cBtn.classList.add('active');
        applyCombinedFilter();
      });
    });
  }

  // 実施回・分野・ブックマークの連動フィルタリング
  function applyCombinedFilter() {
    const activeSessionBtn = document.querySelector('.session-btn.active');
    const targetSession = activeSessionBtn ? (activeSessionBtn.getAttribute('data-session') || activeSessionBtn.getAttribute('data-exam')) : 'all';

    const activeCatBtn = document.querySelector('.cat-filter-btn.active');
    const targetCat = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';

    const activeModeBtn = document.querySelector('.mode-switch-btn.active');
    const targetMode = activeModeBtn ? activeModeBtn.getAttribute('data-mode') : 'all';
    const currentBookmarks = getStoredBookmarks();

    let visibleCount = 0;

    quizCards.forEach(card => {
      const cardSession = card.getAttribute('data-session') || card.getAttribute('data-exam');
      const cardCat = card.getAttribute('data-cat');
      const qId = card.getAttribute('data-qid');

      const matchSession = (targetSession === 'all' || cardSession === targetSession);
      const matchCat = (targetCat === 'all' || cardCat === targetCat);
      const matchMode = (targetMode !== 'bookmark' || currentBookmarks.includes(qId));

      if (matchSession && matchCat && matchMode) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyMsg = document.getElementById('bookmarkEmptyMsg');
    if (emptyMsg) {
      if (targetMode === 'bookmark' && visibleCount === 0) {
        emptyMsg.style.display = 'block';
      } else {
        emptyMsg.style.display = 'none';
      }
    }
    updateProgress();
  }
});

