document.addEventListener('DOMContentLoaded', () => {
  // Tab Switching
  const tabs = document.querySelectorAll('.itpass-tab');
  const tabContents = document.querySelectorAll('.itpass-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active classes
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });

  // Group Checkboxes (Select All/None for a category group)
  const groupChecks = document.querySelectorAll('.cat-group-check');
  groupChecks.forEach(check => {
    check.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const groupDiv = e.target.closest('.category-group').querySelector('.category-items');
      const items = groupDiv.querySelectorAll('input[type="checkbox"]');
      items.forEach(item => {
        item.checked = isChecked;
      });
    });
  });


  // Bookmark Mode Switching
  const modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  modeSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');
      
      const categoryCard = document.querySelector('.session-selector-card');
      if (mode === 'bookmark') {
        if(categoryCard) categoryCard.style.display = 'none';
        startQuiz({ mode: 'bookmark', limit: Infinity });
      } else {
        if(categoryCard) categoryCard.style.display = 'block';
        document.getElementById('quiz-container').innerHTML = '<div class="card" style="text-align:center; padding:40px; color:#718096;"><i class="fas fa-clipboard-list" style="font-size:3rem; margin-bottom:15px; color:#cbd5e0;"></i><p>上のメニューから出題条件を指定して「出題開始」ボタンをクリックしてください。</p></div>';
        document.getElementById('quiz-progress-container').style.display = 'none';
      }
    });
  });

  // Global Check All / None
  document.getElementById('btn-check-all')?.addEventListener('click', () => {
    document.querySelectorAll('#tab-category input[type="checkbox"]').forEach(cb => cb.checked = true);
  });
  document.getElementById('btn-check-none')?.addEventListener('click', () => {
    document.querySelectorAll('#tab-category input[type="checkbox"]').forEach(cb => cb.checked = false);
  });

  // Exam Selection (Radio behavior but custom buttons)
  const examBtns = document.querySelectorAll('#exam-grid .session-btn');
  examBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      examBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Start Quiz (Category)
  document.getElementById('btn-start-category')?.addEventListener('click', () => {
    const selectedCategories = [];
    document.querySelectorAll('.category-items input[type="checkbox"]:checked').forEach(cb => {
      selectedCategories.push(cb.value);
    });

    if (selectedCategories.length === 0) {
      alert("出題する分野を1つ以上選択してください。");
      return;
    }
    const countVal = document.getElementById('category-question-count').value;
    const limit = countVal === 'all' ? Infinity : parseInt(countVal, 10);
    
    startQuiz({ mode: 'category', categories: selectedCategories, limit: limit });
  });

  // Start Quiz (Exam)
  document.getElementById('btn-start-exam')?.addEventListener('click', () => {
    const activeExam = document.querySelector('#exam-grid .session-btn.active');
    if (!activeExam) return;
    const examId = activeExam.dataset.exam;
    startQuiz({ mode: 'exam', examId: examId, limit: Infinity });
  });

});

let allQuestions = [];
let currentQuizList = [];
let currentQuizIndex = 0;

function startQuiz(config) {
  // Show loading
  document.getElementById('quiz-container').innerHTML = '<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-spin" style="font-size:2rem; color:#3182ce;"></i><p>過去問データを読み込み中...</p></div>';
  document.getElementById('quiz-progress-container').style.display = 'block';
  
  if (allQuestions.length === 0) {
    // Fetch data
    fetch('../data/itpass_questions.json')
      .then(res => {
        if(!res.ok) throw new Error("データの取得に失敗しました。まだデータ抽出中の可能性があります。");
        return res.json();
      })
      .then(data => {
        allQuestions = data;
        filterAndRenderQuiz(config);
      })
      .catch(err => {
        document.getElementById('quiz-container').innerHTML = `<div style="text-align:center; padding:40px; color:#e53e3e;"><i class="fas fa-exclamation-triangle" style="font-size:3rem; margin-bottom:15px;"></i><p>${err.message}</p></div>`;
      });
  } else {
    filterAndRenderQuiz(config);
  }
}

function filterAndRenderQuiz(config) {
  if (config.mode === 'exam') {
    if (config.examId === 'all') {
      currentQuizList = [...allQuestions].sort(() => 0.5 - Math.random());
    } else {
      currentQuizList = allQuestions.filter(q => q.exam === config.examId);
    }
  } else if (config.mode === 'bookmark') {
    currentQuizList = allQuestions.filter(q => bookmarks.includes(q.id));
  } else if (config.mode === 'category') {
    // Categories matching
    currentQuizList = allQuestions.filter(q => {
      // Check if any of the question's categories matches our selected ones
      if (!q.categories) return false;
      return q.categories.some(c => config.categories.includes(c));
    });
    // Shuffle category questions
    currentQuizList.sort(() => 0.5 - Math.random());
  }

  if (currentQuizList.length === 0) {
    document.getElementById('quiz-container').innerHTML = '<div style="text-align:center; padding:40px; color:#718096;"><p>条件に一致する問題が見つかりませんでした。</p></div>';
    updateProgress(0, 0);
    return;
  }

  // Cap at the selected limit
  if (config.limit && currentQuizList.length > config.limit) {
    currentQuizList = currentQuizList.slice(0, config.limit);
  }

  currentQuizIndex = 0;
  renderQuestion(currentQuizIndex);
}

