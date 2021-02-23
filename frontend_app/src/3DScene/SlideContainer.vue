<template>

  <a-entity
    scale="0.05 0.05 0.05"
    position="0 0 0"
    :id="SetID(container.id)"
    :gltf-model="
      GetModelPath(
        container.Slides[currentSlideIdx].SlideElements[0].element.Asset.url
      )
    "
    >Slide Container {{ container.Name }} with current Slide Nr 
    {{currentSlideIdx}} with Name 
    {{ container.Slides[currentSlideIdx].SlideElements[0].Name }}</a-entity
  >
</template>

<script>
export default {
  name: "SlideContainer",
  props: {
    container: null,
  },
  components: {},
  computed: {
    currentSlideIdx() { return (this.$store.state.currentSlideIdx % this.container.Slides.length)}
  },
  data() {
    return {

    };
  },
  methods: {
    SetID(id) {
      return "SlideContainer-" + id;
    },
    GetModelPath(path) {
      return "http://192.168.0.10:1337" + path;
    },
    init() {

      
    },
  },
};
</script>

<style>
</style>