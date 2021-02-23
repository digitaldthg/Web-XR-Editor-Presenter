<template>
  <div class="slide-container">
    <div class="card-header">
      <img :src="config.CMS_BASE_URL + slideContainer.PreviewImage.url" />
    </div>
    <div class="card-no-style">
      <h2>
        {{ slideContainer.Name }} ({{ slideContainer.Slides.length }} Slides)
      </h2>
    </div>
    <div class="collection slide-collection">
      <div
        class="slide card-no-style card-margin-bottom"
        v-for="slide in slideContainer.Slides"
        v-bind:key="slide.id"
      >
        <h2>{{ slide.Name }}</h2>
        <div class="collection slide-elements-collection flex-column">
          <div
            class="slide-element card card-margin-bottom"
            v-for="slideElement in slide.SlideElements"
            v-bind:key="slideElement.id"
          >
            <h3>{{ slideElement.Name }}</h3>
            <p v-html="slideElement.element.Description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../main.config";
import SlideContainer from "../3DScene/SlideContainer";

export default {
  name: "SlideContainerProject",
  components: {
    SlideContainer,
  },
  data() {
    return {
      config: config,
    };
  },
  props: ["slideContainer"],
  mounted() {
    console.log("SlideContainer", this.slideContainer);
  },
};
</script>

<style>
.slide-container {
  width: 50%;
}
.card-header {
  height: 500px;
}
</style>