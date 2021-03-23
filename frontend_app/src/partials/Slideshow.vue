<template>
  <div
    class="slideshow-container pointerOn"
    v-if="this.$store.state.currentSelectedSlideContainer != null && this.$store.state.currentSelectedSlideContainer.Slides.length > 1"
  >
    <button @click="SetSlideIdx(-1)"><Arrow class="svg left" /></button>
    <SlidePreview
      v-for="slide in this.$store.state.currentSelectedSlideContainer.Slides"
      v-bind:key="slide.id"
      :slide="slide"
    >
    </SlidePreview>
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
button {
  width: 100px;
  height: 100%;
  border: none;
  background: transparent;
  outline: 0;
  margin: 0;
  padding: 0;
}
.svg {
  width: 50px;
fill:$darkGrey
}
.left {
    transform: rotate(90deg);
  }
  .right {
    transform: rotate(-90deg);
  }

.slideshow-container {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  display: flex;

}
</style>