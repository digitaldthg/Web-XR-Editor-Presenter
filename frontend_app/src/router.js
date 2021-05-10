import Vue from 'vue'
import VueRouter from 'vue-router'
import View_Home from './views/View_Home.vue';
import View_Projekte from './views/View_Projekte.vue';
import View_Single_Projekt_Scene from './views/View_Single_Projekt_Scene.vue';
import Login from './views/Login.vue'
import Utils from './Common/Utils'
import { store } from './store';
import axios from 'axios';
import config from "./main.config.js"
import IOMixins from './Mixins/IOMixin';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: { name: 'Projekte' }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    }, {
      path: '/projekte',
      name: 'Projekte',
      component: View_Projekte,
    }, {
      path: '/projekt/:role/:id',
      name: 'Projekt',
      component: View_Single_Projekt_Scene,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const jwtCookie = Utils.GetCookie("jwt");

  console.log(jwtCookie, router.currentRoute.name,to,from );

  if (
      jwtCookie == null && 
      to.name != "Login") {

    next({ name: "Login" });


    console.log("go to login");

    return;
  }
  
  if(jwtCookie != null && store.state.jwt == null){
    store.commit("SetJWT" , jwtCookie);
  }
  
  if (jwtCookie != null && store.state.user === null) {
    axios({
      method: "GET",
      url: config.CMS_BASE_URL + "/users/me",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtCookie}`
      }
    }).then((response) => {
      
      store.commit("SetUser", response.data);
    
      next()
    });

    return;
  }

  next();

})

export default router;