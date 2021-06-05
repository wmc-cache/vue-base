import useHotKey from "../hooks/useHotKey"
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { computed } from "vue"
import { HotkeysEvent, KeyHandler } from "hotkeys-js"
import { ComponentData } from "@/store/editor";

const wrap = (callback: KeyHandler): KeyHandler => {
  const wrapFunction = (e: KeyboardEvent, event: HotkeysEvent) => {
    console.log("e.preventDefault()")
    e.preventDefault()
    callback(e, event)
  }

  return wrapFunction
}

export default function initHotKeys() {
  const store = useStore<GlobalDataProps>()
  const currentId = computed(() => store.state.editor.currentElement)
  const currentElement = computed<ComponentData | null>(
    () => store.getters.getCurrentElement
  );

  useHotKey('ctrl+c,command+c', () => {
    console.log()
    store.commit("copyComponent", currentId.value)

  })
  useHotKey('ctrl+v,command+v', () => {
    store.commit("pasteCopiesComponent")
  })

  useHotKey('esc', () => {
    store.commit("setActive", "")
  })

  useHotKey('backspace,delete', () => {
    store.commit("deleteComponent", currentId.value)
  })

  //撤销重做
  useHotKey('ctrl+z,command+z', () => {
    if (store.state.editor.histories[0].type == "add") {
      store.commit("deleteComponent", store.state.editor.histories[0].componentId)
    }
  })

  useHotKey('up', wrap(() => {
    if (currentElement.value?.props.top) {
      const topNum = currentElement.value?.props.top.replace(/px/g, '')
      const top = +topNum - 1
      store.commit("updateComponent", { key: "top", value: top + "px", currentId });
    }
  }))
  useHotKey('down', wrap(() => {
    if (currentElement.value?.props.top) {
      const topNum = currentElement.value?.props.top.replace(/px/g, '')
      const top = +topNum + 1
      store.commit("updateComponent", { key: "top", value: top + "px", currentId });
    }
  }))

  useHotKey('left', wrap(() => {
    if (currentElement.value?.props.left) {
      const topNum = currentElement.value?.props.left.replace(/px/g, '')
      const left = +topNum - 1
      store.commit("updateComponent", { key: "left", value: left + "px", currentId });
    }
  }))

  useHotKey('right', wrap(() => {
    if (currentElement.value?.props.left) {
      const topNum = currentElement.value?.props.left.replace(/px/g, '')
      const left = +topNum + 1
      store.commit("updateComponent", { key: "left", value: left + "px", currentId });
    }
  }))
}