import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// echart
import * as Echarts from 'echarts'
// import VueEcharts from 'vue-echarts' // vue3 無法
import { VueEcharts } from 'vue3-echarts'

// 全局樣式
import './assets/css/style.css'
import './assets/css/reset-css.css'

const app = createApp(App)
// 全局綁定
app.config.globalProperties.$echarts = Echarts
// 全局註冊
app.component('vue-echarts', VueEcharts)
app.use(store).use(router).mount('#app')
