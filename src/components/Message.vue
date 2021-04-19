<template>
	<teleport to="#message">
		<div
			class="message"
			:class="classObject"
			v-if="isVisible"
		>
			<span>{{message}}</span>
			<button
				type="button"
				class="close"
				aria-label="Close"
				@click.prevent="hide"
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export type MessageType = "success" | "error" | "default";
export default defineComponent({
	props: {
		message: String,
		type: {
			type: String as PropType<MessageType>,
			default: "default",
		},
	},
	emits: ["close-message"],
	setup(props, context) {
		useDOMCreate("message");
		const isVisible = ref(true);
		const classObject = {
			"alert-success": props.type === "success",
			"alert-danger": props.type === "error",
			"alert-primary": props.type === "default",
		};
		const hide = () => {
			isVisible.value = false;
			context.emit("close-message", true);
		};
		return {
			classObject,
			isVisible,
			hide,
		};
	},
});
</script>



<style lang="scss"  scoped>
.message {
	position: fixed;
	top: calc(50% - 100px);
	left: calc(50% - 100px);
	width: 200px;
	height: 200px;
	background-color: aquamarine;
}
.close {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
