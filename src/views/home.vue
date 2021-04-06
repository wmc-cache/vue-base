<template>
	<div>
		<validate-input
			:rules="inputRules"
			v-model:value="inputValueRef"
		></validate-input>
		{{inputValueRef}}

		<div
			v-for="component  in components"
			:key="component.id"
		>
			{{component.props.text}}
		</div>

	</div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
export default defineComponent({
	name: "Home",
	components: {
		ValidateInput
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const components = computed(() => {
			return store.state.editor.components;
		});
		console.log(components.value);
		const inputValueRef = ref("wmc");
		const inputRules: RulesProp = [
			{
				type: "required",
				message: "用户名不能为空"
			}
		];
		return {
			inputValueRef,
			inputRules,
			components
		};
	}
});
</script>

<style>
</style>
