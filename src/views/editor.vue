
<template>
	<div class="content">
		<div class="left">
			<components-list
				@onItemClick="addItem"
				:list="defaultTextTemplates"
			></components-list>
		</div>
		<div class="middle">
			<edit-wrapper
				@setActive="setActive"
				v-for="component in components"
				:key="component.id"
				:id="component.id"
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

		return {
			components,
			defaultTextTemplates,
			currentElement,
			addItem,
			setActive,
			handleChange,
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