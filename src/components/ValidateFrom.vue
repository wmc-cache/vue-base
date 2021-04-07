<template>
	<form>
		<slot name="default"></slot>
		<slot name="submit">
			<button type="submit">提交</button>
		</slot>
	</form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
export const emitter = mitt();
type ValidateFunc = () => boolean;
export default defineComponent({
	name: "ValidateFrom",
	setup() {
		const callback = (res?: ValidateFunc) => {
			console.log(res);
		};
		emitter.on("form-item-created", callback);
		onUnmounted(() => {
			emitter.off("form-item-created", callback);
		});
	},
});
</script>

<style>
</style>
