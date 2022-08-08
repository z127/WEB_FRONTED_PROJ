import {login,logout,getInfo} from '@/api/user.js'
import storage from '@/util/storage.js'

const user = {
    state: {
        username:'',
        nickname:'',
        token:'',
        roles:[],
        permissions:[],
    },
    getters:{  
        isLogin(state){
            return state.username !== '' && state.token !== '';
        },
        psermissions(state){
            return state.permissions;
        },
        roles(state)
        {
            return state.roles;
        }
    },
    mutations: {
        SAVE_USERNAME(state,username){
            state.username=username;
        },
        SAVE_NICKNAME(state,nickname){
            state.nickname=nickname;
        },
        SAVE_TOKEN(state,token){
            state.token=token;
        },
        SAVE_ROLES(state,roles){
            state.roles=roles;
        },
        SAVE_PERMISSIONS(state,permissions){
            state.permissions=permissions;
        },
    },
    actions: {
        LOGIN({commit},user){
            return new Promise(function(resolve){
                login(user).then(rest=>{
                    //需要将获取的数据保存起来
                //commit是代表调用SAVE_USERNAME的方法
                commit("SAVE_USERNAME",rest.data.user.userName);
                commit("SAVE_NICKNAME",rest.data.user.nickName);
                commit("SAVE_TOKEN",rest.data.token);
                storage.saveSessionObject("loginUser",rest.data)
                resolve(rest);
            })
            })
        },
        GET_INFO({commit}){
                return new Promise(function(resolve){
                    getInfo().then(res=>{
                        console.log(res);
                        commit("SAVE_ROLES",res.data.roles);
                        commit("SAVE_PERMISSIONS",res.data.perms)
                        resolve();
                    })
                })
           
        },
        LOGOUT({commit}){
            return new Promise(function(resolve){
                logout().then(rest=>{
                    //需要将获取的数据保存起来
                //commit是代表调用SAVE_USERNAME的方法
                commit("SAVE_USERNAME","");
                commit("SAVE_NICKNAME","");
                commit("SAVE_TOKEN","");
                storage.saveSessionObject("loginUser","")
                resolve(rest);
            })
            })
        },
        RECOVERY_USER({commit}){
                //从storage中获取数据
              let loginUser= storage.getSessionObject("loginUser");
              if(loginUser){
                commit("SAVE_USERNAME",loginUser.user.userName);
                commit("SAVE_NICKNAME",loginUser.user.nickName);
                commit("SAVE_TOKEN",loginUser.token);

              }

        }
        
    }

}

export default user