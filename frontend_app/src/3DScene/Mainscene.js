import webXRScene from '../webxrscene/src/index';
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { TransformControls } from "three/examples/jsm/controls/TransformControls";


class MainScene {
  constructor(props) {

    this.store = props.store;
    this.xr = new webXRScene(props.domElement);
    this.library = {};
    this.cube;
    this.domElement = props.domElement;
    //debug
    window._xr = this.xr;
    this.Init();

  }
  Init() {
    this.xr.Controls.SetPosition(0, 2, 30);
    console.log("Context ",this.xr.Controls.context)

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 2, 0);
    this.xr.Scene.add(light);
    this.CreatePrimitives();
    //this.xr.Controls.arButton.SetDomOverlay(document.getElementById('ContainerPreview'));
    this.xr.Controls.arButton.SetDomOverlay(document.getElementById('slide-menu'));

    var geometryRecticle = new THREE.BoxGeometry(0.3, 0.05, 0.3);
    var materialRecticle = new THREE.MeshBasicMaterial({ color: 0xF15C3C66 });
    this.reticle = new THREE.Mesh(geometryRecticle, materialRecticle);
    this.reticle.visible = false;
    this.xr.Controls.arButton.SetReticle(this.reticle);

    this.xr.Scene.add(this.reticle);


    this.rootGroup = new THREE.Group();
    this.xr.Scene.add(this.rootGroup);

    this.control = new TransformControls(this.xr.Camera.instance, document.getElementById(this.domElement));
    this.control.addEventListener('dragging-changed', (event) => {
      console.log("DRAGGING CHANGED ", event)
      this.xr.Controls.Desktop.instance.enabled = !event.value;
      console.log("ORBIT DISABLED ", this.xr.Controls.Desktop.instance.enabled)
    });
    this.control.attach(this.rootGroup);
    this.control.visible = this.store.state.transformActive;

    this.xr.Scene.add(this.control);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x55ff99 });
    this.cube = new THREE.Mesh(geometry, material);
    this.rootGroup.add(this.cube);
    this.xr.Controls.arButton.SetRootElement(this.rootGroup);

    this.store.watch(
      (state) => state.transformActive,
      (newValue, oldValue) => {
        this.control.visible = newValue;
      }
    );

    this.store.watch(
      (state) => state.planeDetectionActive,
      (newValue, oldValue) => {
        this.xr.Controls.arButton.SetTrackingActive(newValue);
      }
    );
  

    this.xr.Events.registerEvent("OnObjectPlacedOnPlane");
    this.xr.Events.addEventListener("OnObjectPlacedOnPlane",()=>{
      console.log("Object Placed")
      this.store.commit("SetTrackingActive",false)
    });
  }

  CreatePrimitives() {
    this.library.Cube = { scene: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial()) };
    this.library.Cone = { scene: new THREE.Mesh(new THREE.ConeGeometry(.5, 1, 32), new THREE.MeshNormalMaterial()) };
    this.library.Cylinder = { scene: new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1, 32), new THREE.MeshNormalMaterial()) };
    this.library.Sphere = { scene: new THREE.Mesh(new THREE.SphereGeometry(.5, 16, 16), new THREE.MeshNormalMaterial()) };
    this.library.Torus = { scene: new THREE.Mesh(new THREE.TorusGeometry(.314, .15, 12, 32), new THREE.MeshNormalMaterial()) };
    this.library.Plane = { scene: new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshNormalMaterial()) };
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