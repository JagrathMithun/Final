import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/addons/controls/OrbitControls.js';
import { Water } from '/node_modules/three/addons/objects/Water2.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa); // Light grey background

// Ground
const groundGeometry = new THREE.PlaneGeometry(20, 3);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI * -0.5;
scene.add(ground);

// Water
const waterGeometry = new THREE.PlaneGeometry(20, 3);
const water2 = new Water(waterGeometry, {
    scale: 2,
    textureWidth: 1024,
    textureHeight: 1024,
    flowDirection: new THREE.Vector2(1, 1), // Corrected line
});

water2.position.y = 1;
water2.rotation.x = Math.PI * -0.5;
scene.add(water2);

// light
const ambientLight = new THREE.AmbientLight( 0xe7e7e7, 1.2 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set( - 1, 1, 1 );
scene.add( directionalLight );

// Camera
const camera = new THREE.PerspectiveCamera(
  35, // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near plane
  1000 // Far plane
);
camera.position.set(-5, 5, 5); // Simplified position setting
scene.add(camera);

// Renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);


// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render loop
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
