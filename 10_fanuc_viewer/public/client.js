import * as THREE from "three";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// renderer.c

const render = ()=>{
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render();


let socket = io("https://fanuc-wsserver.herokuapp.com/", {withCredentials: false});

socket.on("joint_values", (joint_values) =>{

    console.log(joint_values);
});