<template>
  <div class="edit-wrapper" 
  @click="onItemClick(id)" 
  :style="styles"
  :class="{ active: active }">
  
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {pick}  from "lodash-es"
import { defineComponent,computed } from 'vue'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    props:{
      type:Object
    }
  },
  emits: ['set-active'],
  setup(props, context) {
    const styles = computed(()=>pick(props.props,["position","top","left","width","height"]))
    const onItemClick = (id: string) => {
      context.emit('set-active', id)
    }
    return {
      onItemClick,
      styles
    }
  }
})
</script>

<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper > *{
  position: static !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>