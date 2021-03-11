<template>
  <div id="app">
    <Navigation />
    
    <main>
      <router-view></router-view>
    </main>
    <div id="scene" />
  </div>
</template>

<script>
import "./styles/main.scss";
import MainScene from "./3DScene/Mainscene";
import Navigation from "./partials/navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  mounted() {
    console.log("app", this.$route.path);

    this.$store.dispatch("GetProjekte");

    if (this.$store.state.xr == null) {
      var scene = new MainScene({
        store: this.$store,
        domElement: "scene",
      });

      this.$store.commit("SetMainScene", scene);
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>

<style lang="scss">
#scene {
  position: absolute;
  z-index: 0;
  top:0px;
}
main {
  pointer-events: none;
}

.pointerOn{
pointer-events: all;
}

.pointerOff{
pointer-events: none;
}
</style>
