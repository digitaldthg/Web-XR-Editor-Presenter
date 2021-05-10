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

  if (jwtCookie == null && router.currentRoute.name != "Login") {
    next({ name: 'Login' })
  } else if (jwtCookie != null) {

    store.commit("SetJWT", jwtCookie);

    axios({
      method: "GET",
      url: config.CMS_BASE_URL + "/users/me",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.state.jwt}`
      }
    }).then((response) => {
      store.commit("SetUser", response.data);
      next()
    });

  } else if (router.currentRoute.name != "Login") {
    next({ name: 'Login' })
  }
})

export default router;