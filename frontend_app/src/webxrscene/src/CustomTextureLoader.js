import {TextureLoader,PMREMGenerator,DefaultLoadingManager} from 'three';

class CustomTextureLoader {

  constructor(context){
    this.context = context;
  
    this.context.Events.registerEvent('OnTextureLoadStack');
    this.context.Events.registerEvent('OnTextureLoad');
    this.context.Events.registerEvent('OnTextureProgress');

    this.instance = new TextureLoader();

    this.pmremGenerator = new PMREMGenerator( this.context.Renderer.instance );
    this.pmremGenerator.compileEquirectangularShader();
    
    DefaultLoadingManager.onLoad = () => {

      this.pmremGenerator.dispose();

    };
  }

  loadStack(stack){
    
    return new Promise((resolve,reject)=>{
      let promises = stack.stack.map((s,index)=>{
        return this.load(Object.assign(s,{
          progress : stack.progress
        }));
      });
      Promise.all(promises).then((el)=>{
        let library = {};
        el.map((obj,index)=>{
          library[obj.name] = obj;
        });
        this.context.Events.dispatchEvent('OnTextureLoadStack',library);
        resolve(library);
      }).catch(reject);
    });
  }


  load = (url) =>{
    return new Promise((resolve,reject)=>{
      this.instance.load(url,(texture)=>{
        resolve(texture);
        this.context.Events.dispatchEvent('OnTextureLoad',{name: name, texture : texture});
      },(_step)=>{
        this.context.Events.dispatchEvent('OnTextureProgress',{isLoading:( _step.loaded / _step.total == 1 ? false : true), progress: _step.loaded / _step.total,name : name });
      },reject);
    });
  }




}

export {CustomTextureLoader};