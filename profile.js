import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import hoverEffect from 'hover-effect'

var hoverDistort = new hoverEffect({
    parent: document.querySelector('.pic-wrapper'),
    intensity: 0.3,
    image1: 'images/pic1.jpg',
    image2: 'images/pic2.jpg',
    displacementImage: 'images/4.png'
});

const bg = document.querySelector("section.bg");
// initializing objects to the page
const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer()

// setting the objects to the page
renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(devicePixelRatio)
renderer.setClearColor(new THREE.Color('#21282a'), 1)
bg.appendChild(renderer.domElement)
//new OrbitControls(camera, renderer.domElement)
camera.position.z = 2500

//lighting of the scene
const light = new THREE.DirectionalLight(0xffffff, 0.5)
light.position.set( 0, 0, 2400 )
scene.add(light)

// star particles
const particleGeo = new THREE.BufferGeometry()
const particleCount = 10000;
const posArray = new Float32Array(particleCount * 3);
for (let i=0; i < particleCount * 3; i++){
    posArray[i] = (Math.random() - 0.5) * 10000
}
const particleMaterial = new THREE.PointsMaterial({
    size: 5
}) 
particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMesh = new THREE.Points(particleGeo, particleMaterial);
scene.add(particleMesh);



// mouse detection
document.addEventListener('mousemove', animateParticle)
let mouseX = 0
let mouseY = 0
function animateParticle(event){
    mouseX = event.clientX
    mouseY = event.clientY
    //console.log(mouseX, mouseY)
}

// particle mouse hover effect
const clock = new THREE.Clock()
let frame = 0
const tick = () =>
{
    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
    frame += 0.01
    
    /* this is if mouse hover is affected by time
    
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)
    particleMesh.rotation.y = -.1 * elapsedTime
    if (mouseX > 0){
        particleMesh.rotation.y = -mouseX * (elapsedTime * 0.00008)
        particleMesh.rotation.x = mouseY * (elapsedTime * 0.00008)
    }
    */
    particleMesh.rotation.y -= 0.002
    particleMesh.rotation.z = -mouseX * (3 * 0.00008)
    particleMesh.rotation.x = mouseY * (3 * 0.00008)
    
}
tick()


