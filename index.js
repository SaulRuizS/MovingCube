const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45, //FOV
    window.innerWidth / innerHeight, //Aspect Ratio
    1, //Near
    500 //Far
);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);


//Cube
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
//

//Triangle
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push( new THREE.Vector3(-10, 0, 0) );
points.push( new THREE.Vector3(0, 10, 0) );
points.push( new THREE.Vector3(10, 0, 0) );
const triangleGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(triangleGeometry, lineMaterial);
//

const animateCube = () => {
    requestAnimationFrame( animateCube );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
};

const animateTriangle = () => {
    scene.add(line);
    renderer.render(scene, camera);
}

// animateTriangle();

animateCube();