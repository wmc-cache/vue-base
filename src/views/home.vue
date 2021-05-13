<template>
	<div>
		<div>
			{{ position }}
		</div>

		<w-form>
			<w-input
				:rules="inputRules"
				v-model:value="inputValueRef"
			></w-input>
		</w-form>
		<input type="color" />
		<message message="吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成吴梦成"></message>
		<div
			v-for="component in components"
			:key="component.id"
		>
			{{ component.props.text }}
		</div>
		<div class="css">css</div>

	</div>
</template>

<script lang="ts">
import Message from "../components/Message.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import useMousePosition from "../hooks/useMousePosition";
export default defineComponent({
	name: "Home",
	components: {
		Message,
	},
	setup() {
		const position = useMousePosition();
		const store = useStore<GlobalDataProps>();
		const components = computed(() => {
			return store.state.editor.components;
		});
		const formSubmitResult = (result: boolean) => {
			console.log(result);
		};
		//console.log(components.value);
		const inputValueRef = ref("wmc");
		const inputRules = [
			{
				type: "required",
				message: "用户名不能为空",
			},
			{
				type: "range",
				min: { length: 6, message: "用户名不能少于六位" },
			},
		];
		return {
			inputValueRef,
			inputRules,
			components,
			position,
			formSubmitResult,
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
.form-input {
	border: 1px solid #fff;
	border-radius: 0;
	width: 298px;
}
</style>
