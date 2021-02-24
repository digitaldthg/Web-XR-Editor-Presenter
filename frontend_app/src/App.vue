<template>
  <div id="app">
    <Navigation />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import "./styles/main.scss";

import Navigation from './partials/navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
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

<style lang="scss">


</style>
