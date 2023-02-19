<template>
    <div class="container-bg">
      <div class="container">
          <!-- 搜索部分 -->
          <div class="search-section">
              <el-row>
                <el-col :span="24">
                    <el-form-item style="float: left;">
                        <el-button type="primary" @click="addAddDepartment()">添加系</el-button>
                    </el-form-item>
                </el-col>
              </el-row>
          </div>

          <!-- 表格部分 -->
          <div class="table-bg" ref="tableContainer" style="width: 99%;">
              <el-table :data="DepartmentTableData" :border="true" 
                  ref="userDepartmentTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500">
                  <el-table-column fixed="left" label="操作" min-width="180">
                      <template #default="scope">
                          <el-button type="primary" link
                              @click="adduserDepartmentManagement(scope.row)">操作系下的用户
                          </el-button>
                          <el-button type="danger" link @click="deleteDepartmentManagement(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="系id" min-width="200" />
                  <el-table-column prop="departmentName" label="系名称" min-width="120" />
              </el-table>
          </div>
          <!--分页器 start-->
          <div class="flex pagination-bg">
              <el-pagination v-model:currentPage="CurrentPage" v-model:page-size="PageSize"
                  :page-sizes="[10, 20]" :small="Small" :disabled="Disabled" :background="Background"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSize"
                  @current-change="handleCurrent" />
          </div>
          <!--分页器 end-->
          <!-- 添加系对话框 -->
            <el-dialog title="添加系" v-model="dialogAddDepartmentFormVisible">
              <el-form :model="addDepartmentForm">
                  <el-form-item label="系名称">
                      <el-input v-model="addDepartmentForm.departmentName"></el-input>
                  </el-form-item>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogAddDepartmentFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addDepartmentConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
          <!-- 系下用户对话框 -->
          <el-dialog title="系下用户" v-model="dialogAdduserDepartmentVisible">
              <el-button type="primary" @click="adduserManagement()">添加用户</el-button>
              <el-button type="danger" @click="deleteUserDepartmentManagement()">删除用户</el-button>
              <el-table :data="userDepartmentTableData" :border="true" 
                  ref="userTableDataRef" v-loading="loadingUserDepartment" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500" @selection-change="handleSelectionChange" >
                  <el-table-column type="selection" fixed="left" width="55" />
                  <el-table-column prop="id" v-if="false" label="用户id" min-width="200" />
                  <el-table-column prop="userName" label="用户全称" min-width="120" />
                  <el-table-column prop="userAccount" label="用户账号" min-width="120" :show-overflow-tooltip="true" />
                  <el-table-column prop="passWord" label="密码" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="departmentId" label="系" min-width="140" />
                  <el-table-column prop="userPhone" label="手机号" min-width="130" />
                  <el-table-column prop="userEmail" label="用户邮箱" min-width="180" />
                  <el-table-column prop="userSex" label="性别" min-width="130">
                    <template #default="scope">
                        <span v-if="scope.row.userSex === 1">女</span>
                        <span v-if="scope.row.userSex === 0">男</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="roleId" label="角色" min-width="100"/>
              </el-table>
          </el-dialog> 
          <!-- 系添加用户对话框 -->
          <el-dialog title="系添加角用户" v-model="dialoguserVisible">
            <el-row>
                  <el-col>
                      <el-form ref="searchUserFormRef" :model="searchUserForm" :inline="true" style="width:100%">
                          <el-row>
                              <el-col :span="12">
                                  <el-form-item label="姓名" prop="userName">
                                      <el-input v-model.userName="searchUserForm.userName"
                                      @input = "loadUserManagementInfoList()"  
                                      clearable  placeholder="请输入姓名" />
                                  </el-form-item>
                              </el-col>
                          </el-row>
                      </el-form>
                  </el-col>
              </el-row>
              <el-table :data="userTableData" :border="true" 
                  ref="userTableDataRef" v-loading="loadingUser" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500" @selection-change="handleSelectionChange1" >
                  <el-table-column type="selection" width="55" />
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
                  <el-button @click="dialoguserVisible = false">取 消</el-button>
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
import { AccountManagementAPI } from "../../api/accountManagement";
import { addDepartmentAPI, addUserDepartmentAPI, delDepartmentAPI, getDepartmentListAPI, getDepartmentUserListAPI } from "../../api/departManagement";
//系列表加载
const loading = ref<boolean>(false)
//系下用户列表加载
const loadingUserDepartment = ref<boolean>(false)
//用户列表加载
const loadingUser = ref<boolean>(false)
//系table赋值
const DepartmentTableData = ref([]);
//系下用户table赋值
const userDepartmentTableData = ref([]);
//用户table赋值
const userTableData = ref([]);
//表格删除勾选
const multipleSelection = ref([]);
const handleSelectionChange = (val: any) => {
    multipleSelection.value = val;
};
//表格添加用户勾选
const multipleSelection1 = ref([]);
const handleSelectionChange1 = (val: any) => {
    multipleSelection1.value = val;
    console.log(multipleSelection1.value);
};
//系列表分页
// 总数
const Total = ref(0);
// 第几页
const CurrentPage = ref<number>(1);
// 每页多少条
const PageSize = ref<number>(10);
const Small = ref(false);
const Disabled = ref(false);
const Background = ref(false);
const handleSize = (val: number) => {
PageSize.value = val;
loadDepartmentListPage();
};
const handleCurrent = (val: number) => {
CurrentPage.value = val;
loadDepartmentListPage();
};
const searchFormRef = ref<FormInstance>()
//查询系列表参数
const searchForm = reactive({
    departmentName:"",
})
const searchUserFormRef = ref<FormInstance>()
//查询用户列表参数
const searchUserForm = reactive({
    userName:"",
})

