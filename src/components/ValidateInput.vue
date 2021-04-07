<template>
	<div>
		<input
			v-model="inputValueRef"
			@blur="validateInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, onMounted } from "vue";
import { emitter } from "./ValidateFrom.vue";
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
		rules: Array as PropType<RulesProp>,
	},
	setup(props, context) {
		const inputValueRef = computed({
			get: () => props.value || "",
			set: (val) => {
				//console.log(val);
				context.emit("update:value", val);
			},
		});

		const validateInput = () => {
			if (props.rules) {
				const allPassed = props.rules.every((rule) => {
					let passed = true;
					switch (rule.type) {
						case "required":
							passed = inputValueRef.value.trim() !== "";
							break;
					}

					return passed;
				});
				console.log("是否通过", allPassed);
			}
		};
		onMounted(() => {
			emitter.emit("form-item-created", validateInput);
		});

		return { inputValueRef, validateInput };
	},
});
</script>

<style>
</style>

