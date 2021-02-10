import * as THREE from './lib/three.module.js';
import { MouseFollowControls } from './lib/MouseFollowControls.js';
import { OBJLoader } from './lib/OBJLoader.js';
import { Input } from './Input.js';
import { EnemyControls } from './EnemyController.js';
import { BallPhysics } from './BallPhysics.js';

//Valiables
var name;
var controls;
var platformSpeed = 1.2;
var menu = true;
var enemy;
var volume = 100;
let width = window.innerWidth;
let height = window.innerHeight;

//Create scene
const canvas = document.querySelector('#game');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.set(0, 0, (height / width) * 7);
scene.add(camera);

var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.shadowMapEnabled = true;
renderer.setSize(width, height);
renderer.setClearColor(0x000000);
window.addEventListener(`resize`, () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.position.z = (height / width) * 15;
})

const light = new THREE.SpotLight(0xffffff, 1.3, 500);
light.position.set(1, 1, 7);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

//Settings
window.addEventListener('DOMContentLoaded', () => {
    const volumeRange = document.querySelector('#volume')
    volumeRange.oninput = () => {
        volume = volumeRange.value;
        console.log(volume);
    }

    const displaySize = document.querySelector('#ss');
    displaySize.oninput = () => {
        switch (displaySize.value) {
            case 'n':
                width = window.innerWidth;
                height = window.innerHeight;
                break;
            case '1':
                width = 3840;
                height = 2160;
                break;
            case '2':
                width = 2048;
                height = 1080;
                break;
            case '3':
                width = 1920;
                height = 1080;
                break;
            case '4':
                width = 1366;
                height = 768;
                break;
            case '5':
                width = 1280;
                height = 1024;
                break;
            case '6':
                width = 1280
                height = 800;
                break;
            case '7':
                width = 1280
                height = 720;
                break;
            case '8':
                width = 1024;
                height = 768;
                break;
            case '9':
                width = 800;
                height = 600;
                break;
            case '10':
                width = 640;
                height = 480;
                break;
        }
        renderer.setSize(width, height);
    }

    const shadows = document.querySelector('#shadows');
    shadows.oninput = () => {
        renderer.shadowMapEnabled = shadows.checked;
    }
})

//Load objects
const objLoader = new OBJLoader();
const nameLoad = new Promise((resolve, reject) => {
    objLoader.load('/data/models/name.obj', (mesh) => {
        resolve(mesh);
    })
})
nameLoad.then((value) => {
    name = value;
    name.material = new THREE.MeshPhongMaterial();
    name.position.set(0.7, 0, 0);
    scene.add(name);
    controls = new MouseFollowControls(name, 0.5, 0.5);
    Update();
})

function Update() {
    controls.Update();
    renderer.render(scene, camera);
    if (menu) {
        requestAnimationFrame(() => { Update() });
    } else {
        SceneInitialisation();
    }
}

//Borders initialisation
const shinMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

const plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 80), new THREE.MeshStandardMaterial({ color: 0x202020 }));
plane.rotation.x = -(Math.PI / 2);
plane.position.y = -4;
plane.receiveShadow = true;
plane.castShadow = true;


const firstBorder = new THREE.Mesh(new THREE.BoxGeometry(150, 4, 4), shinMaterial);
firstBorder.position.set(0, 0, -40);


const secondBorder = new THREE.Mesh(new THREE.BoxGeometry(150, 4, 4), shinMaterial);
secondBorder.position.set(0, 0, 40);


const centralBorder = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 84), shinMaterial);
centralBorder.position.set(0, -3, 0);


//Platforms initialisation
const firstPlayer = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 15), shinMaterial);
firstPlayer.position.set(73, 0, 0);


const secondPlayer = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 15), shinMaterial);
secondPlayer.position.set(-73, 0, 0);


//Ball initialisation
const ball = new THREE.Mesh(new THREE.SphereGeometry(3, 40, 40), shinMaterial);
ball.position.set(68, 0, 0);
ball.castShadow = true;

const physics = new BallPhysics(firstPlayer, secondPlayer, ball);

//Initialisation and start
let enMode, hLevel;

function SaveState(mode, hardLevel = 1) {
    enMode = mode;
    hLevel = hardLevel;
    document.querySelector('#hardLevel').classList.add('Invisible');
    document.querySelector('#score').classList.remove('Invisible');
}

function StartGame(mode, hardLevel = 1) {
    menu = false;
    enemy = new EnemyControls(secondPlayer, ball, mode);
    EnemyControls.Speed(hardLevel);
    document.querySelector('#menu').classList.add('Invisible');
    document.querySelector('#interface').classList.remove('Invisible');
    document.querySelector('#canvas').classList.remove('Blured');
    document.addEventListener('keydown', function(event) {
        if (event.code == 'Space') {
            BallPhysics.Start();
        }
        if (event.code == 'KeyP') {
            BallPhysics.Pause();
        }
    })
}

//StartGame
document.querySelector('#low').addEventListener('click', () => { SaveState('Auto', 0.35) });
document.querySelector('#middle').addEventListener('click', () => { SaveState('Auto', 0.45) });
document.querySelector('#hard').addEventListener('click', () => { SaveState('Auto', 0.6) });
document.querySelector('#veryHard').addEventListener('click', () => { SaveState('Auto', 1) });
document.querySelector('#players').addEventListener('click', () => { SaveState('Player') });
document.querySelector('#play').addEventListener('click', () => { StartGame(enMode, hLevel) });



function SceneInitialisation() {
    scene.add(plane);
    scene.add(firstBorder);
    scene.add(secondBorder);
    scene.add(centralBorder);
    scene.add(firstPlayer);
    scene.add(secondPlayer);
    scene.add(ball);
    scene.remove(name);
    camera.position.set(0, 150, 0);
    camera.rotation.x = -(Math.PI / 2);
    light.position.set(0, 100, 0);
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.position.y = (width / height) * 100;
    })
    GameUpdate();
}

function GameUpdate() {
    enemy.UpdatePosition();
    physics.Simulate();
    renderer.render(scene, camera);
    requestAnimationFrame(() => { GameUpdate() });
}