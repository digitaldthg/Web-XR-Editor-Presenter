<template>
  <transition name="fade">
    <div class="" v-if="$store.state.currentPage != null">
      <h1>{{$store.state.currentPage.Name}}</h1>
      <vue-markdown>{{$store.state.currentPage.Description}}</vue-markdown>
      <router-link to="/projekte">Hier gehts zu den Projekten</router-link>
    </div>
  </transition>
  
</template>

<script>
export default {
  name : "Home",
  mounted(){
    //this.$store.dispatch("GetSinglePage", "home");    
  }
}
</script>

<style>

</style>