class Event{
  constructor(name){
    this.name = name;
    this.callbacks = [];
  }
  
  registerCallback(callback){
    this.callbacks.push(callback);
  }
}

class Events{
  constructor(){
    this.events = {};
  }

  registerEvent(eventName){
    var event = new Event(eventName);
    this.events[eventName] = event;
  }

  dispatchEvent(eventName, eventArgs){
    if(typeof(this.events[eventName]) == "undefined"){return;}
    
    this.events[eventName].callbacks.forEach(function(callback){
      callback(eventArgs);
    });
  }

  addEventListener(eventName, callback){
    
    if(this.events.hasOwnProperty(eventName)){
      
      if(this.events[eventName].callbacks.length > 0){
        if(this.events[eventName].callbacks.indexOf(callback) != -1){
          console.log("duplicate " , this.events[eventName].callbacks.indexOf(callback), callback);
          return false;
        }
      }
    }
    this.events[eventName].registerCallback(callback);
  }

  removeEventListener(eventName, callback){
    if(this.events.hasOwnProperty(eventName)){
      this.events[eventName].callbacks = this.events[eventName].callbacks.filter(c => c != callback);
    }
  }
}


export {Events};