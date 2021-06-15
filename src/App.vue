<template>
	<button @click="swap">swap</button>
	<div id="div1">1</div>
	<div></div>
	<div id="div2">2</div>

	<router-view></router-view>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { swapHtmlElement } from "wmc-components";
export default defineComponent({
	name: "App",
	setup() {
		const swap = () => {
			swapHtmlElement(
				document.getElementById("div1") as HTMLElement,
				document.getElementById("div2") as HTMLElement
			);
		};

		return { swap };
	},
});
</script>

<style>
#div1 {
	background-color: rebeccapurple;
	width: 100px;
	height: 100px;
}
#div2 {
	background-color: aquamarine;
	width: 100px;
	height: 100px;
}
</style>
