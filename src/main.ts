import { createApp } from 'vue'
import router from "./routes/index"
import App from './App.vue'
import store from "./store/index"
import "normalize.css/normalize.css"
import "./style/index.scss"

const app = createApp(App)//根据APP组件创建单页应用
console.log(process.env)
app.use(router).use(store)
app.mount('#app')

