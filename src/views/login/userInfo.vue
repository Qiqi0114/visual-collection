<template>
    <div id="main">
      <el-form title="个人信息" :model="infoForm">
                <el-form-item label="id">
                    <el-input v-model="infoForm.userForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="infoForm.userForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户账号">
                    <el-input v-model="infoForm.userForm.userAccount"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                      <el-select v-model="infoForm.userForm.userSex"
                                  placeholder="请选择" style="width:90%">
                          <el-option v-for="item in userSexList" :key="item.value" :label="item.label"
                              :value="item.value" />
                      </el-select>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="infoForm.userForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="infoForm.userForm.userEmail"></el-input>
                </el-form-item>
                <el-form-item label="系">
                    <el-select v-model="infoForm.userForm.departmentId"
                                  placeholder="请选择" style="width:90%">
                          <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                              :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button type="primary" @click="saveUserInfo()">保存</el-button>
              </el-row>
    </div>      
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, reactive } from "vue";
import { DepartmentListAPI, updateUserManagementAPI } from "../../api/accountManagement";
import store from "../../store";
const id = computed(() => store.getters.id);
const userName = computed(() => store.getters.userName);
const userAccount = computed(() => store.getters.userAccount);
const userSex = computed(() => store.getters.userSex);
const userPhone = computed(() => store.getters.userPhone);
const userEmail = computed(() => store.getters.userEmail);
const departmentId = computed(() => store.getters.departmentId);
const infoForm = reactive({
userForm:{
id:id.value,
userName:userName.value,
userAccount:userAccount.value,
userSex:userSex.value,
userPhone:userPhone.value,
userEmail:userEmail.value,
departmentId:departmentId.value,
}
});
//性别选择
const userSexList = [
      {
          value: 1,
          label: "男",
      },
      {
          value: 0,
          label: "女",
      },
]
let departmentList = reactive({departmentListCode:[] as any})
//获取系列表
const getDepartmentList = async() => {
  try{
      const res = await DepartmentListAPI()
      if(res.data.code == '200'){
          const codeValue = res.data.data;
          let departmentCode: { value: any; label: any }[] = [];
          codeValue.forEach((val:{id:string,departmentName:string}) => {
              departmentCode.push({value:val.id,label:val.departmentName})
          })
          departmentList.departmentListCode = departmentCode
      }else{
          ElMessage.error('获取失败')
      }
  }catch(e){
      console.log(e,'e');
  }
}

//保存个人信息
const saveUserInfo = async () => {
try{
  const res = await updateUserManagementAPI({
      id:infoForm.userForm.id,//用户id
      userName:infoForm.userForm.userName,//用户名称
      user_account:infoForm.userForm.userAccount,//用户账号
      userSex:infoForm.userForm.userSex,//性别
      userPhone:infoForm.userForm.userPhone,//电话
      userEmail:infoForm.userForm.userEmail,//邮箱
      departmentId:infoForm.userForm.departmentId,//用户系
  })
  if (res.data.code == "200") {
      ElMessage({
          message: res.data.msg,
          duration: 5000,
          type: "success",
      });
  } else {
      //失败
      ElMessage({
          message: res.data.msg,
          duration: 5000,
          type: "error",
      });
  }
}catch(error){
  console.log('error');
}
}
onMounted(()=>{
getDepartmentList();
})
</script>

<style lang="scss" scoped>

#main{
    position: absolute;
    margin-left: 200px;
    top: 20%;
    height: 60%;
    width: 50%; //宽
}
</style>