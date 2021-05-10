<template>
  <section class="collection-projekte flex pointerOn">

    <template v-if="this.$store.state.projekte.length > 0">
      <article class="projekt pointerOn width-3 card " v-for="p in this.$store.state.projekte" v-bind:key="p.id">
        <h1>{{p.Name}}</h1>
        <vue-markdown>{{p.Description}}</vue-markdown>
        <router-link :to="'/projekt/presenter/' + p.id">Gehe zum Projekt =></router-link>     
      </article>
    </template>
  </section>
</template>

<script>
export default {
  name : "View_Projekte",
  watch:{
    "$store.state.jwt":function(from,to){
      console.log("viewProjekte" , from, to);
    }
  },
  mounted(){
    if(this.$store.state.jwt != null){
      this.$store.dispatch("GetProjekte");
    }else{
      console.log("nothing");
    }
  }
}
</script>

<style>

</style>