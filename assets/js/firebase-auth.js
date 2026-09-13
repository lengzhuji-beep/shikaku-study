/**
 * Kakutoku Hybrid Auth & Cloud Sync (Firebase)
 * 完全無料（追加費用0円）で動作するログイン・クラウドデータ同期モジュール
 * 
 * - ゲスト時: LocalStorage のみで記録（登録不要ですぐ利用可能）
 * - ログイン時: Google/メール認証後、Firestore に自動バックアップ＆PC・スマホ間で完全同期
 */

(function() {
  'use strict';

  // =========================================================================
  // 1. Firebase 設定オブジェクト
  // =========================================================================
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDQz19WazR3Cc7A5z6MAIbGq1xW3Aq1yFk",
    authDomain: "shikaku-taisaku.firebaseapp.com",
    projectId: "shikaku-taisaku",
    storageBucket: "shikaku-taisaku.firebasestorage.app",
    messagingSenderId: "326542833528",
    appId: "1:326542833528:web:87d88ee4ffd6646da07a8d",
    measurementId: "G-17VWPMRKJR"
  };

  const isConfigured = true;

  let currentUser = null;
  const authListeners = [];

  // LocalStorage のキー
  const DEMO_USER_STORAGE_KEY = 'kakutoku_demo_user_v1';

  // =========================================================================
  // 2. 状態管理
  // =========================================================================
  function notifyListeners(user) {
    currentUser = user;
    authListeners.forEach(cb => {
      try { cb(user); } catch (e) { console.error(e); }
    });
  }

  // 初期ユーザー状態の確認
  function initAuthState() {
    const isWebProtocol = window.location.protocol === 'http:' || window.location.protocol === 'https:';

    if (isConfigured && isWebProtocol && window.firebase && window.firebase.auth) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            const userData = {
              uid: user.uid,
              displayName: user.displayName || '学習ユーザー',
              email: user.email,
              photoURL: user.photoURL || null,
              isAnonymous: false,
              isRealFirebase: true
            };
            notifyListeners(userData);
            syncCloudToLocal(userData.uid);
          } else {
            notifyListeners(null);
          }
        });
        return;
      } catch (e) {
        console.warn('Firebase init error, fallback to demo mode:', e);
      }
    }

    // デモモード（設定前）
    const savedDemoUser = localStorage.getItem(DEMO_USER_STORAGE_KEY);
    if (savedDemoUser) {
      try {
        const parsed = JSON.parse(savedDemoUser);
        notifyListeners(parsed);
      } catch (e) {
        localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        notifyListeners(null);
      }
    } else {
      notifyListeners(null);
    }
  }

  // =========================================================================
  // 3. クラウドデータ同期ロジック
  // =========================================================================
  // LocalStorage の学習データをクラウド（Firestore またはデモストレージ）へ同期
  async function syncLocalToCloud() {
    if (!currentUser) return;
    const trackerData = window.KakutokuTracker ? window.KakutokuTracker.loadData() : null;
    if (!trackerData) return;

    if (currentUser.isRealFirebase && window.firebase && window.firebase.firestore) {
      try {
        const db = firebase.firestore();
        await db.collection('user_study_logs').doc(currentUser.uid).set({
          ...trackerData,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log('[Kakutoku Auth] Synced to Firestore successfully');
      } catch (err) {
        console.error('[Kakutoku Auth] Firestore sync error:', err);
      }
    } else {
      // デモモードクラウドストレージシミュレーション
      const cloudStoreKey = `kakutoku_cloud_store_${currentUser.uid}`;
      localStorage.setItem(cloudStoreKey, JSON.stringify({
        ...trackerData,
        updatedAt: new Date().toISOString()
      }));
      console.log('[Kakutoku Auth] Demo cloud sync simulated');
    }
  }

  // クラウドから最新データをダウンロードしてローカルへマージ
  async function syncCloudToLocal(uid) {
    if (!uid) return;

    let cloudData = null;
    if (isConfigured && window.firebase && window.firebase.firestore) {
      try {
        const db = firebase.firestore();
        const doc = await db.collection('user_study_logs').doc(uid).get();
        if (doc.exists) {
          cloudData = doc.data();
        }
      } catch (e) {
        console.warn('Firestore fetch error:', e);
      }
    } else {
      // デモモード
      const cloudStoreKey = `kakutoku_cloud_store_${uid}`;
      const saved = localStorage.getItem(cloudStoreKey);
      if (saved) {
        try { cloudData = JSON.parse(saved); } catch (e) {}
      }
    }

    if (cloudData && window.KakutokuTracker) {
      const localData = window.KakutokuTracker.loadData();
      // クラウドの合計時間とローカルの合計時間を比較して、大きい方を優先マージ
      if ((cloudData.totalSeconds || 0) >= (localData.totalSeconds || 0)) {
        window.KakutokuTracker.saveData(cloudData);
        if (window.KakutokuMypage && window.KakutokuMypage.refreshLive) {
          window.KakutokuMypage.refreshLive(cloudData);
        }
      } else {
        // ローカルの方が進んでいればクラウドを更新
        syncLocalToCloud();
      }
    } else {
      // クラウドにまだデータがない場合、現在のローカルデータを初回アップロード
      syncLocalToCloud();
    }
  }

  // =========================================================================
  // 4. 認証アクション（ログイン / ログアウト）
  // =========================================================================

  // Googleログイン
  async function loginWithGoogle() {
    const isWebProtocol = window.location.protocol === 'http:' || window.location.protocol === 'https:';

    if (isConfigured && isWebProtocol && window.firebase && window.firebase.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        return result.user;
      } catch (error) {
        console.error('Google Sign-in Error:', error);
        alert(`ログインエラー: ${error.message}`);
        throw error;
      }
    } else {
      // file:/// 環境または未設定時のシミュレーション動作
      if (!isWebProtocol) {
        console.info('[Kakutoku Auth] file:/// 環境のためデモ認証モードで動作します（本番Web環境ではGoogleアカウントで認証されます）');
      }
      const demoUser = {
        uid: 'demo_user_google_123',
        displayName: 'Google 連携ユーザー',
        email: 'user@example.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
        isAnonymous: false,
        isDemo: true
      };
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
      notifyListeners(demoUser);
      await syncCloudToLocal(demoUser.uid);
      return demoUser;
    }
  }

  // メールアドレスログイン
  async function loginWithEmail(email, password) {
    const isWebProtocol = window.location.protocol === 'http:' || window.location.protocol === 'https:';

    if (isConfigured && isWebProtocol && window.firebase && window.firebase.auth) {
      try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        return result.user;
      } catch (error) {
        // 新規登録のフォールバック
        if (error.code === 'auth/user-not-found') {
          const createResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
          return createResult.user;
        }
        alert(`ログイン失敗: ${error.message}`);
        throw error;
      }
    } else {
      const name = email.split('@')[0] || '学習ユーザー';
      const demoUser = {
        uid: `demo_user_${btoa(email).slice(0, 10)}`,
        displayName: name,
        email: email,
        photoURL: null,
        isAnonymous: false,
        isDemo: true
      };
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
      notifyListeners(demoUser);
      await syncCloudToLocal(demoUser.uid);
      return demoUser;
    }
  }

  // ログアウト
  async function logout() {
    if (isConfigured && window.firebase && window.firebase.auth) {
      await firebase.auth().signOut();
    } else {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    }
    notifyListeners(null);
  }

  // =========================================================================
  // 5. 公開インターフェース
  // =========================================================================
  window.KakutokuAuth = {
    isConfigured: () => isConfigured,
    getCurrentUser: () => currentUser,
    onAuthStateChanged: (cb) => {
      authListeners.push(cb);
      cb(currentUser);
    },
    loginWithGoogle,
    loginWithEmail,
    logout,
    syncLocalToCloud
  };

  // ページロード時に認証初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthState);
  } else {
    initAuthState();
  }

})();
