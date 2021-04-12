<template>
  <div class="menu pointerOff" v-if="this.$store.state.currentProjekt != null">
    <h1>
      {{ this.$store.state.currentProjekt.Name }} als
      {{ this.$route.params.role }} ({{ this.$store.state.viewMode }})
    </h1>
    <div class="button-wrapper pointerOn">
      <button @click="SetViewMode('Desktop')">Desktop</button>
      <div @click="SetViewMode('VR')">
        <div ref="placeholderVRButton"></div>
      </div>
      <div @click="SetViewMode('AR')">
        <div ref="placeholderARButton"></div>
      </div>
      <button @click="SetViewMode('AR_Marker')">AR mit Marker</button>
    </div>
    <ContainerPreviewContainer v-if="this.$route.params.role != 'visitor'" />

    <AframeScene v-if="this.$store.state.viewMode == 'AR_Marker'" />
    <WebXRScene v-if="this.$store.state.viewMode != 'AR_Marker'" />
    <Slideshow v-if="this.$route.params.role != 'visitor'" />
  </div>
</template>

<script>
import config from "../main.config";
import AframeScene from "../3DScene/AframeScene";
import WebXRScene from "../3DScene/WebXRScene";
import Slideshow from "../partials/Slideshow";
import AppDropdown from "../components/AppDropdown";
import ContainerPreviewContainer from "../partials/ContainerPreviewContainer";

export default {
  name: "View_Single_Projekt_Scene",
  components: {
    AframeScene,
    WebXRScene,
    Slideshow,
    AppDropdown,
    ContainerPreviewContainer,
  },
  mounted() {
    this.$store
      .dispatch("GetSingleProjekt", this.$route.params.id)
      .then(this.Init);
  },
  watch: {
    "$store.state.mainScene": function(){
      if(this.$store.state.mainScene!=null){
        this.$refs.placeholderVRButton.appendChild(this.$store.state.mainScene.xr.Controls.GetVRButton());
        this.$refs.placeholderARButton.appendChild(this.$store.state.mainScene.xr.Controls.GetARButton());
      }
    },
  },
  data() {
    return {
      loading: true,
      viewMode: "Desktop",
    };
  },
  methods: {
    SetContainer(container) {
      console.log("CONTAINER: ", container);
      this.$store.commit("SetSelectedSlideContainer", container);
    },
    SetViewMode(mode) {
      this.$store.commit("SetViewMode", mode);
    },
    GetOptions() {
      var options = [{ value: "None", id: null }];
      Object.values(this.$store.state.currentProjekt.slide_containers).forEach(
        (container) => {
          var url = null;
          var image = null;
          if (container.Marker != null) {
            if (container.Marker.MarkerPreview != null) {
              url = container.Marker.MarkerPreview.url;
              image = config.CMS_BASE_URL + url;
            }
          }
          console.log("MARKER ", url);
          options.push({
            value: container.Name,
            info: container,
            image: image,
          });
        }
      );

      return options;
    },
    SetSlideIdx(direction) {
      this.$store.commit("SetCurrentSlideIdx", direction);
    },
    GetPattern() {
      return pattern;
    },
    SetSelected(container) {
      this.$store.commit("SetSelectedSlideContainer", container);
    },
    GetTrackingState(id) {
      return this.$store.state.currentTrackedMarkers.includes(String(id));
    },
    GetSelectedState(container) {
      return this.$store.state.currentSelectedSlideContainer == container;
    },
    Init() {
      var projekt = this.$store.state.currentProjekt;
      var objectsToLoad = this.ExtractModelsFromProjekt(projekt);

      console.log(projekt);
      console.log("objectsToLoad", objectsToLoad);

      var loadObj = Object.keys(objectsToLoad).map((id) => {
        var obj = objectsToLoad[id];
        return {
          name: obj.id,
          url: config.CMS_BASE_URL + obj.element.Asset.url,
        };
      });

      console.log(loadObj);
    },
    loadProgress(progress) {
      this.loading = progress.isLoading;
      // console.log(progress);
    },
    ExtractModelsFromProjekt(projekt) {
      var elements = {};
      //sortiert aus allen SlideContainern die Slides raus
      //und sucht aus den Slides die SlideElemente
      //speichert die SlideElemente unique in elements
      projekt.slide_containers
        .map((sContainer) => sContainer.Slides)
        .map((slides) => slides.map((s) => s.SlideElements))
        .map((sElement) => {
          sElement.map((s) => {
            s.map((slideElement) => {
              if (!elements.hasOwnProperty(slideElement.id)) {
                elements[slideElement.id] = slideElement;
              }
            });
          });
        });

      return elements;
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 5px;
}
.button-wrapper {
  position: relative;
  margin-bottom: 1rem;
  z-index: 2;
}
.menu {
  display: inline-block;
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px 5px 5px 5px;
}
.tracked-true {
  background: #899da4;
}
.tracked-false {
  background: #c93312;
}
#ar-scene {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
}

.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>