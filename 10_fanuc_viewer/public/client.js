import * as THREE from "three";
import {OrbitControls} from "/OrbitControls.js";
import {STLLoader} from "/STLLoader.js";

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

let default_material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
});

const stl_loader = new STLLoader();
const load_stl = (url)=>{
    return new Promise((resolve)=>{
        stl_loader.load(url, resolve);
    });
};

// robot
{
    //let base_geometry = await load_stl(...);
    //let base_geometry = await load_stl(...);
    //let base_geometry = await load_stl(...);


    load_stl("./FANUC_R2000iA165F-STL/BASE.stl").then( (geometry)=>{
        geometry.scale(0.001, 0.001, 0.001);
        let mesh = new THREE.Mesh(geometry, default_material);
        scene.add(mesh);
    } );

}


const render = ()=>{
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
};
render();


let socket = io("https://fanuc-wsserver.herokuapp.com/", {withCredentials: false});

socket.on("joint_values", (joint_values) =>{
    //console.log(joint_values);
});