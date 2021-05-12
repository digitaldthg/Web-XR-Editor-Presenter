<template>
<div class="container-navigation pointerOn">
  <div class="container-inner">
    <h4>Szenen:</h4>
    <div id="ContainerPreview" class="container-container pointerOn" >
      <ContainerPreview
        class="slideshow-link"
        v-for="container in this.$store.state.currentProjekt.slide_containers"
        v-bind:key="container.id"
        :container="container"
      />

    </div>
  </div>
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

.container-navigation{
  z-index: 0;
  position: absolute;
  left: 1rem;
  bottom: 0;
  width: 90px;
  top:0;
  display: flex;
  justify-content: center;
  align-items: center;
}


// .container-container {
//   position: absolute;
//   left: 5px;
//   width: 80px;
//   overflow-y: scroll;
//   border: solid 1px;
//   border-radius: 5px;
//   padding:5px;
//   background-color:#eee;
//   z-index: 2;
// }
</style>