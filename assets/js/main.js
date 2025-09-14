import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- 基本設定 -------------------------------------------
// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'), // 描画するキャンバスをHTMLから取得
    antialias: true, // アンチエイリアスを有効にして滑らかに表示
    alpha: true, // 背景を透明にする
});
renderer.setSize(window.innerWidth, window.innerHeight); // 画面サイズに合わせる
renderer.setPixelRatio(window.devicePixelRatio); // デバイスのピクセル比に合わせる
renderer.outputEncoding = THREE.sRGBEncoding; // 色のエンコーディングを設定

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5); // カメラの位置を調整

// --- ライト設定 -------------------------------------------
// 環境光（全体を均一に照らす）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 平行光源（特定の方向から照らす）
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// --- 3Dモデルの読み込み ------------------------------------
const loader = new GLTFLoader();
let model; // モデルデータを格納する変数

loader.load(
    'assets/models/character-j.glb', // 3Dモデルのファイルパス
    (gltf) => {
        model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5); // モデルのサイズを調整
        model.position.y = -1; // モデルのY軸位置を調整
        scene.add(model); // シーンにモデルを追加
    },
);

// --- チャット機能 -----------------------------------------
const chatBubble = document.getElementById('chatBubble');
const chatText = document.getElementById('chatText');

// ここに決まった応答のセリフを入れる配列
const messages = [
    "こんにちは！",
    "僕の名前はプログだよ。",
    "何かお手伝いできることはあるかな？",
    "クリックしてくれてありがとう！"
];
let messageIndex = 0; // 現在のセリフのインデックス

// クリック時にセリフを表示する関数
function showMessage() {
    // 既に吹き出しが表示されている場合は何もしない
    if (!chatBubble.classList.contains('hidden')) {
        return;
    }

    chatText.textContent = messages[messageIndex]; // テキストを設定
    chatBubble.classList.remove('hidden'); // hiddenクラスを削除して表示
    
    // 次のセリフのインデックスを計算（最後まで行ったら最初に戻る）
    messageIndex = (messageIndex + 1) % messages.length;

    // 3秒後に吹き出しを隠す
    setTimeout(() => {
        chatBubble.classList.add('hidden');
    }, 3000);
}

// マウスクリックのイベント設定
document.querySelector('#myCanvas').addEventListener('click', () => {
    if (model) { // モデルが読み込み完了していたら
        showMessage();
    }
});

// --- レンダリングループ ---------------------------------
function animate() {
    requestAnimationFrame(animate); // 次のフレームを要求

    if (model) {
        // モデルを少しだけ左右にサインカーブで揺らす
        model.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    renderer.render(scene, camera); // シーンとカメラをレンダリング
}
animate(); // アニメーションループを開始

// --- ウィンドウリサイズ対応 -------------------------------
window.addEventListener('resize', () => {
    // カメラのアスペクト比を更新
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // レンダラーのサイズを更新
    renderer.setSize(window.innerWidth, window.innerHeight);
});
