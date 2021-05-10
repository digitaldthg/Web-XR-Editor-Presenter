<template>
  <div class="scene-wrapper">
    <div id="scene" class="pointerOn"/>
    <SlideContainer v-for="slideContainer in this.$store.state.currentProjekt
        .slide_containers"
        v-bind:key="slideContainer.id"
        :container="slideContainer"/>
  </div>
</template>

<script>
import config from "../main.config";
import SlideContainer from "./SlideContainer.vue";
import MainScene from "./Mainscene";
export default {
  name: "WebXRScene",
  components: {
    SlideContainer,
  },
  data() {
    return {
    };
  },
  methods: {

  },
  mounted(){
    
    if (this.$store.state.xr == null) {
      var scene = new MainScene({
        store: this.$store,
        domElement: "scene",
      });

      this.$store.commit("SetMainScene", scene);
    }
  }
};



</script>
<style scoped>
.scene-wrapper{
  position: fixed;
  width:100%;
  height: 100%;
  top:0px;
  left:0px;
  z-index: 1;
}
#scene {
  position: fixed;
  pointer-events: all;
  width:100%;
  height: 100%;
  top:0px;
  left:0px;
}
</style>