class Update {
  constructor(){
    this.__update = this.__update.bind(this);
    this.__isRunning = false;
    this.updateMethod = {}
  }

  start(){
    if(this.__isRunning){return;}

    this.frame = this.__update();
    this.__isRunning = true;
  }
  stop(){
    if(!this.__isRunning){return;}
    cancelAnimationFrame(this.frame);
    this.__isRunning = false;
  }
  AddUpdateMethod(name, event){
    this.updateMethod[name] = event;
  }
  RemoveUpdateMethod(name){
    delete this.updateMethod[name];
  }
  __update(){
    this.frame = requestAnimationFrame( this.__update );
    
    for(var method in this.updateMethod){
      this.updateMethod[method]();
    }
  }
}

export {Update};