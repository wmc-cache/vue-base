
<template>
	<div class="content">
		<div class="left">
			<components-list
				@onItemClick="addItem"
				:list="defaultTextTemplates"
			></components-list>
		</div>
		<div
			id="content"
			class="middle"
		>
			<edit-wrapper
				@update-position="updataPosition"
				@update-shape="updataShape"
				@setActive="setActive"
				v-for="component in components"
				:key="component.id"
				:id="component.id"
				:props="component.props"
				:active="component.id === (currentElement && currentElement.id)"
			>
				<component
					:is="component.name"
					v-bind="component.props"
				/>
			</edit-wrapper>
		</div>

		<div class="right">
			<props-table
				v-if="currentElement && currentElement.props"
				:props="currentElement.props"
				@change="handleChange"
			></props-table>
			<pre>
        {{ currentElement && currentElement.props }}
      </pre>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ComponentsList from "../components/ComponentsList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import WText from "@/components/WText.vue";
import { defaultTextTemplates } from "../../defaultTemplates";
import { ComponentData } from "@/store/editor";
import EditWrapper from "../components/EditWrapper.vue";
import PropsTable from "../components/PropsTable.vue";
export default defineComponent({
	name: "Editor",
	components: {
		WText,
		ComponentsList,
		EditWrapper,
		PropsTable,
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const components = computed(() => {
			return store.state.editor.components;
		});
		const currentElement = computed<ComponentData | null>(
			() => store.getters.getCurrentElement
		);
		const addItem = (component: any) => {
			store.commit("addComponent", component);
		};
		const setActive = (id: string) => {
			store.commit("setActive", id);
		};
		const handleChange = (e: any) => {
			console.log("event", e);
			store.commit("updateComponent", e);
		};
		const updataPosition = (data: {
			left: number;
			top: number;
			id: string;
		}) => {
			const { left, top, id } = data;
			//console.log(left, top);
			store.commit("updateComponent", { key: "left", value: left + "px", id });
			store.commit("updateComponent", { key: "top", value: top + "px", id });
		};
		const updataShape = (data: {
			width: string;
			height: string;
			id: string;
		}) => {
			const { width, height, id } = data;
			//console.log(width, height, id);
			store.commit("updateComponent", {
				key: "width",
				value: width,
				id,
			});
			store.commit("updateComponent", {
				key: "height",
				value: height,
				id,
			});
		};

		return {
			components,
			defaultTextTemplates,
			currentElement,
			addItem,
			setActive,
			handleChange,
			updataPosition,
			updataShape,
		};
	},
});
</script>

<style lang="scss" scoped>
.content {
	display: flex;
}
.left {
	width: 20vw;
	background-color: aliceblue;
}
.middle {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 50vw;
	background-color: aqua;
}
.right {
	width: 30vw;
	background-color: bisque;
}
</style>