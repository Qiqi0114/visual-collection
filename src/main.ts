import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus).use(router).use(store)
app.mount('#app')