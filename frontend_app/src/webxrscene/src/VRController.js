import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

class VRController {

  constructor(context){
    this.context = context;
    this.controllers = [];
    this.controllerGrips = [];
    this.raycaster = new THREE.Raycaster();

    this.controllerModelFactory = new XRControllerModelFactory();

    /**LineHelper */
    this.material = new THREE.MeshBasicMaterial( {
      color: 0xffffff,
      alphaMap: new THREE.CanvasTexture( this.GetRayTexture() ),
      transparent: true
    });

    this.geometry = new THREE.BoxBufferGeometry( 0.004, 0.004, 0.35 );    
    this.geometry.translate( 0, 0, -0.15 );

    this.dummyMatrix = new THREE.Matrix4();

    this.uvAttribute = this.geometry.attributes.uv;
    for ( var i = 0; i < this.uvAttribute.count; i ++ ) {
        
        var u = this.uvAttribute.getX( i );
        var v = this.uvAttribute.getY( i );
          
        [ u, v ] = (()=> {
          switch ( i ) {
            case 0 : return [ 1, 1 ]
            case 1 : return [ 0, 0 ]
            case 2 : return [ 1, 1 ]
            case 3 : return [ 0, 0 ]
            case 4 : return [ 0, 0 ]
            case 5 : return [ 1, 1 ]
            case 6 : return [ 0, 0 ]
            case 7 : return [ 1, 1 ]
            case 8 : return [ 0, 0 ]
            case 9 : return [ 0, 0 ]
            case 10 : return [ 1, 1 ]
            case 11 : return [ 1, 1 ]
            case 12 : return [ 1, 1 ]
            case 13 : return [ 1, 1 ]
            case 14 : return [ 0, 0 ]
            case 15 : return [ 0, 0 ]
            default : return [ 0, 0 ]
          };
        })();
				
	    this.uvAttribute.setXY( i, u, v );
			
	  };
    this.linesHelper = new THREE.Mesh( this.geometry, this.material );
    this.linesHelper.renderOrder = Infinity;

    /////////////////
    // Point helper
    /////////////////

    this.spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture( this.GetPointerTexture() ),
      sizeAttenuation: false,
      depthTest: false
    });

    this.pointer = new THREE.Sprite( this.spriteMaterial );

    this.pointer.scale.set(0.015, 0.015, 1)
    this.pointer.renderOrder = Infinity;

    ////////////////
    // Controllers
    ////////////////

    this.controller1 = this.context.Renderer.instance.xr.getController( 0 );
    this.controller2 = this.context.Renderer.instance.xr.getController( 1 );

    this.controller1.name = "controller-right";
    this.controller2.name = "controller-left";

    this.controllerGrip1 = this.context.Renderer.instance.xr.getControllerGrip( 0 );
    this.controllerGrip2 = this.context.Renderer.instance.xr.getControllerGrip( 1 );

    if ( this.controller1 ) this.controllers.push( this.controller1 );
    if ( this.controller2 ) this.controllers.push( this.controller2 );

    if ( this.controllerGrip1 ) this.controllerGrips.push( this.controllerGrip1 );
    if ( this.controllerGrip2 ) this.controllerGrips.push( this.controllerGrip2 );

    this.controllers.forEach( (controller)=> {

      const ray = this.linesHelper.clone();
      const point = this.pointer.clone();

      controller.add( ray, point );
      controller.ray = ray;
      controller.point = point;

    });

    this.controllerGrips.forEach( (controllerGrip)=> {
      controllerGrip.add( this.controllerModelFactory.createControllerModel( controllerGrip ) );
    });

  }
	// Set the passed ray to match the given controller pointing direction

	SetFromController( controllerID, ray ) {

		const controller = this.controllers[ controllerID ];

		// Position the intersection ray

		this.dummyMatrix.identity().extractRotation( controller.matrixWorld );

		ray.origin.setFromMatrixPosition( controller.matrixWorld );
		ray.direction.set( 0, 0, - 1 ).applyMatrix4( this.dummyMatrix );

	}

	// Position the chosen controller's pointer at the given point in space.
	// Should be called after raycaster.intersectObject() found an intersection point.

	SetPointerAt( controllerID, vec ) {

		const controller = this.controllers[ controllerID ];
		const localVec = controller.worldToLocal( vec );

		controller.point.position.copy( localVec );
		controller.point.visible = true;

	}

  GetRayTexture() {

    var canvas = document.createElement( 'canvas' );
        canvas.width = 64;
        canvas.height = 64;

        var c = canvas.getContext("2d");

    var gradient = c.createLinearGradient(0, 0, 64, 0);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "white");

        c.fillStyle = gradient;
        c.fillRect(0, 0, 64, 64);

        return canvas;

  }
  GetPointerTexture() {

    var canvas = document.createElement( 'canvas' );
    canvas.width = 64;
    canvas.height = 64;

    var c = canvas.getContext("2d");

    c.beginPath();
    c.arc(32, 32, 29, 0, 2 * Math.PI);
    c.lineWidth = 5;
    c.stroke();
    c.fillStyle = "white";
    c.fill();

    return canvas;

  }
}

export {VRController};

// //////////////////////////////
// // CANVAS TEXTURE GENERATION
// //////////////////////////////

// // Generate the texture needed to make the intersection ray fade away

// function GetRayTexture() {

// 	var canvas = document.createElement( 'canvas' );
// 	canvas.width = 64;
// 	canvas.height = 64;

// 	var ctx = canvas.getContext("2d");

// 	var gradient = ctx.createLinearGradient(0, 0, 64, 0);
// 	gradient.addColorStop(0, "black");
// 	gradient.addColorStop(1, "white");

// 	ctx.fillStyle = gradient;
// 	ctx.fillRect(0, 0, 64, 64);

// 	return canvas;

// };

// // Generate the texture of the point helper sprite

// function GetPointerTexture() {

// 	var canvas = document.createElement( 'canvas' );
// 	canvas.width = 64;
// 	canvas.height = 64;

// 	var ctx = canvas.getContext("2d");

// 	ctx.beginPath();
// 	ctx.arc(32, 32, 29, 0, 2 * Math.PI);
// 	ctx.lineWidth = 5;
// 	ctx.stroke();
// 	ctx.fillStyle = "white";
// 	ctx.fill();

// 	return canvas;

// };
