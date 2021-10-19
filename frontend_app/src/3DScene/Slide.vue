<template>
  <div class="slide" v-if="this.order == currentSlideIdx"></div>
</template>

<script>
import config from "../main.config";

export default {
  name: "Slide",
  props: {
    slide: null,
    order: null,
  },
  computed: {
    currentSlideIdx() {
      return this.$store.state.currentSlideIdx;
    },
  },
  data() {
    return {
      library: null,
      slideElements: null,
    };
  },
  methods: {
    AddAllElements() {
      //Füge alle vorher geladenen Elemente zur Szene hinzu und transformiere sie den Parametern entsprechend
      Object.values(this.slideElements).forEach((element) => {
        if (element.Offset != null) {
          element.scene.position.set(
            element.Offset.x,
            element.Offset.y,
            element.Offset.z
          );
        }

        if (element.Rotation != null) {
          element.scene.quaternion.set(
            element.Rotation.x,
            element.Rotation.y,
            element.Rotation.z,
            element.Rotation.w
          );
        }
        this.$store.state.mainScene.rootGroup.add(element.scene);
      });
    },

    RemoveAllElements() {
      Object.values(this.slideElements).forEach((element) => {
        this.$store.state.mainScene.rootGroup.remove(element.scene);
      });
    },
  },
  mounted() {
    if (this.slideElements != null) {
      return;
    }

    var gltfStack = [];
    var object3dStack = [];
    var primitivesStack = [];
    var textStack = [];

    //Ordne die SlideElemente den entsprechenden Stacks zu (Object3D, Primitive or Text)
    this.slide.SlideElements.forEach((slideElement) => {
      if (slideElement.element.Type.Type == "Object3D") {
        gltfStack.push({
          url: config.CMS_BASE_URL + slideElement.element.Asset.url,
          name: slideElement.element.Name,
        });
        object3dStack.push(slideElement);
      } else if (slideElement.element.Type.Type == "Primitive") {
        primitivesStack.push(slideElement);
      } else if (slideElement.element.Type.Type == "Text") {
        textStack.push(slideElement);
      }
    });

    //Lade PrimitiveStack
    this.slideElements =
      this.$store.state.mainScene.LoadPrimitives(primitivesStack);

    //Lade TextStack
    var textSlideElements = this.$store.state.mainScene.LoadText(textStack);

    Object.assign(this.slideElements, textSlideElements);

    //Lade Object3DStack und lade alles Elemente in die Szene
    this.$store.state.mainScene.LoadStack(gltfStack).then((library) => {
      this.library = library;
      object3dStack.forEach((slideElem) => {
        this.slideElements[slideElem.id] = slideElem;
        this.slideElements[slideElem.id].scene =
          library[slideElem.element.Name].scene;
      });

      if (this.$store.state.currentSlideIdx == this.order) {
        this.AddAllElements();
      }
    });

    this.$store.watch(
      (state) => state.currentSlideIdx,
      (newValue, oldValue) => {
        if (oldValue == this.order) {
          this.RemoveAllElements();
        } else if (newValue == this.order && this.slideElements != null) {
          this.AddAllElements();
        }
      }
    );
  },
  destroyed() {
    this.RemoveAllElements();
  },
};
</script>

<style scopes lang="scss">
.slide {
  position: absolute;
  right: 0;
  top: 120px;
}
</style>