import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- 基本設定 -------------------------------------------
const canvas = document.querySelector('#myCanvas');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
});
// 描画サイズをウィンドウ全体に合わせる（レイアウト崩れを防ぐため）
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene();

// カメラのアスペクト比もウィンドウ全体に合わせる
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0.5, 4);

// --- ライト設定 -------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// --- 3Dモデルの読み込み ------------------------------------
const loader = new GLTFLoader();
let model;

loader.load(
    'assets/models/character-j.glb',
    (gltf) => {
        model = gltf.scene;
        model.scale.set(0.8, 0.8, 0.8);
        model.position.y = -1.2;
        scene.add(model);
    },
);

// --- チャット機能 -----------------------------------------
const chatBubble = document.getElementById('chatBubble');
const chatText = document.getElementById('chatText');
const messages = [
    "こんにちは！",
    "僕、Jっていうんだ。",
    "何かお手伝いできることはあるかな？",
    "クリックしてくれてありがとう！"
];
let messageIndex = 0;

function showMessage() {
    if (!chatBubble.classList.contains('hidden')) return;

    chatText.textContent = messages[messageIndex];
    chatBubble.classList.remove('hidden');
    
    messageIndex = (messageIndex + 1) % messages.length;

    setTimeout(() => {
        chatBubble.classList.add('hidden');
    }, 3000);
}

// --- クリック判定処理（レイキャスティング） -----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
    if (!model) return;

    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(model, true);

    if (intersects.length > 0) {
        showMessage();
    }
});

// --- レンダリングループ ---------------------------------
function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
    renderer.render(scene, camera);
}
animate();

// --- ウィンドウリサイズ対応（必須） --------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
