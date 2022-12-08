import { useEffect } from 'react';

import * as THREE from 'three';
import { GUI } from 'dat.gui';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const gui = new GUI();
    var rotationSpeed = { speed: 0.0 };
    gui.add(rotationSpeed, 'speed', 0.0, 0.1);

    var treePos = { scale: 0.05 };
    gui.add(treePos, 'scale', 0.0, 1);
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // const square = new THREE.BoxGeometry(50, 0.1, 50);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(square, boxMaterial);
    // boxMesh.material.color;
    // test.scene.add(boxMesh);

    //boxMesh.position.set(0, -3.6, 0);

    let loadedModel;
    let loadedBlade;
    let loadedTree;
    let loadedTextureTree;
    const glftLoader = new GLTFLoader();

    glftLoader.load('../assets/scene/wind-neck.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 9;
      gltfScene.scene.position.x = 15;
      gltfScene.scene.position.z = 18;
      // gltfScene.scene.position.z = 15;
      gltfScene.scene.scale.set(0.005, 0.005, 0.005);

      gltfScene.scene.children[0].children[1].material.color.r = 172;
      gltfScene.scene.children[0].children[1].material.color.g = 172;
      gltfScene.scene.children[0].children[1].material.color.b = 172;

      // gui.add(gltfScene.scene.position, 'z', 0);

      test.scene.add(gltfScene.scene);
    });

    glftLoader.load('../assets/scene/wind-blade.gltf', (gltfScene) => {
      loadedBlade = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 9;
      gltfScene.scene.position.x = 15;
      gltfScene.scene.position.z = 18;
      // gltfScene.scene.position.z = 15;
      gltfScene.scene.scale.set(0.005, 0.005, 0.005);
      gltfScene.scene.children[0].children[1].material.color.r = 0;
      gltfScene.scene.children[0].children[1].material.color.g = 0;
      gltfScene.scene.children[0].children[1].material.color.b = 1;

      console.log(gltfScene.scene.children[0].children[1].material);

      // gui.add(gltfScene.scene.position, 'z', 0);
      test.scene.add(gltfScene.scene);
    });

    glftLoader.load('../assets/shiba/LowPollyTree.gltf', (treeScene) => {
      loadedTree = treeScene;
      // console.log(loadedModel);

      treeScene.scene.rotation.y = Math.PI / 8;
      treeScene.scene.position.y = -5.5;
      treeScene.scene.position.x = -3;
      treeScene.scene.position.z = 25;
      treeScene.scene.scale.set(0.05, 0.05, 0.05);

      treeScene.scene.children[0].children[0].children[0].material.color.r = 0;
      treeScene.scene.children[0].children[0].children[0].material.color.g = 255;
      treeScene.scene.children[0].children[0].children[0].material.color.b = 0;

      //console.log(gltfScene.scene.children[0].children[0].children);

      // gltfScene.scene.children[0].children[1].material.color.r = 172;
      // gltfScene.scene.children[0].children[1].material.color.g = 172;
      // gltfScene.scene.children[0].children[1].material.color.b = 172;

      test.scene.add(treeScene.scene);
    });

    glftLoader.load(
      '../assets/scene/tree-textured.gltf',
      (textureTreeScene) => {
        loadedTextureTree = textureTreeScene;
        // console.log(loadedModel);

        textureTreeScene.scene.rotation.y = Math.PI / 8;
        textureTreeScene.scene.position.y = -5.5;
        textureTreeScene.scene.position.x = 15;
        textureTreeScene.scene.position.z = 25;
        textureTreeScene.scene.scale.set(0.05, 0.05, 0.05);

        test.scene.add(textureTreeScene.scene);
      }
    );

    glftLoader.load('../assets/shiba/House.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = -5;
      gltfScene.scene.position.x = 10;
      gltfScene.scene.scale.set(0.05, 0.05, 0.05);
      gltfScene.castShadow = true;

      // for (let i = 0; i < childrenAmount; i++) {
      //   console.log(i);
      // }

      console.log(gltfScene.scene.children[0].children[0].children[0].material);

      gltfScene.scene.children[0].children[0].children[0].material.color.r = 1;
      gltfScene.scene.children[0].children[0].children[0].material.color.g = 0;
      gltfScene.scene.children[0].children[0].children[0].material.color.b = 0;

      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedBlade) {
        // loadedBlade.scene.rotation.x += 0.01;
        // loadedBlade.scene.rotation.y += 0.01;
        loadedBlade.scene.rotation.z += rotationSpeed.speed;
      }
      if (loadedTree) {
        loadedTree.scene.scale.x = treePos.scale;
        loadedTree.scene.scale.y = treePos.scale;
        loadedTree.scene.scale.z = treePos.scale;
        // loadedTree.scene.position.x = treePos.posX;
        // loadedTree.scene.position.z = treePos.posZ;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
