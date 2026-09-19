/**
 * TOEIC L&R 想定ハーフ模試 レンダラー (toeic-mock-renderer.js)
 * Shikakus / Kakutoku
 */
(function () {
  'use strict';

  // 登録されている模試データリスト
  const MOCK_SESSIONS = [
    { id: 'mock-01', title: '第1回 想定ハーフ模試', meta: '全50問 ｜ 基準時間: 37分 ｜ Part5〜7完全網羅', dataVar: 'TOEIC_MOCK_DATA_01' }
  ];

  let currentSession = null;
  let currentQuestions = [];
  let userAnswers = {}; // { qId: selectedOption }
  let practiceUserAnswers = {}; // 1問1答モード用の一時解答
  let bookmarkedQids = new Set();
  let examMode = 'practice'; // 'practice' (1問1答・ウィザード形式) or 'exam' (実戦テスト・タイマー付き)

  // 1問1答モード用インデックス
  let practiceCurrentIndex = 0;

  // タイマー関連
  let timerInterval = null;
  let customDurationMinutes = 37; // ユーザー設定時間（デフォルト37分）
  let timeRemaining = 37 * 60;
  let isTimerRunning = false;

  // ローカルストレージキー
  const BM_STORAGE_KEY = 'shikakus_toeic_bookmarks';

  function init() {
    loadBookmarks();
    setupSessionSelector();
    loadSession('mock-01');
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
        <span class="session-name"><i class="fas fa-file-signature" style="color:#345d4d;"></i> ${s.title}</span>
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
    practiceUserAnswers = {};
    practiceCurrentIndex = 0;
    timeRemaining = customDurationMinutes * 60;
    stopTimer();

    renderMainView();
  }

  function renderMainView() {
    const container = document.getElementById('toeicQuizContainer');
    if (!container) return;

    container.innerHTML = `
      <!-- コントロールバー（モード切替・タイマー設定・印刷） -->
      <div class="toeic-control-bar" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:18px 24px; margin-bottom:24px; box-shadow:0 4px 16px rgba(45,55,48,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          
          <!-- 左側: 模試タイトル & モード切替タブ -->
          <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
            <span style="font-weight:800; color:#1a231f; font-size:1.05rem;">
              <i class="fas fa-graduation-cap" style="color:#345d4d;"></i> ${currentSession.title}
            </span>

            <!-- モード切替ピル（サイト統一カラー: #345d4d） -->
            <div class="mode-toggle-group" style="display:inline-flex; background:#f0ece6; padding:4px; border-radius:9999px; border:1px solid #e7dfd5;">
              <button type="button" id="btnModePractice" class="mode-toggle-btn" style="border:none; padding:8px 18px; border-radius:9999px; font-size:0.88rem; font-weight:700; cursor:pointer; transition:all 0.2s; ${examMode === 'practice' ? 'background:#345d4d; color:#ffffff; box-shadow:0 2px 6px rgba(52,93,77,0.25);' : 'background:transparent; color:#4a5568;'}">
                <i class="fas fa-book-open"></i> 1問1答モード
              </button>
              <button type="button" id="btnModeExam" class="mode-toggle-btn" style="border:none; padding:8px 18px; border-radius:9999px; font-size:0.88rem; font-weight:700; cursor:pointer; transition:all 0.2s; ${examMode === 'exam' ? 'background:#345d4d; color:#ffffff; box-shadow:0 2px 6px rgba(52,93,77,0.25);' : 'background:transparent; color:#4a5568;'}">
                <i class="fas fa-stopwatch"></i> 本番テストモード
              </button>
            </div>
          </div>

          <!-- 右側: タイマー & 印刷ボタン -->
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <!-- タイマーエリア（本番モード時） -->
            <div id="toeicTimerArea" style="display:${examMode === 'exam' ? 'flex' : 'none'}; align-items:center; gap:10px; background:#eef5f1; border:1px solid #c6e0d3; padding:6px 14px; border-radius:12px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <label for="timerDurationSelect" style="font-size:0.82rem; font-weight:700; color:#345d4d;">制限時間:</label>
                <select id="timerDurationSelect" style="font-size:0.85rem; font-weight:700; color:#345d4d; background:#fff; border:1px solid #c6e0d3; border-radius:6px; padding:3px 8px; cursor:pointer;">
                  <option value="20" ${customDurationMinutes === 20 ? 'selected' : ''}>20分（短縮）</option>
                  <option value="30" ${customDurationMinutes === 30 ? 'selected' : ''}>30分（スピード）</option>
                  <option value="37" ${customDurationMinutes === 37 ? 'selected' : ''}>37分（標準）</option>
                  <option value="45" ${customDurationMinutes === 45 ? 'selected' : ''}>45分（じっくり）</option>
                  <option value="60" ${customDurationMinutes === 60 ? 'selected' : ''}>60分（余裕）</option>
                </select>
              </div>

              <div style="color:#2f855a; font-weight:800; font-size:1.15rem; font-family:monospace; display:flex; align-items:center; gap:6px; padding-left:8px; border-left:1px solid #c6e0d3;">
                <i class="fas fa-clock"></i> <span id="timerDisplay">${String(customDurationMinutes).padStart(2, '0')}:00</span>
              </div>

              <button type="button" id="btnTimerPause" style="padding:4px 10px; font-size:0.8rem; background:#fff; color:#345d4d; border:1px solid #c6e0d3; border-radius:6px; cursor:pointer; font-weight:600;">
                <i class="fas fa-pause"></i> 一時停止
              </button>
            </div>

            <!-- 印刷ボタン -->
            <button type="button" id="btnPrintToeic" class="btn-pill btn-pill-outline" style="padding:7px 16px; font-size:0.85rem;">
              <i class="fas fa-print"></i> 模試を印刷
            </button>
          </div>

        </div>

        <!-- 進捗プログレスバー -->
        <div style="margin-top:16px; padding-top:14px; border-top:1px solid #e7dfd5;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span id="toeicProgressText" style="font-size:0.88rem; font-weight:700; color:#345d4d;">進捗: 読み込み中...</span>
            <span id="toeicAnsweredMeta" style="font-size:0.82rem; color:#718096;">全50問</span>
          </div>
          <div style="background:#e2e8f0; height:8px; border-radius:9999px; overflow:hidden;">
            <div id="toeicProgressFill" style="background:#345d4d; width:0%; height:100%; border-radius:9999px; transition:width 0.25s ease;"></div>
          </div>
        </div>
      </div>

      <!-- メインコンテンツ描画エリア -->
      <div id="toeicMainContent"></div>

      <!-- リザルト画面エリア -->
      <div id="toeicResultArea" style="display:none; margin-bottom:60px;"></div>
    `;

    setupControlBarEvents();

    if (examMode === 'practice') {
      renderPracticeView();
    } else {
      renderExamView();
      startTimer();
    }
  }

  function setupControlBarEvents() {
    const btnPractice = document.getElementById('btnModePractice');
    const btnExam = document.getElementById('btnModeExam');
    const timerSelect = document.getElementById('timerDurationSelect');
    const btnPause = document.getElementById('btnTimerPause');
    const btnPrint = document.getElementById('btnPrintToeic');

    if (btnPractice) {
      btnPractice.addEventListener('click', () => {
        if (examMode === 'practice') return;
        examMode = 'practice';
        stopTimer();
        renderMainView();
      });
    }

    if (btnExam) {
      btnExam.addEventListener('click', () => {
        if (examMode === 'exam') return;
        examMode = 'exam';
        userAnswers = {};
        renderMainView();
      });
    }

    if (timerSelect) {
      timerSelect.addEventListener('change', (e) => {
        customDurationMinutes = parseInt(e.target.value, 10) || 37;
        timeRemaining = customDurationMinutes * 60;
        updateTimerDisplay();
        startTimer();
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
        window.print();
      });
    }
  }

  // ========================================================
  // 1. 1問1答モード（1問ずつウィザード形式で表示・解説即時展開）
  // ========================================================
  function renderPracticeView() {
    const content = document.getElementById('toeicMainContent');
    if (!content) return;

    const total = currentQuestions.length;
    const q = currentQuestions[practiceCurrentIndex];
    if (!q) return;

    // プログレスバー更新
    const answeredCount = Object.keys(practiceUserAnswers).length;
    const progressFill = document.getElementById('toeicProgressFill');
    const progressText = document.getElementById('toeicProgressText');
    const answeredMeta = document.getElementById('toeicAnsweredMeta');
    if (progressFill && progressText) {
      const pct = Math.round(((practiceCurrentIndex + 1) / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.innerText = `第 ${practiceCurrentIndex + 1} 問 / 全 ${total} 問 (Part ${q.part}・${q.category || 'Reading'})`;
      if (answeredMeta) answeredMeta.innerText = `回答済: ${answeredCount} / ${total} 問`;
    }

    const isBookmarked = bookmarkedQids.has(q.id);
    const existingAnswer = practiceUserAnswers[q.id];
    const isAnswered = !!existingAnswer;

    // パッセージ（Part 6またはPart 7）のHTML
    let passageSectionHtml = '';
    if ((q.part === 6 || q.part === 7) && q.passageHtml) {
      passageSectionHtml = `
        <div class="toeic-passage-card" style="background:#f8fafc; border:1px solid #e7dfd5; border-radius:16px; padding:22px 26px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:2px solid #cbd5e0; padding-bottom:8px;">
            <span style="font-size:0.95rem; font-weight:800; color:#345d4d;">
              <i class="fas fa-file-alt"></i> ${q.passageTitle || `Part ${q.part} Passage`}
            </span>
            <span style="font-size:0.8rem; background:#eef5f1; color:#345d4d; padding:3px 10px; border-radius:6px; font-weight:800;">
              Part ${q.part}
            </span>
          </div>
          <div class="toeic-passage-body" style="line-height:1.75; font-size:0.98rem; color:#2d3748; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
            ${q.passageHtml}
          </div>
        </div>
      `;
    }

    content.innerHTML = `
      ${passageSectionHtml}

      <!-- 設問カード -->
      <div class="quiz-card toeic-practice-card" id="practiceCard" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:26px 28px; box-shadow:0 4px 16px rgba(45,55,48,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="background:#eef5f1; color:#345d4d; font-weight:800; font-size:0.95rem; padding:4px 14px; border-radius:8px;">
              Q${q.qNumber}
            </span>
            <span style="font-size:0.85rem; color:#6b7770; background:#f0ece6; padding:3px 10px; border-radius:6px; font-weight:600;">
              Part ${q.part} ｜ ${q.category || 'Reading'}
            </span>
          </div>

          <button type="button" class="bookmark-btn" id="practiceBookmarkBtn" style="background:none; border:none; cursor:pointer; color:${isBookmarked ? '#d69e2e' : '#a0aec0'}; font-size:0.92rem; font-weight:700; display:flex; align-items:center; gap:5px;">
            <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}"></i>
            <span>${isBookmarked ? '保存中' : 'ブックマーク'}</span>
          </button>
        </div>

        <!-- 設問文 -->
        <div style="font-size:1.15rem; font-weight:700; color:#1a231f; line-height:1.65; margin-bottom:20px;">
          ${q.question}
        </div>

        <!-- 選択肢リスト -->
        <div class="quiz-options-list" style="display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:20px;">
          ${q.options.map(opt => {
            const isSelected = (existingAnswer === opt.label);
            const isCorrect = (opt.label === q.answer);
            let optStyle = "display:flex; align-items:center; padding:14px 20px; border:1.5px solid #e2e8f0; border-radius:12px; cursor:pointer; background:#fff; transition:all 0.15s;";
            let labelBadge = `<span style="font-weight:800; color:#4a5568; width:40px; font-size:1rem;">${opt.label}</span>`;

            if (isAnswered) {
              optStyle += " cursor:default;";
              if (isCorrect) {
                optStyle = "display:flex; align-items:center; padding:14px 20px; border:2px solid #2f855a; border-radius:12px; cursor:default; background:#f0fff4;";
                labelBadge = `<span style="font-weight:800; color:#2f855a; width:40px; font-size:1rem;"><i class="fas fa-check-circle"></i> ${opt.label}</span>`;
              } else if (isSelected && !isCorrect) {
                optStyle = "display:flex; align-items:center; padding:14px 20px; border:2px solid #c53030; border-radius:12px; cursor:default; background:#fff5f5;";
                labelBadge = `<span style="font-weight:800; color:#c53030; width:40px; font-size:1rem;"><i class="fas fa-times-circle"></i> ${opt.label}</span>`;
              }
            }

            return `
              <div class="practice-opt ${isAnswered ? 'locked' : ''}" data-value="${opt.label}" style="${optStyle}">
                ${labelBadge}
                <span style="color:#2d3748; font-size:1.02rem; font-weight:500;">${opt.text}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- 解説エリア -->
        <div id="practiceExpArea" style="display:${isAnswered ? 'block' : 'none'}; margin-top:20px; padding:22px; border-radius:14px; background:${existingAnswer === q.answer ? '#f0fff4' : '#fff5f5'}; border-left:5px solid ${existingAnswer === q.answer ? '#2f855a' : '#c53030'};">
          <div style="font-size:1.15rem; font-weight:800; color:${existingAnswer === q.answer ? '#2f855a' : '#c53030'}; margin-bottom:12px;">
            <i class="fas ${existingAnswer === q.answer ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
            ${existingAnswer === q.answer ? '正解！' : '不正解...'} 
            <span style="font-size:0.95rem; font-weight:700; color:#4a5568; margin-left:8px;">[正解: ${q.answer}]</span>
          </div>

          <div style="margin-bottom:14px; font-size:0.96rem; color:#2d3748; line-height:1.75;">
            <strong style="color:#1a231f;">【解答の根拠・ポイント】</strong><br>
            ${q.explanation}
          </div>

          <div style="margin-bottom:14px; padding:10px 14px; background:#fff; border-radius:8px; border:1px solid #e7dfd5;">
            <strong style="color:#345d4d; font-size:0.9rem;">【日本語訳】</strong><br>
            <span style="font-size:0.92rem; color:#4a5568; line-height:1.7;">${q.translation}</span>
          </div>

          ${q.vocabulary && q.vocabulary.length > 0 ? `
            <div style="padding:10px 14px; background:#fff; border:1px solid #e7dfd5; border-radius:8px;">
              <strong style="color:#345d4d; font-size:0.9rem;"><i class="fas fa-spell-check"></i> 重要ボキャブラリー・表現：</strong>
              <ul style="margin:6px 0 0 18px; padding:0; font-size:0.9rem; color:#4a5568; line-height:1.65;">
                ${q.vocabulary.map(v => `<li><strong>${v.word}</strong>: ${v.meaning}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- ナビゲーションボタン（前の問題へ / 次の問題へ） -->
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

    // 選択肢クリックイベント
    content.querySelectorAll('.practice-opt').forEach(optEl => {
      optEl.addEventListener('click', () => {
        if (practiceUserAnswers[q.id]) return; // 回答済なら変更不可

        const chosenVal = optEl.getAttribute('data-value');
        practiceUserAnswers[q.id] = chosenVal;

        // 再描画して解説を表示
        renderPracticeView();
      });
    });

    // ブックマーク
    const bmBtn = document.getElementById('practiceBookmarkBtn');
    if (bmBtn) {
      bmBtn.addEventListener('click', () => {
        if (bookmarkedQids.has(q.id)) {
          bookmarkedQids.delete(q.id);
        } else {
          bookmarkedQids.add(q.id);
        }
        saveBookmarks();
        renderPracticeView();
      });
    }

    // 前へボタン
    const prevBtn = document.getElementById('btnPracticePrev');
    if (prevBtn && practiceCurrentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        practiceCurrentIndex--;
        renderPracticeView();
        window.scrollTo({ top: content.offsetTop - 80, behavior: 'smooth' });
      });
    }

    // 次へボタン
    const nextBtn = document.getElementById('btnPracticeNext');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (practiceCurrentIndex < total - 1) {
          practiceCurrentIndex++;
          renderPracticeView();
          window.scrollTo({ top: content.offsetTop - 80, behavior: 'smooth' });
        } else {
          // 最終問題ならリザルト画面を表示
          showFinalResults(practiceUserAnswers);
        }
      });
    }
  }

  // ========================================================
  // 2. 本番テストモード（全問リスト表示・タイマー付き・一括採点）
  // ========================================================
  function renderExamView() {
    const content = document.getElementById('toeicMainContent');
    if (!content) return;

    let currentPassageId = null;
    let html = '';

    currentQuestions.forEach((q, idx) => {
      const isBookmarked = bookmarkedQids.has(q.id);
      const selectedVal = userAnswers[q.id];

      // パッセージ（Part 6 または Part 7）
      const hasPassage = (q.part === 6 || q.part === 7) && q.passageHtml;
      const isNewPassage = hasPassage && (q.passageId !== currentPassageId);

      if (isNewPassage) {
        currentPassageId = q.passageId;
        html += `
          <div class="toeic-passage-container" style="background:#f8fafc; border:1px solid #e7dfd5; border-radius:18px; padding:24px 28px; margin-top:32px; margin-bottom:20px; box-shadow:0 3px 12px rgba(45,55,48,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:2px solid #cbd5e0; padding-bottom:8px;">
              <span style="font-size:0.98rem; font-weight:800; color:#345d4d;">
                <i class="fas fa-file-alt"></i> ${q.passageTitle || `Part ${q.part} Passage`}
              </span>
              <span style="font-size:0.82rem; background:#eef5f1; color:#345d4d; padding:4px 12px; border-radius:6px; font-weight:800;">
                Part ${q.part}
              </span>
            </div>
            <div class="toeic-passage-content" style="line-height:1.75; font-size:0.98rem; color:#2d3748; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
              ${q.passageHtml}
            </div>
          </div>
        `;
      }

      // 設問カード（本番テスト用）
      html += `
        <div class="quiz-card toeic-exam-q-card" id="examCard-${q.id}" data-qid="${q.id}" style="background:#fff; border:1px solid #e7dfd5; border-radius:18px; padding:24px 28px; margin-bottom:20px; box-shadow:0 4px 16px rgba(45,55,48,0.03);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="background:#eef5f1; color:#345d4d; font-weight:800; font-size:0.95rem; padding:4px 12px; border-radius:8px;">
                Q${q.qNumber}
              </span>
              <span style="font-size:0.85rem; color:#6b7770; background:#f0ece6; padding:3px 10px; border-radius:6px; font-weight:600;">
                Part ${q.part} ｜ ${q.category || 'Reading'}
              </span>
            </div>

            <button type="button" class="exam-bookmark-btn" data-qid="${q.id}" style="background:none; border:none; cursor:pointer; color:${isBookmarked ? '#d69e2e' : '#a0aec0'}; font-size:0.9rem; font-weight:700; display:flex; align-items:center; gap:4px;">
              <i class="${isBookmarked ? 'fas fa-star' : 'far fa-star'}"></i>
              <span>${isBookmarked ? '保存中' : 'ブックマーク'}</span>
            </button>
          </div>

          <div style="font-size:1.1rem; font-weight:700; color:#1a231f; line-height:1.65; margin-bottom:18px;">
            ${q.question}
          </div>

          <!-- 選択肢リスト（選択状態が確実に分かるデザイン: 枠線#345d4d、背景#eef5f1、チェックマーク） -->
          <div class="exam-options-group" style="display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:10px;">
            ${q.options.map(opt => {
              const isSelected = (selectedVal === opt.label);
              return `
                <div class="exam-opt ${isSelected ? 'is-selected' : ''}" data-qid="${q.id}" data-value="${opt.label}" style="display:flex; justify-content:space-between; align-items:center; padding:13px 18px; border:2px solid ${isSelected ? '#345d4d' : '#e2e8f0'}; border-radius:12px; cursor:pointer; background:${isSelected ? '#eef5f1' : '#fff'}; transition:all 0.15s;">
                  <div style="display:flex; align-items:center;">
                    <span class="opt-badge" style="display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:8px; font-weight:800; font-size:0.92rem; margin-right:12px; ${isSelected ? 'background:#345d4d; color:#ffffff;' : 'background:#f0ece6; color:#4a5568;'}">
                      ${opt.label.replace(/[()]/g, '')}
                    </span>
                    <span style="color:#2d3748; font-size:1rem; font-weight:${isSelected ? '700' : '500'};">${opt.text}</span>
                  </div>

                  <!-- 選択マークインジケーター -->
                  <div class="select-indicator" style="color:#345d4d; font-size:1.15rem;">
                    ${isSelected ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle" style="color:#cbd5e0;"></i>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    // 提出ボタン
    html += `
      <div style="text-align:center; margin:40px 0 60px;">
        <button type="button" id="btnSubmitExam" style="background:#345d4d; color:#fff; border:none; padding:16px 54px; border-radius:9999px; font-size:1.2rem; font-weight:800; box-shadow:0 8px 24px rgba(52,93,77,0.3); cursor:pointer; transition:transform 0.2s;">
          <i class="fas fa-check-double"></i> テストを終了して採点する
        </button>
      </div>
    `;

    content.innerHTML = html;

    setupExamOptionEvents();
    setupExamBookmarkEvents();
    updateExamProgressUI();

    // 採点ボタンイベント
    const submitBtn = document.getElementById('btnSubmitExam');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const total = currentQuestions.length;
        const answeredCount = Object.keys(userAnswers).length;
        if (answeredCount < total) {
          const ok = confirm(`まだ未回答の問題が ${total - answeredCount} 問あります。このまま採点しますか？`);
          if (!ok) return;
        }
        submitExamAndShowResult();
      });
    }
  }

  function setupExamOptionEvents() {
    const content = document.getElementById('toeicMainContent');
    if (!content) return;

    content.querySelectorAll('.exam-opt').forEach(optEl => {
      optEl.addEventListener('click', () => {
        const qid = optEl.getAttribute('data-qid');
        const val = optEl.getAttribute('data-value');
        userAnswers[qid] = val;

        const card = document.getElementById(`examCard-${qid}`);
        if (!card) return;

        // カード内の選択肢の見た目を更新（一目で選択中が分かるように）
        card.querySelectorAll('.exam-opt').forEach(o => {
          o.classList.remove('is-selected');
          o.style.borderColor = '#e2e8f0';
          o.style.background = '#fff';
          const badge = o.querySelector('.opt-badge');
          if (badge) {
            badge.style.background = '#f0ece6';
            badge.style.color = '#4a5568';
          }
          const indicator = o.querySelector('.select-indicator');
          if (indicator) {
            indicator.innerHTML = '<i class="far fa-circle" style="color:#cbd5e0;"></i>';
          }
          const text = o.querySelector('span:nth-child(2)');
          if (text) text.style.fontWeight = '500';
        });

        // 選択された要素をアクティブ化
        optEl.classList.add('is-selected');
        optEl.style.borderColor = '#345d4d';
        optEl.style.background = '#eef5f1';
        const badge = optEl.querySelector('.opt-badge');
        if (badge) {
          badge.style.background = '#345d4d';
          badge.style.color = '#ffffff';
        }
        const indicator = optEl.querySelector('.select-indicator');
        if (indicator) {
          indicator.innerHTML = '<i class="fas fa-check-circle" style="color:#345d4d;"></i>';
        }
        const text = optEl.querySelector('span:nth-child(2)');
        if (text) text.style.fontWeight = '700';

        updateExamProgressUI();
      });
    });
  }

  function setupExamBookmarkEvents() {
    const content = document.getElementById('toeicMainContent');
    if (!content) return;

    content.querySelectorAll('.exam-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.getAttribute('data-qid');
        if (bookmarkedQids.has(qid)) {
          bookmarkedQids.delete(qid);
          btn.style.color = '#a0aec0';
          btn.innerHTML = '<i class="far fa-star"></i> <span>ブックマーク</span>';
        } else {
          bookmarkedQids.add(qid);
          btn.style.color = '#d69e2e';
          btn.innerHTML = '<i class="fas fa-star"></i> <span>保存中</span>';
        }
        saveBookmarks();
      });
    });
  }

  function updateExamProgressUI() {
    const total = currentQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;
    const progressFill = document.getElementById('toeicProgressFill');
    const progressText = document.getElementById('toeicProgressText');
    const answeredMeta = document.getElementById('toeicAnsweredMeta');

    if (progressFill && progressText) {
      const pct = Math.round((answeredCount / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.innerText = `進捗: ${answeredCount} / ${total} 問完了 (${pct}%)`;
      if (answeredMeta) answeredMeta.innerText = `未回答: ${total - answeredCount} 問`;
    }
  }

  function submitExamAndShowResult() {
    stopTimer();
    showFinalResults(userAnswers);
  }

  // ========================================================
  // 3. 採点・リザルト画面
  // ========================================================
  function showFinalResults(answersObj) {
    const resultArea = document.getElementById('toeicResultArea');
    if (!resultArea) return;

    let correctCount = 0;
    const partStats = {
      5: { total: 0, correct: 0 },
      6: { total: 0, correct: 0 },
      7: { total: 0, correct: 0 }
    };

    currentQuestions.forEach(q => {
      const isCorrect = (answersObj[q.id] === q.answer);
      if (isCorrect) correctCount++;
      if (partStats[q.part]) {
        partStats[q.part].total++;
        if (isCorrect) partStats[q.part].correct++;
      }
    });

    const total = currentQuestions.length;
    const ratePct = Math.round((correctCount / total) * 100);

    // リーディング換算スコア推定 (495点満点スケール)
    let estScore = 0;
    if (correctCount >= 48) estScore = 480;
    else if (correctCount >= 45) estScore = 455;
    else if (correctCount >= 40) estScore = 410;
    else if (correctCount >= 35) estScore = 360;
    else if (correctCount >= 30) estScore = 310;
    else if (correctCount >= 25) estScore = 260;
    else if (correctCount >= 20) estScore = 210;
    else estScore = Math.max(50, Math.round(correctCount * 9.5));

    resultArea.innerHTML = `
      <div style="background:#fff; border:2px solid #345d4d; border-radius:24px; padding:36px; box-shadow:0 16px 40px rgba(52,93,77,0.12); text-align:center;">
        <span style="background:#eef5f1; color:#345d4d; font-weight:800; padding:6px 20px; border-radius:9999px; font-size:0.92rem;">
          <i class="fas fa-award"></i> ハーフ模試 採点結果
        </span>
        <h2 style="font-size:2.2rem; font-weight:800; color:#1a231f; margin:18px 0 8px;">
          スコア判定: リーディング換算 <span style="color:#345d4d;">約 ${estScore} 点</span> / 495点満点
        </h2>
        <p style="color:#6b7770; font-size:1.1rem; margin-bottom:28px;">
          正解数: <strong style="color:#1a231f;">${correctCount}問</strong> / 全${total}問 （正答率: ${ratePct}%）
        </p>

        <!-- パート別正答率 -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:18px; margin:28px 0; text-align:left;">
          <div style="background:#f8fafc; border:1px solid #e7dfd5; border-radius:14px; padding:18px;">
            <div style="font-weight:700; color:#345d4d; font-size:0.95rem;">Part 5（短文穴埋め）</div>
            <div style="font-size:1.6rem; font-weight:800; color:#1a231f; margin:6px 0;">
              ${partStats[5].correct} / ${partStats[5].total}
              <span style="font-size:0.88rem; color:#6b7770; font-weight:600;">(${Math.round((partStats[5].correct / partStats[5].total) * 100)}%)</span>
            </div>
            <p style="font-size:0.82rem; color:#718096; margin:0;">品詞・動詞・文法・基本語彙</p>
          </div>

          <div style="background:#f8fafc; border:1px solid #e7dfd5; border-radius:14px; padding:18px;">
            <div style="font-weight:700; color:#345d4d; font-size:0.95rem;">Part 6（長文穴埋め）</div>
            <div style="font-size:1.6rem; font-weight:800; color:#1a231f; margin:6px 0;">
              ${partStats[6].correct} / ${partStats[6].total}
              <span style="font-size:0.88rem; color:#6b7770; font-weight:600;">(${Math.round((partStats[6].correct / partStats[6].total) * 100)}%)</span>
            </div>
            <p style="font-size:0.82rem; color:#718096; margin:0;">文脈把握・文挿入・接続詞</p>
          </div>

          <div style="background:#f8fafc; border:1px solid #e7dfd5; border-radius:14px; padding:18px;">
            <div style="font-weight:700; color:#345d4d; font-size:0.95rem;">Part 7（読解問題）</div>
            <div style="font-size:1.6rem; font-weight:800; color:#1a231f; margin:6px 0;">
              ${partStats[7].correct} / ${partStats[7].total}
              <span style="font-size:0.88rem; color:#6b7770; font-weight:600;">(${Math.round((partStats[7].correct / partStats[7].total) * 100)}%)</span>
            </div>
            <p style="font-size:0.82rem; color:#718096; margin:0;">情報探索・複数文書クロス照合</p>
          </div>
        </div>

        <!-- 再挑戦ボタン -->
        <div style="display:flex; justify-content:center; gap:16px; margin-top:28px; flex-wrap:wrap;">
          <button type="button" id="btnRestartMock" style="background:#345d4d; color:#fff; border:none; padding:12px 32px; border-radius:9999px; font-weight:800; font-size:1rem; cursor:pointer; box-shadow:0 4px 12px rgba(52,93,77,0.25);">
            <i class="fas fa-redo"></i> もう一度挑戦する
          </button>
        </div>
      </div>
    `;

    resultArea.style.display = 'block';
    const y = resultArea.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });

    const restartBtn = document.getElementById('btnRestartMock');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        resultArea.style.display = 'none';
        loadSession(currentSession.id);
      });
    }
  }

  // タイマー
  function startTimer() {
    stopTimer();
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        stopTimer();
        alert('【時間終了】設定時間が経過しました。採点画面を表示します。');
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
    if (!el) return;
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    el.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // 初期化実行
  document.addEventListener('DOMContentLoaded', init);
})();
