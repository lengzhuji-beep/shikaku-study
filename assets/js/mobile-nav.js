/**
 * Shikakus Mobile Responsive Navigation & Drawer Menu
 */
(function() {
  function initMobileNav() {
    var headerInner = document.querySelector('.header-inner') || document.querySelector('.kakutoku-header .container');
    if (!headerInner) return;

    // ハンバーガーボタンが存在しない場合は自動生成
    var hamburgerBtn = document.querySelector('.hamburger-btn');
    if (!hamburgerBtn) {
      hamburgerBtn = document.createElement('button');
      hamburgerBtn.className = 'hamburger-btn';
      hamburgerBtn.setAttribute('type', 'button');
      hamburgerBtn.setAttribute('aria-label', 'メニューを開く');
      hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';

      var headerActions = headerInner.querySelector('.header-actions') || headerInner.querySelector('.kt-header-actions');
      if (headerActions) {
        headerActions.appendChild(hamburgerBtn);
      } else {
        headerInner.appendChild(hamburgerBtn);
      }
    }

    // ドロワーとオーバーレイが存在しない場合は自動生成
    var overlay = document.querySelector('.drawer-overlay');
    var drawer = document.querySelector('.mobile-drawer');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'drawer-overlay';
      document.body.appendChild(overlay);
    }

    if (!drawer) {
      // 基準パスの判定（現在の階層に合わせて相対パスを解決）
      var isSubDir2 = location.pathname.includes('/columns/') || location.pathname.includes('/3kyu/') || location.pathname.includes('/2kyu/') || location.pathname.includes('/1kyu/') || location.pathname.includes('/vocabulary/') || location.pathname.includes('/reading/') || location.pathname.includes('/listening/');
      var isSubDir1 = !isSubDir2 && (location.pathname.includes('/toeic/') || location.pathname.includes('/fp/') || location.pathname.includes('/takken/') || location.pathname.includes('/it-passport/') || location.pathname.includes('/boki/') || location.pathname.includes('/study/'));
      
      var rootPrefix = isSubDir2 ? '../../' : (isSubDir1 ? '../' : './');

      drawer = document.createElement('div');
      drawer.className = 'mobile-drawer';
      drawer.innerHTML = [
        '<div class="drawer-header">',
        '  <div class="logo-link" style="display:flex; align-items:center; gap:8px;">',
        '    <div class="logo-mark" style="width:32px; height:32px; font-size:1rem;">S</div>',
        '    <span class="logo-text" style="font-size:1.15rem;">Shikakus</span>',
        '  </div>',
        '  <button type="button" class="drawer-close-btn" aria-label="メニューを閉じる">&times;</button>',
        '</div>',
        '<div class="drawer-body">',
        '  <div class="drawer-section-title">5大資格から選ぶ</div>',
        '  <ul class="drawer-nav-list">',
        '    <li><a href="' + rootPrefix + 'toeic/index.html" class="drawer-nav-link"><span class="drawer-nav-icon">🎧</span> TOEIC® L&R</a></li>',
        '    <li><a href="' + rootPrefix + 'fp/index.html" class="drawer-nav-link"><span class="drawer-nav-icon">💰</span> FP（ファイナンシャル・プランナー）</a></li>',
        '    <li><a href="' + rootPrefix + 'takken/index.html" class="drawer-nav-link"><span class="drawer-nav-icon">🏠</span> 宅地建物取引士（宅建）</a></li>',
        '    <li><a href="' + rootPrefix + 'it-passport/index.html" class="drawer-nav-link"><span class="drawer-nav-icon">💻</span> ITパスポート</a></li>',
        '    <li><a href="' + rootPrefix + 'boki/index.html" class="drawer-nav-link"><span class="drawer-nav-icon">📒</span> 日商簿記検定</a></li>',
        '  </ul>',
        '  <div class="drawer-section-title">学習メニュー</div>',
        '  <ul class="drawer-nav-list">',
        '    <li><a href="' + rootPrefix + 'mypage.html" class="drawer-nav-link"><span class="drawer-nav-icon">📊</span> マイページ・学習進捗</a></li>',
        '    <li><a href="' + rootPrefix + 'index.html#features" class="drawer-nav-link"><span class="drawer-nav-icon">🚀</span> 使い方ガイド</a></li>',
        '    <li><a href="' + rootPrefix + 'index.html#voices" class="drawer-nav-link"><span class="drawer-nav-icon">🏆</span> 合格者の声</a></li>',
        '  </ul>',
        '  <div class="drawer-section-title">インフォメーション</div>',
        '  <ul class="drawer-nav-list">',
        '    <li><a href="' + rootPrefix + 'index.html" class="drawer-nav-link"><span class="drawer-nav-icon">🏠</span> Shikakus トップ</a></li>',
        '    <li><a href="' + rootPrefix + 'contact.html" class="drawer-nav-link"><span class="drawer-nav-icon">✉️</span> お問い合わせ</a></li>',
        '    <li><a href="' + rootPrefix + 'profile.html" class="drawer-nav-link"><span class="drawer-nav-icon">👤</span> サイト制作者プロフィール</a></li>',
        '  </ul>',
        '</div>'
      ].join('\n');
      document.body.appendChild(drawer);
    }

    var closeBtn = drawer.querySelector('.drawer-close-btn');

    function openDrawer() {
      hamburgerBtn.classList.add('is-active');
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // 背景スクロール固定
    }

    function closeDrawer() {
      hamburgerBtn.classList.remove('is-active');
      overlay.classList.remove('is-open');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // イベントバインド（二重登録防止）
    hamburgerBtn.onclick = function(e) {
      e.stopPropagation();
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    };

    if (closeBtn) {
      closeBtn.onclick = function(e) {
        e.stopPropagation();
        closeDrawer();
      };
    }

    overlay.onclick = function() {
      closeDrawer();
    };

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // ドロワー内のリンクをタップしたら閉じる
    var drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeDrawer();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
