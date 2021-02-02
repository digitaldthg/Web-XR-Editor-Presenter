<template>
  <vue-dropdown :config="config" @setSelectedOption="dropdownChanged($event)"></vue-dropdown>
</template>

<script>
import VueDropdown from "vue-dynamic-dropdown";
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
		}
  },
  components: {
    VueDropdown,
  },
  computed: {
    config() {
      return {
          options: [
            {
              value: "option 1",
            },
            {
              value: "option 2",
            },
          ],
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
</style>

<docs>
### Examples

```jsx
<AppDropdown color="red" placeholder="Custom Placeholder"></AppDropdown >
```


</docs>
