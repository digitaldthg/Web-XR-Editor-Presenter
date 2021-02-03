<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/projekte">Projekte</router-link>
  </nav>
</template>

<script>
export default {
  name : "Navigation"
}
</script>

<style>
  nav{
    padding:1rem;
    width:100%;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top:0;
    left:0;
    right:0;
    z-index: 9;
  }
</style>