<template>
  <div
    :class="'preview pointerOn visible-' + CheckVisibility()"
    @click="SetContainer(container)"
  >
    <img class="preview-image" v-if="container.PreviewImage != null" :src="this.GetImageUrl(container.PreviewImage)"/>
    <div class="title-text">{{ container.Name }}</div>
  </div>
</template> 

<script>
import config from "../main.config";
export default {
  name: "ContainerPreview",
  props: {
    container: null,
  },

  methods: {
    GetImageUrl(path) {
      return config.CMS_BASE_URL  + path.url;
    },
    SetContainer(container) {
      console.log("CONTAINER: ", container);
      this.$store.commit("SetSelectedSlideContainer", container);
    },
    CheckVisibility() {
      if (this.$store.state.currentSelectedSlideContainer == null) {
        return false;
      } else {
        return (
          this.container.id ==
          this.$store.state.currentSelectedSlideContainer.id
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";


</style>