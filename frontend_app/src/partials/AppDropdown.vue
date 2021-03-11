<template>
  <VueDropdown :config="config" @setSelectedOption="dropdownChanged($event)"></VueDropdown>
</template>

<script>
import VueDropdown from "./vue-dropdown";
export default {
  name: "AppDropdown",
  props: {
	  placeholder: {
			type: String,
			default: 'Placeholder'
		},
	  color: {
			type: String,
			default: 'blue'
		},
    options:[]
  },
  components: {
    VueDropdown,
  },
  computed: {
    config() {
      return {
          options: this.options,
          prefix: this.placeholder,
          backgroundColor: this.color,
        }
    },
  },
  methods: {
	  dropdownChanged(){
		  
	  }
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/main.scss";
VueDropdown{
  pointer-events: all;
}
</style>

<docs>
### Examples

```jsx
<AppDropdown color="red" placeholder="Custom Placeholder"></AppDropdown >
```


</docs>
