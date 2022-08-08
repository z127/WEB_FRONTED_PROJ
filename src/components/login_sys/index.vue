<template>
  <el-container>
    <el-aside width="790px"
      ><el-image
        fit="fill"
        :src="require('@/assets/image/login_left.png')"
      ></el-image
    ></el-aside>
    <el-main>
      <el-card class="box-card login-card">
        <span class="login-title">后台管理系统</span>
        <span class="login-tip">welcome 欢迎登录</span>
        <el-form
          ref="user"
          :model="user"
          label-width="80px"
          :rules="loginRules"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="user.userName"
              placeholder="请输入用户"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="user.password"
              type="password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
// import {login} from '@/api/user.js'
import {ElMessage} from 'element-plus'
// import {getById, getInfo} from '@/api/user.js'

export default {
  name: "login_sys",
  data() {
    return {
      // 用户信息
      user: {
        userName: "admin",
        password: "xxxxxx",
      },
      loginRules: {
    username: [
        { required: true, trigger: "blur", message: "用户名不能为空" }
    ],
        password: [
            { required: true, trigger: "blur", message: "密码不能为空" }
        ]
},
    }
  },
  methods:{
    doLogin(){
           this.$refs.user.validate((validate) => {
        if (validate) {
            // 登陆完成后立刻获取用户的信息
            // this.$store.dispatch("LOGIN", this.user).then(() => {
            //     this.$store.dispatch("GET_INFO");
            // });
            //里面的代码是异步的
            this.$store.dispatch("LOGIN",this.user).then((res)=>{
              if(res.status===200){
                console.log(res)
                 ElMessage("恭喜你,登录成功");
                      this.$store.dispatch("GET_INFO").then(()=>{
                        this.$router.push({name:'main'})
                      })
                    // //先获取一下权限信息
                    // getInfo();
                    // setTimeout(()=>{
                    //   getById(1)
                    // },2000)

                    //  this.$router.push({name:"main"});
                    //  ElMessage("恭喜你,登录成功");
              }
            });
        }else{
            ElMessage("您的数据不合法")
        }
    });
     
    }
    // doLogin(){
    //   login(this.user).then(res=>{
    //     console.log(res)
    //   })
    //  }

  }

};
</script>

<style scope>
.el-image {
  height: 885px;
  width: 750px;
}
.el-main {
  position: relative;
}
.login-card {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 480px;
  height: 400px;
  padding: 50px;
}
.login-title {
  width: 459px;
  height: 70px;
  font-size: 40px;
  font-family: AlibabaPuHuiTiB;
  color: #333333;
  line-height: 90px;
  letter-spacing: 1px;
  font-weight: 800;
  display: block;
  text-align: left;
}
.login-tip {
  width: 319px;
  height: 70px;
  font-size: 30px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 90px;
  letter-spacing: 1px;
  display: block;
  text-align: left;
  margin-bottom: 30px;
}
</style>
