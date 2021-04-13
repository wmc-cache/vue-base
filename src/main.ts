import { createApp } from 'vue'
import router from "./routes/index"
import App from './App.vue'
import store from "./store/index"
import "normalize.css/normalize.css"

const app = createApp(App)//根据APP组件创建单页应用

app.use(router).use(store)
app.mount('#app')

