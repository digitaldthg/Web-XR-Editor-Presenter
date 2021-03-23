<template>
  <div
    :class="'preview pointerOn visible-' + CheckVisibility()"
    @click="SetContainer(container)"
  >
    {{ container.Name }}
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
.preview {
  width: 100%;
  height: 70px;
  background: white;
  border-style: solid;
  margin-bottom: 5px;
}
.visible-true {
  border-width: 5px;
}

.visible-false {
  border-width: 1px;
}
</style>