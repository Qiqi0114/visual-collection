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
                                      <el-input v-model.userName="searchForm.groupName"
                                      @input = "loadGroupListPage()"  
                                      clearable  placeholder="请输入姓名" />
                                  </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                  <el-form-item style="float: right;">
                                      <el-button type="primary" @click="addAddGroup()">添加用户组</el-button>
                                  </el-form-item>
                              </el-col>
                          </el-row>

                      </el-form>
                  </el-col>
              </el-row>
          </div>

          <!-- 表格部分 -->
          <div class="table-bg" ref="tableContainer" style="width: 99%;">
              <el-table :data="GroupTableData" :border="true" 
                  ref="userGroupTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500">
                  <el-table-column fixed="left" label="操作" min-width="180">
                      <template #default="scope">
                          <el-button type="primary" link
                              @click="adduserGroupManagement(scope.row)">操作用户组下的用户
                          </el-button>
                          <el-button type="danger" link @click="deleteGroupManagement(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="用户组id" min-width="200" />
                  <el-table-column prop="groupName" label="用户组名称" min-width="120" />
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
          <!-- 添加用户组对话框 -->
            <el-dialog title="添加用户组" v-model="dialogAddGroupFormVisible">
              <el-form :model="addGroupForm">
                  <el-form-item label="用户组名称">
                      <el-input v-model="addGroupForm.groupName"></el-input>
                  </el-form-item>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogAddGroupFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addGroupConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
          <!-- 用户组下用户对话框 -->
          <el-dialog title="用户组下用户" v-model="dialogAdduserGroupVisible">
              <el-button type="primary" @click="adduserManagement()">添加用户</el-button>
              <el-button type="danger" @click="deleteUserGroupManagement()">删除用户</el-button>
              <el-table :data="userGroupTableData" :border="true" 
                  ref="userTableDataRef" v-loading="loadingUserGroup" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500" @selection-change="handleSelectionChange" >
                  <el-table-column type="selection" width="55" />
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
          <!-- 用户组添加用户对话框 -->
          <el-dialog title="用户组添加角用户" v-model="dialoguserVisible">
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
import { string } from "prop-types";
import { onMounted, ref } from "vue";
import { AccountManagementAPI} from "../../api/accountManagement";
import { addGroupAPI, addUserGroupAPI, deleteGroupAPI, deleteUserGroupAPI, getGroupByListAPI, getGroupListPageAPI } from "../../api/groupManagement";
//用户组列表加载
const loading = ref<boolean>(false)
//用户组下用户列表加载
const loadingUserGroup = ref<boolean>(false)
//用户列表加载
const loadingUser = ref<boolean>(false)
//用户组table赋值
const GroupTableData = ref([]);
//用户组下用户table赋值
const userGroupTableData = ref([]);
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
//用户组列表分页
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
loadGroupListPage();
};
const handleCurrent = (val: number) => {
CurrentPage.value = val;
loadGroupListPage();
};
const searchFormRef = ref<FormInstance>()
//查询用户组列表参数
const searchForm = reactive({
    groupName:"",
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

//添加用户组对话框开关
const dialogAddGroupFormVisible = ref<boolean>(false);
//用户组下用户对话框开关
const dialogAdduserGroupVisible = ref<boolean>(false);
//添加用户组下用户对话框开关
const dialoguserVisible = ref<boolean>(false);

//添加用户组表单绑定
const addGroupForm = reactive({
    groupName:"",
})
//添加用户组
const addAddGroup = async() =>{
    dialogAddGroupFormVisible.value = true;
}
//确认添加用户组
const addGroupConfirm = async() =>{
    await addGroup()
    dialogAddGroupFormVisible.value = false;
    await loadGroupListPage()
}

//用户组id
const groupId = ref<string>('');
//查看用户组下用户
const adduserGroupManagement = async(row:any) =>{
    dialogAdduserGroupVisible.value = true;
    groupId.value = row.id;
    await loadGroupByList();
}
//查看用户
const adduserManagement = async() =>{
    dialoguserVisible.value = true;
    await loadUserManagementInfoList();
}

//用户id集合
const userGroupId = ref<string[]>([]);
//删除用户id集合
const deluserGroupId = ref<string[]>([]);
//确认添加用户组下用户
const addConfirm = async() =>{
    await addUserGroup()
    dialoguserVisible.value = false;
    await loadGroupByList()
}

//添加用户组
const addGroup = async () => {
loading.value = true;
try{
    const res = await addGroupAPI({
         groupName:addGroupForm.groupName,
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
const addUserGroup = async() =>{
    try{
        for (let i = 0; i < multipleSelection1.value.length; i++) {
            userGroupId.value.push(multipleSelection1.value[i].id)
        }
        const res = await addUserGroupAPI({
            id:groupId.value,
            userId:userGroupId.value,
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
    userGroupId.value = [];
}

//删除用户组
const deleteGroupManagement = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteGroupAPI({id:row.id});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadGroupListPage();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

//删除用户组下用户
const deleteUserGroupManagement = async() => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loadingUserGroup.value = true;
      for (let i = 0; i < multipleSelection.value.length; i++) {
        deluserGroupId.value.push(multipleSelection.value[i].id)
        }
      const res = await deleteUserGroupAPI({id:groupId.value,userId:deluserGroupId.value});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadGroupByList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loadingUserGroup.value = false;
  })
  .catch(() => {console.log('error');});
  deluserGroupId.value = [];
}

//获取用户组列表
const loadGroupListPage = async () => {
loading.value = true;
try{
    const res = await getGroupListPageAPI({
         pageNum:CurrentPage.value,
         pageSize:PageSize.value,
         groupName:searchForm.groupName,
    })
    GroupTableData.value = res.data.data.records;
    Total.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}

//获取用户组下用户列表
const loadGroupByList = async () => {
loadingUserGroup.value = true;
try{
    const res = await getGroupByListAPI({
        id:groupId.value,
    })
    userGroupTableData.value = res.data.data;
}catch(error){
    console.log('error');
}
loadingUserGroup.value = false;
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
    loadGroupListPage();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>