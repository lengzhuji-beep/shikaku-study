/**
 * Shikakus - FP3級（ファイナンシャル・プランナー） 過去問演習レンダラー
 * TOEIC統一UI（1問1答 / 本番テスト / 印刷 / スクロール追従タイマー / ブックマーク一覧）完全準拠
 */
(function () {
  'use strict';

  const GRADE_KEY = 'fp3';
  const GRADE_TITLE = 'FP3級（ファイナンシャル・プランナー）';
  const DEFAULT_EXAM_MINUTES = 120;
  const POINT_PER_QUESTION = 1;
  const PASS_SCORE = 36;
  const MAX_SCORE = 60;
  const DEFAULT_SESSION = '2024-01';

  const STORAGE_KEY_BM = 'shikaku_bookmarks_v1';

  let currentSession = DEFAULT_SESSION;
  let sessionQuestions = [];
  let userAnswers = {}; // 本番テスト用
  let practiceUserAnswers = {}; // 1問1答用
  let bookmarkedQids = new Set();
  let examMode = 'practice'; // 'practice' or 'exam'
  let isExamStarted = false;
  let isPracticeStarted = false;
  let isExamSubmitted = false;

  let currentActiveTab = 'main'; // 'main' or 'bookmark'
  let practiceCurrentIndex = 0;
  let bmUserAnswers = {};

  let customDurationMinutes = DEFAULT_EXAM_MINUTES;
  let timeRemaining = DEFAULT_EXAM_MINUTES * 60;
  let timerInterval = null;
  let isTimerRunning = false;

  let reviewFilter = 'all';

  function getPastDataDict() {
    if (GRADE_KEY === 'fp3') return window.FP3_PAST_DATA || {};
    if (GRADE_KEY === 'fp2') return window.FP2_PAST_DATA || {};
    if (GRADE_KEY === 'fp1') return window.FP1_PAST_DATA || {};
    return {};
  }

  function init() {
    loadBookmarks();
    setupTopTabEvents();
    setupSessionSelector();

    const activeBtn = document.querySelector('.session-btn.active');
    if (activeBtn) {
      currentSession = activeBtn.getAttribute('data-session') || DEFAULT_SESSION;
    }

    loadSessionData(currentSession);
  }

  function cleanHtml(html) {
    if (!html) return '';
    return html.replace(/\.\.\/\.\.\/assets\//g, '../assets/');
  }

  function loadBookmarks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BM);
      if (saved) {
        bookmarkedQids = new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load bookmarks', e);
    }
  }

  function saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEY_BM, JSON.stringify(Array.from(bookmarkedQids)));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }

  function getItemQid(item) {
    if (item.qid) return item.qid;
    const sId = item.sessionId || currentSession;
    return `${GRADE_KEY}-past-${sId}-${item.num || '0'}`;
  }

  function isItemBookmarked(item) {
    const qId = getItemQid(item);
    if (bookmarkedQids.has(qId)) return true;
    if (qId.startsWith(`${GRADE_KEY}-past-`) && bookmarkedQids.has(qId.replace(`${GRADE_KEY}-past-`, `${GRADE_KEY}-`))) return true;
    if (qId.startsWith(`${GRADE_KEY}-`) && bookmarkedQids.has(qId.replace(`${GRADE_KEY}-`, `${GRADE_KEY}-past-`))) return true;
    return false;
  }

  function toggleBookmark(item, btnEl) {
    const qId = getItemQid(item);
    const nowBookmarked = !isItemBookmarked(item);

    if (nowBookmarked) {
      bookmarkedQids.add(qId);
    } else {
      bookmarkedQids.delete(qId);
      bookmarkedQids.delete(qId.replace(`${GRADE_KEY}-past-`, `${GRADE_KEY}-`));
    }
    saveBookmarks();

    if (btnEl) {
      if (nowBookmarked) {
        btnEl.classList.add('is-bookmarked');
        btnEl.innerHTML = '<i class="fas fa-star" style="color:#ecc94b; margin-right:4px;"></i> ブックマーク中';
      } else {
        btnEl.classList.remove('is-bookmarked');
        btnEl.innerHTML = '<i class="far fa-star" style="margin-right:4px;"></i> ブックマーク';
      }
    }

    if (currentActiveTab === 'bookmark') {
      renderBookmarkView();
    }
  }

  function getSessionTitle(sId) {
    const activeBtn = document.querySelector(`.session-btn[data-session="${sId}"]`);
    if (activeBtn) {
      const nameEl = activeBtn.querySelector('.session-name');
      if (nameEl) return nameEl.textContent.trim();
    }
    return `${sId} 実施試験`;
  }

  function loadSessionData(sId) {
    currentSession = sId;
    const dict = getPastDataDict();
    if (sId === 'all') {
      sessionQuestions = [];
      for (const k of Object.keys(dict)) {
        const arr = dict[k].map(q => ({ ...q, sessionId: k }));
        sessionQuestions.push(...arr);
      }
    } else {
      sessionQuestions = (dict[sId] || []).map(q => ({ ...q, sessionId: sId }));
    }

    userAnswers = {};
    practiceUserAnswers = {};
    practiceCurrentIndex = 0;
    isExamStarted = false;
    isPracticeStarted = false;
    isExamSubmitted = false;
    timeRemaining = customDurationMinutes * 60;
    stopTimer();

    renderMainView();
  }

  function setupTopTabEvents() {
    const tabMain = document.getElementById('tabMainExam') || document.querySelector('.mode-switch-btn[data-mode="all"]');
    const tabBm = document.getElementById('tabBookmark') || document.querySelector('.mode-switch-btn[data-mode="bookmark"]');
    const selectorCard = document.querySelector('.session-selector-card');
    const quizContainer = document.getElementById('pastQuestionsContainer');
    const bmContainer = document.getElementById('fpBookmarkContainer');

    if (tabMain) {
      tabMain.addEventListener('click', (e) => {
        e.preventDefault();
        currentActiveTab = 'main';
        tabMain.classList.add('active');
        if (tabBm) tabBm.classList.remove('active');

        if (selectorCard) selectorCard.style.display = 'block';
        if (quizContainer) quizContainer.style.display = 'block';
        if (bmContainer) bmContainer.style.display = 'none';

        renderMainView();
      });
    }

    if (tabBm) {
      tabBm.addEventListener('click', (e) => {
        e.preventDefault();
        currentActiveTab = 'bookmark';
        tabBm.classList.add('active');
        if (tabMain) tabMain.classList.remove('active');

        if (selectorCard) selectorCard.style.display = 'none';
        if (quizContainer) quizContainer.style.display = 'none';
        if (bmContainer) {
          bmContainer.style.display = 'block';
          renderBookmarkView();
        }
      });
    }
  }

  function setupSessionSelector() {
    const sessionBtns = document.querySelectorAll('.session-btn');
    sessionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sessionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sId = btn.getAttribute('data-session') || DEFAULT_SESSION;
        loadSessionData(sId);
        const quizContainer = document.getElementById('pastQuestionsContainer');
        if (quizContainer) {
          quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function normalizeOptValue(optText, index) {
    const m = optText.match(/^\((\d+)\)/);
    if (m) return `(${m[1]})`;
    return `(${index + 1})`;
  }

  function renderMainView() {
    const container = document.getElementById('pastQuestionsContainer');
    if (!container) return;
    container.innerHTML = '';

    const sessionTitle = getSessionTitle(currentSession);
    const totalCount = sessionQuestions.length;

    // 1. 上部コントロールバー（TOEIC統一）
    const controlBar = document.createElement('div');
    controlBar.className = 'exam-control-bar';
    controlBar.style.cssText = `
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    controlBar.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 0.82rem; font-weight: bold; color: #345d4d; background: #e8f5e9; padding: 3px 8px; border-radius: 4px; margin-right: 8px;">
            ${GRADE_TITLE}
          </span>
          <h2 style="display: inline; font-size: 1.2rem; font-weight: 700; color: #2d3748; margin: 0;">
            ${sessionTitle} <span style="font-size: 0.95rem; color: #718096; font-weight: normal;">(全${totalCount}問)</span>
          </h2>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div class="exam-mode-pills" style="display: inline-flex; background: #edf2f7; padding: 4px; border-radius: 30px;">
            <button type="button" id="pillModePractice" class="mode-pill-btn ${examMode === 'practice' ? 'active' : ''}" style="border:none; padding:6px 16px; border-radius:24px; font-size:0.88rem; font-weight:bold; cursor:pointer; background:${examMode === 'practice' ? '#2e7d32' : 'transparent'}; color:${examMode === 'practice' ? '#fff' : '#4a5568'}; transition:0.2s;">
              <i class="fas fa-bolt"></i> 1問1答
            </button>
            <button type="button" id="pillModeExam" class="mode-pill-btn ${examMode === 'exam' ? 'active' : ''}" style="border:none; padding:6px 16px; border-radius:24px; font-size:0.88rem; font-weight:bold; cursor:pointer; background:${examMode === 'exam' ? '#2e7d32' : 'transparent'}; color:${examMode === 'exam' ? '#fff' : '#4a5568'}; transition:0.2s;">
              <i class="fas fa-stopwatch"></i> 本番テストモード
            </button>
            <button type="button" id="pillPrintExam" class="mode-pill-btn" style="border:none; padding:6px 16px; border-radius:24px; font-size:0.88rem; font-weight:bold; cursor:pointer; background:transparent; color:#4a5568; transition:0.2s;">
              <i class="fas fa-print"></i> 模試を印刷
            </button>
          </div>

          <button type="button" id="btnAbortExam" style="background:#fff; border:1px solid #cbd5e0; color:#e53e3e; font-size:0.85rem; font-weight:bold; padding:6px 14px; border-radius:6px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:0.2s;">
            <i class="fas fa-times-circle"></i> 中断する
          </button>
        </div>
      </div>

      <!-- スクロール追従タイマー（本番テストかつ試験中） -->
      <div id="stickyTimerBar" style="display:${examMode === 'exam' && isExamStarted && !isExamSubmitted ? 'flex' : 'none'}; justify-content:space-between; align-items:center; background:#2d3748; color:white; padding:8px 16px; border-radius:8px; font-weight:bold;">
        <div style="display:flex; align-items:center; gap:8px;">
          <i class="fas fa-clock" style="color:#ecc94b;"></i>
          <span>残り時間: <span id="examTimerDisplay" style="font-size:1.15rem; font-family:monospace; color:#ecc94b;">--:--</span></span>
        </div>
        <div style="font-size:0.85rem; color:#cbd5e0;">
          解答進捗: <span id="answeredCounter">0</span> / ${totalCount}問
        </div>
      </div>
    `;

    container.appendChild(controlBar);

    controlBar.querySelector('#pillModePractice').addEventListener('click', () => {
      examMode = 'practice';
      stopTimer();
      renderMainView();
    });
    controlBar.querySelector('#pillModeExam').addEventListener('click', () => {
      examMode = 'exam';
      renderMainView();
    });
    controlBar.querySelector('#pillPrintExam').addEventListener('click', () => {
      openPrintPreview();
    });
    controlBar.querySelector('#btnAbortExam').addEventListener('click', () => {
      if (confirm('演習を中断してトップに戻りますか？')) {
        stopTimer();
        userAnswers = {};
        practiceUserAnswers = {};
        isExamStarted = false;
        isPracticeStarted = false;
        isExamSubmitted = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderMainView();
      }
    });

    if (totalCount === 0) {
      const emptyCard = document.createElement('div');
      emptyCard.className = 'card';
      emptyCard.style.cssText = 'text-align:center; padding:40px; color:#718096;';
      emptyCard.innerHTML = `
        <i class="fas fa-inbox" style="font-size:2.5rem; margin-bottom:12px; color:#cbd5e0;"></i>
        <p>この試験実施回の問題データは現在準備中です。他の回を選択してください。</p>
      `;
      container.appendChild(emptyCard);
      return;
    }

    if (examMode === 'practice') {
      renderPracticeMode(container);
    } else {
      if (!isExamStarted) {
        renderExamStartCard(container);
      } else if (!isExamSubmitted) {
        renderExamQuestions(container);
      } else {
        renderExamResult(container);
      }
    }
  }

  /**
   * 1問1答モード
   */
  function renderPracticeMode(container) {
    const total = sessionQuestions.length;
    if (practiceCurrentIndex >= total) practiceCurrentIndex = 0;
    const item = sessionQuestions[practiceCurrentIndex];
    const qNum = practiceCurrentIndex + 1;
    const isBookmarked = isItemBookmarked(item);

    const answeredVal = practiceUserAnswers[practiceCurrentIndex];
    const isAnswered = answeredVal !== undefined;

    const catName = item.catName || 'FP共通';
    const catClass = item.catClass || 'badge-cat-life';

    const card = document.createElement('div');
    card.className = 'quiz-card single-quiz-card';
    card.style.cssText = 'background:white; border-radius:12px; border:1px solid #e2e8f0; padding:25px; box-shadow:0 4px 15px rgba(0,0,0,0.05); margin-bottom:25px;';

    let optionsHtml = '';
    (item.options || []).forEach((opt, idx) => {
      const optVal = normalizeOptValue(opt, idx);
      let optClass = 'quiz-option';
      if (isAnswered) {
        if (optVal === item.answer) {
          optClass += ' option-correct';
        } else if (optVal === answeredVal) {
          optClass += ' option-wrong';
        }
      }
      optionsHtml += `
        <div class="${optClass}" data-value="${optVal}" style="border:2px solid ${isAnswered && optVal === item.answer ? '#48bb78' : (isAnswered && optVal === answeredVal ? '#f56565' : '#e2e8f0')}; border-radius:8px; padding:12px 16px; margin-bottom:10px; cursor:${isAnswered ? 'default' : 'pointer'}; background:${isAnswered && optVal === item.answer ? '#f0fff4' : (isAnswered && optVal === answeredVal ? '#fff5f5' : '#fff')}; transition:0.2s;">
          ${cleanHtml(opt)}
        </div>
      `;
    });

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="background:#edf4f0; color:#254337; font-weight:bold; font-size:0.9rem; padding:4px 12px; border-radius:6px;">
            第 ${item.num || qNum} 問 / 全 ${total} 問
          </span>
          <span class="shikaku-card-badge ${catClass}" style="font-size:0.82rem; padding:3px 8px; border-radius:4px;">
            ${catName}
          </span>
        </div>
        <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}" id="practiceBmBtn" style="background:none; border:1px solid #cbd5e0; padding:5px 12px; border-radius:6px; font-size:0.85rem; cursor:pointer; color:${isBookmarked ? '#ecc94b' : '#718096'}; font-weight:bold;">
          <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}" style="${isBookmarked ? 'color:#ecc94b;' : ''}"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
        </button>
      </div>

      <div style="font-size:1.05rem; line-height:1.75; color:#2d3748; margin-bottom:20px; font-weight:500;">
        ${cleanHtml(item.text || item.question)}
      </div>

      <div class="quiz-options-group" style="margin-bottom:20px;">
        ${optionsHtml}
      </div>

      <!-- 即時解説エリア -->
      <div id="practiceExplanation" style="display:${isAnswered ? 'block' : 'none'}; background:#f7fafc; border-left:4px solid #345d4d; padding:18px; border-radius:0 8px 8px 0; margin-top:20px;">
        <div style="font-size:1rem; font-weight:bold; color:${answeredVal === item.answer ? '#2e7d32' : '#e53e3e'}; margin-bottom:10px;">
          <i class="fas ${answeredVal === item.answer ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${answeredVal === item.answer ? '正解です！' : `不正解... 正解は ${item.answer} です`}
        </div>
        <div style="font-size:0.95rem; line-height:1.7; color:#4a5568;">
          <strong>【解答・解説】</strong><br>
          ${cleanHtml(item.explanation || '解説は準備中です。')}
        </div>
      </div>

      <!-- 前へ/次へ ナビゲーション -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:25px; pt-15; border-top:1px solid #e2e8f0; padding-top:18px;">
        <button type="button" id="prevQuestionBtn" ${practiceCurrentIndex === 0 ? 'disabled' : ''} style="background:#edf2f7; color:#4a5568; border:1px solid #cbd5e0; padding:8px 18px; border-radius:6px; font-weight:bold; cursor:${practiceCurrentIndex === 0 ? 'not-allowed' : 'pointer'}; opacity:${practiceCurrentIndex === 0 ? '0.5' : '1'}; display:inline-flex; align-items:center; gap:6px;">
          <i class="fas fa-chevron-left"></i> 前の問題
        </button>
        <span style="font-size:0.88rem; color:#718096;">${qNum} / ${total}</span>
        <button type="button" id="nextQuestionBtn" ${practiceCurrentIndex === total - 1 ? 'disabled' : ''} style="background:#2e7d32; color:white; border:none; padding:8px 22px; border-radius:6px; font-weight:bold; cursor:${practiceCurrentIndex === total - 1 ? 'not-allowed' : 'pointer'}; opacity:${practiceCurrentIndex === total - 1 ? '0.5' : '1'}; display:inline-flex; align-items:center; gap:6px;">
          次の問題 <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('#practiceBmBtn').addEventListener('click', (e) => {
      toggleBookmark(item, e.currentTarget);
    });

    if (!isAnswered) {
      card.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const val = opt.getAttribute('data-value');
          practiceUserAnswers[practiceCurrentIndex] = val;
          renderPracticeMode(container);
        });
      });
    }

    card.querySelector('#prevQuestionBtn').addEventListener('click', () => {
      if (practiceCurrentIndex > 0) {
        practiceCurrentIndex--;
        renderMainView();
      }
    });
    card.querySelector('#nextQuestionBtn').addEventListener('click', () => {
      if (practiceCurrentIndex < total - 1) {
        practiceCurrentIndex++;
        renderMainView();
      }
    });
  }

  /**
   * 本番テストモード - 開始待機画面
   */
  function renderExamStartCard(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'background:white; border-radius:12px; border:1px solid #e2e8f0; padding:35px; text-align:center; box-shadow:0 4px 15px rgba(0,0,0,0.05); margin-bottom:25px;';

    card.innerHTML = `
      <div style="width:70px; height:70px; background:#e8f5e9; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#2e7d32; font-size:2rem; margin-bottom:15px;">
        <i class="fas fa-stopwatch"></i>
      </div>
      <h3 style="font-size:1.35rem; color:#2d3748; margin-bottom:10px;">${GRADE_TITLE} 本番テストモード</h3>
      <p style="color:#718096; font-size:0.95rem; max-width:600px; margin:0 auto 25px; line-height:1.6;">
        本試験（標準${DEFAULT_EXAM_MINUTES}分、${PASS_SCORE}点以上合格/満点${MAX_SCORE}点）と同じ実戦形式で通し解答を行います。<br>
        制限時間のカウントダウンが作動し、提出後に総合得点と6大分野別分析を行います。
      </p>

      <div style="background:#f7fafc; border:1px solid #e2e8f0; border-radius:8px; padding:18px; max-width:480px; margin:0 auto 25px; text-align:left;">
        <label style="display:block; font-weight:bold; color:#4a5568; margin-bottom:8px; font-size:0.9rem;">
          <i class="fas fa-hourglass-half" style="color:#345d4d; margin-right:6px;"></i> 制限時間の設定:
        </label>
        <select id="examDurationSelect" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e0; font-size:1rem; font-weight:bold; color:#2d3748; background:white;">
          <option value="${DEFAULT_EXAM_MINUTES}" selected>${DEFAULT_EXAM_MINUTES}分（本番標準試験時間）</option>
          <option value="90">90分（実戦スピード演習）</option>
          <option value="60">60分（ハーフタイム演習）</option>
          <option value="30">30分（直前クイックチェック）</option>
          <option value="0">時間無制限（マイペース解答）</option>
        </select>
      </div>

      <button type="button" id="btnStartRealExam" style="background:#2e7d32; color:white; border:none; padding:14px 45px; border-radius:30px; font-size:1.1rem; font-weight:bold; cursor:pointer; box-shadow:0 4px 12px rgba(46,125,50,0.3); display:inline-flex; align-items:center; gap:10px; transition:0.2s;">
        <i class="fas fa-play"></i> テストを開始する
      </button>
    `;

    container.appendChild(card);

    card.querySelector('#btnStartRealExam').addEventListener('click', () => {
      const dur = parseInt(card.querySelector('#examDurationSelect').value, 10);
      customDurationMinutes = dur;
      timeRemaining = dur * 60;
      isExamStarted = true;
      isExamSubmitted = false;
      userAnswers = {};
      if (dur > 0) {
        startTimer();
      }
      renderMainView();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    });
  }

  /**
   * 本番テストモード - 全問マークシート通し解答
   */
  function renderExamQuestions(container) {
    const listWrapper = document.createElement('div');
    listWrapper.className = 'exam-questions-list';

    sessionQuestions.forEach((item, idx) => {
      const qNum = idx + 1;
      const isBookmarked = isItemBookmarked(item);
      const selectedVal = userAnswers[idx];

      const catName = item.catName || 'FP共通';
      const catClass = item.catClass || 'badge-cat-life';

      const qCard = document.createElement('div');
      qCard.className = 'quiz-card exam-qcard';
      qCard.id = `exam-question-${idx}`;
      qCard.style.cssText = 'background:white; border-radius:10px; border:1px solid #e2e8f0; padding:20px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.03);';

      let optionsHtml = '';
      (item.options || []).forEach((opt, oIdx) => {
        const optVal = normalizeOptValue(opt, oIdx);
        const isChecked = selectedVal === optVal;
        optionsHtml += `
          <label style="display:flex; align-items:flex-start; gap:10px; padding:10px 14px; border:1px solid ${isChecked ? '#2e7d32' : '#e2e8f0'}; background:${isChecked ? '#f0fff4' : '#fff'}; border-radius:8px; margin-bottom:8px; cursor:pointer; transition:0.15s;">
            <input type="radio" name="exam_q_${idx}" value="${optVal}" ${isChecked ? 'checked' : ''} style="margin-top:4px; accent-color:#2e7d32;">
            <span style="font-size:0.95rem; color:#2d3748; line-height:1.5;">
              ${cleanHtml(opt)}
            </span>
          </label>
        `;
      });

      qCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="background:#2d3748; color:white; font-size:0.85rem; font-weight:bold; padding:3px 10px; border-radius:4px;">
              第 ${item.num || qNum} 問
            </span>
            <span class="shikaku-card-badge ${catClass}" style="font-size:0.8rem; padding:2px 6px; border-radius:4px;">
              ${catName}
            </span>
          </div>
          <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}" style="background:none; border:none; color:${isBookmarked ? '#ecc94b' : '#a0aec0'}; cursor:pointer; font-size:0.85rem; display:inline-flex; align-items:center; gap:4px;">
            <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
          </button>
        </div>

        <div style="font-size:1rem; line-height:1.7; color:#2d3748; margin-bottom:16px; font-weight:500;">
          ${cleanHtml(item.text || item.question)}
        </div>

        <div class="exam-options-group">
          ${optionsHtml}
        </div>
      `;

      listWrapper.appendChild(qCard);

      qCard.querySelector('.bookmark-toggle-btn').addEventListener('click', (e) => {
        toggleBookmark(item, e.currentTarget);
      });

      qCard.querySelectorAll(`input[name="exam_q_${idx}"]`).forEach(radio => {
        radio.addEventListener('change', (e) => {
          userAnswers[idx] = e.target.value;
          updateAnsweredProgress();
        });
      });
    });

    container.appendChild(listWrapper);

    // 提出バー
    const submitBar = document.createElement('div');
    submitBar.style.cssText = `
      position: sticky;
      bottom: 20px;
      background: white;
      border: 2px solid #2e7d32;
      border-radius: 12px;
      padding: 16px 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      z-index: 90;
      margin-top: 30px;
    `;

    submitBar.innerHTML = `
      <div>
        <span style="font-size:0.95rem; color:#4a5568;">現在の解答数:</span>
        <strong id="barAnsweredCount" style="font-size:1.2rem; color:#2e7d32; margin-left:6px;">0</strong>
        <span style="color:#718096; font-size:0.9rem;"> / ${sessionQuestions.length} 問</span>
      </div>
      <button type="button" id="btnSubmitExam" style="background:#2e7d32; color:white; border:none; padding:12px 36px; border-radius:30px; font-size:1.05rem; font-weight:bold; cursor:pointer; box-shadow:0 4px 10px rgba(46,125,50,0.3); display:inline-flex; align-items:center; gap:8px;">
        <i class="fas fa-check-circle"></i> 解答を提出して採点する
      </button>
    `;

    container.appendChild(submitBar);

    submitBar.querySelector('#btnSubmitExam').addEventListener('click', () => {
      const answeredTotal = Object.keys(userAnswers).length;
      const total = sessionQuestions.length;
      if (answeredTotal < total) {
        if (!confirm(`未解答の問題が ${total - answeredTotal} 問あります。このまま採点しますか？`)) {
          return;
        }
      }
      stopTimer();
      isExamSubmitted = true;
      renderMainView();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    });

    updateAnsweredProgress();
  }

  function updateAnsweredProgress() {
    const answeredCount = Object.keys(userAnswers).length;
    const answeredCounter = document.getElementById('answeredCounter');
    if (answeredCounter) answeredCounter.textContent = answeredCount;
    const barAnsweredCount = document.getElementById('barAnsweredCount');
    if (barAnsweredCount) barAnsweredCount.textContent = answeredCount;
  }

  /**
   * 本番テストモード - リザルト採点画面
   */
  function renderExamResult(container) {
    const total = sessionQuestions.length;
    let correctCount = 0;

    // 6大分野集計
    const catStats = {};

    sessionQuestions.forEach((item, idx) => {
      const userVal = userAnswers[idx];
      const isCorrect = userVal === item.answer;
      if (isCorrect) correctCount++;

      const cName = item.catName || 'その他';
      if (!catStats[cName]) catStats[cName] = { total: 0, correct: 0 };
      catStats[cName].total++;
      if (isCorrect) catStats[cName].correct++;
    });

    const score = correctCount * POINT_PER_QUESTION;
    const isPassed = score >= PASS_SCORE;

    const resultCard = document.createElement('div');
    resultCard.className = 'card';
    resultCard.style.cssText = 'background:white; border-radius:12px; border:1px solid #e2e8f0; padding:30px; box-shadow:0 4px 15px rgba(0,0,0,0.05); margin-bottom:25px;';

    let catScoreHtml = '';
    for (const [cName, cData] of Object.entries(catStats)) {
      const cRate = cData.total > 0 ? Math.round((cData.correct / cData.total) * 100) : 0;
      catScoreHtml += `
        <div style="background:#f7fafc; border-radius:8px; padding:14px; border:1px solid #e2e8f0;">
          <div style="font-size:0.9rem; font-weight:bold; color:#4a5568; margin-bottom:6px;">${cName}</div>
          <div style="font-size:1.2rem; font-weight:bold; color:#2d3748;">
            ${cData.correct * POINT_PER_QUESTION}点 <span style="font-size:0.85rem; color:#718096; font-weight:normal;">(${cData.correct}/${cData.total}問 正解 ${cRate}%)</span>
          </div>
          <div style="background:#edf2f7; height:6px; border-radius:3px; margin-top:8px; overflow:hidden;">
            <div style="background:${cRate >= 60 ? '#48bb78' : '#e53e3e'}; width:${cRate}%; height:100%;"></div>
          </div>
        </div>
      `;
    }

    resultCard.innerHTML = `
      <div style="text-align:center; padding-bottom:20px; border-bottom:1px solid #e2e8f0;">
        <span style="display:inline-block; padding:6px 18px; border-radius:30px; font-weight:bold; font-size:1rem; margin-bottom:12px; background:${isPassed ? '#e8f5e9' : '#ffebee'}; color:${isPassed ? '#2e7d32' : '#c62828'};">
          <i class="fas ${isPassed ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${isPassed ? '合格基準到達（合格判定）' : '不合格（再挑戦推奨）'}
        </span>
        <h2 style="font-size:1.8rem; color:#2d3748; margin:0 0 10px;">総合得点: ${score} / ${MAX_SCORE} 点</h2>
        <p style="color:#718096; font-size:0.95rem; margin:0;">
          正答数: <strong>${correctCount}</strong> / ${total} 問 (正答率: ${Math.round((correctCount / total) * 100)}%) ｜ 合格ライン: ${PASS_SCORE}点以上
        </p>
      </div>

      <div style="margin-top:20px;">
        <h4 style="font-size:1rem; color:#4a5568; margin-bottom:12px;"><i class="fas fa-chart-pie" style="color:#345d4d;"></i> 6大分野別スコア</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
          ${catScoreHtml}
        </div>
      </div>

      <div style="margin-top:25px; display:flex; justify-content:center; gap:15px; flex-wrap:wrap;">
        <button type="button" id="btnRetakeExam" style="background:#edf2f7; color:#4a5568; border:1px solid #cbd5e0; padding:10px 22px; border-radius:6px; font-weight:bold; cursor:pointer;">
          <i class="fas fa-redo"></i> もう一度解く
        </button>
        <button type="button" id="btnFilterReviewAll" style="background:#2e7d32; color:white; border:none; padding:10px 22px; border-radius:6px; font-weight:bold; cursor:pointer;">
          全問の解答・解説を見る
        </button>
        <button type="button" id="btnFilterReviewWrong" style="background:#e53e3e; color:white; border:none; padding:10px 22px; border-radius:6px; font-weight:bold; cursor:pointer;">
          間違えた問題のみ復習
        </button>
      </div>
    `;

    container.appendChild(resultCard);

    resultCard.querySelector('#btnRetakeExam').addEventListener('click', () => {
      userAnswers = {};
      isExamStarted = false;
      isExamSubmitted = false;
      renderMainView();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    });

    const reviewSection = document.createElement('div');
    reviewSection.id = 'examReviewSection';
    container.appendChild(reviewSection);

    resultCard.querySelector('#btnFilterReviewAll').addEventListener('click', () => {
      reviewFilter = 'all';
      renderReviewList(reviewSection);
    });

    resultCard.querySelector('#btnFilterReviewWrong').addEventListener('click', () => {
      reviewFilter = 'wrong';
      renderReviewList(reviewSection);
    });

    renderReviewList(reviewSection);
  }

  function renderReviewList(wrapper) {
    wrapper.innerHTML = '';
    const total = sessionQuestions.length;

    sessionQuestions.forEach((item, idx) => {
      const qNum = idx + 1;
      const userVal = userAnswers[idx];
      const isCorrect = userVal === item.answer;

      if (reviewFilter === 'wrong' && isCorrect) {
        return;
      }

      const isBookmarked = isItemBookmarked(item);
      const catName = item.catName || 'FP共通';

      const rCard = document.createElement('div');
      rCard.className = 'quiz-card review-qcard';
      rCard.style.cssText = `background:white; border-radius:10px; border:2px solid ${isCorrect ? '#48bb78' : '#f56565'}; padding:20px; margin-bottom:20px;`;

      let optsHtml = '';
      (item.options || []).forEach((opt, oIdx) => {
        const optVal = normalizeOptValue(opt, oIdx);
        let optBg = '#fff';
        let optBorder = '#e2e8f0';
        if (optVal === item.answer) {
          optBg = '#f0fff4';
          optBorder = '#48bb78';
        } else if (optVal === userVal) {
          optBg = '#fff5f5';
          optBorder = '#f56565';
        }

        optsHtml += `
          <div style="border:1px solid ${optBorder}; background:${optBg}; border-radius:6px; padding:10px 14px; margin-bottom:8px;">
            ${cleanHtml(opt)}
            ${optVal === item.answer ? '<span style="color:#2e7d32; font-weight:bold; margin-left:8px;"><i class="fas fa-check"></i> 正解</span>' : ''}
            ${optVal === userVal && !isCorrect ? '<span style="color:#e53e3e; font-weight:bold; margin-left:8px;"><i class="fas fa-times"></i> あなたの解答</span>' : ''}
          </div>
        `;
      });

      rCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="background:${isCorrect ? '#2e7d32' : '#e53e3e'}; color:white; font-size:0.85rem; font-weight:bold; padding:3px 10px; border-radius:4px;">
              第 ${item.num || qNum} 問: ${isCorrect ? '正解' : '不正解'}
            </span>
            <span style="font-size:0.85rem; color:#718096;">[${catName}] あなたの解答: ${userVal || '未解答'} / 正解: ${item.answer}</span>
          </div>
          <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked' : ''}" style="background:none; border:none; color:${isBookmarked ? '#ecc94b' : '#a0aec0'}; cursor:pointer; font-size:0.85rem; display:inline-flex; align-items:center; gap:4px;">
            <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}"></i> ${isBookmarked ? 'ブックマーク中' : 'ブックマーク'}
          </button>
        </div>

        <div style="font-size:1rem; line-height:1.7; color:#2d3748; margin-bottom:16px;">
          ${cleanHtml(item.text || item.question)}
        </div>

        <div style="margin-bottom:16px;">
          ${optsHtml}
        </div>

        <div style="background:#f7fafc; border-left:4px solid #345d4d; padding:14px; border-radius:0 6px 6px 0;">
          <strong style="color:#2d3748;">【解答・解説】</strong><br>
          <div style="font-size:0.92rem; color:#4a5568; line-height:1.7; margin-top:4px;">
            ${cleanHtml(item.explanation || '解説は準備中です。')}
          </div>
        </div>
      `;

      wrapper.appendChild(rCard);

      rCard.querySelector('.bookmark-toggle-btn').addEventListener('click', (e) => {
        toggleBookmark(item, e.currentTarget);
      });
    });
  }

  /**
   * タイマー制御
   */
  function startTimer() {
    stopTimer();
    isTimerRunning = true;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();

      if (timeRemaining <= 0) {
        stopTimer();
        alert('制限時間となりました。解答を提出します。');
        isExamSubmitted = true;
        renderMainView();
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isTimerRunning = false;
  }

  function updateTimerDisplay() {
    const el = document.getElementById('examTimerDisplay');
    if (!el) return;

    if (customDurationMinutes === 0) {
      el.textContent = '無制限';
      return;
    }

    const m = Math.floor(timeRemaining / 60);
    const s = timeRemaining % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  /**
   * 大タブ: ブックマーク一覧ビュー
   */
  function renderBookmarkView() {
    const bmContainer = document.getElementById('fpBookmarkContainer');
    if (!bmContainer) return;
    bmContainer.innerHTML = '';

    loadBookmarks();
    const dict = getPastDataDict();
    const allQs = [];
    for (const k of Object.keys(dict)) {
      const arr = dict[k].map(q => ({ ...q, sessionId: k }));
      allQs.push(...arr);
    }

    const bmList = allQs.filter(q => isItemBookmarked(q));

    const headerCard = document.createElement('div');
    headerCard.className = 'card';
    headerCard.style.cssText = 'background:white; border-radius:12px; border:1px solid #e2e8f0; padding:22px; margin-bottom:20px;';

    headerCard.innerHTML = `
      <div>
        <h2 style="font-size:1.25rem; color:#2d3748; margin:0;"><i class="fas fa-star" style="color:#ecc94b;"></i> ブックマークした過去問一覧</h2>
        <p style="font-size:0.88rem; color:#718096; margin:4px 0 0;">保存された重要・頻出問題をピンポイントで復習できます（全 ${bmList.length} 問）</p>
      </div>
    `;

    bmContainer.appendChild(headerCard);

    if (bmList.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'card';
      empty.style.cssText = 'background:white; border-radius:12px; border:1px solid #e2e8f0; padding:45px; text-align:center; color:#a0aec0;';
      empty.innerHTML = `
        <i class="far fa-star" style="font-size:3rem; margin-bottom:15px; color:#cbd5e0;"></i>
        <p style="font-size:1.05rem; color:#718096; margin-bottom:8px;">ブックマークされた問題はありません</p>
        <p style="font-size:0.88rem; color:#a0aec0; margin:0;">各問題の右上にある「ブックマーク」ボタンを押すとここに登録されます。</p>
      `;
      bmContainer.appendChild(empty);
      return;
    }

    bmList.forEach((item, idx) => {
      const qNum = idx + 1;
      const answeredVal = bmUserAnswers[item.num || idx];
      const isAnswered = answeredVal !== undefined;
      const catName = item.catName || 'FP共通';

      const bmCard = document.createElement('div');
      bmCard.className = 'quiz-card';
      bmCard.style.cssText = 'background:white; border-radius:10px; border:1px solid #e2e8f0; padding:20px; margin-bottom:18px; box-shadow:0 2px 8px rgba(0,0,0,0.03);';

      let optionsHtml = '';
      (item.options || []).forEach((opt, oIdx) => {
        const optVal = normalizeOptValue(opt, oIdx);
        let optBg = '#fff';
        let optBorder = '#e2e8f0';
        if (isAnswered) {
          if (optVal === item.answer) {
            optBg = '#f0fff4';
            optBorder = '#48bb78';
          } else if (optVal === answeredVal) {
            optBg = '#fff5f5';
            optBorder = '#f56565';
          }
        }
        optionsHtml += `
          <div class="bm-quiz-opt" data-value="${optVal}" style="border:1px solid ${optBorder}; background:${optBg}; border-radius:6px; padding:10px 14px; margin-bottom:8px; cursor:${isAnswered ? 'default' : 'pointer'};">
            ${cleanHtml(opt)}
          </div>
        `;
      });

      bmCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="background:#edf2f7; color:#2d3748; font-size:0.85rem; font-weight:bold; padding:3px 10px; border-radius:4px;">
              ${item.sessionId || '過去問'} 第 ${item.num || qNum} 問
            </span>
            <span style="font-size:0.82rem; color:#718096;">[${catName}]</span>
          </div>
          <button type="button" class="bookmark-toggle-btn is-bookmarked" style="background:none; border:1px solid #ecc94b; color:#ecc94b; padding:4px 10px; border-radius:6px; cursor:pointer; font-size:0.82rem; font-weight:bold;">
            <i class="fas fa-star"></i> 解除
          </button>
        </div>

        <div style="font-size:1rem; line-height:1.7; color:#2d3748; margin-bottom:16px;">
          ${cleanHtml(item.text || item.question)}
        </div>

        <div style="margin-bottom:16px;">
          ${optionsHtml}
        </div>

        <div class="bm-explanation" style="display:${isAnswered ? 'block' : 'none'}; background:#f7fafc; border-left:4px solid #345d4d; padding:14px; border-radius:0 6px 6px 0;">
          <div style="font-weight:bold; color:${answeredVal === item.answer ? '#2e7d32' : '#e53e3e'}; margin-bottom:6px;">
            ${answeredVal === item.answer ? '【正解】' : `【不正解】 正解: ${item.answer}`}
          </div>
          <div style="font-size:0.92rem; color:#4a5568; line-height:1.6;">
            ${cleanHtml(item.explanation || '解説は準備中です。')}
          </div>
        </div>
      `;

      bmContainer.appendChild(bmCard);

      bmCard.querySelector('.bookmark-toggle-btn').addEventListener('click', () => {
        toggleBookmark(item, null);
      });

      if (!isAnswered) {
        bmCard.querySelectorAll('.bm-quiz-opt').forEach(opt => {
          opt.addEventListener('click', () => {
            const val = opt.getAttribute('data-value');
            bmUserAnswers[item.num || idx] = val;
            renderBookmarkView();
          });
        });
      }
    });
  }

  /**
   * 別タブ印刷プレビュー
   */
  /**
   * 別タブ印刷プレビュー（4タブ：すべて・問題・解答・解説 完全連動）
   */
  function openPrintPreview() {
    const sessionTitle = getSessionTitle(currentSession);
    const questions = sessionQuestions;

    if (!questions || questions.length === 0) {
      alert('印刷対象の問題がありません。');
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定で許可してください。');
      return;
    }

    const examTitle = `${GRADE_TITLE} ${sessionTitle}`;

    let qHtml = '';
    let aRows = '';
    let expHtml = '';

    questions.forEach((q, idx) => {
      const qNum = q.num || (idx + 1);
      const catName = q.catName || 'FP';

      let optsHtml = '';
      (q.options || []).forEach(opt => {
        optsHtml += `<div style="margin-bottom:5px; font-size:0.92rem;">${cleanHtml(opt)}</div>`;
      });

      // 1. 問題
      qHtml += `
        <div class="print-q-item">
          <div class="print-q-top">
            <span class="print-q-num">【問 ${qNum}】 [${catName}]</span>
            <span class="print-q-ansbox">解答欄：[ &nbsp;&nbsp;&nbsp;&nbsp; ]</span>
          </div>
          <div class="print-q-body">${cleanHtml(q.text || q.question)}</div>
          <div class="print-q-options">${optsHtml}</div>
        </div>
      `;

      // 2. 解答表
      aRows += `
        <tr>
          <td style="text-align:center; font-weight:bold;">第 ${qNum} 問</td>
          <td>${catName}</td>
          <td style="text-align:center; font-weight:bold; color:#2e7d32; font-size:1.05rem;">(${q.answer})</td>
        </tr>
      `;

      // 3. 解説
      expHtml += `
        <div class="print-exp-item">
          <div class="print-exp-header">問 ${qNum}: 正解 (${q.answer}) <span>[${catName}]</span></div>
          <div class="print-exp-body">
            <strong>【解説】</strong><br>
            ${cleanHtml(q.explanation || '解説なし')}
          </div>
        </div>
      `;
    });

    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>${examTitle} - 印刷用プレビュー | Shikakus</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8fafc;
            color: #1a202c;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .print-control-bar {
            position: sticky;
            top: 0;
            background: white;
            border-bottom: 2px solid #345d4d;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            z-index: 1000;
          }
          .print-title-area {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .print-main-title {
            font-size: 1.05rem;
            font-weight: bold;
            color: #2d3748;
          }

          .print-tabs {
            display: inline-flex;
            background: #edf2f7;
            padding: 4px;
            border-radius: 30px;
          }
          .print-tab-btn {
            border: none;
            background: transparent;
            color: #4a5568;
            font-size: 0.88rem;
            font-weight: bold;
            padding: 6px 18px;
            border-radius: 20px;
            cursor: pointer;
            transition: 0.2s;
          }
          .print-tab-btn.active {
            background: #2e7d32;
            color: white;
            box-shadow: 0 2px 6px rgba(46,125,50,0.3);
          }

          .print-actions {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .btn-exec-print {
            background: #2e7d32;
            color: white;
            border: none;
            padding: 8px 22px;
            border-radius: 6px;
            font-size: 0.92rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(46,125,50,0.25);
          }
          .btn-close-print {
            background: #edf2f7;
            color: #4a5568;
            border: 1px solid #cbd5e0;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.88rem;
            font-weight: bold;
            cursor: pointer;
          }

          .print-container {
            max-width: 820px;
            margin: 24px auto 60px;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
          }

          .section-header {
            text-align: center;
            border-bottom: 2px solid #345d4d;
            padding-bottom: 12px;
            margin-bottom: 24px;
          }
          .section-header h1 {
            font-size: 1.3rem;
            margin: 0 0 6px;
            color: #1a202c;
          }
          .section-header .meta {
            font-size: 0.85rem;
            color: #718096;
          }

          .print-q-item {
            margin-bottom: 22px;
            page-break-inside: avoid;
            border-bottom: 1px solid #edf2f7;
            padding-bottom: 16px;
          }
          .print-q-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          .print-q-num {
            font-weight: bold;
            font-size: 0.95rem;
            color: #2d3748;
          }
          .print-q-ansbox {
            font-size: 0.85rem;
            color: #4a5568;
            border: 1px solid #cbd5e0;
            padding: 2px 10px;
            border-radius: 4px;
            background: #f7fafc;
          }
          .print-q-body {
            font-size: 0.95rem;
            line-height: 1.65;
            margin-bottom: 10px;
            color: #2d3748;
          }
          .print-q-options {
            margin-left: 10px;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .answer-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          .answer-table th, .answer-table td {
            border: 1px solid #cbd5e0;
            padding: 8px 12px;
            font-size: 0.88rem;
          }
          .answer-table th {
            background: #edf4f0;
            color: #254337;
            font-weight: bold;
          }

          .print-exp-item {
            margin-bottom: 20px;
            page-break-inside: avoid;
            border-bottom: 1px solid #edf2f7;
            padding-bottom: 14px;
          }
          .print-exp-header {
            font-weight: bold;
            font-size: 0.95rem;
            color: #2e7d32;
            margin-bottom: 6px;
          }
          .print-exp-body {
            font-size: 0.9rem;
            line-height: 1.65;
            color: #4a5568;
            background: #f7fafc;
            padding: 10px 14px;
            border-left: 3px solid #345d4d;
            border-radius: 0 6px 6px 0;
          }

          /* タブ切り替え制御（画面・印刷両対応） */
          body[data-print-mode="questions"] .print-section-answers,
          body[data-print-mode="questions"] .print-section-explanations {
            display: none !important;
          }
          body[data-print-mode="answers"] .print-section-questions,
          body[data-print-mode="answers"] .print-section-explanations {
            display: none !important;
          }
          body[data-print-mode="explanations"] .print-section-questions,
          body[data-print-mode="explanations"] .print-section-answers {
            display: none !important;
          }

          @media print {
            .print-control-bar { display: none !important; }
            body { background: white; }
            .print-container {
              max-width: 100%;
              margin: 0;
              padding: 0;
              border: none;
              box-shadow: none;
            }
            .page-break-before {
              page-break-before: always;
            }
          }
        </style>
      </head>
      <body data-print-mode="all">
        <div class="print-control-bar">
          <div class="print-title-area">
            <span class="print-main-title">${examTitle}</span>
          </div>

          <div class="print-tabs">
            <button type="button" class="print-tab-btn active" data-target-mode="all">すべて</button>
            <button type="button" class="print-tab-btn" data-target-mode="questions">問題</button>
            <button type="button" class="print-tab-btn" data-target-mode="answers">解答</button>
            <button type="button" class="print-tab-btn" data-target-mode="explanations">解説</button>
          </div>

          <div class="print-actions">
            <button type="button" class="btn-exec-print" onclick="window.print()">印刷する</button>
            <button type="button" class="btn-close-print" onclick="window.close()">閉じる</button>
          </div>
        </div>

        <div class="print-container">
          <!-- 問題セクション -->
          <div class="print-section-questions">
            <div class="section-header">
              <h1>${examTitle} - 問題用紙</h1>
              <div class="meta">全${questions.length}問 ｜ Shikakus 過去問プリント</div>
            </div>
            <div>
              ${qHtml}
            </div>
          </div>

          <!-- 解答一覧テーブルセクション -->
          <div class="print-section-answers page-break-before">
            <div class="section-header">
              <h1>${examTitle} - 正解一覧表</h1>
              <div class="meta">全${questions.length}問 ｜ Shikakus 過去問プリント</div>
            </div>
            <div>
              <table class="answer-table">
                <thead>
                  <tr>
                    <th style="width:15%;">問題番号</th>
                    <th>分野・科目</th>
                    <th style="width:25%;">正解</th>
                  </tr>
                </thead>
                <tbody>
                  ${aRows}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 解説セクション -->
          <div class="print-section-explanations page-break-before">
            <div class="section-header">
              <h1>${examTitle} - 正解・解答解説</h1>
              <div class="meta">全${questions.length}問 ｜ Shikakus 過去問プリント</div>
            </div>
            <div>
              ${expHtml}
            </div>
          </div>
        </div>

        <script>
          document.querySelectorAll('.print-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.print-tab-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              const mode = btn.getAttribute('data-target-mode');
              document.body.setAttribute('data-print-mode', mode);
            });
          });
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
