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

<style lang="scss">
@import "../styles/variables";
  nav{
    background: white;
    width:100%;
    height: $navigation-height;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top:0;
    left:0;
    right:0;
    z-index: 9;
  }
</style>