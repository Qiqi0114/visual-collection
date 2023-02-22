<template>
    <div id="main">
      <el-form :model="infoForm" disabled>
                <el-form-item label="id">
                    <el-input v-model="infoForm.userForm.id"></el-input>
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
    </div>      
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, reactive } from "vue";
import { DepartmentListAPI } from "../../api/accountManagement";
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
onMounted(()=>{
getDepartmentList();
console.log(store.getters.id);
})
</script>

<style lang="scss" scoped>

#main{
position: fixed;
height: 40%; //高
width: 50%; //宽
/* top: 0px; //缩短白边距离
left: 0px; //缩短白边距离 */
}
</style>