import webXRScene from '../webxrscene/src/index';
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';


class MainScene {
  constructor(props) {
    this.store = props.store;
    this.xr = new webXRScene(props.domElement);
    //debug
    window._xr = this.xr;
    this.Init();

  }
  Init() {
    this.xr.Controls.SetPosition(0, 2, 30);
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({ color: 0x55ff99 });
    const cube = new THREE.Mesh(geometry, material);

    const light = new THREE.AmbientLight( 0xAAAAAA );

    this.xr.Scene.add(cube,light);
  }
  LoadStack(stack) {
    return this.xr.Loader.loadStack({
      progress: (percentage, singleProgress) => {
        //console.log(percentage,singleProgress);
      },
      stack: stack
    })
  }


  GetVRButton() {
    return this.xr.Controls.GetVRButton();
  }
}

export default MainScene;