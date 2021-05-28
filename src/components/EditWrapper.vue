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
		<div class="pointer">
			<div class="nw"></div>
			<div class="ne"></div>
			<div
				@mousedown.stop="control"
				class="se"
			></div>
			<div class="sw"></div>
		</div>

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
	emits: ["set-active", "update-position", "update-shape"],
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
		//控制移动
		const startMove = (e: MouseEvent) => {
			const currentElement = editWrapper.value;
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
		//控制形状大小
		const control = () => {
			const currentElement = editWrapper.value;

			const handleMove = (e: MouseEvent) => {
				isMoving = true;
				if (currentElement) {
					currentElement.style.width =
						e.clientX - currentElement.getBoundingClientRect().left + "px";
					currentElement.style.height =
						e.clientY - currentElement.getBoundingClientRect().top + "px";
				}
			};
			const handleMoveUp = () => {
				document.removeEventListener("mousemove", handleMove);
				if (isMoving) {
					if (currentElement) {
						console.log("up");
						const width = currentElement.style.width;
						const height = currentElement.style.height;
						context.emit("update-shape", { width, height, id: props.id });
					}
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
			control,
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
.edit-wrapper > .l-text-component {
	position: static !important;
	width: 100% !important;
	height: 100% !important;
}
.edit-wrapper:hover {
	border: 1px dashed #ccc;
}
.edit-wrapper.active {
	border: 1px solid rebeccapurple;
	user-select: none;
	z-index: 1500;
	box-sizing: content-box !important;
}
.edit-wrapper.active > .pointer > .nw {
	top: -5px;
	left: -5px;
	position: absolute;
	width: 10px;
	height: 10px;
	background-color: aquamarine;
	border-radius: 50%;
	cursor: nw-resize;
}

.edit-wrapper.active > .pointer > .ne {
	top: -5px;
	right: -5px;
	position: absolute;
	width: 10px;
	height: 10px;
	background-color: aquamarine;
	border-radius: 50%;
	cursor: ne-resize;
}
.edit-wrapper.active > .pointer > .sw {
	bottom: -5px;
	left: -5px;
	position: absolute;
	width: 10px;
	height: 10px;
	background-color: aquamarine;
	border-radius: 50%;
	cursor: sw-resize;
}
.edit-wrapper.active > .pointer > .se {
	bottom: -5px;
	right: -5px;
	position: absolute;
	width: 10px;
	height: 10px;
	background-color: aquamarine;
	border-radius: 50%;
	cursor: se-resize;
}
</style>