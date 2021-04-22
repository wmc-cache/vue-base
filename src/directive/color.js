import { createApp } from 'vue'
const app = createApp({})

// 注册
app.directive('my-directive', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {
    console.log("created")
  },
  // 在绑定元素的父组件挂载之前调用
  // beforeMount(el, binding, vnode) {
  //   el.style.background = binding.value
  // },
  // 绑定元素的父组件被挂载时调用
  mounted() {
    console.log("mounted")
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {
    console.log("beforeUpdate")
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {
    console.log("updated")
  },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {
    console.log(" beforeUnmount")
  },
  // 卸载绑定元素的父组件时调用
  unmounted() {
    console.log("unmounted")
  }
})


