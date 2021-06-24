<template>
	<div
		style="width:300px;height:300px;background-color:red"
		ref="joyRef"
	>
		<div>
			{{ 	degree }}
		</div>
	</div>
	<tsx></tsx>

	<div
		style="width:300px;height:300px"
		id="container"
	></div>

	<div ref="img">
		<w-token-img
			style="width:100px;height:100px"
			authSrc="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F035%2F063%2F726%2F3ea4031f045945e1843ae5156749d64c.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625122427&t=97156690f90e7a94974ccde1f9895f21"
		></w-token-img>

	</div>

	<w-form>
		<w-input
			:errorMessageStyle="errorMessageStyle"
			:rules="inputRules"
			v-model:value="inputValueRef"
		></w-input>
	</w-form>

	<!-- <div
			v-for="item in fontFamilyArr"
			:key="item.value"
		>
			<div :style="{fontFamily:item.value}">{{item.text}}</div>
		</div> -->

</template>

<script lang="ts">
const errorMessageStyle = { color: "yellow", fontSize: "12px" };
import AMapLoader from "@amap/amap-jsapi-loader";
import { defineComponent, ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import useMousePosition from "../hooks/useMousePosition";
import nipplejs from "nipplejs";
import tsx from "../components/tsx";
import { http, WTokenImg, WInput, WForm } from "wmc-components";

const fontFamilyArr = [
	{ text: "宋体", value: '"SimSun","STSong"' },
	{ text: "黑体", value: '"SimHei","STHeiti"' },
	{ text: "楷体", value: '"KaiTi","STKaiti"' },
	{ text: "仿宋", value: '"FangSong","STFangsong"' },
];
export default defineComponent({
	name: "Home",
	components: { tsx, WTokenImg, WInput, WForm },
	setup() {
		const joyRef = ref();
		const img = ref();
		const degree = ref();
		http({
			url: "https://www.baidu.com",
		});
		onMounted(() => {
			const options: object = {
				mode: "static", // 'dynamic', 'static' or 'semi'
				size: 150,
				position: {
					left: "150px",
					top: "150px",
				}, //在容器内垂直居中显示
				zone: joyRef.value, //如果不提提供zone容器元素，那么默认动态生成的元素是注入在body中的。
			};
			const data = nipplejs.create(options);
			data.on("move", function (evt, data) {
				degree.value = data.angle.degree;
				console.log(data);
				// if (data.direction) {
				// 	const angle = data.direction.angle;
				// 	const distance = data.distance;
				// 	console.log(angle, distance);
				// }
			});
		});

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
			joyRef,
			fontFamilyArr,
			img,
			degree,
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
