import useHotKey from "../hooks/useHotKey"
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { computed } from "vue"


export default function initHotKeys() {
  const store = useStore<GlobalDataProps>()
  const currentId = computed(() => store.state.editor.currentElement)
  useHotKey('ctrl+c,command+c', () => {
    store.commit("copyComponent", currentId.value)
    alert("ctrl+c,command+c")
  })
}