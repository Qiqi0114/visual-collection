<template>
    <div class="container-bg">
      <div class="container">
          <!-- 搜索部分 -->
          <div class="search-section">
              <el-row>
                  <el-col>
                      <el-form ref="searchFormRef" :model="searchForm" :inline="true" style="width:100%">
                          <el-row>
                              <el-col :span="6">
                                  <el-form-item label="姓名" prop="userName">
                                      <el-input v-model.userName="searchForm.userName"
                                      @input = "loadUserManagementInfoList()"  
                                      clearable  placeholder="请输入姓名" />
                                  </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                  <el-form-item style="float: right;">
                                      <!-- <el-button type="success" @click="selectForm(searchFormRef)">查询</el-button>
                                      <el-button @click="resetForm()" type="info">重置</el-button> -->
                                      <el-button type="primary" @click="addUserManagement()">添加用户组</el-button>
                                  </el-form-item>
                              </el-col>
                          </el-row>

                      </el-form>
                  </el-col>
              </el-row>
          </div>

          <!-- 表格部分 -->
          <div class="table-bg" ref="tableContainer" style="width: 99%;">
              <el-table :data="userGroupTableData" :border="true" 
                  ref="userGroupTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500">
                  <el-table-column fixed="left" label="操作" min-width="180">
                      <template #default="scope">
                          <el-button type="primary" link
                              @click="updateUserManagement(scope.row)">修改用户组下的用户
                          </el-button>
                          <el-button type="danger" link @click="deleteUserManagement(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" v-if="false" label="用户id" min-width="200" />
                  <el-table-column prop="userName" label="用户全称" min-width="120" />
                  <el-table-column prop="userAccount" label="用户账号" min-width="120" :show-overflow-tooltip="true" />
                  <el-table-column prop="passWord" label="密码" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="departmentName" label="系" min-width="140" />
                  <el-table-column prop="userPhone" label="手机号" min-width="130" />
                  <el-table-column prop="userEmail" label="用户邮箱" min-width="180" />
                  <el-table-column prop="userSex" label="性别" min-width="130">
                    <template #default="scope">
                        <span v-if="scope.row.userSex === 1">女</span>
                        <span v-if="scope.row.userSex === 0">男</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="roleName" label="角色" min-width="100"/>
              </el-table>
          </div>
          <!--分页器 start-->
          <div class="flex pagination-bg">
              <el-pagination v-model:currentPage="pCurrentPage" v-model:page-size="pPageSize"
                  :page-sizes="[10, 20]" :small="pSmall" :disabled="pDisabled" :background="pBackground"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
          </div>
          <!--分页器 end-->
          <!-- 添加用户信息对话框 -->
          <el-dialog title="添加用户" v-model="dialogAddFormVisible">
              <el-table :data="userTableData" :border="true" 
                  ref="userTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500">
                  <el-table-column prop="id" v-if="false" label="用户id" min-width="200" />
                  <el-table-column prop="userName" label="用户全称" min-width="120" />
                  <el-table-column prop="userAccount" label="用户账号" min-width="120" :show-overflow-tooltip="true" />
                  <el-table-column prop="passWord" label="密码" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="departmentName" label="系" min-width="140" />
                  <el-table-column prop="userPhone" label="手机号" min-width="130" />
                  <el-table-column prop="userEmail" label="用户邮箱" min-width="180" />
                  <el-table-column prop="userSex" label="性别" min-width="130">
                    <template #default="scope">
                        <span v-if="scope.row.userSex === 1">女</span>
                        <span v-if="scope.row.userSex === 0">男</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="roleName" label="角色" min-width="100"/>
              </el-table>
          <!--分页器 start-->
              <el-pagination v-model:currentPage="pCurrentPage" v-model:page-size="pPageSize"
                  :page-sizes="[10, 20]" :small="pSmall" :disabled="pDisabled" :background="pBackground"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
          <!--分页器 end-->
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog> 

      </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { onMounted, ref } from "vue";
import { AccountManagementAPI, addUserManagementAPI, deleteUserManagementAPI, DepartmentListAPI, getUserManagementByIdAPI, PasswordResetAPI, updateUserManagementAPI } from "../../api/accountManagement";
import { addUserGroupAPI } from "../../api/groupManagement";
//加载
const loading = ref<boolean>(false)
//用户组table赋值
const userGroupTableData = ref([]);
//用户table赋值
const userTableData = ref([]);
// 总数
const pTotal = ref(0);
// 第几页
const pCurrentPage = ref<number>(1);
// 每页多少条
const pPageSize = ref<number>(10);
const pSmall = ref(false);
const pDisabled = ref(false);
const pBackground = ref(false);
const handleSizeChange = (val: number) => {
pPageSize.value = val;
loadUserManagementInfoList();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadUserManagementInfoList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
userName:"",
})
/* // 重置查询条件
const resetForm = () => {
//清空查询框数据
searchForm.userName = "";
//分页器重置为第一页
pCurrentPage.value = 1;
pPageSize.value = 10;
//重新获取数据
loadUserManagementInfoList();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
if(!formEl) return;
formEl.validate((valid) => {
    if(valid){
         loadUserManagementInfoList();
    }else{
         console.log('error');
         return false;
    }
})
} */
//添加用户信息对话框开关
const dialogAddFormVisible = ref<boolean>(false);

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

//修改用户组下用户
const addUserManagement = async() =>{
    dialogAddFormVisible.value = true;
}
//确认修改用户组下用户
const addConfirm = async() =>{
    await addUserGroup()
    dialogAddFormVisible.value = false;
    await loadUserManagementInfoList()
}
//添加用户
const addUserGroup = async() =>{
    try{
        const res = await addUserGroupAPI({
            id:'',
            userId:[],
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

//删除用户组
const deleteUserManagement = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteUserManagementAPI({id:row.id});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadUserManagementInfoList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

//获取列表
const loadUserManagementInfoList = async () => {
loading.value = true;
try{
    const res = await AccountManagementAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         userName:searchForm.userName,
    })
    console.log(res.data.data.records);
    userTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}


onMounted(() => {
loadUserManagementInfoList();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>