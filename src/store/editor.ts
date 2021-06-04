import { Module } from 'vuex'
import { GlobalDataProps } from './index'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from "lodash-es"
import { TextComponentProps, ImageComponentProps } from '../../defaultProps'

export interface HistoryProps {
  id: string;
  componentId: string;
  type: 'add' | 'delete' | 'modify';
  data: any;
  index?: number;
}

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
  copiedComponent?: ComponentData;
  histories: HistoryProps[];
  historyIndex: number;
}
export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps & ImageComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 w-text，w-image 等等 
  name: 'w-text' | 'w-image';
}
export const testComponents: ComponentData[] = [
  // { id: uuidv4(), name: 'w-text', props: { text: 'hello', fontSize: '20px', color: '#000000', 'lineHeight': '1', textAlign: 'left', fontFamily: '' } },
  // { id: uuidv4(), name: 'w-text', props: { text: 'hello2', fontSize: '10px', fontWeight: 'bold', 'lineHeight': '2', textAlign: 'left', fontFamily: '' } },
  // { id: uuidv4(), name: 'w-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', 'lineHeight': '3', textAlign: 'left', fontFamily: '' } }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
    histories: [],
    historyIndex: -1
  },

  mutations: {
    addComponent(state, component: ComponentData) {
      state.components.push(component)
      state.histories.push({
        id: uuidv4(),
        componentId: component.id,
        type: "add",
        data: cloneDeep(component)
      })
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    updateComponent(state, { key, value }) {
      const updatedComponent = state.components.find((component) => component.id === state.currentElement)
      if (updatedComponent) {
        updatedComponent.props[key as keyof TextComponentProps] = value
      }
    },
    copyComponent(state, id: string) {
      const copiedComponent = state.components.find((component) => component.id === id)
      if (copiedComponent) {
        state.copiedComponent = copiedComponent
      }
    },
    pasteCopiesComponent(state) {
      if (state.copiedComponent) {
        const clone = cloneDeep(state.copiedComponent)
        clone.id = uuidv4()
        state.components.push(clone)
        state.histories.push({
          id: uuidv4(),
          componentId: clone.id,
          type: "add",
          data: cloneDeep(clone)
        })
      }

    },
    deleteComponent(state, id: string) {
      const currentComponent = state.components.find((component) => component.id === id)
      console.log("delete", id)
      if (currentComponent) {
        state.components = state.components.filter((component) => component !== currentComponent)
      }
    },

  },
  getters: {
    //获取到正被激活的组件
    getCurrentElement: (state) => {
      return state.components.find((component) => component.id === state.currentElement)
    }
  }
}

export default editor
