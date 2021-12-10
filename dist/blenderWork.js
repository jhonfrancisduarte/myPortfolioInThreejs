import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


const object1 = document.querySelector("div.object1");
// initializing objects to the page
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer({antialias:true})

// setting the objects to the page
renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(devicePixelRatio)
renderer.setClearColor(new THREE.Color('#21282a'), 1)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// object appending
object1.appendChild(renderer.domElement)

camera.position.z = 100;

//new OrbitControls(camera, renderer.domElement)
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1.8;
controls.maxDistance = 20;
controls.update()

//lighting of the scene


const directionalLight = new THREE.PointLight(0xffffff, 0.8);
directionalLight.position.set(0,0,3);
scene.add(directionalLight);

const directionalLight2 = new THREE.PointLight(0xffffff, 0.8);
directionalLight2.position.set(0,0,-3);
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight3.position.set(3,0,3);
scene.add(directionalLight3);
const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight5.position.set(3,0,-3);
scene.add(directionalLight5);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight4.position.set(-3,0,-3);
scene.add(directionalLight4);
const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight6.position.set(-3,0,3);
scene.add(directionalLight6);


const pointLight = new THREE.PointLight(0xc4c4c4, 1);
pointLight.position.set(0,50,0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2040;
pointLight.shadow.mapSize.height = 2040;
scene.add(pointLight);

// floor
const plane = new THREE.Mesh(new THREE.PlaneGeometry(800, 800, 1), new THREE.MeshPhongMaterial({color:0x21282a}));
plane.rotation.x = - Math.PI / 2
plane.position.y = -9
plane.receiveShadow = true
scene.add(plane);


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerHeight, window.innerHeight);
}
// Load 3d object
let loader = new GLTFLoader();
var object;
function init(){

        loader.load('gltf-objects/myLogo8.gltf', (gltf) =>{
            gltf.scene.traverse(c => {
                c.castShadow = true;
                
            });
            scene.add(gltf.scene);
        animate()
    });
}

function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
   window.addEventListener('resize', onWindowResize, false);
}
init()

//-------------------------------------------------------------------------

const object2 = document.querySelector("div.object2");
// initializing objects to the page
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000)
const renderer2 = new THREE.WebGLRenderer({antialias:true})
// setting the objects to the page
renderer2.setSize(innerWidth,innerHeight)
renderer2.setPixelRatio(devicePixelRatio)
renderer2.setClearColor(new THREE.Color('#21282a'), 1)
renderer2.shadowMap.enabled = true
renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
// object appending
object2.appendChild(renderer2.domElement)
camera2.position.z = 1000;
//new OrbitControls(camera, renderer.domElement)
const controls2 = new OrbitControls( camera2, renderer2.domElement );
controls2.minDistance = 1.8;
controls2.maxDistance = 50;
controls2.update()
//lighting of the scene
const light2 = new THREE.AmbientLight(0x404040, 1)
light2.position.set(0,0,0);
scene2.add(light2)

const directionalLight12 = new THREE.PointLight(0xffffff, 0.8);
directionalLight12.position.set(0,0,3);
scene2.add(directionalLight12);

const directionalLight22 = new THREE.PointLight(0xffffff, 0.8);
directionalLight22.position.set(0,0,-3);
scene2.add(directionalLight22);

const directionalLight32 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight32.position.set(3,0,2);
scene2.add(directionalLight32);

const directionalLight52 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight52.position.set(3,0,-2);
scene2.add(directionalLight52);

const directionalLight42 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight42.position.set(-3,0,-2);
scene2.add(directionalLight42);

const directionalLight62 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight62.position.set(-3,0,2);
scene2.add(directionalLight62);


const pointLight2 = new THREE.PointLight(0xc4c4c4, 1);
pointLight2.position.set(0,50,0);
pointLight2.castShadow = true;
pointLight2.shadow.mapSize.width = 2040;
pointLight2.shadow.mapSize.height = 2040;
scene2.add(pointLight2);
// floor
const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(800, 800, 1), new THREE.MeshPhongMaterial({color:0x21282a}));
plane2.rotation.x = - Math.PI / 2
plane2.position.y = -9.5
plane2.receiveShadow = true
scene2.add(plane2);
// Load 3d object
let loader2 = new GLTFLoader();
var object;
function init2(){
        loader2.load('gltf-objects/sunglass.gltf', (gltf) =>{
            gltf.scene.traverse(c => {
                c.castShadow = true;
                
            });
            scene2.add(gltf.scene);
        animate2()
    });
}
function animate2(){
    renderer2.render(scene2, camera2);
    requestAnimationFrame(animate2);
   window.addEventListener('resize', onWindowResize, false);
}
init2()

//------------------------------------------------------------------