<template>
  <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event)"></vue-dropdown>
</template>

<script>
import VueDropdown from "./vue-dropdown";
export default {
  name: "AppDropdown",
  props: {
	  placeholder: null,
	  color: {
			type: String,
			default: 'blue'
		},
    options:null
  },
  components: {
    VueDropdown,
  },
  computed: {
    config() {
      return {
          options: this.options,
          selected: this.placeholder,
          backgroundColor: this.color,
        }
    },
  },
  methods: {
	  setNewSelectedOption(selectedOption) {
      this.config.placeholder = selectedOption;
      this.$emit('callback', selectedOption.info);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/main.scss";
</style>

<docs>
### Examples

```jsx
<AppDropdown color="red" placeholder="Custom Placeholder"></AppDropdown >
```


</docs>
