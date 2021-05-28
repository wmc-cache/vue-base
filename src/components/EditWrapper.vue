<template>
	<div
		:data-id="id"
		class="edit-wrapper"
		ref="editWrapper"
		@click="onItemClick(id)"
		@mousedown="startMove"
		:style="styles"
		:class="{ active: active }"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { pick } from "lodash-es";
import { defineComponent, computed, ref, nextTick } from "vue";
import { GlobalDataProps } from "../store/index";
import { useStore } from "vuex";
export default defineComponent({
	props: {
		id: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
		props: {
			type: Object,
		},
	},
	emits: ["set-active", "update-position"],
	setup(props, context) {
		const editWrapper = ref<null | HTMLElement>(null);
		const store = useStore<GlobalDataProps>();
		const styles = computed(() =>
			pick(props.props, ["position", "top", "left", "width", "height"])
		);
		const onItemClick = (id: string) => {
			context.emit("set-active", id);
		};

		const gap = { x: 0, y: 0 };
		let isMoving = false;
		const caculateMovePosition = (e: MouseEvent) => {
			const content = document.getElementById("content") as HTMLElement;
			const left = e.clientX - gap.x - content.offsetLeft;
			const top = e.clientY - gap.y - content.offsetTop;
			return { left, top };
		};
		const startMove = (e: MouseEvent) => {
			const currentElement = editWrapper.value;
			//console.log(editWrapper.value?.getAttribute("data-id"));
			if (
				editWrapper.value?.getAttribute("data-id") !=
				store.state.editor.currentElement
			) {
				return;
			}
			if (currentElement) {
				gap.x = e.clientX - currentElement.getBoundingClientRect().left;
				gap.y = e.clientY - currentElement.getBoundingClientRect().top;
				//console.log(gap);
			}
			const handleMove = (e: MouseEvent) => {
				const { left, top } = caculateMovePosition(e);
				isMoving = true;
				if (currentElement) {
					currentElement.style.left = left + "px";
					currentElement.style.top = top + "px";
				}
				//console.log(left,top)
			};
			const handleMoveUp = (e: MouseEvent) => {
				document.removeEventListener("mousemove", handleMove);
				if (isMoving) {
					const { left, top } = caculateMovePosition(e);

					context.emit("update-position", { left, top, id: props.id });
					isMoving = false;
				}
				nextTick(() => {
					document.removeEventListener("mouseup", handleMoveUp);
				});
			};
			document.addEventListener("mousemove", handleMove);
			document.addEventListener("mouseup", handleMoveUp);
		};

		return {
			onItemClick,
			styles,
			editWrapper,
			startMove,
			gap,
		};
	},
});
</script>

<style>
.edit-wrapper {
	padding: 0px;
	cursor: pointer;
	border: 1px solid transparent;
	user-select: none;
}
.edit-wrapper > * {
	position: static !important;
}
.edit-wrapper:hover {
	border: 1px dashed #ccc;
}
.edit-wrapper.active {
	border: 0.1px solid rebeccapurple;
	user-select: none;
	z-index: 1500;
}
</style>