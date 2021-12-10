import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
//import { gsap } from "gsap";
const world = {
  plane: {
    width: 600,
    height: 600,
    widthSegment: 60,
    heightSegment: 60
  }
}

function generatePlane(){
    planeMesh.geometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height,world.plane.widthSegment,world.plane.heightSegment)


    //vertice position randomization
    const { array } = planeMesh.geometry.attributes.position
    const randomValues = []
    for (let i = 0; i < array.length; i++)
    {
    if ( i % 3 == 0){
      const x = array[i]
      const y = array[i + 1]
      const z = array[i + 2]

      array[i] = x + (Math.random() - 0.5) * 3
      array[i +1] = y + (Math.random() - 0.5) * 3
      //z = deepness of shadows
      array[i + 2] = z + (Math.random() - 0.5) * 8
    }
    randomValues.push(Math.random() * Math.PI * 2)
    }

    planeMesh.geometry.attributes.position.randomValues = randomValues

    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array

    const colors = []
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
      colors.push(0,0.19,0.4)
    }
      planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors),3))
}

// initial input in the main screen
const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)


//scene background image
const spaceTexture = new THREE.TextureLoader().load('images/galaxy.jpg');
scene.background = spaceTexture;

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxDistance = 500;
controls.update()



//camera perspective view onload
camera.position.z = 60

const planeGeometry = new THREE.PlaneGeometry(world.plane.width,world.plane.height,world.plane.widthSegment,world.plane.heightSegment)
const planeMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors: true})

const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(planeMesh)

generatePlane()

/* stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry,material );
  

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(1000).fill().forEach(addStar)
*/

// stars
const particleGeo = new THREE.BufferGeometry();
const particleCount = 10000;
const posArray = new Float32Array(particleCount * 10);
for (let i=0; i < particleCount * 3; i++){
    posArray[i] = (Math.random() - 0.5) * 10000
}
const particleMaterial = new THREE.PointsMaterial({
    size: 0.05
}) 
particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMesh = new THREE.Points(particleGeo, particleMaterial);
scene.add(particleMesh);


// lighting of the plane
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set( 0, 4, 1 )
scene.add(light)
const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set( 0, 0, -1 )
scene.add(backLight)

//const pointLight = new THREE.PointLight(0xffffff)
//pointLight.position.set(30,30,0)
//scene.add(pointLight)
//const lightHelper = new THREE.PointLightHelper(light)
//scene.add(lightHelper)

//mouse movement
const mouse = {
  x: undefined,
  y: undefined
}
addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
 })

 // animation
let frame = 0
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera)
  frame += 0.01

  const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position
  for (let i = 0; i < array.length; i+=3){
    // x coordinates movement
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.02
    // y coordinates movement
    array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.015
  }
  planeMesh.rotation.x = -0.5
  //planeMesh.rotation.y = 0.15
  //planeMesh.rotation.z += 0.0005
  planeMesh.geometry.attributes.position.needsUpdate = true

  // stars animation
  particleMesh.rotation.y -= 0.0005

  const intersects = raycaster.intersectObject(planeMesh)
  if (intersects.length > 0){
    const {color} = intersects[0].object.geometry.attributes
    intersects[0].object.geometry.attributes.color.needsUpdate = true
    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    }
    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1
    }
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      onUpdate: () => {
        //vertice 1
        color.setX(intersects[0].face.a, hoverColor.r)
        color.setY(intersects[0].face.a, hoverColor.g)
        color.setZ(intersects[0].face.a, hoverColor.b)
        //vertice 2
        color.setX(intersects[0].face.b, hoverColor.r)
        color.setY(intersects[0].face.b, hoverColor.g)
        color.setZ(intersects[0].face.b, hoverColor.b)
        //vertice 3
        color.setX(intersects[0].face.c, hoverColor.r)
        color.setY(intersects[0].face.c, hoverColor.g)
        color.setZ(intersects[0].face.c, hoverColor.b)
        color.needsUpdate = true
      }
    })
  }
}


animate()
