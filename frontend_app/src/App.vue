<template>
  <div id="app">
    <Navigation />
    <!-- <Scene/> -->
  <main>
      <router-view></router-view>
  </main>
  </div>
</template>

<script>
import Scene from './views/Scene.vue';

import "./styles/main.scss";

import Navigation from './partials/navigation.vue';


export default {
  name: 'App',
  components: {
    Scene,
    Navigation
  },
  mounted(){
    console.log("app", this.$route.path);
    
    this.$store.dispatch("GetProjekte");

    
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  }
}
</script>

<style>

</style>
