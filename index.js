const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, //FOV
    window.innerWidth / innerHeight, //Aspect Ratio
    0.1, //Near
    1000 //Far
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 2;

// cube.rotation.y = 1

const animate = () => {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
};

animate();