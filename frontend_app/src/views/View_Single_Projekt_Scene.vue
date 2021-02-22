<template>
  <div id="scene">

    <AframeScene />

    <!-- <a-scene embedded="" arjs="sourceType: webcam;" class="" inspector="" keyboard-shortcuts="" screenshot="" vr-mode-ui="">
      <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
      <a-marker type='pattern' :url="GetPattern"></a-marker>
    </a-scene> -->
    <!-- <a-scene embedded arjs='sourceType: webcam; detectionMode: mono; trackingMethod: best; debugUIEnabled: true;' vr-mode-ui="enabled: true">
    		<a-assets>
            <video preload="auto" id="vid" response-type="arraybuffer" loop="true" autoplay type="video/mp4" crossorigin webkit-playsinline playsinline controls>
                <img :src="GetPlaceholderImage"> Your browser does not support Or Else Please Click Reset Button.
            </video>
        </a-assets>  
         <a-marker id="memarker" type="pattern" :url="GetMarkerImage" vidhandler>
            <a-entity 
							gltf-model="url(http://192.168.0.10:1337/uploads/Painted_Haus_70a6ac287e.glb)">
						</a-entity>
            
						<a-light type="directional" color="white" position="0 5 0"></a-light>
        </a-marker>
      
    <a-entity camera></a-entity>
    </a-scene> -->


    <transition name="fade">
      <div class="loader" v-if="loading">Loading</div>
    </transition>

    <!-- <div class="collection slide-container-collection" v-if="this.$store.state.currentProjekt != null">
      <div class="slide-container" v-for="slideContainer in this.$store.state.currentProjekt.slide_containers" v-bind:key="slideContainer.id">
        <h1>{{slideContainer.Name}}</h1>
        <div class="collection slide-collection">
          <div class="slide" v-for="slide in slideContainer.Slides" v-bind:key="slide.id">
            {{slide.Name}}
          </div>
        </div>
      </div>
    </div> -->
    
  </div>
</template>

<script>
import config from '../main.config';
// import webXRScene from '../webxr/src';
// import {AmbientLight, DirectionalLight, Object3D} from 'three';
import MarkerController from '../3DScene/MarkerController';
import pattern from '../3DScene/pattern-marker.patt';


import AframeScene from '../3DScene/AframeScene';



export default {
  name : "View_Single_Projekt_Scene",
  components:{
    AframeScene
  },
  mounted(){


    // this.xr = new webXRScene("scene");
    // this.xr.Controls.SetPosition(0,2,-10);

    // var basicLight = new DirectionalLight(0xeeeeee);
    // basicLight.position.set(0,5,-10);
    // this.xr.Scene.add(basicLight);

    //debug
    // window._xr = this.xr;
    // 
    this.$store.dispatch("GetSingleProjekt" , this.$route.params.id).then(this.Init);

  },
  data(){
    return {
      loading : true
    }
  },
  methods: {
    GetPattern(){
      return pattern;
    },
    Init(){
      var projekt = this.$store.state.currentProjekt;
      var objectsToLoad = this.ExtractModelsFromProjekt(projekt);

      console.log(projekt);
      console.log("objectsToLoad",objectsToLoad);

      var loadObj = Object.keys(objectsToLoad).map(id => {
        var obj = objectsToLoad[id];
        return {
          name : obj.id,
          url : config.CMS_BASE_URL + obj.element.Asset.url
        }
      });
      

      console.log(loadObj);
    

      // this.xr.Loader.loadStack({
      //   progress: this.loadProgress,
      //   stack : loadObj
      // }).then((library)=>{
      //   Object.keys(library).map(elementID =>{
          
      //     var elementGroup = new Object3D();
      //     elementGroup.add(library[elementID].scene);
      //     elementGroup.position.set(
      //       objectsToLoad[elementID].Offset.x,
      //       objectsToLoad[elementID].Offset.y,
      //       objectsToLoad[elementID].Offset.z
      //     )

      //     console.log(elementGroup);

      //     //this.xr.Scene.add(elementGroup);
      //   })
      // });
    },
    loadProgress(progress){
      this.loading = progress.isLoading;
      // console.log(progress);

    },
    ExtractModelsFromProjekt(projekt){
      var elements = {};
      //sortiert aus allen SlideContainern die Slides raus
      //und sucht aus den Slides die SlideElemente
      //speichert die SlideElemente unique in elements
      projekt.slide_containers.map(sContainer => sContainer.Slides)
      .map(slides => slides.map(s=>s.SlideElements))
      .map(sElement => {
        sElement.map(s =>{
          s.map(slideElement => {
            if(!elements.hasOwnProperty(slideElement.id)){
              elements[slideElement.id] = slideElement;
            }
          });          
        });        
      });

      return elements;
    }
  }
}
</script>

<style>

#scene {
  position: absolute;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  width: 100%;
  height: 100%;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
}

.loader{
  position: absolute;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
}

</style>