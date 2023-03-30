import { createApp } from 'vue'
import Antd from 'ant-design-vue'
//import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
//引入图标
import *  as Icons from '@ant-design/icons-vue'
//引入路由
import router from './router'
const app = createApp(App)
//注册图标组件
//对于Icons对象的每个属性名
Object.keys(Icons).forEach((key) => {
    //在Vue应用程序中注册对应的组件，组件名为当前属性名
    app.component(key, Icons[key as keyof typeof Icons])
})
app.use(router).use(Antd).mount('#app')