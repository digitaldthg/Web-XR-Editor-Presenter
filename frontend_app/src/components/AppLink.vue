<template>
	<router-link class="applink" :to="this.$props.to" :style="styles">
	<slot/>
	</router-link>
</template>

<script>
export default {
	name: 'AppLink',
	mixins: [],
	props: ["to"],
	computed: {
		styles() {
			return {
				
			}
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/main.scss";

.applink:hover {
  color: $custom-blue;
}
</style>

<docs>
### Examples

Default Link:

```jsx
<AppLink>Click me, I'm a Link</AppLink >
```

</docs>
