import Vue from 'vue'
import VueRouter from 'vue-router'
import View_Home from './views/View_Home.vue';
import View_Projekte from './views/View_Projekte.vue';
import View_Single_Projekt_Scene from './views/View_Single_Projekt_Scene.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: View_Home,
    },{
      path: '/projekte',
      name: 'Projekte',
      component: View_Projekte,
    },{
      path: '/projekt/:role/:id',
      name: 'Projekt',
      component: View_Single_Projekt_Scene,
    }
  ]
})

export default router;