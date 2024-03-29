import webXRScene from '../webxrscene/src/index';
import * as THREE from 'three';
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import ThreeMeshUI from 'three-mesh-ui';
import textJson from '../assets/Roboto-msdf.json';
import * as textPng from '@/assets/Roboto-msdf.png';



class MainScene {
  constructor(props) {

    this.store = props.store;
    this.xr = new webXRScene(props.domElement);
    this.library = {};
    this.cube;
    this.domElement = props.domElement;
    window._xr = this.xr;
    this.Init();

  }
  
  //Set up 3D Scene
  Init() {
    this.xr.Controls.SetPosition(0, 0, 0);
    this.xr.Camera.SetPosition(0, 0.1, 0.5);
    //Add AR Button
    this.xr.Controls.arButton.SetDomOverlay(document.getElementById('slide-menu'));


    //LIGHTS
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 2, 0);
    this.xr.Scene.add(light);

    this.CreatePrimitives();

    //Plane Detection Reticle
    var geometryRecticle = new THREE.PlaneBufferGeometry(.2, .2, 32, 32);
    var materialRecticle = new THREE.MeshBasicMaterial({ color: 0xF15C3C, side: THREE.DoubleSide });
    this.reticle = new THREE.Mesh(geometryRecticle, materialRecticle);
    this.reticle.rotation.x = 90 * Math.PI / 180;
    this.reticle.visible = false;
    this.reticle.matrixAutoUpdate = true;
    this.xr.Controls.arButton.SetReticle(this.reticle);
    this.xr.Scene.add(this.reticle);

    //ROOT GROUP
    this.rootGroup = new THREE.Group();
    this.xr.Scene.add(this.rootGroup);

    //INIT CONTROLS
    this.control = new TransformControls(this.xr.Camera.instance, document.getElementById(this.domElement));
    this.control.addEventListener('dragging-changed', (event) => {
      this.xr.Controls.Desktop.instance.enabled = !event.value;
      this.xr.Controls.Desktop.orbit.enabled = !event.value;
    });
    this.control.attach(this.rootGroup);
    this.control.visible = this.store.state.transformActive;
    this.xr.Scene.add(this.control);
    this.xr.Controls.arButton.SetRootElement(this.rootGroup);


    //WATCHERS
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

    //EVENTS
    this.xr.Events.addEventListener("OnChangeXRView", (mode) => {
      this.store.commit("SetViewMode", mode.xrMode);
    })

    this.xr.Events.registerEvent("OnObjectPlacedOnPlane");

    this.xr.Events.addEventListener("OnObjectPlacedOnPlane", () => {
      this.store.commit("SetTrackingActive", false)
    });

    this.xr.Events.addEventListener("OnAnimationLoop", () => {
      ThreeMeshUI.update();
    })
  }

  CreatePrimitives() {
    //Create Primitives and add to library
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

  LoadText(stack) {
    var textObjects = {};
    stack.forEach(slideElement => {
      var text = this.CreateTextElement(slideElement);

      textObjects[slideElement.id] = slideElement;
      textObjects[slideElement.id].scene = text;
    });
    return textObjects;
  }

  LoadPrimitives(stack) {
    var primitives = {};
    stack.forEach(slideElement => {
      primitives[slideElement.id] = slideElement;
      primitives[slideElement.id].scene = this.library[slideElement.element.Primitive.PrimitiveType].scene;
    });
    return primitives;
  }

  CreateTextElement(slideElement) {
    var settings = slideElement.element.FontSettings;
    const container = new ThreeMeshUI.Block({
      height: settings.Height != null ? settings.Height : 2.5,
      width: settings.Width != null ? settings.Width : 4,
      padding: settings.Padding != null ? settings.Padding : .2,
      backgroundOpacity: settings.BackgroundOpacity != null ? settings.BackgroundOpacity : 1,
      backgroundColor: settings.BackgroundColor != null ? new THREE.Color(settings.BackgroundColor) : new THREE.Color(0xaaaaaa),
      alignContent: settings.Alignment != null ? settings.Alignment : "left",
      justifyContent: settings.Justification != null ? settings.Justification : "center",
      interLine: settings.LineHeight != null ? settings.LineHeight * .01 : .01
    });

    const Text = new ThreeMeshUI.Text({
      content: settings.Content != null ? settings.Content : "Default Text",
      fontColor: settings.Color != null ? new THREE.Color(settings.Color) : new THREE.Color(0x000000),
      fontSize: settings.FontSize != null ? settings.FontSize * .5 : .5,
      fontFamily: textJson,
      fontTexture: textPng,
    });

    container.add(Text);
    return container;
  }



  GetVRButton() {
    return this.xr.Controls.GetVRButton();
  }
}

export default MainScene;