// 导入用来创建路由和确定路由模式的两个方法
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import store from '@/store'
import storage from '@/util/storage'

/**
 * 定义路由信息
 * 
 */
 const routes = [{
    name: 'login',
    path: '/login',
    component: () => import('@/components/login_sys'),
},
{
    name: 'main',
    path: '/main',
    component: () => import('@/components/main'),
    children:[
        {
            name:'user',
            path:'/user',
            component:()=>import("@/components/system/user"),
        },
    ]
},
]


// 创建路由实例并传递 `routes` 配置
// 我们在这里使用 html5 的路由模式，url中不带有#，部署项目的时候需要注意。
const router = createRouter({
    history: createWebHistory(),
    routes, 
    mode:'hash'
})


// 全局的路由守卫,每次进行路由切换都判断一有没有登录,如果没有登录则
router.beforeEach((to) => {
    console.log("router :  "+to)
    //1、 如果去的是登录页面，则放行
    if(to.name === 'login'){
        return true 
    }

    //2、检查是否登录，如果已经登录,则放行
    if(!store.getters.isLogin)
    {
            //去storage中查看,如果也没有就去登录页面
            if(!storage.getSessionObject("loginUser")){
                router.push({name:'login'})
            }else{
                store.dispatch("RECOVERY_USER");
                store.dispatch("GET_INFO");
            }

    }
 
    return true
})

// 讲路由实例导出
export default router