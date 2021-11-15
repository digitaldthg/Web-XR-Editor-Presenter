const Utils = {
  lerp : (v1, v2, alpha)=>{
    alpha = alpha < 0 ? 0 : alpha;
    alpha = alpha > 1 ? 1 : alpha;
    return v1 + (v2 - v1) * alpha;
  },
  getPointInCircle : (point,target, radius) =>{
    var distsq = (point.x - target.x) * (point.x - target.x) + (point.y - target.y) * (point.y - target.y) + (point.z - target.z) * (point.z - target.z);
    // returns bool , distance to target origin 
    return [distsq <= radius * radius * radius,distsq];
  },
  getPointOnCircle: (radius,deg, origin) =>{
    var x = origin.x + Math.sin(deg * Math.PI / 180) * radius;//radius;// (Math.sin(deg * Math.PI / 180) * radius);
    var y = origin.y + Math.cos(deg * Math.PI / 180) * radius;//radius; //+ (Math.cos(deg * Math.PI / 180) * radius);
    return {
        x : x,
        y : y
    }
  },
  WorldToScreenPosition : (vector3,camera,container = null) =>{
    var size = {
      x : window.innerWidth,
      y :  window.innerHeight,
      top : 0,
      left : 0
    }

    if(container !== null){
      var rect = container.getBoundingClientRect();
      size.x = rect.width;
      size.y = rect.height;
      size.top = rect.top;
      size.left = rect.left;
    }
    var widthHalf = size.x / 2, heightHalf = size.y / 2;
    
    var pos = vector3.clone();
    pos.project(camera);
    pos.x = ( pos.x * widthHalf ) + widthHalf + size.left;
    pos.y = - ( pos.y * heightHalf ) + heightHalf + size.top;
   
    return pos;
  }
  
}

export {Utils}