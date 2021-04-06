<template>
	<div>
		<validate-input
			:rules="inputRules"
			v-model:value="inputValueRef"
		></validate-input>
		{{inputValueRef}}
	</div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: "Home",
	components: {
		ValidateInput
	},
	setup() {
		const inputValueRef = ref("wmc");
		const inputRules: RulesProp = [
			{
				type: "required",
				message: "用户名不能为空"
			}
		];
		return {
			inputValueRef,
			inputRules
		};
	}
});
</script>

<style>
</style>
