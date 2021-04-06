import { GlobalDataProps } from './index';
import { Module } from "vuex"
//import uuidv4 from "uuid"

export interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string;
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

export const testComponents: ComponentData[] = [
  { id: "1", name: "w-text1", props: { text: "hello1" } },
  { id: "2", name: "w-text2", props: { text: "hello2" } }
]


const editor: Module<EditorProps, GlobalDataProps> = {
  namespaced: true,
  //全局数据
  state: {
    components: testComponents,
    currentElement: ""
  },
  //commit最小原子性操作
  mutations: {


  },
  //可以异步操作
  actions: {

  },

  //计算属性
  getters: {


  }
}


export default editor