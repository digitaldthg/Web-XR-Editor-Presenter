<template>
  <div
    class="dropdown"
    @click="toggleRiskLevels"
    :class="{ expanded: isExpanded }"
    :style="computedStyles"
  >
    <div class="dropdown-label-container">
      <div class="dropdown-label">
        <span class="text">
          {{ (config.prefix ? config.prefix.value : "") + " "
          }}{{ config.placeholder ? config.placeholder : "" }}
        </span>

        <img class="icon" v-if="config.prefix.image != null" :src="config.prefix.image"/>
        <i class="angle-down" :class="{ toggled: isExpanded }"></i>
      </div>
    </div>

    <div v-expand="isExpanded" class="options expand">
      <div
        v-for="option in configOptions"
        class="option"
        @click="setCurrentSelectedOption(option);"
        v-bind:key="option.value"
      >
    
        {{ option.value }}
        <img class="icon" v-if="option.image != null" :src="option.image"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dropdown",
  data() {
    return {
      isBottomSectionToggled: false,
      optionsHeight: 0,
      optionHeight: 50,
      width: 100,
      configOptions: [],
      backgroundColor: "red",
      backgroundExpandedColor: "white",
      hoverBackgroundColor: "green",
      border: "1px solid  #232b35",
      borderRadius: 1,
      textColor: "black",
      isExpanded: false
    };
  },
  components: {},
  props: ["config"],
  computed: {
    computedStyles: function() {
      return [
        { "--options-height": this.optionsHeight + "px" },
        { "--options-height-neg": "-" + this.optionsHeight + "px" },
        { "--option-height": this.optionHeight + "px" },
        { "--main-el-border-radius": this.borderRadius },
        { "--dropdown-width": this.width + "px" },
        { "--dropdown-background-color": this.backgroundColor },
        { "--dropdown-expanded-color": this.backgroundExpandedColor },
        { "--dropdown-border": this.border },
        { "--dropdown-hover-background-color": this.hoverBackgroundColor },
        { "--dropdown-default-text-color": this.textColor }
      ];
    }
  },
  directives: {
    expand: {
      inserted: function(el, binding) {
        if (binding.value !== null) {
          function calcHeight() {
            const currentState = el.getAttribute("aria-expanded");
            el.classList.add("u-no-transition");
            el.removeAttribute("aria-expanded");
            el.style.height = null;
            el.style.height = el.clientHeight + "px";
            el.setAttribute("aria-expanded", currentState);

            setTimeout(function() {
              el.classList.remove("u-no-transition");
            });
          }
          el.classList.add("expand");
          el.setAttribute("aria-expanded", binding.value ? "true" : "false");
          calcHeight();
          window.addEventListener("resize", calcHeight);
        }
      },
      update: function(el, binding) {
        if (el.style.height && binding.value !== null) {
          el.setAttribute("aria-expanded", binding.value ? "true" : "false");
        }
      }
    }
  },
  methods: {
    toggleRiskLevels() {
      this.isExpanded = !this.isExpanded;
    },
    setCurrentSelectedOption(option) {
      this.$emit("setSelectedOption", option);
    },
    setConfigData() {
      this.configOptions = this.config.options;
      this.width = this.config.width;
      this.placeholder = this.config.placeholder;
      if (this.config.backgroundColor) {
        this.backgroundColor = this.config.backgroundColor;
      }
      if (this.config.backgroundExpandedColor) {
        this.backgroundExpandedColor = this.config.backgroundExpandedColor;
      }
      if (this.config.border) {
        this.border = this.config.border;
      }
      if (this.config.hoverBackgroundColor) {
        this.hoverBackgroundColor = this.config.hoverBackgroundColor;
      }
      if (this.config.textColor) {
        this.textColor = this.config.textColor;
      }
      if (this.config.borderRadius) {
        this.borderRadius = this.config.borderRadius;
      }
    },
    setOptionsHeight() {
      this.optionsHeight = this.optionHeight * this.configOptions.length;
    }
  },
  created() {
    this.setConfigData();
    this.setOptionsHeight();
  },
  beforeUdate() {
    // this.setOptionsHeight();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../styles/vue-dropdown";
</style>
