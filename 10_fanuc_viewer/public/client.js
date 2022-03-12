import * as THREE from "three";
import {OrbitControls} from "/OrbitControls.js"

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect);
camera.position.z = 3;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xffffff);

let controls = new OrbitControls(camera, renderer.domElement);

// lightning
{
    let light = new THREE.DirectionalLight(0xaaaaaa, 1.5);
    light.position.x = 10;
    light.position.y = 10;
    light.position.z = 10;
    light.lookAt(scene.position);
    scene.add(light);
}

// floor
{
   let geometry = new THREE.PlaneBufferGeometry(40,40);
   let material = new THREE.MeshPhongMaterial({
       color: 0xaaaaaa
   });
   let mesh = new THREE.Mesh(geometry, material);
   scene.add(mesh);
}

const render = ()=>{
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
};
render();


let socket = io("https://fanuc-wsserver.herokuapp.com/", {withCredentials: false});

socket.on("joint_values", (joint_values) =>{

    console.log(joint_values);
});