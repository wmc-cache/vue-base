import { GlobalDataProps } from './index';
import { Module } from "vuex"
//import uuidv4 from "uuid"

export interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string;
  tag: string;
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

export const testComponents: ComponentData[] = [
  { id: "1", tag: "div", name: "w-text", props: { text: "hello1", fontSize: "20px" } },
  { id: "2", tag: "a", name: "w-text", props: { text: "hello2", fontSize: "30px" } }
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