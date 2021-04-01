import { createStore } from 'vuex'
import user, { UserProps } from "./user"

export interface GlobalDataProps {
  user: UserProps;
}

const store = createStore({
  modules: {
    user
  }
})
store.commit("user/upDataName", "asd")
console.log(user.state)
//console.log(user.getters.reallName)


export default store
