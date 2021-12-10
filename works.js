import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const planeBg = document.querySelector("div.planeBG");
// initial input in the main screen
const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000)
camera.position.set(0,0, 100)
const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(devicePixelRatio)
//renderer.setClearColor(new THREE.Color('#21282a'), 1)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
planeBg.appendChild(renderer.domElement)

// view control
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 8;
controls.maxDistance = 300;
controls.update()

// plane
const planeMaterial = new THREE.MeshPhongMaterial({color:0x21282a})
const planeGeo = new THREE.PlaneGeometry(100000, 100000, 1)
const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.position.z = -50
plane.receiveShadow = true
scene.add(plane);

// lighting
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0,0, 50);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2040;
pointLight.shadow.mapSize.height = 2040;
scene.add(pointLight);

const light = new THREE.DirectionalLight(0xffffff, 0.1)
light.shadow.mapSize.width = 2040;
light.shadow.mapSize.height = 2040;
light.castShadow = true;
light.position.set(0,0,1000);
scene.add(light)

// light position indicator
//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)


init();
		function init( ) {

				const loader = new THREE.FontLoader();
				loader.load( 'fonts/Glacial Indifference_Regular.json', function ( font ) {

					const color = 0x009980;
					const matDark = new THREE.LineBasicMaterial( {
						color: color,
						side: THREE.DoubleSide
					});

					const matLite = new THREE.MeshBasicMaterial( {
						color: color,
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide
					});

					const message = 'Jhon Francis A. Duarte\n              BSIT';
					const shapes = font.generateShapes( message, 20 );
					const geometry = new THREE.ShapeGeometry( shapes );
					geometry.computeBoundingBox();

					const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
					geometry.translate( xMid, 0, 149 );
					// make shape ( N.B. edge view not visible )
					const texts = new THREE.Mesh( geometry, matLite );
					texts.position.z = - 150;
                    texts.castShadow = true;
					scene.add( texts );
					// make line shape ( N.B. edge view remains visible )
					const holeShapes = [];
					for ( let i = 0; i < shapes.length; i ++ ) {
						const shape = shapes[ i ];
						if ( shape.holes && shape.holes.length > 0 ) {
							for ( let j = 0; j < shape.holes.length; j ++ ) {
								const hole = shape.holes[ j ];
								holeShapes.push( hole );
							}
						}
					}
					shapes.push.apply( shapes, holeShapes );
                    shapes.castShadow = true
					const lineText = new THREE.Object3D();
					for ( let i = 0; i < shapes.length; i ++ ) {
						const shape = shapes[ i ];
						const points = shape.getPoints();
						const geometry = new THREE.BufferGeometry().setFromPoints( points );
						geometry.translate( xMid, 0, 0 );
						const lineMesh = new THREE.Line( geometry, matDark );
                        lineMesh.castShadow = true
						lineText.add( lineMesh );
					}
                    lineText.castShadow = true
					scene.add( lineText );
					render();

				} ); //end load function

				
				planeBg.appendChild( renderer.domElement );

				controls.addEventListener( 'change', render );
				window.addEventListener( 'resize', onWindowResize );

		} // end init

    function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		render();

	}

function render() {
	renderer.render( scene, camera );
}


//animate the objects
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    const now = Date.now()/1000;
    
    pointLight.position.x = Math.cos(now) * 20;
    pointLight.position.y = Math.sin(now) * 20;
    pointLight.position.z = 50;
}
animate()



