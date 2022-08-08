<template>
<div>
 <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item label="用户名:">
      <el-input v-model="queryParam.userName" placeholder="用户名" />
    </el-form-item>
    <el-form-item label="昵称:">
      <el-input v-model="queryParam.nickName" placeholder="昵称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>



  <div class="flex">
    <el-button type="primary" :icon="Plus" v-hasRole="['admin']" @click="create" />
    <el-button type="primary" :icon="Edit" />
    <el-button type="primary" :icon="Delete" />
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary">
      Upload<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
  </div>


  <el-dialog
    v-model="dialogVisible"
     :title="title"
    width="30%"
    :before-close="handleClose"
  >
   <el-form  ref="userFormRef" :model="userForm"  label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="userForm.userName" />
    </el-form-item>
     <el-form-item label="昵称">
      <el-input v-model="userForm.nickName" />
    </el-form-item>
     <el-form-item label="密码" v-if="userForm.userId === null" >
      <el-input v-model="userForm.password" />
    </el-form-item>
       <el-form-item label="确认密码" v-if="userForm.userId === null" >
      <el-input v-model="userForm.confirmPassword" />
    </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"  >提交</el-button
        >
      </span>
    </template>
  </el-dialog>


  <el-table ref="tableRef" row-key="userName" :data="tableData" style="width: 100%">
    <el-table-column prop="userName" label="用户名" width="180" />
    <el-table-column prop="nickName" label="昵称" width="180" />
    <el-table-column prop="email" label="邮箱" />
       <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  
  <el-pagination background layout="prev, pager, next" @current-change="changePage"  :total="total" :page-size="queryParam.size"></el-pagination>
  </div>
</template>

<script  setup>
import {ref} from 'vue'
import {listUser,add,getById,put,deleteUser} from '@/api/user'
import { onMounted } from 'vue-demi'
import { Delete, Edit, Search,  Upload,Plus } from '@element-plus/icons-vue'
import { ElMessageBox,ElMessage } from 'element-plus'

const dialogVisible = ref(false)


const handleEdit = (index , row) => {
  getById(row.userId).then(res=>{
      userForm.value=res.data
      title.value="修改用户";
      //打开修改窗口
      dialogVisible.value=true
  })
 
}
const handleDelete =function(index, row) {


  ElMessageBox.alert('确定要删除该消息', '消息提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确定',
    callback: () => {
  deleteUser(row.userId).then(res=>{
    if(res.status === 200){
      //更新列表
      getList();
       ElMessage({
        type: 'info',
        message:'删除成功',
      })
    }
  })
     
    },
  })





}

let title=ref("新增用户")

const userForm=ref({
userId:null,
userName:'',
nickName:'',
password:'',
confirmPassword:''
})

const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const queryParam=ref({
size:2,
page:0,
userName:'',
nickName:''
});

const onSubmit=function(){
  getList();
}

const tableData = ref([])
const total=ref(0)
const submitForm=function(){
// 1.对比确认密码和密码

// 2.检验表单


// 3.提交ajax请求


//判断当前的userid是不是null,如果是null就新增，反之就修改
if(userForm.value.userId === null)
{
   delete userForm.value.confirmPassword
   //提交ajax请求
    add(userForm.value).then(res=>{
      console.log(res)
      dialogVisible.value=false;
      //更新列表
          getList()
    })

}else{

put(userForm.value).then(res=>{
      console.log(res)
      if(res.status === 200 )
      {
      dialogVisible.value=false;
      ElMessage({
        type: 'info',
        message:'修改成功',
      })
      }
      //更新列表
      getList()
    })

}




 

}

const getList=function(){
  listUser(queryParam.value).then( res=>{
        tableData.value=res.data.content
        total.value=res.data.totalElements;
        queryParam.value.size=res.data.size;
        })

}
onMounted(()=>{
    getList()
  }
)

const changePage= async function(current){
  queryParam.value.page= current-1
  getList();    
}

let create=function(){
  //清理数据
  userForm.value={
userId:null,
userName:'',
nickName:'',
password:'',
confirmPassword:''
}
title.value="新增用户"
dialogVisible.value=true
}

</script>




<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>