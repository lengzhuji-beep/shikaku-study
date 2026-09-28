/**
 * Shikakus - 日商簿記検定（3級・2級・1級）過去問・予想問題演習レンダラー
 * TOEIC統一UI（1問1答 / 本番テスト / 印刷 / スクロール追従タイマー / ブックマーク一覧）完全準拠
 */
(function () {
  'use strict';

  const gradeKey = window.BOKI_GRADE || (window.BOKI1_PAST_DATA || window.BOKI1_PAST_QUESTIONS ? '1kyu' : (window.BOKI2_PAST_DATA || window.BOKI2_PAST_QUESTIONS ? '2kyu' : '3kyu'));
  const gradeTitle = gradeKey === '1kyu' ? '日商簿記1級' : (gradeKey === '2kyu' ? '日商簿記2級' : '日商簿記3級');
  const docType = (gradeKey === '3kyu' || gradeKey === '2kyu' || gradeKey === '1kyu') ? '予想問題集' : '過去問演習';

  const STORAGE_KEY_BM = 'shikaku_bookmarks_v1';

  let currentSession = '1';
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

  // 基準時間（3級: 60分, 2級: 90分, 1級: 90分）
  const defaultMinutes = (gradeKey === '3kyu' ? 60 : 90);
  let customDurationMinutes = defaultMinutes;
  let timeRemaining = defaultMinutes * 60;
  let timerInterval = null;
  let isTimerRunning = false;

  let reviewFilter = 'all';

  function init() {
    loadBookmarks();
    setupTopTabEvents();
    setupSessionSelector();

    const activeBtn = document.querySelector('.session-btn.active');
    if (activeBtn) {
      currentSession = activeBtn.getAttribute('data-session') || '1';
    }
    loadSessionData(currentSession);
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
    return `boki-past-${gradeKey}-${item.sessionId || 'past'}-${item.num || item.id || 'q'}`;
  }

  function isItemBookmarked(item) {
    const qId = getItemQid(item);
    if (bookmarkedQids.has(qId)) return true;
    if (qId.startsWith('boki-past-') && bookmarkedQids.has(qId.replace('boki-past-', 'boki-'))) return true;
    if (qId.startsWith('boki-') && bookmarkedQids.has(qId.replace('boki-', 'boki-past-'))) return true;
    return false;
  }

  function getSessionTitle(sessionId) {
    const activeBtn = document.querySelector(`.session-btn[data-session="${sessionId}"]`);
    if (activeBtn) {
      const nameEl = activeBtn.querySelector('.session-name');
      if (nameEl) return nameEl.textContent.trim();
    }
    return `第${sessionId}回`;
  }

  function loadSessionData(sessionKey) {
    currentSession = sessionKey;
    const pastDict = (gradeKey === '2kyu' ? window.BOKI2_PAST_DATA : (gradeKey === '1kyu' ? window.BOKI1_PAST_DATA : window.BOKI3_PAST_DATA));
    const pastData = (gradeKey === '2kyu' ? window.BOKI2_PAST_QUESTIONS : (gradeKey === '1kyu' ? window.BOKI1_PAST_QUESTIONS : window.BOKI3_PAST_QUESTIONS)) || [];

    if (pastDict && pastDict[sessionKey] && pastDict[sessionKey].questions) {
      sessionQuestions = pastDict[sessionKey].questions;
    } else {
      let matched = pastData.filter(q => String(q.sessionId) === String(sessionKey));
      if (matched.length === 0) matched = pastData;
      sessionQuestions = matched;
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
    const bmContainer = document.getElementById('bokiBookmarkContainer');

    if (!tabMain || !tabBm) return;

    tabMain.addEventListener('click', () => {
      if (currentActiveTab === 'main') return;
      currentActiveTab = 'main';
      tabMain.classList.add('active');
      tabBm.classList.remove('active');

      if (selectorCard) selectorCard.style.display = 'block';
      if (quizContainer) quizContainer.style.display = 'block';
      if (bmContainer) bmContainer.style.display = 'none';
      renderMainView();
    });

    tabBm.addEventListener('click', () => {
      if (currentActiveTab === 'bookmark') return;

      if (examMode === 'exam' && isExamStarted && !isExamSubmitted) {
        if (!confirm('本番テストを中断してブックマーク復習へ移動しますか？（現在の回答データは破棄されます）')) {
          return;
        }
        stopTimer();
        isExamStarted = false;
        userAnswers = {};
      }

      currentActiveTab = 'bookmark';
      tabBm.classList.add('active');
      tabMain.classList.remove('active');

      if (selectorCard) selectorCard.style.display = 'none';
      if (quizContainer) quizContainer.style.display = 'none';
      if (bmContainer) bmContainer.style.display = 'block';

      bmUserAnswers = {};
      renderBookmarkSection();
    });
  }

  function setupSessionSelector() {
    const sessionBtns = document.querySelectorAll('.session-btn');
    sessionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sessionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sid = btn.getAttribute('data-session');
        loadSessionData(sid);
        const quizContainer = document.getElementById('pastQuestionsContainer');
        if (quizContainer) {
          quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function parseOptions(rawOptions) {
    if (!rawOptions) return [];
    return rawOptions.map((opt, idx) => {
      const valMatch = typeof opt === 'string' ? opt.match(/^\((\d+)\)/) : null;
      const key = valMatch ? `(${valMatch[1]})` : `(${idx + 1})`;
      const text = typeof opt === 'string' ? opt.replace(/^\(\d+\)\s*/, '') : String(opt);
      return { key, text };
    });
  }

  function renderMainView() {
    const container = document.getElementById('pastQuestionsContainer');
    if (!container) return;

    const isExamRunning = (examMode === 'exam' && isExamStarted && !isExamSubmitted);
    const sessionTitle = `${gradeTitle} ${docType}（${getSessionTitle(currentSession)}）`;

    container.innerHTML = `
      <!-- 上部コントロールバー（TOEIC共通スタイル） -->
      <div class="toeic-control-bar" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:18px 24px; margin-bottom:24px; box-shadow:0 4px 16px rgba(45,55,48,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          
          <!-- 左側: 実施回タイトル ＆ モード切替ピル ＆ 中断ボタン -->
          <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
            <span style="font-weight:800; color:#1a231f; font-size:1.05rem;">
              <i class="fas fa-file-invoice" style="color:#345d4d;"></i> ${sessionTitle}
            </span>

            <!-- モード切替ピル（1問1答 / 本番テスト / 印刷） -->
            <div class="mode-toggle-group" style="display:inline-flex; background:#f0ece6; padding:4px; border-radius:9999px; border:1px solid #e7dfd5;">
              <button type="button" id="btnModePractice" class="mode-toggle-btn" style="border:none; padding:8px 18px; border-radius:9999px; font-size:0.88rem; font-weight:700; cursor:pointer; transition:all 0.2s; ${examMode === 'practice' ? 'background:#345d4d; color:#ffffff; box-shadow:0 2px 6px rgba(52,93,77,0.25);' : 'background:transparent; color:#4a5568;'}">
                <i class="fas fa-book-open"></i> 1問1答モード
              </button>
              <button type="button" id="btnModeExam" class="mode-toggle-btn" style="border:none; padding:8px 18px; border-radius:9999px; font-size:0.88rem; font-weight:700; cursor:pointer; transition:all 0.2s; ${examMode === 'exam' ? 'background:#345d4d; color:#ffffff; box-shadow:0 2px 6px rgba(52,93,77,0.25);' : 'background:transparent; color:#4a5568;'}">
                <i class="fas fa-stopwatch"></i> 本番テストモード
              </button>
              <button type="button" id="btnPrintBoki" class="mode-toggle-btn" style="border:none; padding:8px 18px; border-radius:9999px; font-size:0.88rem; font-weight:700; cursor:pointer; background:transparent; color:#4a5568; transition:all 0.2s;">
                <i class="fas fa-print"></i> 模試を印刷
              </button>
            </div>

            <!-- 中断ボタン -->
            ${examMode === 'practice' ? `
              <button type="button" id="btnAbortPractice" style="background:#fff5f5; color:#c53030; border:1.5px solid #feb2b2; padding:6px 14px; border-radius:9999px; font-size:0.82rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; transition:all 0.2s;">
                <i class="fas fa-undo"></i> 演習を中断する
              </button>
            ` : ''}
            ${isExamRunning ? `
              <button type="button" id="btnAbortExam" style="background:#fff5f5; color:#c53030; border:1.5px solid #feb2b2; padding:6px 14px; border-radius:9999px; font-size:0.82rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; transition:all 0.2s;">
                <i class="fas fa-stop-circle"></i> 試験を中断する
              </button>
            ` : ''}
          </div>

          <!-- 右側: タイマーエリア（本番モード開始後のみ表示：スクロール追従 fixed） -->
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <div id="bokiTimerArea" style="display:${isExamRunning ? 'flex' : 'none'}; align-items:center; gap:12px; background:#eef5f1; border:1px solid #c6e0d3; padding:6px 14px; border-radius:12px; box-shadow:0 4px 16px rgba(45,55,48,0.14); position:fixed; top:76px; right:24px; z-index:9999; max-width:calc(100vw - 32px);">
              <div style="color:#286b50; font-weight:800; font-size:1.25rem; font-family:monospace; display:flex; align-items:center; gap:8px;">
                <i class="fas fa-clock" style="color:#286b50; font-size:1.15rem;"></i> <span id="timerDisplay">${formatSeconds(timeRemaining)}</span>
              </div>

              <button type="button" id="btnTimerPause" style="padding:4px 12px; font-size:0.85rem; background:#ffffff; color:#286b50; border:1px solid #cbd5e0; border-radius:6px; cursor:pointer; font-weight:700; display:inline-flex; align-items:center; gap:5px; box-shadow:0 1px 3px rgba(0,0,0,0.05); transition:all 0.2s;">
                <i class="fas ${isTimerRunning ? 'fa-pause' : 'fa-play'}"></i> ${isTimerRunning ? '一時停止' : '再開'}
              </button>
            </div>
          </div>

        </div>

        <!-- 進捗プログレスバー -->
        <div id="bokiProgressBarContainer" style="display:${(examMode === 'exam' && !isExamStarted) ? 'none' : 'block'}; margin-top:16px; padding-top:14px; border-top:1px solid #e7dfd5;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span id="bokiProgressText" style="font-size:0.88rem; font-weight:700; color:#345d4d;">進捗: 読み込み中...</span>
            <span id="bokiAnsweredMeta" style="font-size:0.82rem; color:#718096;">全${sessionQuestions.length}問</span>
          </div>
          <div style="background:#e2e8f0; height:8px; border-radius:9999px; overflow:hidden;">
            <div id="bokiProgressFill" style="background:#345d4d; width:0%; height:100%; border-radius:9999px; transition:width 0.25s ease;"></div>
          </div>
        </div>
      </div>

      <!-- メインコンテンツ描画エリア -->
      <div id="bokiMainContent"></div>

      <!-- リザルト画面エリア -->
      <div id="bokiResultArea" style="display:none; margin-bottom:40px;"></div>

      <!-- 採点後の全問題復習エリア -->
      <div id="bokiReviewContainer" style="display:none; margin-bottom:60px;"></div>
    `;

    setupControlBarEvents();

    if (examMode === 'practice') {
      renderPracticeView();
    } else {
      if (!isExamStarted) {
        renderExamStartScreen();
      } else {
        renderExamView();
      }
    }
  }

  function setupControlBarEvents() {
    const btnPractice = document.getElementById('btnModePractice');
    const btnExam = document.getElementById('btnModeExam');
    const btnPrint = document.getElementById('btnPrintBoki');
    const btnAbortPractice = document.getElementById('btnAbortPractice');
    const btnAbortExam = document.getElementById('btnAbortExam');
    const btnPause = document.getElementById('btnTimerPause');

    if (btnPractice) {
      btnPractice.addEventListener('click', () => {
        if (examMode === 'practice') return;
        if (examMode === 'exam' && isExamStarted && !isExamSubmitted) {
          if (!confirm('本番テストモードを中断して1問1答モードへ切り替えますか？（回答内容は破棄されます）')) return;
        }
        stopTimer();
        examMode = 'practice';
        isExamStarted = false;
        userAnswers = {};
        renderMainView();
      });
    }

    if (btnExam) {
      btnExam.addEventListener('click', () => {
        if (examMode === 'exam') return;
        if (examMode === 'practice' && (isPracticeStarted || Object.keys(practiceUserAnswers).length > 0)) {
          if (!confirm('1問1答演習を中断して本番テストモードへ切り替えますか？')) return;
        }
        examMode = 'exam';
        isPracticeStarted = false;
        isExamStarted = false;
        isExamSubmitted = false;
        practiceUserAnswers = {};
        userAnswers = {};
        renderMainView();
      });
    }

    if (btnAbortPractice) {
      btnAbortPractice.addEventListener('click', () => {
        if (confirm('1問1答演習を中断して最初の問題に戻りますか？')) {
          practiceUserAnswers = {};
          practiceCurrentIndex = 0;
          isPracticeStarted = false;
          renderMainView();
        }
      });
    }

    if (btnAbortExam) {
      btnAbortExam.addEventListener('click', () => {
        if (confirm('試験を中断しますか？（現在の回答データは破棄されます）')) {
          stopTimer();
          isExamStarted = false;
          userAnswers = {};
          renderMainView();
        }
      });
    }

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        if (isTimerRunning) {
          stopTimer();
          btnPause.innerHTML = '<i class="fas fa-play"></i> 再開';
        } else {
          startTimer();
          btnPause.innerHTML = '<i class="fas fa-pause"></i> 一時停止';
        }
      });
    }

    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        openPrintWindow(sessionQuestions, `${gradeTitle} ${docType}（${getSessionTitle(currentSession)}）`);
      });
    }
  }

  // ========================================================
  // 1. 本番テスト待機画面
  // ========================================================
  function renderExamStartScreen() {
    const content = document.getElementById('bokiMainContent');
    if (!content) return;

    const total = sessionQuestions.length;
    const sessionTitle = `${gradeTitle} ${docType}（${getSessionTitle(currentSession)}）`;

    let timeOptions = '';
    if (gradeKey === '3kyu') {
      timeOptions = `
        <option value="40" ${customDurationMinutes === 40 ? 'selected' : ''}>40分 （速解トレーニング）</option>
        <option value="50" ${customDurationMinutes === 50 ? 'selected' : ''}>50分 （高得点目標）</option>
        <option value="60" ${customDurationMinutes === 60 ? 'selected' : ''}>60分 （本番標準時間 60分）</option>
        <option value="75" ${customDurationMinutes === 75 ? 'selected' : ''}>75分 （じっくり演習）</option>
      `;
    } else {
      timeOptions = `
        <option value="60" ${customDurationMinutes === 60 ? 'selected' : ''}>60分 （速解トレーニング）</option>
        <option value="75" ${customDurationMinutes === 75 ? 'selected' : ''}>75分 （ペースアップ）</option>
        <option value="90" ${customDurationMinutes === 90 ? 'selected' : ''}>90分 （本番標準時間 90分）</option>
        <option value="110" ${customDurationMinutes === 110 ? 'selected' : ''}>110分 （じっくり演習）</option>
      `;
    }

    content.innerHTML = `
      <div class="exam-start-card" style="background:#fff; border:1px solid #e7dfd5; border-radius:22px; padding:38px 32px; text-align:center; box-shadow:0 4px 20px rgba(45,55,48,0.05); max-width:720px; margin:20px auto 40px;">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:68px; height:68px; border-radius:50%; background:#eef5f1; color:#345d4d; font-size:1.9rem; margin-bottom:18px;">
          <i class="fas fa-stopwatch"></i>
        </div>
        <h2 style="font-size:1.45rem; font-weight:800; color:#1a231f; margin-bottom:12px;">
          本番テストモード（${sessionTitle} 全${total}問）
        </h2>
        <p style="color:#4a5568; font-size:0.98rem; line-height:1.75; margin-bottom:26px;">
          本試験と同様に全${total}問を通しで解答します。<br>
          制限時間内に仕訳や帳簿計算を終える本番のタイムマネジメント力を鍛えることができます。<br>
          <span style="font-size:0.88rem; color:#718096;">※テスト中は途中で正解や解説は表示されません。採点完了後に全問の詳しい解説を確認できます。</span>
        </p>

        <!-- 制限時間の選択ボックス -->
        <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:14px; padding:20px 24px; margin-bottom:30px; display:inline-block; text-align:left;">
          <div style="font-weight:700; color:#345d4d; font-size:0.95rem; margin-bottom:8px;">
            <i class="fas fa-clock"></i> 制限時間を設定してください：
          </div>
          <select id="startScreenTimerSelect" style="padding:10px 18px; border:1.5px solid #cbd5e0; border-radius:10px; font-size:1rem; font-weight:700; color:#1a231f; background:#fff; cursor:pointer; width:100%;">
            ${timeOptions}
          </select>
        </div>

        <div>
          <button type="button" id="btnStartRealExam" style="background:#345d4d; color:#fff; border:none; padding:16px 52px; border-radius:9999px; font-size:1.18rem; font-weight:800; cursor:pointer; box-shadow:0 6px 20px rgba(52,93,77,0.3); transition:transform 0.15s, box-shadow 0.15s; display:inline-flex; align-items:center; gap:10px;">
            <i class="fas fa-play-circle" style="font-size:1.3rem;"></i> 試験を開始する
          </button>
        </div>
      </div>
    `;

    const timerSel = document.getElementById('startScreenTimerSelect');
    if (timerSel) {
      timerSel.addEventListener('change', (e) => {
        customDurationMinutes = parseInt(e.target.value, 10) || defaultMinutes;
      });
    }

    const startBtn = document.getElementById('btnStartRealExam');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        isExamStarted = true;
        timeRemaining = customDurationMinutes * 60;
        startTimer();
        renderMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ========================================================
  // 2. 1問1答モード
  // ========================================================
  function renderPracticeView() {
    const content = document.getElementById('bokiMainContent');
    if (!content) return;

    const total = sessionQuestions.length;
    const q = sessionQuestions[practiceCurrentIndex];
    if (!q) return;

    const answeredCount = Object.keys(practiceUserAnswers).length;
    const progressFill = document.getElementById('bokiProgressFill');
    const progressText = document.getElementById('bokiProgressText');
    const answeredMeta = document.getElementById('bokiAnsweredMeta');
    if (progressFill && progressText) {
      const pct = Math.round(((practiceCurrentIndex + 1) / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.innerText = `第 ${practiceCurrentIndex + 1} 問 / 全 ${total} 問 (${q.catName || '簿記'})`;
      if (answeredMeta) answeredMeta.innerText = `回答済: ${answeredCount} / ${total} 問`;
    }

    const qId = getItemQid(q);
    const isBookmarked = isItemBookmarked(q);
    const existingAnswer = practiceUserAnswers[qId];
    const isAnswered = !!existingAnswer;
    const opts = parseOptions(q.options);

    const sectionBadge = q.sectionName ? `<span class="shikaku-card-badge" style="background:#e6fffa; color:#234e52; border:1px solid #b2f5ea; font-weight:600;"><i class="fas fa-layer-group"></i> ${q.sectionName}</span>` : '';
    const pointsBadge = (typeof q.points === 'number') ? `<span class="shikaku-card-badge" style="background:#fefcbf; color:#744210; border:1px solid #faf089; font-weight:bold;"><i class="fas fa-star"></i> 配点 ${q.points}点</span>` : '';

    content.innerHTML = `
      <div class="quiz-card" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:26px 28px; box-shadow:0 4px 16px rgba(45,55,48,0.04);">
        
        <!-- 設問ヘッダー -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span style="background:#eef5f1; color:#345d4d; font-weight:800; font-size:0.95rem; padding:4px 14px; border-radius:8px;">
              第 ${practiceCurrentIndex + 1} 問
            </span>
            ${sectionBadge}
            <span style="font-size:0.85rem; color:#6b7770; background:#f0ece6; padding:3px 10px; border-radius:6px; font-weight:600;">
              ${q.catName || '簿記'}
            </span>
            ${pointsBadge}
          </div>

          <button type="button" class="bookmark-toggle-btn ${isBookmarked ? 'is-bookmarked active' : ''}" id="practiceBookmarkBtn" style="cursor:pointer; display:inline-flex; align-items:center; gap:6px; font-weight:700; font-size:0.88rem; border-radius:9999px; padding:5px 16px; ${isBookmarked ? 'background:#fef9c3 !important; color:#b45309 !important; border:1px solid #facc15 !important;' : 'background:#ffffff !important; color:#64748b !important; border:1px solid #d5e2ed !important;'}">
            <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}" style="color:${isBookmarked ? '#d97706 !important' : '#94a3b8 !important'}; font-size:0.95rem;"></i>
            <span>${isBookmarked ? '保存中' : 'ブックマーク'}</span>
          </button>
        </div>

        <!-- 設問文 -->
        <div style="font-size:1.1rem; font-weight:700; color:#1a231f; line-height:1.75; margin-bottom:20px;">
          ${q.text}
        </div>

        <!-- 選択肢リスト -->
        <div class="quiz-options-list" style="display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:20px;">
          ${opts.map(opt => {
            const isSelected = (existingAnswer === opt.key);
            const isCorrect = (opt.key === q.correct);
            let optStyle = "display:flex; align-items:flex-start; padding:14px 20px; border:1.5px solid #e2e8f0; border-radius:12px; cursor:pointer; background:#fff; transition:all 0.15s;";
            let labelBadge = `<span style="font-weight:800; color:#4a5568; min-width:36px; font-size:1rem;">${opt.key}</span>`;

            if (isAnswered) {
              if (isCorrect) {
                optStyle = "display:flex; align-items:flex-start; padding:14px 20px; border:2px solid #2f855a; border-radius:12px; cursor:default; background:#f0fff4;";
                labelBadge = `<span style="font-weight:800; color:#2f855a; min-width:36px; font-size:1rem;"><i class="fas fa-check-circle"></i> ${opt.key}</span>`;
              } else if (isSelected && !isCorrect) {
                optStyle = "display:flex; align-items:flex-start; padding:14px 20px; border:2px solid #c53030; border-radius:12px; cursor:default; background:#fff5f5;";
                labelBadge = `<span style="font-weight:800; color:#c53030; min-width:36px; font-size:1rem;"><i class="fas fa-times-circle"></i> ${opt.key}</span>`;
              }
            }

            return `
              <div class="practice-opt ${isAnswered ? 'locked' : ''}" data-value="${opt.key}" style="${optStyle}">
                ${labelBadge}
                <span style="color:#2d3748; font-size:1rem; line-height:1.6;">${opt.text}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- 解説エリア -->
        <div id="practiceExplanation" style="display:${isAnswered ? 'block' : 'none'}; margin-top:20px; padding:22px; border-radius:14px; background:${existingAnswer === q.correct ? '#f0fff4' : '#fff5f5'}; border:1.5px solid ${existingAnswer === q.correct ? '#9ae6b4' : '#feb2b2'};">
          <div style="font-size:1.15rem; font-weight:800; color:${existingAnswer === q.correct ? '#2f855a' : '#c53030'}; margin-bottom:12px;">
            <i class="fas ${existingAnswer === q.correct ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
            ${existingAnswer === q.correct ? '正解！' : '不正解...'} 
            <span style="font-size:0.95rem; font-weight:700; color:#4a5568; margin-left:10px;">[正解: ${q.correct}]</span>
          </div>

          <div style="font-size:0.98rem; color:#2d3748; line-height:1.75;">
            <strong style="color:#1a231f;">【詳細解説・仕訳】</strong><br>
            ${q.explanation}
          </div>
        </div>

        <!-- ナビゲーションボタン -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:28px; padding-top:20px; border-top:1px solid #e7dfd5;">
          <button type="button" id="btnPracticePrev" style="background:#f0ece6; color:#4a5568; border:none; padding:10px 20px; border-radius:9999px; font-weight:700; font-size:0.92rem; cursor:${practiceCurrentIndex === 0 ? 'not-allowed' : 'pointer'}; opacity:${practiceCurrentIndex === 0 ? '0.5' : '1'};">
            <i class="fas fa-arrow-left"></i> 前の問題へ
          </button>

          <button type="button" id="btnPracticeNext" style="background:#345d4d; color:#fff; border:none; padding:12px 28px; border-radius:9999px; font-weight:800; font-size:0.96rem; cursor:pointer; box-shadow:0 4px 12px rgba(52,93,77,0.25);">
            ${practiceCurrentIndex === total - 1 ? '結果を見る <i class="fas fa-award"></i>' : '次の問題へ <i class="fas fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    // 選択肢クリック
    content.querySelectorAll('.practice-opt').forEach(optEl => {
      optEl.addEventListener('click', () => {
        if (practiceUserAnswers[qId]) return;
        isPracticeStarted = true;
        const chosenVal = optEl.getAttribute('data-value');
        practiceUserAnswers[qId] = chosenVal;
        renderPracticeView();
      });
    });

    // ブックマーク
    const bmBtn = document.getElementById('practiceBookmarkBtn');
    if (bmBtn) {
      bmBtn.addEventListener('click', () => {
        if (bookmarkedQids.has(qId)) {
          bookmarkedQids.delete(qId);
        } else {
          bookmarkedQids.add(qId);
        }
        saveBookmarks();
        renderPracticeView();
      });
    }

    // 前へ
    const prevBtn = document.getElementById('btnPracticePrev');
    if (prevBtn && practiceCurrentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        practiceCurrentIndex--;
        renderPracticeView();
        window.scrollTo({ top: content.offsetTop - 80, behavior: 'smooth' });
      });
    }

    // 次へ
    const nextBtn = document.getElementById('btnPracticeNext');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (practiceCurrentIndex < total - 1) {
          practiceCurrentIndex++;
          renderPracticeView();
          window.scrollTo({ top: content.offsetTop - 80, behavior: 'smooth' });
        } else {
          showFinalResults(practiceUserAnswers);
        }
      });
    }
  }

  // ========================================================
  // 3. 本番テストモード
  // ========================================================
  function renderExamView() {
    const content = document.getElementById('bokiMainContent');
    if (!content) return;

    const total = sessionQuestions.length;

    let listHtml = sessionQuestions.map((q, idx) => {
      const qNum = idx + 1;
      const qId = getItemQid(q);
      const isBookmarked = isItemBookmarked(q);
      const chosen = userAnswers[qId];
      const opts = parseOptions(q.options);

      const sectionBadge = q.sectionName ? `<span class="shikaku-card-badge" style="background:#e6fffa; color:#234e52; border:1px solid #b2f5ea; font-weight:600;"><i class="fas fa-layer-group"></i> ${q.sectionName}</span>` : '';
      const pointsBadge = (typeof q.points === 'number') ? `<span class="shikaku-card-badge" style="background:#fefcbf; color:#744210; border:1px solid #faf089; font-weight:bold;"><i class="fas fa-star"></i> 配点 ${q.points}点</span>` : '';

      return `
        <div class="exam-question-card" id="examQ_${qId}" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:26px 28px; margin-bottom:24px; box-shadow:0 4px 16px rgba(45,55,48,0.03);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span style="background:#eef5f1; color:#345d4d; font-weight:800; font-size:0.95rem; padding:4px 14px; border-radius:8px;">
                第 ${qNum} 問
              </span>
              ${sectionBadge}
              <span style="font-size:0.85rem; color:#6b7770; background:#f0ece6; padding:3px 10px; border-radius:6px; font-weight:600;">
                ${q.catName || '簿記'}
              </span>
              ${pointsBadge}
            </div>

            <button type="button" class="bookmark-toggle-btn exam-bookmark-btn ${isBookmarked ? 'is-bookmarked active' : ''}" data-qid="${qId}" style="cursor:pointer; display:inline-flex; align-items:center; gap:5px; font-weight:700; font-size:0.88rem; border-radius:9999px; padding:4px 14px; ${isBookmarked ? 'background:#fef9c3 !important; color:#b45309 !important; border:1px solid #facc15 !important;' : 'background:#ffffff !important; color:#64748b !important; border:1px solid #d5e2ed !important;'}">
              <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}" style="color:${isBookmarked ? '#d97706 !important' : '#94a3b8 !important'}; font-size:0.92rem;"></i>
              <span>${isBookmarked ? '保存中' : 'ブックマーク'}</span>
            </button>
          </div>

          <div style="font-size:1.08rem; font-weight:700; color:#1a231f; line-height:1.75; margin-bottom:18px;">
            ${q.text}
          </div>

          <!-- 選択肢ラジオ -->
          <div style="display:grid; grid-template-columns:1fr; gap:10px;">
            ${opts.map(opt => {
              const isChecked = (chosen === opt.key);
              return `
                <label style="display:flex; align-items:flex-start; gap:12px; padding:12px 18px; border:1.5px solid ${isChecked ? '#345d4d' : '#e2e8f0'}; border-radius:10px; background:${isChecked ? '#f0fff4' : '#fff'}; cursor:pointer; transition:all 0.15s;">
                  <input type="radio" name="exam_ans_${qId}" value="${opt.key}" ${isChecked ? 'checked' : ''} style="margin-top:4px; accent-color:#345d4d; width:17px; height:17px;">
                  <div>
                    <strong style="color:#254337; margin-right:6px;">${opt.key}</strong>
                    <span style="color:#2d3748; font-size:0.98rem; line-height:1.6;">${opt.text}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    content.innerHTML = `
      <div id="examQuestionsList">
        ${listHtml}
      </div>

      <div style="text-align:center; margin:36px 0 50px;">
        <button type="button" id="btnSubmitExam" style="background:#345d4d; color:#fff; border:none; padding:18px 60px; border-radius:9999px; font-size:1.2rem; font-weight:800; cursor:pointer; box-shadow:0 6px 20px rgba(52,93,77,0.3); display:inline-flex; align-items:center; gap:10px;">
          <i class="fas fa-check-circle"></i> 解答を提出して採点する
        </button>
      </div>
    `;

    updateExamProgressUI();

    content.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const qid = e.target.name.replace('exam_ans_', '');
        userAnswers[qid] = e.target.value;
        updateExamProgressUI();

        const card = document.getElementById(`examQ_${qid}`);
        if (card) {
          card.querySelectorAll('label').forEach(lbl => {
            const r = lbl.querySelector('input[type="radio"]');
            if (r && r.checked) {
              lbl.style.borderColor = '#345d4d';
              lbl.style.background = '#f0fff4';
            } else {
              lbl.style.borderColor = '#e2e8f0';
              lbl.style.background = '#fff';
            }
          });
        }
      });
    });

    const submitBtn = document.getElementById('btnSubmitExam');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        submitExamAndShowResult();
      });
    }

    content.querySelectorAll('.exam-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.getAttribute('data-qid');
        if (bookmarkedQids.has(qid)) {
          bookmarkedQids.delete(qid);
          btn.className = 'bookmark-toggle-btn exam-bookmark-btn';
          btn.style.setProperty('background', '#ffffff', 'important');
          btn.style.setProperty('color', '#64748b', 'important');
          btn.style.setProperty('border', '1px solid #d5e2ed', 'important');
          btn.innerHTML = '<i class="far fa-star" style="color:#94a3b8 !important; font-size:0.92rem;"></i> <span>ブックマーク</span>';
        } else {
          bookmarkedQids.add(qid);
          btn.className = 'bookmark-toggle-btn exam-bookmark-btn is-bookmarked active';
          btn.style.setProperty('background', '#fef9c3', 'important');
          btn.style.setProperty('color', '#b45309', 'important');
          btn.style.setProperty('border', '1px solid #facc15', 'important');
          btn.innerHTML = '<i class="fas fa-star" style="color:#d97706 !important; font-size:0.92rem;"></i> <span>保存中</span>';
        }
        saveBookmarks();
      });
    });
  }

  function updateExamProgressUI() {
    const total = sessionQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;
    const progressFill = document.getElementById('bokiProgressFill');
    const progressText = document.getElementById('bokiProgressText');
    const answeredMeta = document.getElementById('bokiAnsweredMeta');

    if (progressFill && progressText) {
      const pct = Math.round((answeredCount / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.innerText = `進捗: ${answeredCount} / ${total} 問完了 (${pct}%)`;
      if (answeredMeta) answeredMeta.innerText = `未回答: ${total - answeredCount} 問`;
    }
  }

  function submitExamAndShowResult() {
    const total = sessionQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;

    if (answeredCount < total) {
      const unanswered = total - answeredCount;
      if (!confirm(`未回答の問題が ${unanswered} 問あります。このまま試験を終了して採点しますか？`)) {
        return;
      }
    }

    stopTimer();
    isExamSubmitted = true;
    showFinalResults(userAnswers);
  }

  // ========================================================
  // 4. リザルト画面
  // ========================================================
  function showFinalResults(answerMap) {
    const mainContent = document.getElementById('bokiMainContent');
    const resultArea = document.getElementById('bokiResultArea');
    const timerArea = document.getElementById('bokiTimerArea');

    if (timerArea) timerArea.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';

    const total = sessionQuestions.length;
    let earnedPoints = 0;
    let totalPoints = 0;
    let correctCount = 0;

    sessionQuestions.forEach(q => {
      const qId = getItemQid(q);
      const pts = (typeof q.points === 'number') ? q.points : 5;
      totalPoints += pts;

      const userAns = answerMap[qId];
      if (userAns === q.correct) {
        correctCount++;
        earnedPoints += pts;
      }
    });

    const scorePct = Math.round((earnedPoints / totalPoints) * 100);
    const isPassed = earnedPoints >= 70; // 簿記は70点以上合格

    if (resultArea) {
      resultArea.style.display = 'block';
      resultArea.innerHTML = `
        <div style="background:#fff; border:1px solid #e7dfd5; border-radius:22px; padding:36px 32px; box-shadow:0 6px 24px rgba(45,55,48,0.06); text-align:center; max-width:800px; margin:0 auto 30px;">
          
          <div style="display:inline-flex; align-items:center; justify-content:center; width:72px; height:72px; border-radius:50%; background:${isPassed ? '#f0fff4' : '#fff5f5'}; color:${isPassed ? '#2f855a' : '#c53030'}; font-size:2.2rem; margin-bottom:16px;">
            <i class="fas ${isPassed ? 'fa-award' : 'fa-clipboard-check'}"></i>
          </div>

          <h2 style="font-size:1.6rem; font-weight:800; color:#1a231f; margin-bottom:8px;">
            ${examMode === 'exam' ? '本番テスト採点結果' : '1問1答演習 完了！'}
          </h2>
          <div style="font-size:0.95rem; color:#718096; margin-bottom:24px;">
            ${gradeTitle} ${docType}（${getSessionTitle(currentSession)}） ｜ 全${total}問
          </div>

          <div style="display:flex; justify-content:center; align-items:baseline; gap:10px; margin-bottom:12px;">
            <span style="font-size:3.6rem; font-weight:900; color:${isPassed ? '#2f855a' : '#2d3748'}; font-family:monospace;">${earnedPoints}</span>
            <span style="font-size:1.4rem; font-weight:700; color:#718096;">/ ${totalPoints} 点 （${correctCount} / ${total}問 正解）</span>
          </div>
          <div style="font-size:1.15rem; font-weight:800; color:${isPassed ? '#2f855a' : '#c53030'}; margin-bottom:28px;">
            得点率：${scorePct}% ｜ ${isPassed ? '🎉 合格ライン（70点以上）クリア！合格圏内です' : '合格ライン（70点）まであと ' + (70 - earnedPoints) + ' 点'}
          </div>

          <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
            <button type="button" id="btnRestartExam" style="background:#345d4d; color:#fff; border:none; padding:12px 28px; border-radius:9999px; font-weight:800; font-size:0.95rem; cursor:pointer; box-shadow:0 4px 12px rgba(52,93,77,0.25);">
              <i class="fas fa-redo"></i> もう一度解き直す
            </button>
            <button type="button" id="btnViewAllReview" style="background:#f0ece6; color:#345d4d; border:1px solid #c6e0d3; padding:12px 28px; border-radius:9999px; font-weight:800; font-size:0.95rem; cursor:pointer;">
              <i class="fas fa-book-reader"></i> 全問題の解説を確認する
            </button>
          </div>

        </div>
      `;

      document.getElementById('btnRestartExam').addEventListener('click', () => {
        loadSessionData(currentSession);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      document.getElementById('btnViewAllReview').addEventListener('click', () => {
        const rev = document.getElementById('bokiReviewContainer');
        if (rev) rev.scrollIntoView({ behavior: 'smooth' });
      });
    }

    renderReviewSection(answerMap);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // 5. 復習セクション
  // ========================================================
  function renderReviewSection(answerMap) {
    const container = document.getElementById('bokiReviewContainer');
    if (!container) return;

    container.style.display = 'block';

    let filteredQuestions = sessionQuestions;
    if (reviewFilter === 'wrong') {
      filteredQuestions = sessionQuestions.filter(q => answerMap[getItemQid(q)] !== q.correct);
    } else if (reviewFilter === 'correct') {
      filteredQuestions = sessionQuestions.filter(q => answerMap[getItemQid(q)] === q.correct);
    }

    let listHtml = filteredQuestions.map((q, idx) => {
      const qNum = idx + 1;
      const qId = getItemQid(q);
      const userAns = answerMap[qId];
      const isCorrect = (userAns === q.correct);
      const opts = parseOptions(q.options);

      return `
        <div class="review-question-card" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:26px 28px; margin-bottom:24px; box-shadow:0 4px 16px rgba(45,55,48,0.03);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span style="background:${isCorrect ? '#f0fff4' : '#fff5f5'}; color:${isCorrect ? '#2f855a' : '#c53030'}; font-weight:800; font-size:0.95rem; padding:4px 14px; border-radius:8px; border:1px solid ${isCorrect ? '#9ae6b4' : '#feb2b2'};">
                <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i> 第 ${qNum} 問
              </span>
              <span style="font-size:0.85rem; color:#6b7770; background:#f0ece6; padding:3px 10px; border-radius:6px; font-weight:600;">
                ${q.catName || '簿記'}
              </span>
            </div>

            <div style="font-size:0.92rem; font-weight:700;">
              あなたの回答: <strong style="color:${isCorrect ? '#2f855a' : '#c53030'};">${userAns || '未回答'}</strong>
              <span style="margin-left:10px; color:#254337;">正解: <strong>${q.correct}</strong></span>
            </div>
          </div>

          <div style="font-size:1.08rem; font-weight:700; color:#1a231f; line-height:1.75; margin-bottom:18px;">
            ${q.text}
          </div>

          <div style="display:grid; grid-template-columns:1fr; gap:8px; margin-bottom:18px;">
            ${opts.map(opt => {
              const isUserPicked = (userAns === opt.key);
              const isActualCorrect = (opt.key === q.correct);
              let bg = '#fff';
              let bd = '#e2e8f0';
              if (isActualCorrect) { bg = '#f0fff4'; bd = '#9ae6b4'; }
              else if (isUserPicked && !isActualCorrect) { bg = '#fff5f5'; bd = '#feb2b2'; }

              return `
                <div style="padding:10px 16px; border:1.5px solid ${bd}; background:${bg}; border-radius:8px; display:flex; align-items:flex-start; gap:10px; font-size:0.95rem;">
                  <strong style="color:#254337; min-width:32px;">${opt.key}</strong>
                  <span style="color:#2d3748; line-height:1.6;">${opt.text}</span>
                  ${isActualCorrect ? '<span style="color:#2f855a; font-weight:800; margin-left:auto; font-size:0.85rem;"><i class="fas fa-check"></i> 正解</span>' : ''}
                  ${(isUserPicked && !isActualCorrect) ? '<span style="color:#c53030; font-weight:800; margin-left:auto; font-size:0.85rem;"><i class="fas fa-times"></i> あなたの回答</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>

          <div style="padding:18px; border-radius:12px; background:#f8fafc; border:1.5px solid #cbd5e0; font-size:0.96rem; line-height:1.75; color:#2d3748;">
            <strong style="color:#1a231f;">【詳細解説・仕訳】</strong><br>
            ${q.explanation}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <h3 style="font-size:1.3rem; font-weight:800; color:#1a231f; margin:0;">
          <i class="fas fa-list-check" style="color:#345d4d;"></i> 全問題の解答・解説復習
        </h3>

        <div style="display:inline-flex; background:#e2e8f0; padding:3px; border-radius:9999px;">
          <button type="button" class="btn-filter ${reviewFilter === 'all' ? 'active' : ''}" data-filter="all" style="border:none; padding:6px 16px; border-radius:9999px; font-size:0.85rem; font-weight:700; cursor:pointer; ${reviewFilter === 'all' ? 'background:#345d4d; color:#fff;' : 'background:transparent; color:#4a5568;'}">
            全問題 (${sessionQuestions.length})
          </button>
          <button type="button" class="btn-filter ${reviewFilter === 'wrong' ? 'active' : ''}" data-filter="wrong" style="border:none; padding:6px 16px; border-radius:9999px; font-size:0.85rem; font-weight:700; cursor:pointer; ${reviewFilter === 'wrong' ? 'background:#c53030; color:#fff;' : 'background:transparent; color:#4a5568;'}">
            間違えた問題 (${sessionQuestions.filter(q => answerMap[getItemQid(q)] !== q.correct).length})
          </button>
          <button type="button" class="btn-filter ${reviewFilter === 'correct' ? 'active' : ''}" data-filter="correct" style="border:none; padding:6px 16px; border-radius:9999px; font-size:0.85rem; font-weight:700; cursor:pointer; ${reviewFilter === 'correct' ? 'background:#2f855a; color:#fff;' : 'background:transparent; color:#4a5568;'}">
            正解した問題 (${sessionQuestions.filter(q => answerMap[getItemQid(q)] === q.correct).length})
          </button>
        </div>
      </div>

      <div>
        ${listHtml}
      </div>
    `;

    container.querySelectorAll('.btn-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        reviewFilter = btn.getAttribute('data-filter');
        renderReviewSection(answerMap);
      });
    });
  }

  // ========================================================
  // 6. ブックマーク復習画面
  // ========================================================
  function renderBookmarkSection() {
    const container = document.getElementById('bokiBookmarkContainer');
    if (!container) return;

    const pastData = (gradeKey === '2kyu' ? window.BOKI2_PAST_QUESTIONS : (gradeKey === '1kyu' ? window.BOKI1_PAST_QUESTIONS : window.BOKI3_PAST_QUESTIONS)) || [];
    const pastDict = (gradeKey === '2kyu' ? window.BOKI2_PAST_DATA : (gradeKey === '1kyu' ? window.BOKI1_PAST_DATA : window.BOKI3_PAST_DATA)) || {};

    let allPool = [...pastData];
    Object.keys(pastDict).forEach(k => {
      if (pastDict[k] && pastDict[k].questions) {
        allPool.push(...pastDict[k].questions);
      }
    });

    // 重複除外
    const seen = new Set();
    const uniquePool = [];
    allPool.forEach(item => {
      const qId = getItemQid(item);
      if (!seen.has(qId)) {
        seen.add(qId);
        uniquePool.push(item);
      }
    });

    const bmQuestions = uniquePool.filter(q => isItemBookmarked(q));
    const total = bmQuestions.length;

    if (total === 0) {
      container.innerHTML = `
        <div class="card" style="text-align:center; padding:48px 24px; background:#fffaf0; border:1.5px solid #feebc8; border-radius:20px; margin:20px auto 40px; max-width:760px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
          <div style="display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:#fefcbf; color:#d69e2e; font-size:1.8rem; margin-bottom:16px;">
            <i class="far fa-star"></i>
          </div>
          <h3 style="font-size:1.3rem; font-weight:800; color:#744210; margin-bottom:10px;">ブックマークされた問題がありません</h3>
          <p style="color:#975a16; font-size:0.96rem; line-height:1.75; margin-bottom:24px;">
            問題カードの右上にある「☆ ブックマーク」ボタンを押すと、ここに保存されて苦手な仕訳・計算問題をいつでも集中的に復習できます。
          </p>
        </div>
      `;
      return;
    }

    let listHtml = bmQuestions.map((q, idx) => {
      const qId = getItemQid(q);
      const existingAnswer = bmUserAnswers[qId];
      const isAnswered = !!existingAnswer;
      const isCorrect = (existingAnswer === q.correct);
      const opts = parseOptions(q.options);

      return `
        <div class="bm-card" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:24px 26px; margin-bottom:22px; box-shadow:0 4px 16px rgba(45,55,48,0.03);">
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span style="background:#eef5f1; color:#345d4d; font-weight:800; font-size:0.92rem; padding:3px 12px; border-radius:6px;">
                第 ${idx + 1} 問 (${q.sectionName || q.catName || '簿記'})
              </span>
            </div>

            <button type="button" class="btn-remove-bm" data-qid="${qId}" style="background:none; border:none; color:#c53030; font-size:0.88rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
              <i class="fas fa-trash-alt"></i> 解除
            </button>
          </div>

          <div style="font-size:1.08rem; font-weight:700; color:#1a231f; line-height:1.75; margin-bottom:18px;">
            ${q.text}
          </div>

          <div style="display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:16px;">
            ${opts.map(opt => {
              const isSelected = (existingAnswer === opt.key);
              const isOptCorrect = (opt.key === q.correct);
              let optStyle = "display:flex; align-items:flex-start; padding:12px 18px; border:1.5px solid #e2e8f0; border-radius:10px; cursor:pointer; background:#fff; transition:all 0.15s;";
              let labelBadge = `<span style="font-weight:800; color:#4a5568; min-width:34px; font-size:0.95rem;">${opt.key}</span>`;

              if (isAnswered) {
                if (isOptCorrect) {
                  optStyle = "display:flex; align-items:flex-start; padding:12px 18px; border:2px solid #2f855a; border-radius:10px; cursor:default; background:#f0fff4;";
                  labelBadge = `<span style="font-weight:800; color:#2f855a; min-width:34px; font-size:0.95rem;"><i class="fas fa-check-circle"></i> ${opt.key}</span>`;
                } else if (isSelected && !isOptCorrect) {
                  optStyle = "display:flex; align-items:flex-start; padding:12px 18px; border:2px solid #c53030; border-radius:10px; cursor:default; background:#fff5f5;";
                  labelBadge = `<span style="font-weight:800; color:#c53030; min-width:34px; font-size:0.95rem;"><i class="fas fa-times-circle"></i> ${opt.key}</span>`;
                }
              }

              return `
                <div class="bm-opt ${isAnswered ? 'locked' : ''}" data-qid="${qId}" data-value="${opt.key}" style="${optStyle}">
                  ${labelBadge}
                  <span style="color:#2d3748; font-size:0.98rem; line-height:1.6;">${opt.text}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="bm-exp-box" style="display:${isAnswered ? 'block' : 'none'}; padding:18px; border-radius:12px; background:${isCorrect ? '#f0fff4' : '#fff5f5'}; border:1.5px solid ${isCorrect ? '#9ae6b4' : '#feb2b2'};">
            <div style="font-size:1.1rem; font-weight:800; color:${isCorrect ? '#2f855a' : '#c53030'}; margin-bottom:10px;">
              <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
              ${isCorrect ? '正解！' : '不正解...'} 
              <span style="font-size:0.92rem; font-weight:700; color:#4a5568; margin-left:8px;">[正解: ${q.correct}]</span>
            </div>
            <div style="font-size:0.96rem; color:#2d3748; line-height:1.75;">
              <strong style="color:#1a231f;">【詳細解説・仕訳】</strong><br>
              ${q.explanation}
            </div>
          </div>

        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:20px 24px; margin-bottom:24px; box-shadow:0 4px 16px rgba(45,55,48,0.04); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h2 style="font-size:1.3rem; font-weight:800; color:#1a231f; margin:0 0 4px;">
            <i class="fas fa-star" style="color:#d69e2e;"></i> ブックマーク復習（全 ${total} 問）
          </h2>
          <span style="font-size:0.88rem; color:#718096;">保存した苦手問題の一覧です。選択肢をクリックしてその場で解説を確認できます。</span>
        </div>

        <button type="button" id="btnClearAllBm" style="background:#fff5f5; color:#c53030; border:1px solid #feb2b2; padding:7px 16px; border-radius:9999px; font-size:0.85rem; font-weight:700; cursor:pointer; transition:all 0.2s;">
          <i class="fas fa-trash-alt"></i> すべて解除
        </button>
      </div>

      <div id="bmQuestionsList">
        ${listHtml}
      </div>
    `;

    container.querySelectorAll('.bm-opt').forEach(optEl => {
      optEl.addEventListener('click', () => {
        const qid = optEl.getAttribute('data-qid');
        if (bmUserAnswers[qid]) return;
        const val = optEl.getAttribute('data-value');
        bmUserAnswers[qid] = val;
        renderBookmarkSection();
      });
    });

    container.querySelectorAll('.btn-remove-bm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.getAttribute('data-qid');
        bookmarkedQids.delete(qid);
        saveBookmarks();
        renderBookmarkSection();
      });
    });

    const clearAllBtn = document.getElementById('btnClearAllBm');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('ブックマークしたすべての問題を解除しますか？')) {
          bookmarkedQids.clear();
          saveBookmarks();
          renderBookmarkSection();
        }
      });
    }
  }

  // ========================================================
  // 7. 別タブ印刷プレビュー（4タブ：すべて・問題・解答・解説 完全連動）
  // ========================================================
  function openPrintWindow(questions, customTitle) {
    if (!questions || questions.length === 0) {
      alert('印刷対象の問題がありません。');
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。');
      return;
    }

    const examTitle = customTitle || `${gradeTitle} 過去問演習`;
    const total = questions.length;

    let qHtml = '';
    let aRows = '';
    let expHtml = '';

    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const catName = q.catName || '簿記';
      const opts = parseOptions(q.options);

      let optsHtml = opts.map(opt => `
        <div style="margin-bottom:5px; font-size:0.92rem;">
          <strong style="margin-right:8px; color:#254337;">(${opt.key})</strong> ${opt.text}
        </div>
      `).join('');

      // 1. 問題
      qHtml += `
        <div class="print-q-item">
          <div class="print-q-top">
            <span class="print-q-num">【第 ${qNum} 問】 [${catName}]</span>
            <span class="print-q-ansbox">解答欄：[ &nbsp;&nbsp;&nbsp;&nbsp; ]</span>
          </div>
          <div class="print-q-body">${q.text}</div>
          <div class="print-q-options">${optsHtml}</div>
        </div>
      `;

      // 2. 解答表
      aRows += `
        <tr>
          <td style="text-align:center; font-weight:bold;">第 ${qNum} 問</td>
          <td>${catName}</td>
          <td style="text-align:center; font-weight:bold; color:#2e7d32; font-size:1.05rem;">(${q.correct})</td>
        </tr>
      `;

      // 3. 解説
      expHtml += `
        <div class="print-exp-item">
          <div class="print-exp-header">第 ${qNum} 問: 正解 (${q.correct}) <span>[${catName}]</span></div>
          <div class="print-exp-body">
            <strong>【詳細解説・仕訳】</strong><br>
            ${q.explanation}
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
              <div class="meta">全${total}問 ｜ Shikakus 過去問プリント</div>
            </div>
            <div>
              ${qHtml}
            </div>
          </div>

          <!-- 解答一覧テーブルセクション -->
          <div class="print-section-answers page-break-before">
            <div class="section-header">
              <h1>${examTitle} - 正解一覧表</h1>
              <div class="meta">全${total}問 ｜ Shikakus 過去問プリント</div>
            </div>
            <div>
              <table class="answer-table">
                <thead>
                  <tr>
                    <th style="width:15%;">問題番号</th>
                    <th>科目・分野</th>
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
              <div class="meta">全${total}問 ｜ Shikakus 過去問プリント</div>
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

  // タイマー
  function formatSeconds(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function startTimer() {
    stopTimer();
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        stopTimer();
        alert('制限時間が終了しました。解答を提出して採点します。');
        submitExamAndShowResult();
      }
    }, 1000);
  }

  function stopTimer() {
    isTimerRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const el = document.getElementById('timerDisplay');
    if (el) el.innerText = formatSeconds(timeRemaining);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
