//Creating 3JS Scene
var scene = new THREE.Scene();

//Adding a Camera
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1, 15000);
var controls = new THREE.OrbitControls( camera );
controls.enableZoom = true;
controls.enablePan = true;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 1.5;
camera.position.set( 0, 20, 100 );
controls.update();


//Adding a Renderer to Render Scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//Skybox : Cube Version
var materialArray = [   '../models/textures/Sorsele3/posx.jpg', '../models/textures/Sorsele3/negx.jpg',
                        '../models/textures/Sorsele3/posy.jpg', '../models/textures/Sorsele3/negy.jpg',
                        '../models/textures/Sorsele3/posz.jpg', '../models/textures/Sorsele3/negz.jpg'
                    ];

for (var i = 0; i < 6; i++)
{
    materialArray[i].side = THREE.BackSide;
}

var reflectionCube = new THREE.CubeTextureLoader().load( materialArray );
reflectionCube.format = THREE.RGBFormat;
var refractionCube = new THREE.CubeTextureLoader().load( materialArray );
refractionCube.mapping = THREE.CubeRefractionMapping;
refractionCube.format = THREE.RGBFormat;
scene.background = reflectionCube;


var loader = new THREE.GLTFLoader();
loader.load( '../models/MountainScene/mountain.glb', function ( gltf ) {
    
    scene.add( gltf.scene );
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Scene
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

    gltf.scene.traverse(function(child){
        if(child.isMesh){
            child.material.envMap = scene.background;
        }
    });

    frontObject = gltf.scene;
    frontObject.scale.set(10000,10000,10000);
    cubeRotation(frontObject);

}, undefined, function ( error ) {
	console.error( error );
} );






var render = function ()
{
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();