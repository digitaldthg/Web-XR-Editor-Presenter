<template>
  <div id="scene" />
</template>

<script>
import config from "../main.config";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "SlideContainer",
  props: {
    container: null,
  },
  components: {},
  computed: {
    currentSlideIdx() {
      return this.$store.state.currentSlideIdx;
    },
  },
  data() {
    return {};
  },
  methods: {
    GetModelPath(path) {
      return config.CMS_BASE_URL + path;
    },
    init() {},
    animate: function () {
      requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<style>
</style>