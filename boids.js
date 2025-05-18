
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth /
    window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

var tetraGeometry = new THREE.TetrahedronGeometry(7);
var boids = [];

function init() {

    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60, 60);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    // throw a tetrahedron in there
    var tetraMaterial = new THREE.MeshLambertMaterial({
        color: 0x12a4b9,
    });
    var tetrahedron = new THREE.Mesh(tetraGeometry, tetraMaterial);
    tetrahedron.rotation.x = 0.5 * Math.PI;
    tetrahedron.rotation.z = Math.PI * 2 / 3;
    tetrahedron.rotation.y = -Math.PI / 4;
    tetrahedron.position.y = 10;
    scene.add(tetrahedron);

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(10, 8, 8);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777FF,
        wireframe: true
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(tetrahedron.position.x, tetrahedron.position.y, tetrahedron.position.z);
    scene.add(sphere);

    spawnBoid(60, 10, 60);

    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}

function spawnBoid(maxX, maxY, maxZ) {
    var xPos = Math.random() * maxX;
    var yPos = Math.random() * maxY;
    var zPos = Math.random() * maxZ;

    var material = new THREE.MeshLambertMaterial({
        color: 0x12a4b9
    });
    var tetrahedron = new THREE.Mesh(tetraGeometry, material);
    tetrahedron.position.set(xPos, yPos, zPos);
    scene.add(tetrahedron);
    boids.push(tetrahedron);
}