/**
 * TOEIC L&R 想定ハーフ模試 レンダラー (toeic-mock-renderer.js)
 * Shikakus / Kakutoku
 */
(function () {
  'use strict';

  // 登録されている模試データリスト
  const MOCK_SESSIONS = [
    { id: 'mock-01', title: '第1回 想定ハーフ模試', meta: '全50問 ｜ 制限時間: 37分 ｜ Part5〜7完全網羅', dataVar: 'TOEIC_MOCK_DATA_01' }
  ];

  let currentSession = null;
  let currentQuestions = [];
  let userAnswers = {}; // { qId: selectedOption }
  let bookmarkedQids = new Set();
  let examMode = 'practice'; // 'practice' (1問1答・即時解説) or 'exam' (実戦テスト・37分タイマー)
  let timerInterval = null;
  let timeRemaining = 37 * 60;
  let isTimerRunning = false;

  // ローカルストレージキー
  const BM_STORAGE_KEY = 'shikakus_toeic_bookmarks';

  function init() {
    loadBookmarks();
    setupSessionSelector();
    loadSession('mock-01');
    setupEventListeners();
  }

  function loadBookmarks() {
    try {
      const saved = localStorage.getItem(BM_STORAGE_KEY);
      if (saved) {
        bookmarkedQids = new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load bookmarks', e);
    }
  }

  function saveBookmarks() {
    try {
      localStorage.setItem(BM_STORAGE_KEY, JSON.stringify(Array.from(bookmarkedQids)));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }

  function setupSessionSelector() {
    const grid = document.querySelector('.session-grid');
    if (!grid) return;

    grid.innerHTML = MOCK_SESSIONS.map(s => `
      <button type="button" class="session-btn ${s.id === 'mock-01' ? 'active' : ''}" data-session="${s.id}">
        <span class="session-name"><i class="fas fa-file-signature"></i> ${s.title}</span>
        <span class="session-meta">${s.meta}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.session-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.session-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sid = btn.getAttribute('data-session');
        loadSession(sid);
      });
    });
  }

  function loadSession(sessionId) {
    const sessionObj = MOCK_SESSIONS.find(s => s.id === sessionId) || MOCK_SESSIONS[0];
    currentSession = sessionObj;
    const rawData = window[sessionObj.dataVar];

    if (!rawData || !rawData.questions) {
      console.error('Mock data not found:', sessionObj.dataVar);
      return;
    }

    currentQuestions = rawData.questions;
    userAnswers = {};
    timeRemaining = rawData.timeLimitSeconds || 37 * 60;
    stopTimer();

    renderExamView();
  }

  function renderExamView() {
    const container = document.getElementById('toeicQuizContainer');
    if (!container) return;

    // ヘッダーUI（モード切り替え・タイマー・進捗）
    container.innerHTML = `
      <!-- モード選択・タイマーバー -->
      <div class="toeic-control-bar" style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:18px 24px; margin-bottom:24px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <span style="font-weight:700; color:#2d3748; font-size:1.05rem;">
              <i class="fas fa-graduation-cap" style="color:#2f855a;"></i> ${currentSession.title}
            </span>
            <div class="mode-toggle-group" style="display:inline-flex; background:#edf2f7; padding:4px; border-radius:9999px;">
              <button type="button" id="btnModePractice" class="mode-toggle-btn ${examMode === 'practice' ? 'active' : ''}" style="border:none; padding:6px 14px; border-radius:9999px; font-size:0.85rem; font-weight:700; cursor:pointer; transition:all 0.2s;">
                <i class="fas fa-book-open"></i> 1問1答復習モード
              </button>
              <button type="button" id="btnModeExam" class="mode-toggle-btn ${examMode === 'exam' ? 'active' : ''}" style="border:none; padding:6px 14px; border-radius:9999px; font-size:0.85rem; font-weight:700; cursor:pointer; transition:all 0.2s;">
                <i class="fas fa-stopwatch"></i> 本番37分テスト
              </button>
            </div>
          </div>

          <!-- タイマーエリア (本番モード時表示) -->
          <div id="toeicTimerArea" style="display:${examMode === 'exam' ? 'flex' : 'none'}; align-items:center; gap:12px;">
            <div style="background:#feebc8; color:#744210; padding:6px 14px; border-radius:10px; font-weight:700; font-size:1.15rem; font-family:monospace; display:flex; align-items:center; gap:8px;">
              <i class="fas fa-clock"></i> <span id="timerDisplay">37:00</span>
            </div>
            <button type="button" id="btnTimerPause" class="btn-pill" style="padding:6px 12px; font-size:0.82rem; background:#edf2f7; color:#4a5568; border:none; cursor:pointer;">
              <i class="fas fa-pause"></i> 一時停止
            </button>
          </div>

          <!-- 印刷・リセットボタン -->
          <div style="display:flex; gap:8px;">
            <button type="button" id="btnPrintToeic" class="btn-pill btn-pill-outline" style="padding:6px 14px; font-size:0.85rem;">
              <i class="fas fa-print"></i> 模試を印刷
            </button>
          </div>
        </div>

        <!-- ナビゲーション・問題番号クイックジャンプパレット -->
        <div style="margin-top:16px; padding-top:14px; border-top:1px dashed #e2e8f0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:0.82rem; font-weight:700; color:#718096;">設問一覧（クリックでジャンプ）：</span>
            <span id="answeredSummaryText" style="font-size:0.82rem; color:#4a5568;">回答済: 0 / 50 問</span>
          </div>
          <div class="q-jump-palette" style="display:flex; flex-wrap:wrap; gap:6px; max-height:80px; overflow-y:auto; padding:2px;">
            ${currentQuestions.map(q => `
              <button type="button" class="q-jump-btn" data-qid="${q.id}" id="jump-${q.id}" style="width:36px; height:28px; border-radius:6px; border:1px solid #cbd5e0; background:#f7fafc; font-size:0.75rem; font-weight:700; cursor:pointer; color:#4a5568; transition:all 0.15s;">
                ${q.qNumber}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 問題リスト描画エリア -->
      <div id="toeicQuestionsList"></div>

      <!-- 終了・採点ボタン（本番モード時） -->
      <div id="examSubmitArea" style="text-align:center; margin:36px 0 60px; display:${examMode === 'exam' ? 'block' : 'none'};">
        <button type="button" id="btnSubmitExam" style="background:#2f855a; color:#fff; border:none; padding:16px 48px; border-radius:9999px; font-size:1.15rem; font-weight:800; box-shadow:0 8px 20px rgba(47,133,90,0.25); cursor:pointer; transition:transform 0.2s;">
          <i class="fas fa-check-double"></i> テストを終了して採点する
        </button>
      </div>

      <!-- リザルトモーダル/エリア -->
      <div id="toeicResultContainer" style="display:none; margin-bottom:50px;"></div>
    `;

    renderQuestions();
    setupControlBarListeners();

    if (examMode === 'exam') {
      startTimer();
    }
  }

  function renderQuestions() {
    const listEl = document.getElementById('toeicQuestionsList');
    if (!listEl) return;

    let currentPassageId = null;
    let html = '';

    currentQuestions.forEach((q, idx) => {
      const isBookmarked = bookmarkedQids.has(q.id);
      const isAnswered = !!userAnswers[q.id];
      const selectedVal = userAnswers[q.id];

      // パッセージ（長文）の開始判定（Part 6 または Part 7）
      const hasPassage = (q.part === 6 || q.part === 7) && q.passageHtml;
      const isNewPassage = hasPassage && (q.passageId !== currentPassageId);

      if (isNewPassage) {
        currentPassageId = q.passageId;
        html += `
          <div class="toeic-passage-container" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:22px; margin-top:30px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:2px solid #cbd5e0; padding-bottom:8px;">
              <span style="font-size:0.92rem; font-weight:800; color:#2b6cb0;">
                <i class="fas fa-file-alt"></i> ${q.passageTitle || `Part ${q.part} Passage`}
              </span>
              <span style="font-size:0.8rem; background:#ebf8ff; color:#2b6cb0; padding:2px 8px; border-radius:6px; font-weight:700;">
                Part ${q.part}
              </span>
            </div>
            <div class="toeic-passage-content" style="line-height:1.75; font-size:0.96rem; color:#2d3748; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
              ${q.passageHtml}
            </div>
          </div>
        `;
      }

      // 設問カード
      html += `
        <div class="quiz-card toeic-q-card ${isAnswered ? 'is-answered' : ''}" id="card-${q.id}" data-qid="${q.id}" data-part="${q.part}" style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:22px 26px; margin-bottom:20px; box-shadow:0 3px 10px rgba(0,0,0,0.03); transition:border-color 0.2s;">
          <div class="quiz-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="quiz-num-badge" style="background:#eef5f1; color:#2f855a; font-weight:800; font-size:0.9rem; padding:4px 12px; border-radius:8px;">
                Q${q.qNumber}
              </span>
              <span style="font-size:0.82rem; color:#718096; background:#edf2f7; padding:3px 8px; border-radius:6px;">
                Part ${q.part} ｜ ${q.category || 'Reading'}
              </span>
            </div>
            <button type="button" class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-qid="${q.id}" style="background:none; border:none; cursor:pointer; color:${isBookmarked ? '#d69e2e' : '#a0aec0'}; font-size:0.9rem; font-weight:600; display:flex; align-items:center; gap:4px;">
              <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}"></i>
              <span>${isBookmarked ? '保存中' : 'ブックマーク'}</span>
            </button>
          </div>

          <div class="quiz-question-text" style="font-size:1.05rem; font-weight:600; color:#1a202c; line-height:1.6; margin-bottom:18px;">
            ${q.question}
          </div>

          <div class="quiz-options" style="display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:14px;">
            ${q.options.map(opt => {
              const isSelected = selectedVal === opt.label;
              return `
                <div class="quiz-option ${isSelected ? 'selected' : ''}" data-qid="${q.id}" data-value="${opt.label}" style="display:flex; align-items:center; padding:12px 18px; border:1.5px solid ${isSelected ? '#3182ce' : '#e2e8f0'}; border-radius:10px; cursor:pointer; background:${isSelected ? '#ebf8ff' : '#fff'}; transition:all 0.15s;">
                  <span class="opt-label" style="font-weight:800; color:#4a5568; width:38px;">${opt.label}</span>
                  <span class="opt-text" style="color:#2d3748; font-size:0.98rem;">${opt.text}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- 解説エリア（1問1答モードで回答済み、または本番モードで採点後に表示） -->
          <div class="quiz-explanation-area" id="exp-${q.id}" style="display:none; margin-top:16px; padding:18px; border-radius:12px; background:#f7fafc; border-left:4px solid #cbd5e0;">
            <div class="quiz-result-title" style="margin-bottom:10px;"></div>
            <div class="quiz-explanation-body" style="font-size:0.94rem; color:#2d3748; line-height:1.7;"></div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
    setupQuestionOptionListeners();
    setupBookmarkListeners();
    updateAnsweredCountUI();
  }

  function setupQuestionOptionListeners() {
    const listEl = document.getElementById('toeicQuestionsList');
    if (!listEl) return;

    listEl.querySelectorAll('.quiz-option').forEach(optEl => {
      optEl.addEventListener('click', () => {
        const qid = optEl.getAttribute('data-qid');
        const val = optEl.getAttribute('data-value');
        const qObj = currentQuestions.find(q => q.id === qid);
        if (!qObj) return;

        // すでにロックされていればリターン（1問1答モードで回答済みの場合）
        if (examMode === 'practice' && userAnswers[qid]) {
          return;
        }

        userAnswers[qid] = val;

        // 選択肢のUI更新
        const card = document.getElementById(`card-${qid}`);
        card.querySelectorAll('.quiz-option').forEach(o => {
          o.classList.remove('selected', 'correct-choice', 'wrong-choice');
          o.style.borderColor = '#e2e8f0';
          o.style.background = '#fff';
        });

        optEl.classList.add('selected');
        optEl.style.borderColor = '#3182ce';
        optEl.style.background = '#ebf8ff';

        // クイックジャンプボタンの更新
        const jumpBtn = document.getElementById(`jump-${qid}`);
        if (jumpBtn) {
          jumpBtn.style.background = '#3182ce';
          jumpBtn.style.color = '#fff';
          jumpBtn.style.borderColor = '#2b6cb0';
        }

        updateAnsweredCountUI();

        // 1問1答モードの場合は即時に解説を表示
        if (examMode === 'practice') {
          showQuestionExplanation(qObj, val, card);
        }
      });
    });
  }

  function showQuestionExplanation(qObj, userVal, card) {
    const expArea = card.querySelector('.quiz-explanation-area');
    const resultTitle = card.querySelector('.quiz-result-title');
    const expBody = card.querySelector('.quiz-explanation-body');
    if (!expArea || !resultTitle || !expBody) return;

    const isCorrect = (userVal === qObj.answer);

    // 選択肢に色付け
    card.querySelectorAll('.quiz-option').forEach(o => {
      o.style.cursor = 'default';
      const oVal = o.getAttribute('data-value');
      if (oVal === qObj.answer) {
        o.style.borderColor = '#38a169';
        o.style.background = '#f0fff4';
        o.querySelector('.opt-label').innerHTML = `<i class="fas fa-check" style="color:#2f855a;"></i> ${oVal}`;
      } else if (oVal === userVal && !isCorrect) {
        o.style.borderColor = '#e53e3e';
        o.style.background = '#fff5f5';
        o.querySelector('.opt-label').innerHTML = `<i class="fas fa-times" style="color:#c53030;"></i> ${oVal}`;
      }
    });

    if (isCorrect) {
      expArea.style.borderLeftColor = '#38a169';
      expArea.style.background = '#f0fff4';
      resultTitle.innerHTML = `<span style="color:#2f855a; font-weight:800; font-size:1.1rem;"><i class="fas fa-check-circle"></i> 正解！ [正解: ${qObj.answer}]</span>`;
    } else {
      expArea.style.borderLeftColor = '#e53e3e';
      expArea.style.background = '#fff5f5';
      resultTitle.innerHTML = `<span style="color:#c53030; font-weight:800; font-size:1.1rem;"><i class="fas fa-times-circle"></i> 不正解... [正解: ${qObj.answer} ｜ あなたの回答: ${userVal}]</span>`;
    }

    let vocabHtml = '';
    if (qObj.vocabulary && qObj.vocabulary.length > 0) {
      vocabHtml = `
        <div style="margin-top:12px; padding:10px 14px; background:#fff; border:1px solid #e2e8f0; border-radius:8px;">
          <strong style="color:#2b6cb0; font-size:0.88rem;"><i class="fas fa-spell-check"></i> 重要ボキャブラリー・表現：</strong>
          <ul style="margin:6px 0 0 16px; padding:0; font-size:0.88rem; color:#4a5568;">
            ${qObj.vocabulary.map(v => `<li><strong>${v.word}</strong>: ${v.meaning}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    expBody.innerHTML = `
      <div style="margin-bottom:10px;">
        <strong style="color:#2d3748;">【解答の根拠・ポイント】</strong><br>
        ${qObj.explanation}
      </div>
      <div style="margin-bottom:10px; padding:8px 12px; background:#fff; border-radius:6px; border:1px solid #edf2f7;">
        <strong style="color:#4a5568; font-size:0.88rem;">【日本語訳】</strong><br>
        <span style="font-size:0.9rem; color:#4a5568;">${qObj.translation}</span>
      </div>
      ${vocabHtml}
    `;

    expArea.style.display = 'block';
  }

  function setupBookmarkListeners() {
    const listEl = document.getElementById('toeicQuestionsList');
    if (!listEl) return;

    listEl.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.getAttribute('data-qid');
        if (bookmarkedQids.has(qid)) {
          bookmarkedQids.delete(qid);
          btn.classList.remove('active');
          btn.style.color = '#a0aec0';
          btn.innerHTML = '<i class="far fa-star"></i> <span>ブックマーク</span>';
        } else {
          bookmarkedQids.add(qid);
          btn.classList.add('active');
          btn.style.color = '#d69e2e';
          btn.innerHTML = '<i class="fas fa-star"></i> <span>保存中</span>';
        }
        saveBookmarks();
      });
    });
  }

  function setupControlBarListeners() {
    // モード切り替え
    const btnPractice = document.getElementById('btnModePractice');
    const btnExam = document.getElementById('btnModeExam');
    const timerArea = document.getElementById('toeicTimerArea');
    const submitArea = document.getElementById('examSubmitArea');

    if (btnPractice && btnExam) {
      btnPractice.addEventListener('click', () => {
        if (examMode === 'practice') return;
        examMode = 'practice';
        btnPractice.classList.add('active');
        btnPractice.style.background = '#3182ce';
        btnPractice.style.color = '#fff';
        btnExam.classList.remove('active');
        btnExam.style.background = 'transparent';
        btnExam.style.color = '#4a5568';
        if (timerArea) timerArea.style.display = 'none';
        if (submitArea) submitArea.style.display = 'none';
        stopTimer();
        renderQuestions();
      });

      btnExam.addEventListener('click', () => {
        if (examMode === 'exam') return;
        examMode = 'exam';
        btnExam.classList.add('active');
        btnExam.style.background = '#3182ce';
        btnExam.style.color = '#fff';
        btnPractice.classList.remove('active');
        btnPractice.style.background = 'transparent';
        btnPractice.style.color = '#4a5568';
        if (timerArea) timerArea.style.display = 'flex';
        if (submitArea) submitArea.style.display = 'block';
        startTimer();
        renderQuestions();
      });
    }

    // タイマー一時停止
    const btnPause = document.getElementById('btnTimerPause');
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

    // クイックジャンプ
    document.querySelectorAll('.q-jump-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const target = document.getElementById(`card-${qid}`);
        if (target) {
          const yOffset = -90;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

    // 採点ボタン
    const btnSubmit = document.getElementById('btnSubmitExam');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        const unanswered = currentQuestions.filter(q => !userAnswers[q.id]);
        if (unanswered.length > 0) {
          const ok = confirm(`まだ未回答の問題が ${unanswered.length} 問あります。テストを終了して採点しますか？`);
          if (!ok) return;
        }
        submitAndScoreExam();
      });
    }

    // 印刷
    const btnPrint = document.getElementById('btnPrintToeic');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }
  }

  function startTimer() {
    stopTimer();
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        stopTimer();
        alert('【時間終了】37分が経過しました。採点画面を表示します。');
        submitAndScoreExam();
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
    if (!el) return;
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    el.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateAnsweredCountUI() {
    const total = currentQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;
    const summaryText = document.getElementById('answeredSummaryText');
    if (summaryText) {
      summaryText.innerText = `回答済: ${answeredCount} / ${total} 問`;
    }

    // プログレスバー
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (progressFill && progressText) {
      const pct = Math.round((answeredCount / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.innerText = `進捗: ${answeredCount} / ${total} 問完了 (${pct}%)`;
    }
  }

  // 採点・リザルト表示
  function submitAndScoreExam() {
    stopTimer();

    let correctCount = 0;
    const partStats = {
      5: { total: 0, correct: 0 },
      6: { total: 0, correct: 0 },
      7: { total: 0, correct: 0 }
    };

    currentQuestions.forEach(q => {
      const isCorrect = (userAnswers[q.id] === q.answer);
      if (isCorrect) correctCount++;
      if (partStats[q.part]) {
        partStats[q.part].total++;
        if (isCorrect) partStats[q.part].correct++;
      }

      // 全問の解説を展開
      const card = document.getElementById(`card-${q.id}`);
      if (card) {
        showQuestionExplanation(q, userAnswers[q.id], card);
      }
    });

    // スコア推定計算 (50問中 -> リーディング495点満点スケール)
    const rawRate = (correctCount / currentQuestions.length);
    let estimatedScore = 0;
    if (correctCount >= 48) estimatedScore = 475;
    else if (correctCount >= 45) estimatedScore = 450;
    else if (correctCount >= 40) estimatedScore = 400;
    else if (correctCount >= 35) estimatedScore = 350;
    else if (correctCount >= 30) estimatedScore = 300;
    else if (correctCount >= 25) estimatedScore = 250;
    else if (correctCount >= 20) estimatedScore = 200;
    else estimatedScore = Math.max(50, Math.round(correctCount * 9.5));

    // 結果表示カード
    const resultContainer = document.getElementById('toeicResultContainer');
    if (!resultContainer) return;

    resultContainer.innerHTML = `
      <div style="background:#fff; border:2px solid #2f855a; border-radius:20px; padding:32px; box-shadow:0 12px 36px rgba(47,133,90,0.12); text-align:center;">
        <span style="background:#eef5f1; color:#2f855a; font-weight:800; padding:6px 18px; border-radius:9999px; font-size:0.9rem;">
          <i class="fas fa-award"></i> 実戦ハーフ模試 採点結果
        </span>
        <h2 style="font-size:2rem; font-weight:800; color:#1a202c; margin:16px 0 8px;">
          スコア判定: リーディング換算 <span style="color:#2f855a;">約${estimatedScore}点</span> / 495点満点
        </h2>
        <p style="color:#4a5568; font-size:1.1rem; margin-bottom:24px;">
          正解数: <strong>${correctCount}問</strong> / 全${currentQuestions.length}問 （正答率: ${Math.round(rawRate * 100)}%）
        </p>

        <!-- パート別正答率 -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin:24px 0; text-align:left;">
          <div style="background:#f7fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
            <div style="font-weight:700; color:#2d3748; font-size:0.95rem;">Part 5（短文穴埋め）</div>
            <div style="font-size:1.4rem; font-weight:800; color:#2b6cb0; margin:4px 0;">
              ${partStats[5].correct} / ${partStats[5].total}
              <span style="font-size:0.85rem; color:#718096; font-weight:600;">(${Math.round((partStats[5].correct / partStats[5].total) * 100)}%)</span>
            </div>
            <p style="font-size:0.82rem; color:#718096; margin:0;">品詞・動詞・文法・語彙力</p>
          </div>

          <div style="background:#f7fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
            <div style="font-weight:700; color:#2d3748; font-size:0.95rem;">Part 6（長文穴埋め）</div>
            <div style="font-size:1.4rem; font-weight:800; color:#805ad5; margin:4px 0;">
              ${partStats[6].correct} / ${partStats[6].total}
              <span style="font-size:0.85rem; color:#718096; font-weight:600;">(${Math.round((partStats[6].correct / partStats[6].total) * 100)}%)</span>
            </div>
            <p style="font-size:0.82rem; color:#718096; margin:0;">文脈把握・文挿入・接続詞</p>
          </div>

          <div style="background:#f7fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
            <div style="font-weight:700; color:#2d3748; font-size:0.95rem;">Part 7（読解問題）</div>
            <div style="font-size:1.4rem; font-weight:800; color:#dd6b20; margin:4px 0;">
              ${partStats[7].correct} / ${partStats[7].total}
              <span style="font-size:0.85rem; color:#718096; font-weight:600;">(${Math.round((partStats[7].correct / partStats[7].total) * 100)}%)</span>
            </div>
            <p style="font-size:0.82rem; color:#718096; margin:0;">情報探索・複数文書クロス照合</p>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:16px; margin-top:24px; flex-wrap:wrap;">
          <button type="button" id="btnReviewAll" style="background:#2f855a; color:#fff; border:none; padding:12px 28px; border-radius:9999px; font-weight:700; font-size:0.95rem; cursor:pointer;">
            <i class="fas fa-list-ul"></i> 下部の全問解説を確認する
          </button>
          <button type="button" id="btnRetryMock" style="background:#edf2f7; color:#2d3748; border:none; padding:12px 28px; border-radius:9999px; font-weight:700; font-size:0.95rem; cursor:pointer;">
            <i class="fas fa-redo"></i> もう一度挑戦する
          </button>
        </div>
      </div>
    `;

    resultContainer.style.display = 'block';

    // 画面上部へスクロール
    const y = resultContainer.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });

    // ボタンのイベント
    const btnReview = document.getElementById('btnReviewAll');
    if (btnReview) {
      btnReview.addEventListener('click', () => {
        const firstCard = document.querySelector('.toeic-q-card');
        if (firstCard) {
          const cardY = firstCard.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: cardY, behavior: 'smooth' });
        }
      });
    }

    const btnRetry = document.getElementById('btnRetryMock');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        loadSession(currentSession.id);
      });
    }
  }

  // 初期化実行
  document.addEventListener('DOMContentLoaded', init);
})();
