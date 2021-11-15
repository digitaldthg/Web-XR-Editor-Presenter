import Stats from './stats';

class StatClass extends Stats {
  constructor(context){
    super();
    this.context = context;
    this.domElement.style.position = 'absolute';
    this.domElement.style.bottom = '0px';
    this.domElement.style.zIndex = 100;
    document.body.appendChild( this.domElement );

    this.context.Events.addEventListener("OnAnimationLoop" , ()=>{
      this.update();
    })
  }
  

}

export default StatClass;