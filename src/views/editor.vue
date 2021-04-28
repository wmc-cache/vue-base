<template>
	<div class="content">
		<div>
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
export default defineComponent({
	name: "Editor",
	components: {
		WText,
		ComponentsList,
		EditWrapper,
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

		return {
			components,
			defaultTextTemplates,
			currentElement,
			addItem,
			setActive,
		};
	},
});
</script>

<style lang="scss" scoped>
.content {
	display: flex;
}
.middle {
	display: flex;
	flex-direction: column;
	margin-left: 100px;
}
</style>