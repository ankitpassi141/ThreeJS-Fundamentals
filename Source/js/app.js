var scene = new THREE.Scene();
// scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcce0ff );
scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.set( 1000, 50, 1500 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add( new THREE.AmbientLight( 0x24454c ) );
var light = new THREE.DirectionalLight( 0xdfebff, 1 );
light.position.set( 50, 200, 100 );
light.position.multiplyScalar( 1.3 );
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
var d = 300;
light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;
light.shadow.camera.far = 1000;
scene.add( light );




// var geometry1 = new THREE.BoxGeometry( 10, 0.125, 1 );
// var material1 = new THREE.MeshBasicMaterial(0xe5e5e5,1);
// var cube1 = new THREE.Mesh( geometry1, material1 );
// cube1.position.setY(-2.5);
// cube1.castShadow = true;
// cube1.receiveShadow = true;
// scene.add( cube1);


var loader = new THREE.TextureLoader();

var geometry = new THREE.BoxGeometry( 1,1,1 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.receiveShadow = true;
scene.add( cube);
// var GeometryLoader = new THREE.JsonLoader();

// GeometryLoader.load("../models/monkeyData.js");
// monkey = new Three.Mesh();
// scene.add(monkey);
// var groundTexture = loader.load( 'https://images.pexels.com/photos/413195/pexels-photo-413195.jpeg' );
// groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
// groundTexture.repeat.set( 25, 25 );
// groundTexture.anisotropy = 16;
// var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
// var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
// mesh.position.y = - 250;
// mesh.rotation.x = - Math.PI / 2;
// mesh.receiveShadow = true;
// scene.add( mesh );

camera.position.z = 5;

var loader = new THREE.GLTFLoader();
loader.load(
   "../models/monkeyModel.gltf",
   function ( gltf ) 
   {
       scene.add( gltf.scene );
       gltf.scene;
   },
);
scene.add( bus.frame )


var animate = function () 
{
    requestAnimationFrame( animate );
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

