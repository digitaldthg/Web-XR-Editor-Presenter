<template>
  <div class="slide">
    <div v-if="this.order == currentSlideIdx">

    </div>
  </div>
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
    };
  },
  methods: {
    AddElements() {
      Object.values(this.library).forEach((element) => {
        this.$store.state.mainScene.xr.Scene.add(element.scene);
      });
    },
    RemoveElements() {
      Object.values(this.library).forEach((element) => {

        this.$store.state.mainScene.xr.Scene.remove(element.scene);
      });
    },
  },
  mounted() {
    if (this.library != null) {
      return;
    }

    var stack = [];
    this.slide.SlideElements.forEach((element) => {
      stack.push({
        url: config.CMS_BASE_URL + element.element.Asset.url,
        name: element.element.Name,
      });
    });
    this.$store.state.mainScene.LoadStack(stack).then((library) => {
      this.library = library;
      if (this.$store.state.currentSlideIdx == this.order) {
        this.AddElements();
      }
    });

    this.$store.watch(
      (state) => state.currentSlideIdx,
      (newValue, oldValue) => {
        if (oldValue == this.order) {
          this.RemoveElements();
        } else if (newValue == this.order) {
          this.AddElements();
        }
      }
    );
  },
  destroyed() {
      console.log("Destory: ",this.order, " ",this.$store.state.currentSlideIdx)
      this.RemoveElements();

  },
};
</script>

<style>
</style>