<template>
  <div class="menu pointerOff" v-if="this.$store.state.currentProjekt != null">
    <h1>{{ this.$store.state.currentProjekt.Name }} in {{this.$route.params.mode}} als {{this.$route.params.role}}</h1>
    <ContainerPreviewContainer  v-if="this.$route.params.role != 'visitor'"/>
    <!--<AppDropdown
    v-if="this.$route.params.role != 'visitor'"
      color="white"
      placeholder="Select a marker"
      :options="GetOptions()"
      @callback="SetContainer"
    />
    </div>
    <div
      v-for="slideContainer in this.$store.state.currentProjekt
        .slide_containers"
      v-bind:key="slideContainer.id"
    >
    <AppDropdown/>
      <button
        :class="'tracked-' + GetTrackingState(slideContainer.id)"
        @click="SetSelected(slideContainer)"
      >
        {{ slideContainer.Name }} (id: {{ slideContainer.id }},
        {{ slideContainer.Marker.Marker.name }}, selected:
        {{ GetSelectedState(slideContainer) }})
      </button>
    </div>-->
    <AframeScene v-if="this.$route.params.mode == 'ar'" />
    <DesktopScene v-if="this.$route.params.mode == 'desktop'" />
    <Slideshow v-if="this.$route.params.role != 'visitor'"/>
  </div>
</template>

<script>
import config from "../main.config";
import AframeScene from "../3DScene/AframeScene";
import DesktopScene from "../3DScene/DesktopScene";
import Slideshow from "../partials/Slideshow";
import AppDropdown from "../components/AppDropdown";
import ContainerPreviewContainer from "../partials/ContainerPreviewContainer"

export default {
  name: "View_Single_Projekt_Scene",
  components: {
    AframeScene,
    DesktopScene,
    Slideshow,
    AppDropdown,
    ContainerPreviewContainer
  },
  mounted() {
    this.$store
      .dispatch("GetSingleProjekt", this.$route.params.id)
      .then(this.Init);
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

<style>
.dropdown-container{
  position:absolute;
}
.menu{
  display: inline-block;
   z-index: 2;
   position: relative;
   width:100%;
   height: 100%;
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