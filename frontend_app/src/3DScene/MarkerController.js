import MarkerImage from './pattern-marker.patt';

const { ArMarkerControls, ArToolkitContext, ArToolkitSource } = THREEx;
class MarkerController{
  constructor(){

    ArToolkitContext.baseURL = "../";

    var arToolkitSource = new THREEx.ArToolkitSource({
      sourceType : 'webcam',
      sourceWidth: 480,
      sourceHeight: 640,
  })
    
  //this.InitMarker();

  }

  
  InitMarker(){
    var param = new ARCameraParam();

      param.onload = function () {
        var img = document.getElementById('my-image');
        var ar = new ARController(img.width, img.height, param);

        // Set pattern detection mode to detect both pattern markers and barcode markers.
        // This is more error-prone than detecting only pattern markers (default) or only barcode markers.
        //
        // For barcode markers, use artoolkit.AR_MATRIX_CODE_DETECTION
        // For pattern markers, use artoolkit.AR_TEMPLATE_MATCHING_COLOR
        //
        ar.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_COLOR_AND_MATRIX);

        ar.addEventListener('markerNum', function (ev) {
          console.log('got markers', markerNum);
        });
        ar.addEventListener('getMarker', function (ev) {
          console.log('found marker?', ev);
        });
        ar.loadMarker('Data/patt.hiro', function (marker) {
          console.log('loaded marker', marker);
          ar.process(img);
        });
    };

    param.src = MarkerImage;
  }
  //   arToolkitSource = new THREEx.ArToolkitSource({
  //     sourceType : 'webcam',
  //   });

  //   function onResize()
  //   {
  //     arToolkitSource.onResize()	
  //     arToolkitSource.copySizeTo(renderer.domElement)	
  //     if ( arToolkitContext.arController !== null )
  //     {
  //       arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
  //     }	
  //   }

  //   arToolkitSource.init(function onReady(){
  //     onResize()
  //   });

  //   // handle resize event
  //   window.addEventListener('resize', function(){
  //     onResize()
  //   });

  //   ////////////////////////////////////////////////////////////
  //   // setup arToolkitContext
  //   ////////////////////////////////////////////////////////////	

  //   // create atToolkitContext
  //   arToolkitContext = new THREEx.ArToolkitContext({
  //     cameraParametersUrl: 'data/camera_para.dat',
  //     detectionMode: 'mono'
  //   });

  //   // copy projection matrix to camera when initialization complete
  //   arToolkitContext.init( function onCompleted(){
  //     camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
  //   });

  //   ////////////////////////////////////////////////////////////
  //   // setup markerRoots
  //   ////////////////////////////////////////////////////////////

  //   // build markerControls
  //   markerRoot1 = new THREE.Group();
  //   scene.add(markerRoot1);
  //   let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
  //     type: 'pattern', patternUrl: "data/hiro.patt",
  //   })

  //   let geometry1	= new THREE.CubeGeometry(1,1,1);
  //   let material1	= new THREE.MeshNormalMaterial({
  //     transparent: true,
  //     opacity: 0.5,
  //     side: THREE.DoubleSide
  //   }); 

  //   mesh1 = new THREE.Mesh( geometry1, material1 );
  //   mesh1.position.y = 0.5;

  //   markerRoot1.add( mesh1 );
  //   }


  //   function update()
  //   {
  //   // update artoolkit on every frame
  //   if ( arToolkitSource.ready !== false )
  //     arToolkitContext.update( arToolkitSource.domElement );
  //   }
  // }
  
}

export default MarkerController;