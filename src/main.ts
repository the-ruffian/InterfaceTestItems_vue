import { createApp } from '@vue/runtime-dom'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import regular_check from "./common/regular_check";
// @ts-ignore
import App from './App.vue'


createApp(App)
    .use(router)
    .use(Antd)
    .use(regular_check)
    .mount('#app')
