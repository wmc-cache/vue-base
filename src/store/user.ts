import { GlobalDataProps } from './index';
import { Module } from "vuex"


export interface UserProps {
  name: string;
}

const user: Module<UserProps, GlobalDataProps> = {
  namespaced: true,
  //全局数据
  state: {

    name: "wmc"

  },
  //commit最小原子性操作
  mutations: {
    upDataName(state, value) {
      state.name = value
    }

  },
  //可以异步操作
  actions: {

  },

  //计算属性
  getters: {
    realName: (state) =>
      state.name = "real"

  }
}


export default user