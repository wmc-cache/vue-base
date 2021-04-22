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
import {
	textDefaultProps,
	transformToComponentProps,
	textStylePropNames,
} from "../../defaultProps";

const defaultProps = transformToComponentProps(textDefaultProps);
console.log(defaultProps);
export default defineComponent({
	name: "w-text",
	props: {
		tag: {
			type: String,
			default: "div",
		},
		...defaultProps,
	},
	setup(props) {
		const styleProps = computed(() => pick(props, textStylePropNames));

		return {
			styleProps,
		};
	},
});
</script>

<style>
</style>
