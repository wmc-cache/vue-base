<template>

	<component
		:is="tag"
		:style="styleProps"
		class="l-text-component"
	>
		{{text}}
	</component>

</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { pick } from "lodash-es";
export default defineComponent({
	name: "w-text",
	props: {
		text: {
			type: String,
		},
		fontSize: {
			type: String,
		},
		tag: {
			type: String,
			default: "div",
		},
	},
	setup(props) {
		const styleProps = computed(() => pick(props, ["fontSize"]));

		return {
			styleProps,
		};
	},
});
</script>

<style>
</style>
