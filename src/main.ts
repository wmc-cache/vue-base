import { createApp } from 'vue'
import router from "./routes/index"
import App from './App.vue'
import store from "./store/index"
import "normalize.css/normalize.css"
import "./style/index.scss"

import legoBricks from "lego-bricks"

import "lego-bricks/dist/bundle.css"

const app = createApp(App)//根据APP组件创建单页应用
console.log(process.env)
app.use(router).use(store).use(legoBricks)
app.mount('#app')


