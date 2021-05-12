<template>
  <div :class="'preview visible-' + CheckVisibility()">
    <img class="preview-image" v-if="slide.PreviewImage != null" :src="this.GetImageUrl(slide.PreviewImage)"/>
    <div class="title-text">{{ slide.Name }}</div>
  </div>
</template> 

<script>
import config from "../main.config";
export default {
  name: "SlidePreview",
  props: {
    slide: null,
  },
  computed: {
    computedStyles: function () {
      return [
        { "--img-url": this.GetImageUrl(this.slide.PreviewImage)},
        ];
    },
  },
  methods: {
    GetImageUrl(path) {
      return config.CMS_BASE_URL  + path.url;
    },
    CheckVisibility() {
      return (
        this.slide.id ==
        this.$store.state.currentSelectedSlideContainer.Slides[
          this.$store.state.currentSlideIdx
        ].id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.preview {
  height: 100%;
  min-width: $slideshow-height;
  background: white;
  overflow: hidden;
  position: relative;
  margin-right:5px;
  border-radius: 5px;
  box-shadow: 0 0 0 3px #eee;
  margin-right: 1rem;
}



.preview-image {
  width:100%;
  position: absolute;
}
</style>