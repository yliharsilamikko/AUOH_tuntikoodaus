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

// origo
{
    let geometry = new THREE.SphereGeometry(0.05);
    let material = new THREE.MeshBasicMaterial({color: 0xff0000});
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}


// lightning
{
    let light = new THREE.DirectionalLight(0xaaaaaa, 1.5);
    light.position.x = 10;
    light.position.y = 10;
    light.position.z = 10;
    light.lookAt(scene.position);
    scene.add(light);
}
{
    let light = new THREE.DirectionalLight(0xaaaaaa, 1.5);
    light.position.x = -10;
    light.position.y = -10;
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
let joints = [];

const load_geometries = async ()=>{

    {
        let geometry = await load_stl("./FANUC_R2000iA165F-STL/BASE.stl");
        geometry.scale(0.001, 0.001, 0.001);
        joints.push(new THREE.Mesh(geometry, default_material));
    }
    {
        let geometry = await load_stl("./FANUC_R2000iA165F-STL/J1-1.stl");
        geometry.scale(0.001, 0.001, 0.001);
        joints.push(new THREE.Mesh(geometry, default_material));
    }
    {
        let geometry = await load_stl("./FANUC_R2000iA165F-STL/J2.stl");
        geometry.scale(0.001, 0.001, 0.001);
        joints.push(new THREE.Mesh(geometry, default_material));
    }
    {
        let geometry = await load_stl("./FANUC_R2000iA165F-STL/J3.stl");
        geometry.scale(0.001, 0.001, 0.001);
        joints.push(new THREE.Mesh(geometry, default_material));
    }
    {
        let geometry = await load_stl("./FANUC_R2000iA165F-STL/J4.stl");
        geometry.scale(0.001, 0.001, 0.001);
        joints.push(new THREE.Mesh(geometry, default_material));
    }
    {
        let geometry = await load_stl("./FANUC_R2000iA165F-STL/J5.stl");
        geometry.scale(0.001, 0.001, 0.001);
        joints.push(new THREE.Mesh(geometry, default_material));
    }
};

// Nivelten origot ja pyörimisakselien suunnat
// J1: [0, 282,0] Y
// J2: [312, 670, -117]  Z
// J3: [268.69, 1744.13, -196.85] Z
// J4: [1315.19, 1969.13, 0.15] X
// J5: [1548.69, 1969.13, 87.15] Z
// J6: [1763.69, 1969.13, 20.47] X


let offsets = [];
load_geometries().then(()=>{

    joints[1].geometry.translate(0, -0.282, 0);
    joints[2].geometry.translate(-0.312, -0.670, 0.117);
    joints[3].geometry.translate(-0.26869, -1.74413, 0.19685);
    joints[4].geometry.translate(-1.31519, -1.96913, -0.00015);
    joints[5].geometry.translate(-1.54869, -1.96913, -0.08715);

    scene.add(joints[0]);
    joints[0].rotation.set(THREE.Math.degToRad(90), 0, 0);

    offsets.push(new THREE.Group());
    offsets[0].position.set(0, 0.282,0);
    joints[0].add(offsets[0]);
    offsets[0].add(joints[1]);
    
    offsets.push(new THREE.Group());
    offsets[1].position.set(-0.312, (-0.282)-(-0.670),0.117);
    joints[0].add(offsets[0]);
    offsets[0].add(joints[1]);
    
    offsets.push(new THREE.Group());
    offsets[2].position.set(-0.312, (-0.282)-(-0.670),0.117);
    joints[1].add(offsets[1]);
    offsets[1].add(joints[2]);


    joints[1].rotation.set(0,THREE.Math.degToRad(90),0);


    // Math.degToRad
    
    //joints[0].add(joints[1]);
    //joints[1].add(joints[2]);

});

// {
//     load_stl("./FANUC_R2000iA165F-STL/BASE.stl").then( (geometry)=>{
//         geometry.scale(0.001, 0.001, 0.001);
//         let mesh = new THREE.Mesh(geometry, default_material);
//         scene.add(mesh);
//     } );
// }


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