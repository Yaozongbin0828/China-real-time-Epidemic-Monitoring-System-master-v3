import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import echarts from 'echarts'
//Vant
import {vant} from './plugins/vant.js'
import 'vant/lib/index.css'

import axios from "axios";
//全局css
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/base.css'
import './assets/css/reset.css'

const app = createApp(App);
app.config.globalProperties.$echarts = echarts

vant(app);
app.use(router).use(echarts).mount('#app')



