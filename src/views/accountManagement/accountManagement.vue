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
                                      <el-button type="primary" @click="addUserManagement()">添加</el-button>
                                      <el-button @click="exportUserExcel()" type="primary">导出模板</el-button>
                                      <el-upload 
                                        style="margin-left:50px"
                                        :limit=limitNum
                                        :auto-upload="false"
                                        accept=".xlsx"
                                        :action="UploadUrl()"
                                        :before-upload="beforeUploadFile"
                                        :on-change="fileChange"
                                        :on-exceed="exceedFile"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :file-list="fileList">
                                        <el-button type="success">导入</el-button>
                                        </el-upload>
                                  </el-form-item>
                              </el-col>
                          </el-row>

                      </el-form>
                  </el-col>
              </el-row>
          </div>

          <!-- 表格部分 -->
          <div class="table-bg" ref="tableContainer" style="width: 99%;">
              <el-table :data="baseInfoTableData" :border="true" 
                  ref="baseInfoTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="450">
                  <el-table-column fixed="left" label="操作" min-width="180">
                      <template #default="scope">
                          <el-button type="primary" link
                              @click="updateUserManagement(scope.row)">编辑
                          </el-button>
                          <el-button type="info" link
                              @click="updateUserPassWd(scope.row)">重置密码
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
              <el-form :model="addForm">
                  <el-form-item label="用户名称">
                      <el-input v-model="addForm.userForm.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="用户账号">
                      <el-input v-model="addForm.userForm.userAccount"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                        <el-select v-model="addForm.userForm.userSex"
                                    placeholder="请选择" style="width:90%">
                            <el-option v-for="item in userSexList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                  </el-form-item>
                  <el-form-item label="电话">
                      <el-input v-model="addForm.userForm.userPhone"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱">
                      <el-input v-model="addForm.userForm.userEmail"></el-input>
                  </el-form-item>
                  <el-form-item label="系">
                      <el-select v-model="addForm.userForm.departmentId"
                                    placeholder="请选择" style="width:90%">
                            <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                      </el-select>
                  </el-form-item>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
          <!-- 修改用户信息对话框 -->
          <el-dialog title="修改用户" v-model="dialogFormVisible">
              <el-form :model="updateForm">
                  <el-form-item label="id">
                      <el-input v-model="updateForm.userForm.id"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名称">
                      <el-input v-model="updateForm.userForm.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="用户账号">
                      <el-input v-model="updateForm.userForm.userAccount"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                        <el-select v-model="updateForm.userForm.userSex"
                                    placeholder="请选择" style="width:90%">
                            <el-option v-for="item in userSexList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                  </el-form-item>
                  <el-form-item label="电话">
                      <el-input v-model="updateForm.userForm.userPhone"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱">
                      <el-input v-model="updateForm.userForm.userEmail"></el-input>
                  </el-form-item>
                  <el-form-item label="系">
                      <el-select v-model="updateForm.userForm.departmentId"
                                    placeholder="请选择" style="width:90%">
                            <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                      </el-select>
                  </el-form-item>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateConfirm()"
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
//加载
const loading = ref<boolean>(false)
//table赋值
const baseInfoTableData = ref([]);
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
const addForm = reactive({
userForm:{
  userName:'',
  userAccount:'',
  userSex:1,
  userPhone:'',
  userEmail:'',
  departmentId:'',
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
let url: any = import.meta.env // 配置不同环境的域名信息等
const exportUserExcel = async() => {
  location.href = url.VITE_APP_BASE_API+'/userService/user/downloadUserExcel'
}
//上传excell时，同时允许上传的最大数
const limitNum = ref<number>(1);
// excel文件列表
const fileList = ref<any[]>([]);
//excel图片显示
const imgs = ref<boolean>(false);
// 文件超出个数限制时的钩子
const exceedFile = (files:any, fileList:any) => {
        ElMessage.warning(`只能选择 ${limitNum.value} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
      }
      // 文件状态改变时的钩子
      const fileChange = (files:any, fileList:any) => {
        console.log(files.raw);
        console.log(fileList);
        if (fileList.length === 0){
          ElMessage.warning('请上传文件');
        } else {
          ElMessageBox.confirm("确认上传?", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(async () => {
            let form = new FormData();
            form.append('file', files.raw);
            importWorkloadAPI(form).then(
              res=>{

              },err =>{
              });
            fileList.value = [];
          })
        }
      }
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      const beforeUploadFile = (file:any) => {
        console.log('before upload');
        console.log(file);
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        let size = file.size / 1024 / 1024;
        if(extension !== 'xlsx') {
          ElMessage.warning('只能上传后缀是.xlsx的文件');
        }
        if(size > 10) {
          ElMessage.warning('文件大小不得超过10M');
        }
      }
      // 文件上传成功时的钩子
      const handleSuccess = (res:any, files:any, fileList:any) =>{
        ElMessage.success('文件上传成功');
        console.log(fileList);
        imgs.value = true;
      }
      // 文件上传失败时的钩子
      const handleError = (err, file, fileList) => {
        ElMessage.error('文件上传失败');
      }
      const UploadUrl = () =>{
       // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
        return ""
      }
      const uploadFile = () =>{

      }
//添加用户信息
const addUserManagement = async() =>{
    dialogAddFormVisible.value = true;
    //获取系列表
    await getDepartmentList()
}
//确认添加用户信息
const addConfirm = async() =>{
    await addUserManagementById()
    dialogAddFormVisible.value = false;
    await loadUserManagementInfoList()
}
//添加用户
const addUserManagementById = async() =>{
    try{
        const res = await addUserManagementAPI({
            userName:addForm.userForm.userName,
            userPhone:addForm.userForm.userPhone,
            userEmail:addForm.userForm.userEmail,
            userAccount:addForm.userForm.userAccount,
            userSex:addForm.userForm.userSex,
            departmentId:addForm.userForm.departmentId
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
    addForm.userForm.userName = '';
    addForm.userForm.userPhone = '';
    addForm.userForm.userEmail = '';
    addForm.userForm.userAccount = '';
    addForm.userForm.userSex = 1;
    addForm.userForm.departmentId = '';
}
//修改用户信息对话框开关
const dialogFormVisible = ref<boolean>(false);
const updateForm = reactive({
userForm:{
  id:'',
  userName:'',
  userAccount:'',
  userSex:1,
  userPhone:'',
  userEmail:'',
  departmentId:'',
}
});
//编辑用户信息
const updateUserManagement = async(row:any) =>{
dialogFormVisible.value = true;
//根据id获取用户信息
await loadUserManagementById(row.id)
//获取系列表
await getDepartmentList()
}
//确认修改用户信息
const updateConfirm = async() =>{
await updateUserManagementById()
dialogFormVisible.value = false;
await loadUserManagementInfoList()
}

//修改密码
const updateUserPassWd = async(row:any) =>{
    try{
        const res = await PasswordResetAPI({
        id:row.id,
    })
        if(res.data.code == '200'){
            ElMessage({
                message: "重置密码成功，邮箱手机查看密码",
                duration: 1500,
                type: "success",
            });
        }else{
            ElMessage.error('重置失败')
        }
    }catch(e){
        console.log(e,'e');
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

//删除用户信息
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
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}

//根据id获取用户信息 getUserManagementAPI
const loadUserManagementById = async (id:string) => {
    try{
    const res = await getUserManagementByIdAPI({
        id:id,
    })
    updateForm.userForm = res.data.data;
    updateForm.userForm.userSex = res.data.data.userSex;
    updateForm.userForm.userEmail = res.data.data.userEmail;
    }catch(error){
    console.log('error');
    }
}

//修改用户信息 updateUserManagementAPI
const updateUserManagementById = async () => {
try{
  const res = await updateUserManagementAPI({
      id:updateForm.userForm.id,//用户id
      userName:updateForm.userForm.userName,//用户名称
      user_account:updateForm.userForm.userAccount,//用户账号
      userSex:updateForm.userForm.userSex,//性别
      userPhone:updateForm.userForm.userPhone,//电话
      userEmail:updateForm.userForm.userEmail,//邮箱
      departmentId:updateForm.userForm.departmentId,//用户状态
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
onMounted(() => {
loadUserManagementInfoList();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>