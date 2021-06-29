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
  components: {},
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

      console.log("AddAllElements");
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

        // if (element.Scale != null) {
        //   element.scene.scale.set(
        //     element.Scale.x *  0.01,
        //     element.Scale.y * 0.01,
        //     element.Scale.z * 0.01
        //   );
        // }
        console.log("SlideElement: ",element);
        this.$store.state.mainScene.rootGroup.add(element.scene);
      });
      console.log("Root Group ",this.$store.state.mainScene.rootGroup)
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

    this.slideElements = this.$store.state.mainScene.LoadPrimitives(
      primitivesStack
    );

    var textSlideElements = this.$store.state.mainScene.LoadText(textStack);

    Object.assign(this.slideElements, textSlideElements);

    this.$store.state.mainScene.LoadStack(gltfStack).then((library) => {
      this.library = library;
      object3dStack.forEach((slideElem) => {
        this.slideElements[slideElem.id] = slideElem;
        this.slideElements[slideElem.id].scene =
          library[slideElem.element.Name].scene;
        console.log(
          "Create gltf element for slide: ",
          this.slide.Name,
          this.slideElements[slideElem.id]
        );
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
    console.log(
      "Destory: ",
      this.order,
      " ",
      this.$store.state.currentSlideIdx
    );
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