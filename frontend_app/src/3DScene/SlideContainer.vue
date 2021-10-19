<template>
  <div id="slide-container" v-if="this.$store.state.currentSelectedSlideContainer == this.container">
    <Slide v-for="slide,idx in this.container.Slides"
    v-bind:key=slide.id
    :slide="slide"
    :order="idx"
    />
  </div>
</template>

<script>
import config from "../main.config";
import Slide from "./Slide.vue"

export default {
  name: "SlideContainer",
  props: {
    container: null,
  },
  components: {Slide},
  methods: {
    GetModelPath(path) {
      return config.CMS_BASE_URL + path;
    },
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