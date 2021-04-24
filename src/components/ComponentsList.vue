<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <w-text v-bind="item"></w-text>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WText from "../components/WText.vue";
import { v4 as uuidv4 } from "uuid";
import { ComponentData } from "../store/editor";
import { TextComponentProps } from "../../defaultProps";
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ["on-item-click"],
  name: "components-list",
  components: {
    WText,
  },
  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: "w-text",
        id: uuidv4(),
        props,
      };
      context.emit("on-item-click", componentData);
    };
    return {
      onItemClick,
    };
  },
});
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>