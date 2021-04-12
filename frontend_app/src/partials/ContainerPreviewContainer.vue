<template>
  <div class="container-container pointerOn">
    <ContainerPreview
      v-for="container in this.$store.state.currentProjekt.slide_containers"
      v-bind:key="container.id"
      :container="container"
    />
  </div>
</template>

<script>
import ContainerPreview from "./ContainerPreview";
export default {
  name: "ContainerPreviewContainer",
  components: {
    ContainerPreview,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/main.scss";
.container-container {
  position: absolute;
  left: 5px;
  width: 80px;
  height: 50% ;
  overflow-y: scroll;
  border: solid 1px;
  border-radius: 5px;
  padding:5px;
  background-color:white;
  z-index: 2;
}
</style>