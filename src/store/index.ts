import { createStore } from 'vuex'
import user, { UserProps } from "./user"
import editor, { EditorProps } from "./editor"
export interface GlobalDataProps {
  user: UserProps;
  editor: EditorProps;
}

const store = createStore({
  modules: {
    user,
    editor
  }
})
//store.commit("user/upDataName", "asd")
console.log(user.state)
//console.log(user.getters.realName)


export default store