function renderQuestion(index) {
  const container = document.getElementById('quiz-container');
  const q = currentQuizList[index];
  updateProgress(index + 1, currentQuizList.length);

  const examName = formatExamName(q.exam);
  
  // Format options
  let optionsHtml = '';
  for (const [key, val] of Object.entries(q.options || {})) {
    // Use A, B, C, D values in HTML data if needed, or stick to the original keys
    optionsHtml += `
      <div class="quiz-option" data-value="${key}">
        <span style="font-weight:bold; margin-right:8px;">${key}</span> ${val}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="quiz-card" data-id="${q.id}" data-answer="${q.answer}">
      <div class="quiz-header-row">
        <span class="quiz-num-badge" style="background:#ebf8ff; color:#2b6cb0;">
          <i class="fas fa-tag"></i> ${examName}（問${q.q_num}）
        </span>
        <button type="button" class="bookmark-toggle-btn ${bookmarks.includes(q.id) ? 'active' : ''}" title="ブックマークに追加/解除">
          <i class="far fa-star"></i> ブックマーク
        </button>
      </div>
      <div class="quiz-question-text">
        <div style="font-size:0.85rem; color:#718096; margin-bottom:10px;">分野：${(q.categories||[]).join(' > ')}</div>
        ${q.question}
      </div>
      <div class="quiz-options">
        ${optionsHtml}
      </div>
      <!-- 解答ボタンは非表示（即時判定） -->
      <div class="quiz-explanation-area">
        <div class="quiz-result-title"></div>
        <div style="padding:15px; background:#f7fafc; border-radius:5px; margin-top:10px;">
          ${q.explanation}
        </div>
        
        <div style="margin-top:20px; display:flex; justify-content:space-between;">
          <button type="button" class="quiz-nav-btn prev-btn" ${index === 0 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> 前の問題</button>
          <button type="button" class="quiz-nav-btn next-btn" ${index === currentQuizList.length - 1 ? 'disabled' : ''}>次の問題 <i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  `;

  // Attach events
  attachQuizEvents(container.querySelector('.quiz-card'), index);
}

function attachQuizEvents(card, index) {
  const options = card.querySelectorAll('.quiz-option');
  const answerBtn = card.querySelector('.quiz-answer-btn');
  const explanationArea = card.querySelector('.quiz-explanation-area');
  const resultTitle = card.querySelector('.quiz-result-title');
  const correctAnswer = card.getAttribute('data-answer');

  const bookmarkBtn = card.querySelector('.bookmark-toggle-btn');
  const qId = card.getAttribute('data-id');
  if (bookmarkBtn && qId) {
    bookmarkBtn.addEventListener('click', () => {
      const idx = bookmarks.indexOf(qId);
      if (idx > -1) {
        bookmarks.splice(idx, 1);
        bookmarkBtn.classList.remove('active');
      } else {
        bookmarks.push(qId);
        bookmarkBtn.classList.add('active');
      }
      if (typeof saveStoredBookmarks === 'function') {
        saveStoredBookmarks(bookmarks);
      }
    });
  }

  
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if(card.classList.contains('answered')) return;
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      
      // 即時判定
      evaluateAnswer();
    });
  });

  function evaluateAnswer() {
    if(card.classList.contains('answered')) return;
    const selected = card.querySelector('.quiz-option.selected');
    if(!selected) return;

    card.classList.add('answered');
    explanationArea.style.display = 'block';
    
    const userAns = selected.getAttribute('data-value');
    if(userAns === correctAnswer) {
      selected.classList.add('correct-choice');
      explanationArea.classList.add('is-correct');
      resultTitle.innerHTML = '<span style="color:#48bb78;"><i class="fas fa-check-circle"></i> 正解！</span>';
    } else {
      selected.classList.add('wrong-choice');
      explanationArea.classList.add('is-wrong');
      options.forEach(o => {
        if(o.getAttribute('data-value') === correctAnswer) {
          o.classList.add('correct-choice');
        }
      });
      resultTitle.innerHTML = '<span style="color:#e53e3e;"><i class="fas fa-times-circle"></i> 不正解...</span>';
    }
  }

  const prevBtn = card.querySelector('.prev-btn');
  if(prevBtn) prevBtn.addEventListener('click', () => renderQuestion(index - 1));
  const nextBtn = card.querySelector('.next-btn');
  if(nextBtn) nextBtn.addEventListener('click', () => renderQuestion(index + 1));
}

function updateProgress(current, total) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  document.getElementById('progressText').innerText = `進捗: ${current} / ${total}問 (${pct}%)`;
  document.getElementById('progressFill').style.width = `${pct}%`;
}

function formatExamName(examStr) {
  const map = {
    '08_haru': '令和8年度', '07_haru': '令和7年度', '06_haru': '令和6年度', '05_haru': '令和5年度',
    '04_haru': '令和4年度', '03_haru': '令和3年度', '02_aki': '令和2年秋期', '01_aki': '令和元年秋期',
    '31_haru': '平成31年春期', '30_aki': '平成30年秋期', '30_haru': '平成30年春期',
    '29_aki': '平成29年秋期', '29_haru': '平成29年春期', '28_aki': '平成28年秋期'
  };
  return map[examStr] || examStr;
}
