import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import vuex from 'vuex';
import 'element-plus/dist/index.css'
import '@/assets/style/common.css'
import store from '@/store'
import directives from '@/directive'
let app=createApp(App);

//全局安装路由组件
app.use(router).use(ElementPlus).use(store).use(vuex)

//安装所有的自定义指令
for(let key in directives)
{
    console.log(key)
    app.directive(key,directives[key])

}


app.mount('#app')
