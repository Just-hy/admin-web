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
import moment from 'moment';
const app = createApp(App)

//全局挂载
app.config.globalProperties.$objCoppy = objCoppy
app.config.globalProperties.$myconfirm = myconfirm

//全局挂载日期格式化配置
moment.locale('zh-cn'); //设置语言为中文简体
moment.updateLocale('zh-cn', {
    weekdaysMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], // 设置星期的缩写
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY年M月D日',
        LLL: 'YYYY年M月D日Ah点mm分',
        LLLL: 'YYYY年M月D日ddddAh点mm分',
    },
});

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