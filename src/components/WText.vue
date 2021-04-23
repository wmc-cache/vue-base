<template>

	<component
		:is="tag"
		:style="styleProps"
		class="l-text-component"
		@click="handleClick"
	>
		{{text}}
	</component>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	textDefaultProps,
	transformToComponentProps,
	textStylePropNames,
} from "../../defaultProps";
import useComponentCommon from "../hooks/useComponentCommon";

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
		const { styleProps, handleClick } = useComponentCommon(
			props,
			textStylePropNames
		);

		return {
			styleProps,
			handleClick,
		};
	},
});
</script>

<style>
</style>
