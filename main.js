import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);


const createScene = async() => {
  const scene = new BABYLON.Scene(engine);

  scene.createDefaultCameraOrLight(true, false, true);
  // const box = new BABYLON.MeshBuilder.CreateBox('box', {
  //   size: 0.7,
  //   height: 0.05,
  //   depth: 0.5,
  //   faceColors:[
  //     new BABYLON.Color4(0,0,1,1),
  //     BABYLON.Color3.Blue(),
  //   ]
  // }, ); 

  // const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {
  //   segments: 50,
  //   diameter: 0.3,
  //   diameterY: 0.4
  // }, scene);

  // const ground = new BABYLON.MeshBuilder.CreateGround('', {
  //   height: 10,
  //   width: 10,
  //   subdivisions: 5,
  //   subdivisionsX: 10
  // });

  // ground.material = new BABYLON.StandardMaterial('', scene);  
  // ground.material.wireframe = true;


  const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('', '/assets/heightmap.png', {
    height: 10,
    width: 10,
    subdivisions: 50,
    maxHeight: 2,
  });

  groundFromHM.material = new BABYLON.StandardMaterial('', scene);  
  groundFromHM.material.wireframe = true;

  const fontData = await (await fetch('/assets/Montserrat_Regular.json')).json();
  const text = new BABYLON.MeshBuilder.CreateText('', 'My Text', fontData, {
    size: 2,
    depth: 0.1,
    resolution: 64
  });

  return scene;
}

const scene = await createScene();

engine.runRenderLoop(() => { 
  scene.render();
})

window.addEventListener('resize', function() {
  engine.resize();
});