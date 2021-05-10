<template>
  <div
    class="slideshow-container pointerOn"
    v-if="
      this.$store.state.currentSelectedSlideContainer != null &&
      this.$store.state.currentSelectedSlideContainer.Slides.length > 1
    "
  >
    <button @click="SetSlideIdx(-1)"><Arrow class="svg left" /></button>
    <div class="preview-wrapper">
      <SlidePreview
        v-for="slide in this.$store.state.currentSelectedSlideContainer.Slides"
        v-bind:key="slide.id"
        :slide="slide"
      >
      </SlidePreview>
    </div>
    <button @click="SetSlideIdx(+1)"><Arrow class="svg right" /></button>
  </div>
</template>

<script>
import SlidePreview from "./SlidePreview";
import Arrow from "../assets/arrow.svg";
export default {
  name: "Slideshow",
  components: {
    SlidePreview,
    Arrow,
  },
  methods: {
    SetSlideIdx(direction) {
      this.$store.commit("SetCurrentSlideIdx", direction);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/main.scss";


</style>