<template>
  <div class="login-page">
    <div class="login-form pointerOn">
      <template v-if="failed">
        <div class="warning">
          <h1>Ups! Etwas ist schiefgelaufen!</h1>
        </div>
      </template>
      <input type="text" name="email" v-model="user.name"/>
      <input type="password" name="passwort" v-model="user.pw"/>
      <button class="cta-button --attention --wide" @click="Login" >Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../main.config';

export default {
  name : "LoginPage",
  data(){
    return {
      failed : false,
      user:{
        name : "",
        pw : ""
      }
    }
  },
  mounted(){
    console.log("Login");
  },
  methods:{
    Login(){
      console.log(this.user.name, this.user.pw);

      axios
      .post(config.CMS_BASE_URL + '/auth/local', {
        identifier: this.user.name,
        password: this.user.pw,
      })
      .then(response => {
        console.log("success");
        this.$store.commit("UserAuth", response.data);

        console.log("success 1");
        this.$router.push({ 
          path: '/projekte',
        });
        
        console.log("success 2");

      })
      .catch(error => {
        // Handle error.
        this.failed = true;
        console.log('An error occurred:', error.response);
      });



    }
  }
}
</script>

<style scoped>
.login-page{
  width: 100%;
  height: calc(100% + 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  top: -50px;
  position: relative;
}
.login-form {
  padding: 1rem;
  box-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);
  display: inline-block;
}

input{
  font-size: 1rem;
  padding:0;
  margin:0;
  border:0;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.5);
  padding:.25rem;
  display: block;
  line-height: 1rem;
  margin-bottom:.5rem;
}
</style>