import * as THREE from 'three';
import {DesktopControls} from './DesktopControls';
import {VRController} from './VRController';
import { VRButton } from './VRButton.js';
import { ARButton } from './ARButton.js';
import { Vector3 } from 'three';

class Controls{
  constructor(context){
    this.enabled = true;
    this.interactivityEnabled = true;
    this.context = context;
    this.currentControls = "Desktop";
    //Binding
    this.SetupMouse = this.SetupMouse.bind(this);
    this.getClientBox = this.getClientBox.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.touchstart = this.touchstart.bind(this);
    this.touchend = this.touchend.bind(this);

    this.size = this.getClientBox();
    this.Desktop = new DesktopControls(context.Camera.instance,context.Renderer.instance.domElement),
    
    this.Update = this.Update.bind(this);
    this.SetPosition = this.SetPosition.bind(this);
    this.SetTarget = this.SetTarget.bind(this);
    this.GetTarget = this.GetTarget.bind(this);
    this.GetCameraPosition = this.GetCameraPosition.bind(this);

    //array of active elements in scene
    this.ActiveObjects = [];
    this.raycaster = new THREE.Raycaster();
    this.SetupMouse();
    this.selectState = false;

    this.context.Events.registerEvent("mouse-down");
    this.context.Events.registerEvent("mouse-up");
    this.context.Events.registerEvent("ui-mouse-down");
    this.context.Events.registerEvent("ui-hovered");
    this.context.Events.registerEvent("ui-idle");
    this.context.Events.registerEvent("OnChangeXRView");

    /** VR AR DOM ELEMENTS - Buttons */
    this.vrButton = VRButton.createButton(this.context.Renderer.instance,this.context);
    this.arButton = new ARButton(this.context.Renderer,this.context);

    this.SetupVR = this.SetupVR.bind(this);
    this.SetupAR = this.SetupAR.bind(this);

    this.context.Events.addEventListener("OnChangeXRView",(settings)=>{

      this.currentControls = settings.xrMode;

      switch(settings.xrMode){
        case "VR":
          this.SetupVR(settings);
        break;
        case "AR":
          this.SetupAR(settings);
        break;
        default:
          this.SetupDesktop(settings);
        break;
      }
    });

    this.GetARButton = this.GetARButton.bind(this);
    this.GetVRButton = this.GetVRButton.bind(this);

    /**VR Controls */
    this.vr_controller = new VRController( this.context );

    this.context.Scene.add( this.vr_controller.controllerGrips[ 0 ], this.vr_controller.controllers[ 0 ] );

    this.vr_controller.controllers[ 0 ].addEventListener( 'selectstart', ()=> { 
      this.selectState = true;
      
      this.context.Events.dispatchEvent("mouse-down",{});
    
    });
    this.vr_controller.controllers[ 0 ].addEventListener( 'selectend', ()=> { 
      this.selectState = false;
      this.context.Events.dispatchEvent("mouse-up",{});
    });

    this.context.Events.addEventListener("OnAnimationLoop", this.Update );

  }

  SetupMouse(settings){
    this.mouse = new THREE.Vector2();
    this.mouse.x = null;
    this.mouse.y = null;

    this.selectState = false;

    window.addEventListener( 'mousemove',this.mousemove,false);
    window.addEventListener( 'mousedown', this.mousedown,false);
    window.addEventListener( 'mouseup', this.mouseup,false);
    window.addEventListener( 'touchstart', this.touchstart);
    window.addEventListener( 'touchend', this.touchend);
  }
  getClientBox(){
    var size = this.context.Renderer.instance.domElement.getBoundingClientRect();
    return size;
  }
  GetCurrentXRMode(){
    return this.currentControls;
  }
  mousedown(){ this.selectState = true; }
  mouseup(){ this.selectState = false; }
  mousemove(e){
    this.mouse.x = ( e.clientX / this.size.width ) * 2 - 1;
    this.mouse.y = - ( e.clientY / this.size.height ) * 2 + 1;
  }
  touchstart(e){
    this.selectState = true;
    this.mouse.x = ( e.touches[0].clientX / this.size.width ) * 2 - 1;
    this.mouse.y = - ( e.touches[0].clientY / this.size.height ) * 2 + 1;
  }
  touchend(e){
      this.selectState = false;
      this.mouse.x = null;
      this.mouse.y = null;
  }
//
  ChangeToDefault = ()=>{
    if(this.currentControls == "Desktop"){
      this.Desktop.ChangeToDefault();
    }
  }
  ChangeToStatic = ()=>{
    if(this.currentControls == "Desktop"){
      this.Desktop.ChangeToStatic();
    }
  }

  SetupDesktop(settings){
    
    if(this.context.Camera.instance.parent.name == "cameraHelper"){
      var pos = this.context.Camera.instance.parent.position.clone();
      var rot = this.context.Camera.instance.parent.rotation.clone();

      this.cameraHelper.remove(this.context.Camera.instance);
      this.context.Scene.add(this.context.Camera.instance);
      this.context.Camera.instance.position = pos;
      this.context.Camera.instance.rotation = rot;
      this[this.currentControls].instance.update();
    }
    this.context.Renderer.instance.setClearColor(0xffffff,0);
  }

