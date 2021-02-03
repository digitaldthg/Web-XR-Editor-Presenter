<template>
  <section class="collection-projekte flex">

    <template v-if="this.$store.state.projekte.length > 0">
      <article class="projekt card" v-for="p in this.$store.state.projekte" v-bind:key="p.id">
        <h1>{{p.Name}}</h1>
        <vue-markdown>{{p.Description}}</vue-markdown>
        <router-link :to="'/projekt/detail/' + p.id">Gehe zum Projekt =></router-link>

        
       
      
      </article>
    </template>
  </section>
</template>

<script>
export default {
  name : "View_Projekte",
  mounted(){
    console.log("projekte", this.$store.state.projekte);

  }
}
</script>

<style>

</style>