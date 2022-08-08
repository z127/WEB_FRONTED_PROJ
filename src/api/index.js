import axios from 'axios'
import store from '@/store'

 // 创建axios实例
 const request = axios.create({
     // axios中请求配置有baseURL选项，表示请求URL公共部分
     baseURL: 'http://localhost:80/project_test_backend/',
     // 超时
     timeout: 10000,
     // 设置Content-Type，规定了前后端的交互使用json
     headers: {'Content-Type': 'application/json;charset=utf-8'}
 })

 export default request

 //添加请求拦截器
 request.interceptors.request.use(function(config){
    if(store.state.user.token)
    {
        config.headers['Authorization']=store.state.user.token //让每个请求携带自定义token
    }
    //在发送请求之前做些什么
    return config;
 },function(error){
    //对请求错误做些什么
    return Promise.reject(error);
 });

