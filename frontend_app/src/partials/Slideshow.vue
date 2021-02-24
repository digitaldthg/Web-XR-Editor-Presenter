<template>
  <div
    class="slideshow-container"
    v-if="this.$store.state.currentSelectedSlideContainer != null"
  >
    <button @click="SetSlideIdx(-1)">Previous</button>
    <SlidePreview v-for="slide in this.$store.state.currentSelectedSlideContainer.Slides"
    v-bind:key=slide.id
    :slide=slide>
      </SlidePreview>
    <button @click="SetSlideIdx(+1)">Next</button>
  </div>
</template>

<script>
import SlidePreview from "./SlidePreview"
import Arrow from "../assets/arrow.svg"
export default {
  name: "Slideshow",
  components:{
    SlidePreview,
    Arrow
  },
  methods: {
    SetSlideIdx(direction) {
      this.$store.commit("SetCurrentSlideIdx", direction);
    },
  },
};
</script>

<style land="scss" scoped>
@import "../styles/variables.scss";
button{
  width: 100px;
  height: 100%
}
.slideshow-container {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  display:flex;
}
</style>