//用户列表分页
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

//添加系对话框开关
const dialogAddDepartmentFormVisible = ref<boolean>(false);
//系下用户对话框开关
const dialogAdduserDepartmentVisible = ref<boolean>(false);
//添加系下用户对话框开关
const dialoguserVisible = ref<boolean>(false);

//添加系表单绑定
const addDepartmentForm = reactive({
    departmentName:"",
})
//添加系
const addAddDepartment = async() =>{
    dialogAddDepartmentFormVisible.value = true;
}
//确认添加系
const addDepartmentConfirm = async() =>{
    await addDepartment()
    dialogAddDepartmentFormVisible.value = false;
    await loadDepartmentListPage()
}

//系id
const DepartmentId = ref<string>('');
//查看系下用户
const adduserDepartmentManagement = async(row:any) =>{
    dialogAdduserDepartmentVisible.value = true;
    DepartmentId.value = row.id;
    await loadDepartmentByList();
}
//查看用户
const adduserManagement = async() =>{
    dialoguserVisible.value = true;
    await loadUserManagementInfoList();
}

//用户id集合
const userDepartmentId = ref<string[]>([]);
//删除用户id集合
const deluserDepartmentId = ref<string[]>([]);
//确认添加系下用户
const addConfirm = async() =>{
    await addUserDepartment()
    dialoguserVisible.value = false;
    await loadDepartmentByList()
}

//添加系
const addDepartment = async () => {
loading.value = true;
try{
    const res = await addDepartmentAPI({
        departmentName:addDepartmentForm.departmentName,
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
loading.value = false;
}
//添加用户
const addUserDepartment = async() =>{
    try{
        for (let i = 0; i < multipleSelection1.value.length; i++) {
            userDepartmentId.value.push(multipleSelection1.value[i].id)
        }
        const res = await addUserDepartmentAPI({
            departmentId:DepartmentId.value,
            userIdList:userDepartmentId.value,
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
    userDepartmentId.value = [];
}

//删除系
const deleteDepartmentManagement = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await delDepartmentAPI({id:row.id});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadDepartmentListPage();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

//删除系下用户
const deleteUserDepartmentManagement = async() => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loadingUserDepartment.value = true;
      for (let i = 0; i < multipleSelection.value.length; i++) {
        deluserDepartmentId.value.push(multipleSelection.value[i].id)
        }
      const res = await addUserDepartmentAPI({departmentId:'',userIdList:deluserDepartmentId.value});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadDepartmentByList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loadingUserDepartment.value = false;
  })
  .catch(() => {console.log('error');});
  deluserDepartmentId.value = [];
}

//获取系列表
const loadDepartmentListPage = async () => {
loading.value = true;
try{
    const res = await getDepartmentListAPI()
    DepartmentTableData.value = res.data.data;
}catch(error){
    console.log('error');
}
loading.value = false;
}

//获取系下用户列表
const loadDepartmentByList = async () => {
loadingUserDepartment.value = true;
try{
    const res = await getDepartmentUserListAPI({
        id:DepartmentId.value,
    })
    userDepartmentTableData.value = res.data.data;
}catch(error){
    console.log('error');
}
loadingUserDepartment.value = false;
}

//获取用户列表
const loadUserManagementInfoList = async () => {
loadingUser.value = true;
try{
    const res = await AccountManagementAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         userName:searchUserForm.userName,
    })
    userTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loadingUser.value = false;
}

onMounted(() => {
    loadDepartmentListPage();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>