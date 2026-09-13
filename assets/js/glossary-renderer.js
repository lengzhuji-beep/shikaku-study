/**
 * Shikakus - 資格用語集共通レンダラー (Glossary Renderer)
 * リアルタイム検索、カテゴリタブ、重要度フィルタ、五十音インデックス、アコーディオン展開
 */

(function() {
  'use strict';

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
    let searchQuery = '';

    // HTMLテンプレート構築
    container.innerHTML = `
      <div class="glossary-controls-wrapper">
        <!-- 検索バー -->
        <div class="glossary-search-box">
          <i class="fas fa-search search-icon"></i>
          <input type="text" id="glossary-search-input" class="glossary-search-input" placeholder="用語名・読み仮名・キーワードで検索..." autocomplete="off">
          <button type="button" id="glossary-clear-search" class="glossary-clear-btn" style="display:none;">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <!-- フィルタ操作エリア -->
        <div class="glossary-filters">
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
      <div id="glossary-no-results" class="glossary-empty-state" style="display:none;">
        <i class="fas fa-search" style="font-size:2.5rem; color:#cbd5e1; margin-bottom:1rem;"></i>
        <p style="font-weight:700; color:#475569;">該当する用語が見つかりませんでした</p>
        <p style="font-size:0.88rem; color:#94a3b8;">検索条件やキーワードを変更してお試しください。</p>
      </div>
    `;

    // DOM要素
    const searchInput = document.getElementById('glossary-search-input');
    const clearSearchBtn = document.getElementById('glossary-clear-search');
    const categoryTabs = document.getElementById('category-tabs');
    const importanceTabs = document.getElementById('importance-tabs');
    const kanaTabs = document.getElementById('kana-tabs');
    const glossaryList = document.getElementById('glossary-list');
    const countDisplay = document.getElementById('glossary-count');
    const emptyState = document.getElementById('glossary-no-results');
    const expandAllBtn = document.getElementById('btn-expand-all');
    const collapseAllBtn = document.getElementById('btn-collapse-all');

    // フィルタリング処理
    function filterData() {
      const q = normalizeStr(searchQuery);

      const filtered = rawData.filter(item => {
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
      countDisplay.innerHTML = `表示中: <strong>${items.length}</strong> 件 / 全 ${rawData.length} 件`;

      if (!items.length) {
        glossaryList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';

      glossaryList.innerHTML = items.map((item, idx) => {
        return `
          <div class="glossary-item-card" data-index="${idx}">
            <div class="glossary-item-header">
              <div class="item-title-wrap">
                <div class="item-meta-top">
                  <span class="cat-pill cat-${item.cat}">${item.catName}</span>
                  ${getStarsHtml(item.imp)}
                </div>
                <h3 class="item-term">${item.term}</h3>
                ${item.ruby ? `<span class="item-ruby">${item.ruby}</span>` : ''}
              </div>
              <button type="button" class="btn-item-toggle" aria-label="詳細を開く">
                <i class="fas fa-chevron-down"></i>
              </button>
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

      // カードヘッダーのクリックイベント（アコーディオン）
      glossaryList.querySelectorAll('.glossary-item-header, .item-summary-box').forEach(el => {
        el.addEventListener('click', function(e) {
          const card = this.closest('.glossary-item-card');
          card.classList.toggle('is-open');
        });
      });
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

    // 初回描画
    filterData();
  }

  window.initGlossary = initGlossary;
})();
