import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import echarts from '@/utils/echarts'; //echarts按需引入
const app = createApp(App)
app.use(ElementPlus).use(router).use(store)
app.mount('#app')
//echarts按需引入
app.config.globalProperties.$echarts = echarts;