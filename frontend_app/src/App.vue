<template>
  <div id="app">
    <Navigation />
    
    <main class="pointerOff main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import "./styles/main.scss";

import Navigation from "./partials/navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  mounted() {
    console.log("app", this.$route.path);

    this.$store.dispatch("GetProjekte");

  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>

<style lang="scss">


.pointerOn{
pointer-events: all;
}

.pointerOff{
pointer-events: none;
}

.main{
  z-index: 2;
  position: fixed;
  top: $navigation-height;
  left:0px;
}
</style>
