<template>
  <div class="menu pointerOff" v-if="this.$store.state.currentProjekt != null">
    <div id="slide-menu">
      <div class="wrapper button-wrapper ">
        <div class="toolbar pointerOn">
           <div @click="SetViewMode('AR')" class="pointerOn">
            <div v-if="ArButtonVisible" ref="placeholderARButton"></div>
          </div>

          <button
            :class="'cta-button --attention --active-' + this.$store.state.transformActive"
            @click="ActivateTransform"
          >
            Ursprung verschieben
          </button>

          <button
            v-if="this.$store.state.viewMode == 'AR'"
            :class="
              'cta-button --attention --active-' + this.$store.state.planeDetectionActive
            "
            @mouseup="ActivatePlaneDetection"
          >
            Oberfläche finden
          </button>
        </div>
        <div class="project-meta">
        <h1>
          {{ this.$store.state.currentProjekt.Name }} als
          {{ this.$route.params.role }} ({{ this.$store.state.viewMode }})
        </h1>
        </div>       
      </div>

      <ContainerPreviewContainer v-if="this.$route.params.role != 'visitor'" />
      <Slideshow v-if="this.$route.params.role != 'visitor'" />
    </div>
    <AframeScene v-if="this.$store.state.viewMode == 'AR_Marker'" />
    <WebXRScene v-if="this.$store.state.viewMode != 'AR_Marker'" />
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
    if (this.$store.state.jwt != null) {
      this.$store
        .dispatch("GetSingleProjekt", this.$route.params.id)
        .then(this.Init);
    } else {
      this.$router.push("/Login");
    }

    //this.$store.commit("SetSelectedSlideContainer",this.$store.state.currentProjekt)
  },
  watch: {
    "$store.state.mainScene": function () {
      this.SetButtons();
    },
  },
  computed: {
    VrButtonVisible: function () {
      return (
        this.$store.state.viewMode == "Desktop" ||
        this.$store.state.viewMode == "VR"
      );
    },
    ArButtonVisible: function () {
      return (
        this.$store.state.viewMode == "Desktop" ||
        this.$store.state.viewMode == "AR"
      );
    },
  },
  data() {
    return {
      loading: true,
      viewMode: "Desktop",
    };
  },
  methods: {
    SetButtons() {
      if (this.$store.state.mainScene != null) {
        if (this.$refs.placeholderVRButton != null) {
          this.$refs.placeholderVRButton.appendChild(
            this.$store.state.mainScene.xr.Controls.GetVRButton()
          );
          this.$store.state.mainScene.xr.Controls.GetVRButton().classList.add(
            "cta-button"
          );
        }

        if (this.$refs.placeholderARButton != null) {
          this.$refs.placeholderARButton.appendChild(
            this.$store.state.mainScene.xr.Controls.arButton.GetButton()
          );
          var arBtn = document.getElementById("ARButton");
          if(arBtn != null){
            arBtn.classList.add("cta-button");

          }
          //this.$store.state.mainScene.xr.Controls.arButton.GetButton().classList.add('cta-button')
          //console.log("AR BUTTON ",this.$store.state.mainScene.xr.Controls.arButton.GetButton())
        }
      }
    },
    ActivatePlaneDetection() {
      this.$nextTick(() => {
        console.log("Button clicke - next tick");
        setTimeout(() => {
          this.$store.commit(
            "SetTrackingActive",
            !this.$store.state.planeDetectionActive
          );
        }, 100);
      });
    },
    ActivateTransform() {
      this.$store.commit("SetTransformActive");
    },
    SetContainer(container) {
      console.log("CONTAINER: ", container);
      this.$store.commit("SetSelectedSlideContainer", container);
    },
    SetViewMode(mode) {
      //this.$store.state.mainScene.xr.Controls.arButton.SetDomOverlay(document.getElementById('ContainerPreview'));
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
      if (this.$store.state.currentProjekt.slide_containers.length > 0) {
        this.SetSelected(this.$store.state.currentProjekt.slide_containers[0]);
      }
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

<style lang="scss" scoped>
.button-wrapper {
  position: relative;
  margin-bottom: 1rem;
  z-index: 2;
}

.--active-false{
  background-color: #899da4!important;
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