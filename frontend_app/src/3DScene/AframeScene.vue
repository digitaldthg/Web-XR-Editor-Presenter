<template>
  <a-scene
    v-if="this.$store.state.currentProjekt != null"
    renderer="logarithmicDepthBuffer: true;"
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
      :detect-visible-component="GetID(slideContainer.id)"
    >
      <SlideContainer :container="slideContainer" />
    </a-marker>
    <a-entity camera></a-entity>
    <a-entity light="type: ambient; color: #BBB"></a-entity>
    <a-entity
      light="type: directional; color: #FFF; intensity: 0.6"
      position="-0.5 1 1"
    ></a-entity>
  </a-scene>
</template>

<script>
import config from "../main.config";
import SlideContainer from "./SlideContainerAFrame.vue";
import PatternMarker from "./pattern-marker.patt";
import CameraSettings from "./camera_para-iPhone 4 rear 640x480.dat";

export default {
  name: "AframeScene",
  components: {
    SlideContainer,
  },
  data() {
    return {
      pattern: PatternMarker,
      cameraSettings: CameraSettings,
    };
  },
  methods: {
    GetID(id) {
      return "targetID:" + id;
    },
    GetPattern(path) {
      //var path = "/uploads/pattern_marker_2fcf84ae6f.patt";
      return config.CMS_BASE_URL + path;
    },
  },
};

import { store } from "../store.js";

AFRAME.registerComponent("detect-visible-component", {
  schema: {
    targetID: { type: "string", default: null },
  },
  init: function () {
    console.log("INIT " + this.el.object3D.visible);
    this.isVisible = false;
  },
  tick: function () {
    if (this.el.object3D.visible && this.isVisible == false) {
      this.isVisible = true;
      store.commit("AddTrackedMarker", this.data.targetID);
      console.log(
        "Marker tracked with ID " +
          this.data.targetID +
          " , all tracked markers: " +
          store.state.currentTrackedMarkers
      );
    } else if (!this.el.object3D.visible && this.isVisible == true) {
      this.isVisible = false;
      store.commit("RemoveTrackedMarker", this.data.targetID);
      console.log(
        "Marker untracked with ID " +
          this.data.targetID +
          " , all tracked markers: " +
          store.state.currentTrackedMarkers
      );
    }
  },
});
</script>