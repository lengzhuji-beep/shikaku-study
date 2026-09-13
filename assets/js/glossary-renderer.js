/**
 * Shikakus - 資格用語集共通レンダラー (Glossary Renderer)
 * リアルタイム検索、カテゴリタブ、重要度フィルタ、五十音インデックス、アコーディオン展開、ブックマーク機能（☆/★）
 */

(function() {
  'use strict';

  const BM_STORAGE_KEY = 'shikakus_glossary_bookmarks';

  // 全ブックマークデータの読み込み
  function loadAllBookmarks() {
    try {
      const raw = localStorage.getItem(BM_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Failed to load glossary bookmarks', e);
      return {};
    }
  }

  // 全ブックマークデータの保存
  function saveAllBookmarks(data) {
    try {
      localStorage.setItem(BM_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save glossary bookmarks', e);
    }
  }

  function initGlossary(options) {
    const dataVarName = options.dataVar;
    const rawData = window[dataVarName] || [];
    const container = document.getElementById(options.containerId || 'glossary-app');

    if (!container || !rawData.length) {
      console.warn('Glossary: Container or data not found for', dataVarName);
      return;
    }

    // カタカナ・ひらがな正規化ヘルパー
    function normalizeStr(str) {
      if (!str) return '';
      return str
        .toLowerCase()
        .replace(/[\u30a1-\u30f6]/g, m => String.fromCharCode(m.charCodeAt(0) - 0x60)) // カタカナ→ひらがな
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)) // 全角英数→半角
        .trim();
    }

    // HTMLエスケープヘルパー
    function escapeAttr(str) {
      if (!str) return '';
      return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // 五十音判定
    function getKanaRow(ruby) {
      if (!ruby) return 'other';
      const ch = ruby.charAt(0);
      if (/[あ-お]/i.test(ch)) return 'a';
      if (/[か-こが-ご]/i.test(ch)) return 'ka';
      if (/[さ-そざ-ぞ]/i.test(ch)) return 'sa';
      if (/[た-とだ-ど]/i.test(ch)) return 'ta';
      if (/[な-の]/i.test(ch)) return 'na';
      if (/[は-ほば-ぼぱ-ぽ]/i.test(ch)) return 'ha';
      if (/[ま-も]/i.test(ch)) return 'ma';
      if (/[や-よ]/i.test(ch)) return 'ya';
      if (/[ら-ろ]/i.test(ch)) return 'ra';
      if (/[わ-ん]/i.test(ch)) return 'wa';
      if (/[a-z0-9]/i.test(ch)) return 'alpha';
      return 'other';
    }

    // ブックマーク操作（資格単位）
    function getBookmarksSet() {
      const all = loadAllBookmarks();
      const list = all[dataVarName] || [];
      return new Set(list);
    }

    function isBookmarked(term) {
      return getBookmarksSet().has(term);
    }

    function toggleBookmark(term) {
      const all = loadAllBookmarks();
      const list = all[dataVarName] || [];
      const set = new Set(list);
      let nowBookmarked = false;
      if (set.has(term)) {
        set.delete(term);
        nowBookmarked = false;
      } else {
        set.add(term);
        nowBookmarked = true;
      }
      all[dataVarName] = Array.from(set);
      saveAllBookmarks(all);
      return nowBookmarked;
    }

    function getBookmarkCount() {
      return getBookmarksSet().size;
    }

    // カテゴリ一覧抽出
    const categoriesMap = new Map();
    rawData.forEach(item => {
      if (item.cat && item.catName && !categoriesMap.has(item.cat)) {
        categoriesMap.set(item.cat, item.catName);
      }
    });

    // 状態管理
    let currentCategory = 'all';
    let currentImportance = 'all';
    let currentKanaRow = 'all';
    let currentBookmarkOnly = false; // ブックマークのみ表示フラグ
    let searchQuery = '';

    // HTMLテンプレート構築
    container.innerHTML = `
      <div class="glossary-controls-wrapper">
        <!-- 検索バー -->
        <div class="glossary-search-box">
          <i class="fas fa-search search-icon"></i>
          <input type="text" id="glossary-search-input" class="glossary-search-input" placeholder="用語名・読み仮名・キーワードで検索..." autocomplete="off">
          <button type="button" id="glossary-clear-search" class="glossary-clear-btn" style="display:none;" title="検索をクリア">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <!-- フィルタ操作エリア -->
        <div class="glossary-filters">
          <!-- 絞り込み（すべて / ブックマーク） -->
          <div class="glossary-filter-group bookmark-filter-group">
            <span class="filter-label"><i class="fas fa-bookmark"></i> 表示:</span>
            <div class="filter-buttons" id="bookmark-filter-tabs">
              <button type="button" class="filter-btn active" data-bm="all">すべて (${rawData.length})</button>
              <button type="button" class="filter-btn filter-btn-bookmark" data-bm="only">
                <span class="star-gold">★</span> ブックマークした用語 (<span id="filter-bm-badge">0</span>)
              </button>
            </div>
          </div>

          <!-- カテゴリタブ -->
          <div class="glossary-filter-group">
            <span class="filter-label"><i class="fas fa-folder-open"></i> 分野:</span>
            <div class="filter-buttons" id="category-tabs">
              <button type="button" class="filter-btn active" data-cat="all">すべて (${rawData.length})</button>
              ${Array.from(categoriesMap.entries()).map(([k, v]) => {
                const count = rawData.filter(d => d.cat === k).length;
                return `<button type="button" class="filter-btn" data-cat="${k}">${v} (${count})</button>`;
              }).join('')}
            </div>
          </div>

          <!-- 重要度フィルタ -->
          <div class="glossary-filter-group" style="margin-top: 10px;">
            <span class="filter-label"><i class="fas fa-star"></i> 重要度:</span>
            <div class="filter-buttons" id="importance-tabs">
              <button type="button" class="filter-btn active" data-imp="all">すべて</button>
              <button type="button" class="filter-btn" data-imp="3"><span class="star-badge">★★★</span> 最重要</button>
              <button type="button" class="filter-btn" data-imp="2"><span class="star-badge">★★</span> 頻出</button>
              <button type="button" class="filter-btn" data-imp="1"><span class="star-badge">★</span> 基礎</button>
            </div>
          </div>

          <!-- 五十音インデックス -->
          <div class="glossary-filter-group" style="margin-top: 10px;">
            <span class="filter-label"><i class="fas fa-sort-alpha-down"></i> 五十音:</span>
            <div class="filter-buttons kana-buttons" id="kana-tabs">
              <button type="button" class="filter-btn btn-sm active" data-kana="all">全</button>
              <button type="button" class="filter-btn btn-sm" data-kana="a">あ行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="ka">か行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="sa">さ行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="ta">た行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="na">な行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="ha">は行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="ma">ま行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="ya">や行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="ra">ら行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="wa">わ行</button>
              <button type="button" class="filter-btn btn-sm" data-kana="alpha">英数</button>
            </div>
          </div>
        </div>

        <!-- ツールバー（件数と開閉） -->
        <div class="glossary-status-bar">
          <div class="count-display" id="glossary-count">
            表示中: <strong>0</strong> 件 / 全 ${rawData.length} 件
          </div>
          <div class="toggle-actions">
            <button type="button" id="btn-expand-all" class="text-action-btn"><i class="fas fa-chevron-down"></i> すべて開く</button>
            <span class="separator">|</span>
            <button type="button" id="btn-collapse-all" class="text-action-btn"><i class="fas fa-chevron-up"></i> すべて閉じる</button>
          </div>
        </div>
      </div>

      <!-- 用語リストコンテナ -->
      <div id="glossary-list" class="glossary-list"></div>

      <!-- 通常の検索なし空状態 -->
      <div id="glossary-no-results" class="glossary-empty-state" style="display:none;">
        <i class="fas fa-search" style="font-size:2.5rem; color:#cbd5e1; margin-bottom:1rem;"></i>
        <p style="font-weight:700; color:#475569;">該当する用語が見つかりませんでした</p>
        <p style="font-size:0.88rem; color:#94a3b8;">検索条件やキーワードを変更してお試しください。</p>
      </div>

      <!-- ブックマークなし空状態 -->
      <div id="glossary-bm-empty" class="glossary-empty-state" style="display:none;">
        <div class="empty-star-icon">☆</div>
        <p style="font-weight:700; color:#475569; font-size:1.05rem; margin-bottom:0.4rem;">ブックマークされた用語はありません</p>
        <p style="font-size:0.88rem; color:#94a3b8; max-width:440px; margin:0 auto; line-height:1.6;">
          各用語カードの右上にある「☆」をタップするとブックマークに登録され、苦手な単語や後で見返したい用語だけを効率よくチェックできます。
        </p>
      </div>
    `;

    // DOM要素
    const searchInput = document.getElementById('glossary-search-input');
    const clearSearchBtn = document.getElementById('glossary-clear-search');
    const filterBmBadge = document.getElementById('filter-bm-badge');
    const bookmarkFilterTabs = document.getElementById('bookmark-filter-tabs');
    const categoryTabs = document.getElementById('category-tabs');
    const importanceTabs = document.getElementById('importance-tabs');
    const kanaTabs = document.getElementById('kana-tabs');
    const glossaryList = document.getElementById('glossary-list');
    const countDisplay = document.getElementById('glossary-count');
    const emptyState = document.getElementById('glossary-no-results');
    const bmEmptyState = document.getElementById('glossary-bm-empty');
    const expandAllBtn = document.getElementById('btn-expand-all');
    const collapseAllBtn = document.getElementById('btn-collapse-all');

    // バッジ件数更新
    function updateBookmarkBadges() {
      const count = getBookmarkCount();
      if (filterBmBadge) filterBmBadge.textContent = count;

      if (bookmarkFilterTabs) {
        bookmarkFilterTabs.querySelectorAll('.filter-btn').forEach(btn => {
          if (btn.dataset.bm === 'only') {
            btn.classList.toggle('active', currentBookmarkOnly);
          } else if (btn.dataset.bm === 'all') {
            btn.classList.toggle('active', !currentBookmarkOnly);
          }
        });
      }
    }

    // フィルタリング処理
    function filterData() {
      const q = normalizeStr(searchQuery);
      const bmSet = getBookmarksSet();

      const filtered = rawData.filter(item => {
        // ブックマーク絞り込み
        if (currentBookmarkOnly && !bmSet.has(item.term)) {
          return false;
        }

        // カテゴリ
        if (currentCategory !== 'all' && item.cat !== currentCategory) return false;

        // 重要度
        if (currentImportance !== 'all' && item.imp !== parseInt(currentImportance, 10)) return false;

        // 五十音
        if (currentKanaRow !== 'all') {
          const row = getKanaRow(item.ruby || item.term);
          if (row !== currentKanaRow) return false;
        }

        // 検索クエリ
        if (q) {
          const tName = normalizeStr(item.term);
          const tRuby = normalizeStr(item.ruby);
          const tSum = normalizeStr(item.sum);
          const tDesc = normalizeStr(item.desc);
          if (!tName.includes(q) && !tRuby.includes(q) && !tSum.includes(q) && !tDesc.includes(q)) {
            return false;
          }
        }

        return true;
      });

      renderList(filtered);
    }

    // 星バッジHTML
    function getStarsHtml(imp) {
      if (imp === 3) return '<span class="star-badge star-3">★★★</span>';
      if (imp === 2) return '<span class="star-badge star-2">★★☆</span>';
      return '<span class="star-badge star-1">★☆☆</span>';
    }

    // 一覧レンダリング
    function renderList(items) {
      const bmSet = getBookmarksSet();
      countDisplay.innerHTML = `表示中: <strong>${items.length}</strong> 件 / 全 ${rawData.length} 件`;

      if (!items.length) {
        glossaryList.innerHTML = '';
        if (currentBookmarkOnly && bmSet.size === 0) {
          emptyState.style.display = 'none';
          bmEmptyState.style.display = 'block';
        } else {
          bmEmptyState.style.display = 'none';
          emptyState.style.display = 'block';
        }
        return;
      }

      emptyState.style.display = 'none';
      bmEmptyState.style.display = 'none';

      glossaryList.innerHTML = items.map((item, idx) => {
        const bookmarked = bmSet.has(item.term);
        return `
          <div class="glossary-item-card" data-index="${idx}" data-term="${escapeAttr(item.term)}">
            <div class="glossary-item-header">
              <div class="item-title-wrap">
                <div class="item-meta-top">
                  <span class="cat-pill cat-${item.cat}">${item.catName}</span>
                  ${getStarsHtml(item.imp)}
                </div>
                <h3 class="item-term">${item.term}</h3>
                ${item.ruby ? `<span class="item-ruby">${item.ruby}</span>` : ''}
              </div>
              <div class="item-header-actions">
                <button type="button" class="btn-glossary-star ${bookmarked ? 'is-bookmarked' : ''}" data-term="${escapeAttr(item.term)}" title="${bookmarked ? 'ブックマークを解除' : 'ブックマークに登録'}" aria-label="ブックマーク">
                  <span class="star-symbol">${bookmarked ? '★' : '☆'}</span>
                </button>
                <button type="button" class="btn-item-toggle" aria-label="詳細を開く">
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>
            </div>
            <div class="item-summary-box">
              <p class="item-summary">${item.sum}</p>
            </div>
            <div class="item-details-body">
              <div class="details-inner">
                <h4 class="details-heading"><i class="fas fa-lightbulb"></i> 試験対策・詳細解説</h4>
                <p class="details-desc">${item.desc}</p>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // カード開閉（アコーディオン）イベント
      glossaryList.querySelectorAll('.glossary-item-header, .item-summary-box').forEach(el => {
        el.addEventListener('click', function(e) {
          // 星ボタンがクリックされた場合は開閉しない
          if (e.target.closest('.btn-glossary-star')) return;
          const card = this.closest('.glossary-item-card');
          card.classList.toggle('is-open');
        });
      });

      // 星ボタン（ブックマーク）イベント
      glossaryList.querySelectorAll('.btn-glossary-star').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const term = this.dataset.term;
          const isNowBookmarked = toggleBookmark(term);

          // ボタン表示の即時切り替え
          this.classList.toggle('is-bookmarked', isNowBookmarked);
          this.title = isNowBookmarked ? 'ブックマークを解除' : 'ブックマークに登録';
          const starSpan = this.querySelector('.star-symbol');
          if (starSpan) {
            starSpan.textContent = isNowBookmarked ? '★' : '☆';
          }

          // バッジカウント更新
          updateBookmarkBadges();

          // ブックマークのみ表示モードの場合、解除したらリストから除外して件数更新
          if (currentBookmarkOnly && !isNowBookmarked) {
            const card = this.closest('.glossary-item-card');
            if (card) {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => {
                filterData();
              }, 200);
            }
          }
        });
      });
    }

    // ブックマーク表示モードのトグル
    function setBookmarkOnly(enable) {
      currentBookmarkOnly = enable;
      updateBookmarkBadges();
      filterData();
    }

    // イベントリスナー設定
    searchInput.addEventListener('input', function() {
      searchQuery = this.value;
      clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
      filterData();
    });

    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      searchQuery = '';
      this.style.display = 'none';
      filterData();
      searchInput.focus();
    });

    // フィルタ行のブックマーク切り替え
    bookmarkFilterTabs.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const isOnly = btn.dataset.bm === 'only';
      setBookmarkOnly(isOnly);
    });

    categoryTabs.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      categoryTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      filterData();
    });

    importanceTabs.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      importanceTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentImportance = btn.dataset.imp;
      filterData();
    });

    kanaTabs.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      kanaTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentKanaRow = btn.dataset.kana;
      filterData();
    });

    expandAllBtn.addEventListener('click', function() {
      glossaryList.querySelectorAll('.glossary-item-card').forEach(c => c.classList.add('is-open'));
    });

    collapseAllBtn.addEventListener('click', function() {
      glossaryList.querySelectorAll('.glossary-item-card').forEach(c => c.classList.remove('is-open'));
    });

    // 初期化実行
    updateBookmarkBadges();
    filterData();
  }

  window.initGlossary = initGlossary;
})();
