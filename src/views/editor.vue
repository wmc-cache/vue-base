<template>
	<div
		v-for="component in components"
		:key="component.id"
	>

		<w-text
			:tag="component.tag"
			v-bind="component.props"
		></w-text>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import WText from "@/components/WText.vue";
export default defineComponent({
	name: "Editor",
	components: {
		WText,
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const components = computed(() => {
			return store.state.editor.components;
		});

		return {
			components,
		};
	},
});
</script>

<style>
</style>