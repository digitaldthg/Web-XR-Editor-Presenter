import Vue from 'vue';
import axios from 'axios';
import config from './main.config';
import Vuex from 'vuex';
import Utils from './Common/Utils';

Vue.use(Vuex);

export const store = new Vuex.Store({
  watch: {
    $route(to, from) {
      console.log("store", to, from);
    }
  },
  state: {
    projekte: [], //all projects of logged in user
    currentProjekt: null,
    slides: [],
    currentPage: null,
    currentSlideIdx: 0,
    currentTrackedMarkers: [],
    currentSelectedSlideContainer: null,
    mainScene: null, //3D Content
    viewMode: 'Desktop', //Could also be AR
    transformActive: false,
    planeDetectionActive: true,
    jwt: null,
    user : null,
  },
  actions: {
    GetProjekte({ commit }) {
      return axios({
        method: "GET",
        url: config.CMS_BASE_URL + '/projekts',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.jwt}`
        }
      }).then(response => {
        return response.data;

      }).then((data) => {
        return data;
      }).catch(error => {
        console.log('error while loading data:', error);
      });
    },
    GetSingleProjekt({ commit, state }, id) {
      if (this.state.projekte.length > 0) {
        var filtered = this.state.projekte.find(p => p.id == id);

        if (filtered.length > 0) {
          return new Promise((resolve, reject) => {
            commit("SetSingleProjekt", filtered[0]);
            resolve(filtered[0])
          })
        }
      }

      return axios({
        method: "GET",
        url: config.CMS_BASE_URL + '/projekts/' + id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.jwt}`
        }
      }).then(response => {
        commit("SetSingleProjekt", response.data);
      }).catch(error => {
        console.log('error while loading data:', error);
      });
    }
  },
  mutations: {
    SetProjekte(state, data) {
      state.projekte = data;
    },
    SetSingleProjekt(state, data) {
      state.currentProjekt = data;
    },
    SetPage(state, data) {
      state.currentPage = data;
    }
    ,
    SetCurrentSlideIdx(state, data) {
      state.currentSlideIdx += data;
      var size = state.currentSelectedSlideContainer.Slides.length;
      state.currentSlideIdx  = state.currentSlideIdx < 0 ? size-1 : state.currentSlideIdx % size
      console.log(state.currentSlideIdx);
    },
    AddTrackedMarker(state, data) {
      state.currentTrackedMarkers.push(data)
    },
    RemoveTrackedMarker(state, data) {
      const index = state.currentTrackedMarkers.indexOf(data);
      if (index > -1) {
        state.currentTrackedMarkers.splice(index, 1);
      }
    },
    SetSelectedSlideContainer(state, data) {
      if (data == state.currentSelectedSlideContainer) {
        state.currentSelectedSlideContainer = null;
      } else {
        state.currentSelectedSlideContainer = data;
      }
      state.currentSlideIdx = 0;
    },
    SetMainScene(state, scene) {
      state.mainScene = scene;
    },
    SetViewMode(state,mode){
      console.log("Set view Mode ",mode)
      state.viewMode = mode;
    },
    SetTransformActive(state,mode){
      console.log("Set Transform Active")
      state.transformActive = !state.transformActive;
    },
    SetTrackingActive(state,mode){
      console.log("Set Tracking Active ", mode)
      state.planeDetectionActive = mode;
    },
    UserAuth(state, data){

      console.log("store", data);

      state.jwt = data.jwt;
      state.user = data.user;
      
      Utils.SetCookie("jwt", data.jwt, 1);
    },
    Logout(state,data){
      Utils.DeleteCookie("jwt");
      state.loggedIn = false;
      state.jwt = null;
      state.user = null;
    },
    SetJWT(state,jwt){
      state.jwt = jwt;
      state.loggedIn = true;
      Utils.SetCookie("jwt", jwt, 1);
    },
    SetUser(state,user){
      state.user = user;
    },
  }

})