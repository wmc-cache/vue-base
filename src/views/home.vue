<template>
	<div>
		<div>
			{{position}}
		</div>
		<input type="color">
		<message message="吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成"></message>
		<div
			v-for="component in components"
			:key="component.id"
		>
			{{ component.props.text }}
		</div>
		<div class="css">css</div>

		<validate-from>
			<validate-input
				:rules="inputRules"
				v-model:value="inputValueRef"
			></validate-input>
			{{ inputValueRef }}
		</validate-from>
		<a href="">123</a>
		<input type="text">
	</div>
</template>

<script lang="ts">
import Message from "../components/Message.vue";
import ValidateFrom from "../components/ValidateFrom.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import useMousePosition from "../hooks/useMousePosition";

export default defineComponent({
	name: "Home",
	components: {
		ValidateInput,
		ValidateFrom,
		Message,
	},
	setup() {
		const position = useMousePosition();
		const store = useStore<GlobalDataProps>();
		const components = computed(() => {
			return store.state.editor.components;
		});
		console.log(components.value);
		const inputValueRef = ref("wmc");
		const inputRules: RulesProp = [
			{
				type: "required",
				message: "用户名不能为空",
			},
		];
		return {
			inputValueRef,
			inputRules,
			components,
			position,
		};
	},
});
</script>

<style lang="scss">
.css {
	width: 200px;
	height: 200px;
	background-color: $color-primary;
	@include box-center;
}
</style>