  SetupVR(settings){


    if(typeof(this.cameraHelper) == "undefined"){
      this.cameraHelper = new THREE.Group();
      this.cameraHelper.name = "cameraHelper";
      this.cameraHelper.position.set(0,0,0);

    }
    
    var vrCamera = this.context.Renderer.instance.xr.getCamera(this.context.Camera.instance);
    this.cameraHelper.add(this.context.Camera.instance);
    var _position = vrCamera.position.clone();
    vrCamera.position.set(0,1.7,0);
    this.cameraHelper.position.set(_position.x,_position.y,_position.z);

    this.context.Renderer.instance.autoClear = true;
    this.context.Renderer.instance.setClearColor(0xffffff,1);
  
    this.vr_controller.controllerGrips.forEach((controller)=>{
      controller.parent = this.cameraHelper;      
    });
    this.vr_controller.controllers.forEach((controller)=>{
      controller.parent = this.cameraHelper;
    });



  }

  SetupAR(){

    if(typeof(this.cameraHelper) == "undefined"){
      this.cameraHelper = new THREE.Object3D();
      this.cameraHelper.name = "cameraHelper";
    }
    this.cameraHelper.add(this.context.Camera.instance);
    var _position = this.context.Camera.instance.position.clone();
    this.context.Camera.instance.position.set(0,0,0);
    this.cameraHelper.position.set(_position.x,_position.y,_position.z);
    this.context.Renderer.instance.setClearColor(0xffffff,0);

    this.vr_controller.controllerGrips.forEach((controller)=>{
      controller.parent = this.cameraHelper;      
    });
    this.vr_controller.controllers.forEach((controller)=>{
      controller.parent = this.cameraHelper;
    });
  }

  GetVRButton(){
    return this.vrButton;
  }
  
  GetARButton(){
    return this.arButton;
  }
  Update(t){

    if(this.ActiveObjects.length > 0 && this.interactivityEnabled){
      this.FindIntersection();
    }
    if(this.currentControls == "VR"){
      //this.vr_controller.Update();
    }

    if(this.currentControls == "Desktop"){
      //this[this.currentControls].instance.enabled = this.enabled;
      this[this.currentControls].instance.update(t);
    }
  }
  GetPosition(){
    return this.context.Camera.instance.position;
  }

  SetPosition (x,y,z){

    switch (this.currentControls) {
      case "Desktop":
        this.context.Camera.instance.position.set(x,y,z);
      break;
      case "VR":
        this.cameraHelper.position.set(x,y,z);
      break;
    
      default:
      break;
    }
  }
  SetTarget (x,y,z){
    
     switch (this.currentControls) {
      case "VR":
        this.cameraHelper.lookAt(new THREE.Vector3(x,y,z));
        this.cameraHelper.rotation.x = 0;
        this.cameraHelper.rotation.z = 0;
      break;
      default:
        this[this.currentControls].SetTarget(x,y,z);
      break;
    }
  }

  GetTarget(){
   
    switch(this.currentControls){
      case "VR":
        return new Vector3(0,0,0);//{x:0,y:0,z:0}
      break;
      default:
        return this[this.currentControls].instance.target;
      break;
    }
  }

  GetCameraPosition(){

    
    switch(this.currentControls){
      case "VR":
        
        return this.context.Renderer.instance.xr.getCamera(this.context.Camera.instance).position;
      break;
      case "AR":
        return this.context.Renderer.instance.xr.getCamera(this.context.Camera.instance).position;
       // return this.context.Camera.instance.position;//this.cameraHelper.position;
      break;
      default:
        return this.context.Camera.instance.position;
      break;
    }
  }

  /**Interactive Objects */

  Raycast() {

    return this.ActiveObjects.reduce( (closestIntersection, obj)=> {

      const intersection = this.raycaster.intersectObject( obj, true );

      if ( !intersection[0] ) return closestIntersection;

      if ( !closestIntersection || intersection[0].distance < closestIntersection.distance ) {

        intersection[0].object = obj;

        return intersection[0]

      } else {

        return closestIntersection

      };

    }, null );

  }
  FindIntersection(){
    // Find closest intersecting object
    let intersect;
    if(this.currentControls == "VR"){
      this.vr_controller.SetFromController( 0, this.raycaster.ray );

      intersect = this.Raycast();
      // Position the little white dot at the end of the controller pointing ray
      if ( intersect ) this.vr_controller.SetPointerAt( 0, intersect.point );
    }

    if(this.currentControls == "Desktop"){
      if ( this.mouse.x !== null && this.mouse.y !== null ) {

        this.raycaster.setFromCamera(this.mouse, this.context.Camera.instance );
        intersect = this.Raycast();
      }
    }
    


    //TODO: Not only for UI elements
    if ( intersect && intersect.object.isUI ) {

      if ( this.selectState ) {
        // Component.setState internally call component.set with the options you defined in component.setupState
        intersect.object.setState( 'selected' );
        this.context.Events.dispatchEvent("ui-mouse-down", intersect.object); 
      } else {
        // Component.setState internally call component.set with the options you defined in component.setupState
        intersect.object.setState( 'hovered' );
        this.context.Events.dispatchEvent("ui-hovered", intersect.object); 
      };
    }

    //Deselect every activeObject that is not the current intersect object
      this.ActiveObjects.forEach( (obj)=> {

        if ( (!intersect || obj !== intersect.object) && obj.isUI ) {
          // Component.setState internally call component.set with the options you defined in component.setupState
          obj.setState( 'idle' );
          this.context.Events.dispatchEvent("ui-idle", null); 
        };
      });
  }

}

export {Controls};