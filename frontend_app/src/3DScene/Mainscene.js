import webXRScene from '../webxrscene/src/index';
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';


class MainScene {
  constructor(props) {
    this.store = props.store;
    this.xr = new webXRScene(props.domElement);
    this.library = {};
    //debug
    window._xr = this.xr;
    this.Init();

  }
  Init() {
    this.xr.Controls.SetPosition(0, 2, 30);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x55ff99 });
    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight( 0xffffff, 2);
    light.position.set(0,2,0);
    this.xr.Scene.add(light);
    this.CreatePrimitives();
  }

  CreatePrimitives(){
    this.library.Cube = {scene : new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial())};
    this.library.Cone= {scene : new THREE.Mesh(new THREE.ConeGeometry(.5,1,32), new THREE.MeshNormalMaterial())};
    this.library.Cylinder= {scene :  new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,1,32), new THREE.MeshNormalMaterial())};
    this.library.Sphere= {scene :  new THREE.Mesh(new THREE.SphereGeometry(.5,16,16), new THREE.MeshNormalMaterial())};
    this.library.Torus= {scene :  new THREE.Mesh(new THREE.TorusGeometry(.314,.15,12,32), new THREE.MeshNormalMaterial())};
    this.library.Plane= {scene :  new THREE.Mesh(new THREE.PlaneGeometry(1,1), new THREE.MeshNormalMaterial())};
  }

  LoadStack(stack) {
    return this.xr.Loader.loadStack({
      progress: (percentage, singleProgress) => {
        //console.log(percentage,singleProgress);
      },
      stack: stack
    })
  }

  LoadPrimitives(stack) {
    var primitives = {};
    stack.forEach(slideElement => {
      primitives[slideElement.id] = slideElement;
      primitives[slideElement.id].scene = this.library[slideElement.element.Primitive.PrimitiveType].scene;
    });
    return primitives;
  }


  GetVRButton() {
    return this.xr.Controls.GetVRButton();
  }
}

export default MainScene;