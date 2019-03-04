//Creating 3JS Scene
var scene = new THREE.Scene();

//Adding a Camera
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1, 10000);
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
var materialArray = [   '../models/textures/FootballField/posx.jpg', '../models/textures/FootballField/negx.jpg',
                        '../models/textures/FootballField/posy.jpg', '../models/textures/FootballField/negy.jpg',
                        '../models/textures/FootballField/posz.jpg', '../models/textures/FootballField/negz.jpg'
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



//Adding Geometry, Material, Mesh and Adding it to scene
var cubeGeometry = new THREE.BoxGeometry(70,70,70,70,70,70);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, envMap: scene.background});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 100;
cube.position.y=-25;
cube.castShadow=true;
// cube.shadow.mapSize.height=1024;
scene.add(cube);

var ringGeometry = new THREE.SphereGeometry(50,30,30);
var ring = new THREE.Mesh(ringGeometry, cubeMaterial);
ring.position.x = -100;
ring.castShadow=true;
scene.add(ring);

var loader = new THREE.GLTFLoader();
loader.load( '../models/meshes/monkeyModel.glb', function ( gltf ) {
    
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
    frontObject.scale.set(10,10,10);
    cubeRotation(frontObject);

}, undefined, function ( error ) {
	console.error( error );
} );



//Adding Light
var light = new THREE.PointLight(0xFFFF00);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
var ambientLight = new THREE.AmbientLight({color: 0x404040},0.2);
light.position.set(10,0,25);
scene.add(light);
scene.add(ambientLight);

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

dirLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 50;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;



//Skybox : Sphere
// var skyGeo = new THREE.SphereGeometry(100000, 25, 25); 
// var loader  = new THREE.TextureLoader(), texture = loader.load( "../models/textures/skySphere.jpg" );
// var material = new THREE.MeshPhongMaterial({ map: texture, });
// var sky = new THREE.Mesh(skyGeo, material);
// sky.material.side = THREE.BackSide;
// scene.add(sky);
var texture = new THREE.TextureLoader().load( '../models/textures/dirt2.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 128 , 128 );    
} );

// var groundGeo = new THREE.PlaneBufferGeometry( 1000, 1000 );
// var groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff,  } );
// var material = new THREE.MeshBasicMaterial( { map: texture, specular: 0x111111, shininess: 10 } );
// groundMat.color.setHSL( 0.095, 1, 0.75 );
// var ground = new THREE.Mesh( groundGeo, material );
// ground.position.y = - 33;
// ground.rotation.x = - Math.PI / 2;
// ground.receiveShadow = true;
// scene.add( ground );


//Function which rotates a mesh
function cubeRotation(genericGeometry)
{
    genericGeometry.rotation.x += 0.05;
    genericGeometry.rotation.y += 0.05;
}


//Renderer Function which callsback and render the entire scene with Scene and camera as parameter.
//All Function that manipulates mesh are called inside this render function
//It is called every frame
var render = function ()
{
    cubeRotation(cube);
    cubeRotation(ring);
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};
render();
