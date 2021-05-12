<template>
  <div id="app">
    <Navigation v-if="$route.name != 'Login'"/>
    <main class="pointerOff main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import "./styles/main.scss";
import Utils from "./Common/Utils";
import config from './main.config';
import Navigation from "./partials/navigation.vue";
import IOMixin from './Mixins/IOMixin';

export default {
  name: "App",
  components: {
    Navigation,
  },
  mixins : [IOMixin],
  mounted() {

  },
  methods: {

  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>

<style lang="scss">
.pointerOn {
  pointer-events: all;
}

.pointerOff {
  pointer-events: none;
}

.main {
  z-index: 2;
  position: fixed;
  top: $navigation-height;
  left: 0px;
}
</style>
