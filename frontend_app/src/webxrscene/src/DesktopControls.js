
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {StaticControls} from './StaticControls';

class DesktopControls {
  
  constructor(camera,domElement){
    
    this.orbit = new OrbitControls(camera,domElement);
    this.static = new StaticControls(camera,domElement);
    this.static.enabled = false;
    
    this.instance = this.orbit;


    // this.instance.enableZoom = true;
		// this.instance.enablePan = false;
		// this.instance.enableDamping = true;
    // this.instance.rotateSpeed = 0.5;
    
  }

  ChangeToStatic = () =>{

    this.instance = this.static;
    this.static.enabled = true;
    this.orbit.enabled = false;
  }
  ChangeToDefault = () =>{
    this.instance = this.orbit;
    this.static.enabled = false;
    this.orbit.enabled = true;
  }

  SetTarget = (x,y,z)=>{
    this.static.target.set(x,y,z);
    this.orbit.target.set(x,y,z);

    this.static.update();
    this.orbit.update();
  }


  
}

export {DesktopControls};