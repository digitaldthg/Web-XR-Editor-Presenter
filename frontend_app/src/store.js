import Vue from 'vue';
import axios from 'axios';
import config from './main.config';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  watch: {
    $route(to, from) {
      console.log("store" , to, from);
    }
  },
  state: {
    projekte : [],
    currentProjekt : null,
    slides : [],
    currentPage : null,
    currentSlideIdx : 0
  },
  actions: {
    GetSinglePage({commit}, pageName ){
      return axios.get(config.CMS_BASE_URL + '/'+ pageName).then(response => {    
        console.log(response.data);

        commit("SetPage" , response.data);
        return response.data;

      }).catch(error => {
          console.log('error while loading data:', error);
      });
    },
    GetProjekte({commit}){
      return axios.get(config.CMS_BASE_URL + '/projekts').then(response => {    

        commit("SetProjekte" , response.data);
        return response.data;

      }).then((data)=>{
        return data;
      }).catch(error => {
          console.log('error while loading data:', error);
      });
    },
    GetSingleProjekt({commit,state},id){
     
      if(this.state.projekte.length > 0){
        var filtered = this.state.projekte.find(p=>p.id == id);
        
        if(filtered.length > 0){
          return new Promise((resolve,reject)=>{
            commit("SetSingleProjekt" , filtered[0]);
            resolve(filtered[0])
          })
        }
      }

      return axios.get(config.CMS_BASE_URL + '/projekts/'+id).then(response => {    
        commit("SetSingleProjekt" , response.data);
      }).catch(error => {
          console.log('error while loading data:', error);
      });
    
    }
  },
  mutations: {
    SetProjekte(state,data){
      state.projekte = data;
    },
    SetSingleProjekt(state,data){
      state.currentProjekt = data;
    },
    SetPage(state,data){
      state.currentPage = data;
    }
    ,
    SetCurrentSlideIdx(state,data){
      state.currentSlideIdx += data;
    }
  }

})