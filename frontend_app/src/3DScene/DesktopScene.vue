<template>
  <div>
    <SlideContainer v-for="slideContainer in this.$store.state.currentProjekt
        .slide_containers"
        v-bind:key="slideContainer.id"
        :container="slideContainer"/>
  </div>
</template>

<script>
import config from "../main.config";
import SlideContainer from "./SlideContainer.vue";

export default {
  name: "DesktopScene",
  components: {
    SlideContainer,
  },
  data() {
    return {
    };
  },
  methods: {

  },
};



</script>