import {PerspectiveCamera,Vector2} from 'three';
import StereoCamera from './StereoCamera';

import { RenderPass } from "postprocessing";

class Camera {
  constructor(context){
    this.context = context;
    this.instance = new PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 200 );
   

    this.context.Events.addEventListener("OnMount",this.AddEvents);
    
    this.cameras = [];
    this.renderPass = new RenderPass(this.context.Scene, this.instance);
    
  }

  AddEvents = ()=>{
    this.context.Events.addEventListener("OnAnimationLoop",this.update);
    
  }

  SetPosition(vector3){
    this.SetPosition({...vector3});
  }
  SetPosition(x,y,z){
    this.instance.position.set(x,y,z);
  }
  GetPosition(){
    
    let _currentControls = this.context.Controls.GetCurrentXRMode();
    switch(_currentControls){
      case "VR":
        return this.context.Renderer.instance.xr.getCamera(this.instance).position;
      break;
      default:
        return this.instance.position;
        break;
    }
  }
 
  update = ()=>{
        
  }

}

export {Camera};