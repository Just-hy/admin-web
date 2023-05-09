import { createApp } from 'vue'
import Antd from 'ant-design-vue'
//import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
//引入图标
import *  as Icons from '@ant-design/icons-vue'
//引入路由
import router from './router'

//对象复制
import objCoppy from './utils/objCoppy';
//信息确定弹框
import myconfirm from './utils/myconfirm';
const app = createApp(App)

//全局挂载
app.config.globalProperties.$objCoppy = objCoppy
app.config.globalProperties.$myconfirm = myconfirm

//注册图标组件
//对于Icons对象的每个属性名
Object.keys(Icons).forEach((key) => {
    //在Vue应用程序中注册对应的组件，组件名为当前属性名
    app.component(key, Icons[key as keyof typeof Icons])
})
//引入Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia).use(router).use(Antd).mount('#app')