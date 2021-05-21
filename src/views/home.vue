<template>
	<div>
		<div>
			{{ position }}
		</div>
		<div
			style="width:300px;height:300px"
			id="container"
		></div>
		<w-form>
			<w-input
				:errorMessageStyle="errorMessageStyle"
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
		<!-- <div class="css">css</div> -->

	</div>
</template>

<script lang="ts">
const errorMessageStyle = { color: "red", fontSize: "12px" };
import AMapLoader from "@amap/amap-jsapi-loader";
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
		AMapLoader.load({
			key: "2b4552a40e781712b959acbc94c917c9", // 申请好的Web端开发者Key，首次调用 load 时必填
			version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
			AMapUI: {
				version: "1.1",
				plugins: [],
			},
			Loca: {},
		})
			.then((AMap) => {
				const map = new AMap.Map("container");
			})
			.catch((e) => {
				console.log(e);
			});
		const position = useMousePosition();
		const store = useStore<GlobalDataProps>();
		const components = computed(() => {
			return store.state.editor.components;
		});
		const formSubmitResult = (result: boolean) => {
			console.log(result);
		};
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
			{
				type: "email",
				message: "邮箱格式不正确",
			},
			{
				type: "custom",
				validator: () => {
					if (inputValueRef.value == "1006004868@qq.com") {
						return true;
					} else {
						return false;
					}
				},
				message: "不是我的邮箱",
			},
		];
		return {
			inputValueRef,
			inputRules,
			components,
			position,
			formSubmitResult,
			errorMessageStyle,
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
