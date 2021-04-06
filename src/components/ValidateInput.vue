<template>
	<div>
		<input
			v-model="inputValueRef"
			@blur="validateInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

interface RuleProp {
	type: "required" | "email" | "custom" | "range";
	message?: string;
	validator?: () => boolean;
	min?: { length: number; message: string };
	max?: { length: number; message: string };
}
export type RulesProp = RuleProp[];

export default defineComponent({
	name: "ValidateInput",
	props: {
		value: String,
		rules: Array as PropType<RulesProp>
	},
	setup(props, context) {
		const inputValueRef = computed({
			get: () => props.value || "",
			set: val => {
				console.log(val);
				context.emit("update:value", val);
			}
		});

		const ValidateInput = () => {
			if (props.rules) {
				props.rules.every(rule => {
					console.log(rule);
				});
			}
		};

		return { inputValueRef };
	}
});
</script>

<style>
</style>

