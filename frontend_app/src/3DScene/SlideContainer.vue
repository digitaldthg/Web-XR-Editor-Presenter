<template>
      <a-entity  v-if="this.$store.state.currentSelectedSlideContainer == container">
        <a-entity
        scale="0.1 0.1 0.1"
          v-for="slideElement in container.Slides[currentSlideIdx].SlideElements"
          v-bind:key="slideElement.id"
          :gltf-model="
            GetModelPath(
              slideElement.element.Asset.url
            )
          "
        >
        
        </a-entity>

      </a-entity>

</template>

<script>
import config from "../main.config";
export default {
  name: "SlideContainer",
  props: {
    container: null,
  },
  components: {

  },
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
  },
};
</script>

<style>
</style>