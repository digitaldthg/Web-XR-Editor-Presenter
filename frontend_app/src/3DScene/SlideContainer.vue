<template>
      <a-entity  v-if="this.$store.state.currentSelectedSlideContainer == container">
        <a-entity
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
      return "http://192.168.0.10:1337" + path;
    },
    init() {},
  },
};
</script>

<style>
</style>