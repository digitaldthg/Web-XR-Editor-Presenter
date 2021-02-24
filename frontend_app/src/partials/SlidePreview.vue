<template>
  <div :class="'preview visible-'+ CheckVisibility()">
{{slide.Name}}
<img v-if="slide.PreviewImage != null" :src="GetImageUrl(slide.PreviewImage.url)"/>
  </div>
</template>

<script>
export default {
  name: "SlidePreview",
  props:{
    slide: null
  },
  methods:{
    GetImageUrl(path){
    return this.$store.state.cmsAPIUrl + path;
    },
    CheckVisibility(){
      return this.slide.id == this.$store.state.currentSelectedSlideContainer.Slides[this.$store.state.currentSlideIdx].id
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.preview{
  height: 100%;
  width: $slideshow-height;
  background: white;
  border-style: solid
}

.visible-true{
  border-width: 5px;
}

.visible-false{
  border-width: 1px;
}

</style>