<template>
  <div class="login-form pointerOn">
    <template v-if="failed">
      <div class="warning">
        <h1>Ups! Etwas ist schiefgelaufen!</h1>
      </div>
    </template>
    <input type="text" name="email" v-model="user.name"/>
    <input type="text" name="passwort" v-model="user.pw"/>
    <button @click="Login" >Login</button>
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
        name : "wunsiedel",
        pw : "dthgimmts"
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

<style>
.login-form {
  padding: 1rem;
  box-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);
  display: inline-block;

  /*input{
    display: block;
  }*/
}
</style>