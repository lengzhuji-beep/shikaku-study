/**
 * Kakutoku Study Tracker & Heatmap Engine
 * ユーザーの閲覧・学習時間をリアルタイムに計測し、LocalStorageに蓄積・可視化します。
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'kakutoku_study_tracker_v1';

  // 資格カテゴリの定義
  const CATEGORIES = {
    toeic: { name: 'TOEIC® L&R', icon: 'fa-language', color: '#0284c7', url: 'toeic/index.html' },
    boki: { name: '日商簿記検定', icon: 'fa-calculator', color: '#16a34a', url: 'boki/index.html' },
    fp: { name: 'FP技能士', icon: 'fa-coins', color: '#d97706', url: 'fp/index.html' },
    takken: { name: '宅地建物取引士', icon: 'fa-building', color: '#7c3aed', url: 'takken/index.html' },
    itpass: { name: 'ITパスポート', icon: 'fa-laptop-code', color: '#2563eb', url: 'it-passport/index.html' },
    other: { name: '総合・その他', icon: 'fa-graduation-cap', color: '#4b5563', url: 'index.html' }
  };

  // 日付文字列の取得 (YYYY-MM-DD)
  function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 現在のページから資格カテゴリを判定
  function detectCurrentCategory() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/toeic/') || path.includes('/study/')) return 'toeic';
    if (path.includes('/boki/')) return 'boki';
    if (path.includes('/fp/')) return 'fp';
    if (path.includes('/takken/')) return 'takken';
    if (path.includes('/it-passport/')) return 'itpass';
    return 'other';
  }

  // 初期シードデータ生成（過去1年分のリアルな学習データ）
  function generateSeedData() {
    const data = {
      version: 1,
      totalSeconds: 0,
      categories: {
        toeic: 0,
        boki: 0,
        fp: 0,
        takken: 0,
        itpass: 0,
        other: 0
      },
      daily: {}, // YYYY-MM-DD: { totalSec: number, cats: { toeic: sec, ... } }
      streak: 0,
      lastActive: new Date().toISOString()
    };

    const today = new Date();
    // 過去365日分をシミュレーション
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = formatDate(d);

      // 週の曜日やランダム性でリアルな学習パターンを生成
      const dayOfWeek = d.getDay();
      const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
      
      const recencyBonus = (i < 90) ? 0.35 : 0.15;
      const willStudy = Math.random() < (isWeekend ? 0.85 : 0.65 + recencyBonus);

      if (willStudy) {
        const baseMin = isWeekend ? (45 + Math.floor(Math.random() * 95)) : (20 + Math.floor(Math.random() * 55));
        const totalSec = baseMin * 60;

        const catKeys = ['toeic', 'boki', 'fp', 'takken', 'itpass'];
        const primaryCat = catKeys[Math.floor(Math.random() * catKeys.length)];
        const secondaryCat = catKeys[Math.floor(Math.random() * catKeys.length)];

        const dayCats = { toeic: 0, boki: 0, fp: 0, takken: 0, itpass: 0, other: 0 };
        const primarySec = Math.floor(totalSec * 0.7);
        const secondarySec = totalSec - primarySec;

        dayCats[primaryCat] = (dayCats[primaryCat] || 0) + primarySec;
        dayCats[secondaryCat] = (dayCats[secondaryCat] || 0) + secondarySec;

        data.daily[dateKey] = {
          totalSec: totalSec,
          cats: dayCats
        };

        data.totalSeconds += totalSec;
        data.categories[primaryCat] = (data.categories[primaryCat] || 0) + primarySec;
        data.categories[secondaryCat] = (data.categories[secondaryCat] || 0) + secondarySec;
      }
    }

    // ストリーク（連続日数）の計算
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = formatDate(d);
      if (data.daily[key] && data.daily[key].totalSec > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    data.streak = streak;

    return data;
  }

  // データの読み込み
  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
    const seed = generateSeedData();
    saveData(seed);
    return seed;
  }

  // データの保存
  function saveData(data) {
    try {
      data.lastActive = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // リアルタイムタイマー計測（アクティブ滞在時間）
  let isWindowActive = true;
  window.addEventListener('focus', () => { isWindowActive = true; });
  window.addEventListener('blur', () => { isWindowActive = false; });
  document.addEventListener('visibilitychange', () => {
    isWindowActive = !document.hidden;
  });

  const currentCat = detectCurrentCategory();
  let bufferSec = 0;

  setInterval(() => {
    if (!isWindowActive) return;

    bufferSec++;
    if (bufferSec >= 5) {
      const data = loadData();
      const todayKey = formatDate(new Date());

      if (!data.daily[todayKey]) {
        data.daily[todayKey] = { totalSec: 0, cats: {} };
      }

      data.daily[todayKey].totalSec += bufferSec;
      data.daily[todayKey].cats[currentCat] = (data.daily[todayKey].cats[currentCat] || 0) + bufferSec;

      data.totalSeconds += bufferSec;
      data.categories[currentCat] = (data.categories[currentCat] || 0) + bufferSec;

      saveData(data);
      bufferSec = 0;

      if (window.KakutokuAuth && typeof window.KakutokuAuth.syncLocalToCloud === 'function') {
        window.KakutokuAuth.syncLocalToCloud();
      }

      if (window.KakutokuMypage && typeof window.KakutokuMypage.refreshLive === 'function') {
        window.KakutokuMypage.refreshLive(data);
      }
    }
  }, 1000);

  // 時間フォーマット
  function formatHoursMinutes(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}<span class="unit">時間</span> ${minutes}<span class="unit">分</span>`;
    }
    return `${minutes}<span class="unit">分</span>`;
  }

  function formatHoursMinutesPlain(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}時間 ${minutes}分`;
    }
    return `${minutes}分`;
  }

  window.KakutokuTracker = {
    CATEGORIES,
    loadData,
    saveData,
    formatDate,
    formatHoursMinutes,
    formatHoursMinutesPlain,
    resetData: function() {
      if (confirm('学習ログデータを初期データに復元しますか？')) {
        const seed = generateSeedData();
        saveData(seed);
        location.reload();
      }
    },
    clearAllToZero: function() {
      if (confirm('すべての学習記録を0分にリセットしますか？')) {
        const empty = {
          version: 1,
          totalSeconds: 0,
          categories: { toeic: 0, boki: 0, fp: 0, takken: 0, itpass: 0, other: 0 },
          daily: {},
          streak: 0,
          lastActive: new Date().toISOString()
        };
        saveData(empty);
        location.reload();
      }
    }
  };

})();
