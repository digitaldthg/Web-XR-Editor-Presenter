<template>
  <article v-if="$store.state.currentProjekt != null" class="single-projekte card">
    <div class="card-no-style">
      <h1>{{$store.state.currentProjekt.Name}}</h1>
      <p v-html="$store.state.currentProjekt.Description" />
      <router-link :to="'/projekt/scene/' + $store.state.currentProjekt.id">Szene</router-link>
    </div>
    <div class="collection slide-containers-collection">
        <SlideContainer class="card"  :slideContainer="slideContainer" v-for="slideContainer in $store.state.currentProjekt.slide_containers" v-bind:key="slideContainer.id"/>
    </div>

  </article>
</template>

<script>

import config from '../main.config';
import SlideContainer from '../partials/SlideContainerProject';

export default {
  name : "View_Projekte",
  components : {
    SlideContainer
  },
  data(){
    return {
      config : config,
    }
  },
  mounted(){
    this.$store.dispatch("GetSingleProjekt" , this.$route.params.id);
  }
}
</script>

<style>

</style>