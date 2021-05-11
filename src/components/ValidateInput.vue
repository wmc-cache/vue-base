<template>
	<div>
		<input
			v-model="inputValueRef"
			:class="{'invalid': inputRef.error}"
			@blur="validateInput"
			v-bind="$attrs"
		/>
		<div
			class="errorMessageStyle"
			v-if="inputRef.error"
		>{{inputRef.message}}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, onMounted, reactive } from "vue";
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
	inheritAttrs: false,
	setup(props, context) {
		const inputValueRef = computed({
			get: () => props.value || "",
			set: (val) => {
				context.emit("update:value", val);
			},
		});

		const inputRef = reactive({
			error: false,
			message: "",
		});

		const validateInput = () => {
			if (props.rules) {
				const allPassed = props.rules.every((rule) => {
					let passed = true;
					inputRef.message = rule.message || "";
					switch (rule.type) {
						case "required":
							passed = inputValueRef.value.trim() !== "";
							break;
						case "range": {
							const { min, max } = rule;
							if (min && inputValueRef.value.trim().length < min.length) {
								passed = false;
								inputRef.message = min.message;
							}
							if (max && inputValueRef.value.trim().length > max.length) {
								passed = false;
								inputRef.message = max.message;
							}
							break;
						}
					}

					return passed;
				});
				inputRef.error = !allPassed;
				return allPassed;
			}
		};
		onMounted(() => {
			emitter.emit("form-item-created", validateInput);
		});

		return { inputValueRef, validateInput, inputRef };
	},
});
</script>

<style scoped>
.invalid {
	border: 1px solid red !important;
}
.errorMessageStyle {
	color: red;
	font-size: 12px;
}
</style>

