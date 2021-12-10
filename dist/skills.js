import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import * as status from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js';



const myHead = document.querySelector("div.my-head");
// initializing objects to the page
const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer({antialias:true})

// setting the objects to the page
renderer.setSize(innerWidth * 1.5,innerHeight * 1.5)
renderer.setPixelRatio(devicePixelRatio)
renderer.setClearColor(new THREE.Color('#21282a'), 1)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
myHead.appendChild(renderer.domElement)
//new OrbitControls(camera, renderer.domElement)

camera.position.z = 3;

//new OrbitControls(camera, renderer.domElement)
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1.8;
controls.maxDistance = 8;
controls.update()




//lighting of the scene
const light = new THREE.AmbientLight(0x404040, 1)
light.position.set(10,10,1);
scene.add(light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0,1,10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2040;
directionalLight.shadow.mapSize.height = 2040;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xc4c4c4, 1);
pointLight.position.set(0,10,0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2040;
pointLight.shadow.mapSize.height = 2040;
scene.add(pointLight);


// light position viewer

//const lightHelper = new THREE.PointLightHelper(directionalLight)
//scene.add(lightHelper)

// floor
const plane = new THREE.Mesh(new THREE.PlaneGeometry(800, 800, 1), new THREE.MeshPhongMaterial({color:0x21282a}));
plane.rotation.x = - Math.PI / 2
plane.position.y = -3
plane.receiveShadow = true
scene.add(plane);

console.log(plane);

document.addEventListener('mousemove', mouseCoordinates)
let mouseX = 0
let mouseY = 0
function mouseCoordinates(event){
    mouseX = event.clientX
    mouseY = event.clientY
    
}


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerHeight, window.innerHeight);
}


let loader = new GLTFLoader();
var object;
function init(){

        loader.load('./meeee.gltf', (gltf) =>{
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

