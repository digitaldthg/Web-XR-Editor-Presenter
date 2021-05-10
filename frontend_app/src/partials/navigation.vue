<template>
  <nav>
    <router-link to="/projekte">Projekte</router-link>

    <button class="cta-button" @click="HandleLogout">Logout</button>
  </nav>
</template>

<script>
export default {
  name : "Navigation",
  methods:{
    HandleLogout(){
      this.$route.push({name : "Login"});
      this.$store.commit('Logout');

    }
  }
}
</script>

<style lang="scss">
@import "../styles/variables";
  nav{
    background: $custom-blue;
    color:#fff;
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
    box-shadow: 0 0 0.4rem 0 rgb(0 0 0);
    
    a{
      color : #fff;
    }
  }
</style>