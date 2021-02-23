<template>
  <a-scene
    v-if="this.$store.state.currentProjekt != null"
    embedded
    arjs="sourceType: webcam; detectionMode: mono; trackingMethod: best; debugUIEnabled: false;"
    vr-mode-ui="enabled: false"
  >
    <a-marker
      class="slide-container"
      v-for="slideContainer in this.$store.state.currentProjekt
        .slide_containers"
      v-bind:key="slideContainer.id"
      :url="GetPattern(slideContainer.Marker.Marker.url)"
      :id="slideContainer.id"
      type="pattern"
      vidhandler
    >
      <SlideContainer :container="slideContainer" />
    </a-marker>

    <!--<a-marker id="memarker" type="pattern" :url="GetPattern()" vidhandler>
        <a-box color="tomato" scale="1 1 1" position="0 0 0"></a-box>

        <a-light type="directional" color="white" position="0 5 0"></a-light>
        <a-light type="directional" color="white" position="0 5 0"></a-light>
      </a-marker>-->
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>
import SlideContainer from "./SlideContainer.vue";
import PatternMarker from "./pattern-marker.patt";
export default {
  name: "AframeScene",
  components: {
    SlideContainer,
  },
  mounted() {
    this.init();
  },
  
  data() {
    return {
      pattern: PatternMarker,
    };
  },
  methods: {
    GetPattern(path) {
      //var path = "/uploads/pattern_marker_2fcf84ae6f.patt";
      return "http://192.168.0.10:1337" + path;
    },
    init() {
      document.addEventListener("keydown", (e) => {
        console.log(e.key)
        if (e.key == "ArrowUp") {
          this.$store.commit("SetCurrentSlideIdx", 1);
        }else if(e.key == "ArrowDown") {
          this.$store.commit("SetCurrentSlideIdx", -1);
        }
      });
    },
  },
};
</script>