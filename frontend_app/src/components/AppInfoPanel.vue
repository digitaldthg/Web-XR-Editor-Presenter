<template>
  <div class="appinfopanel" :style="styles">
    <!-- @slot Use this slot to place the button content -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppInfoPanel",
  mixins: [],
  props: {
    /**
     * Sets the button font color
     */
    background: {
      type: String,
      default: "black",
    },
    /** Sets background color of the button
     * @since 1.2.0
     */
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
  },
  computed: {
    styles() {
      return {
        background: this.background,
        width: this.width,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/main.scss";
.appinfopanel {
	padding: 5px;
  border: solid #000;
  border-width: 1px;
}
</style>

<docs>
### Examples

Default Info Panel:

```jsx
<AppInfoPanel background="white" width="100px">Hi, I'm your Info Panel! Please style me :)</InfoPanel>
```
Default Info Panel:


</docs>
