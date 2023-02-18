<template>
    <div class="container-bg">
      <div class="container">
          <!-- 搜索部分 -->
          <div class="search-section">
              <el-row>
                <el-col>
                      <el-form ref="searchCollectionFormRef" :model="searchCollectionForm" :inline="true" style="width:100%">
                          <el-row>
                              <el-col :span="4">
                                  <el-form-item label="姓名" prop="userName">
                                      <el-input v-model.userName="searchCollectionForm.userName" @focus="userNameSearch()" 
                                        placeholder="请输入姓名" />
                                  </el-form-item>
                              </el-col>
                              <el-col :span="8">
                                    <el-form-item label="收集表类别" prop="collectionTableId">
                                        <el-select v-model="searchCollectionForm.collectionTableId"
                                                filterable  placeholder="请选择类别" style="width:90%" clearable>
                                                <el-option v-for="item in collectionTable.collectionTableCode" :key="item.value" :label="item.label"
                                                    :value="item.value" />
                                        </el-select>
                                    </el-form-item>
                               </el-col>
                              <el-col :span="6">
                                <el-form-item label="系" prop="departmentId">
                                  <el-select v-model="searchCollectionForm.departmentId"
                                            filterable  placeholder="请选择系" style="width:90%" clearable>
                                          <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                              :value="item.value" />
                                  </el-select>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label="年限" prop="numberYearId">
                                    <el-select v-model="searchCollectionForm.numberYearId" filterable placeholder="请选择"  clearable>
                                        <el-option
                                        v-for="item in  YearList.YearListCode"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                            <el-form-item style="float: right">
                                <el-button type="primary" @click="selectForm(searchCollectionFormRef)"
                                >查询</el-button
                                >
                                <el-button @click="resetForm()" type="info">重置</el-button>
                                <el-button @click="exportCollection()" type="success">导出收集表</el-button>
                            </el-form-item>
                            </el-col>
                        </el-row>
                      </el-form>
                  </el-col>
              </el-row>
          </div>

          <!-- 表格部分 -->
          <div class="table-bg" ref="tableContainer" style="width: 99%;">
            <el-table :data="adCollectionTableData" :border="true" 
                  ref="userTableDataRef" v-loading="loadingAdCollection" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500" >
                  <el-table-column fixed="left" label="操作" min-width="80">
                    <template #default="scope">
                      <el-button  type="success" link  @click="seeSubmitUserWoking(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="收集表id" min-width="200" />
                  <el-table-column prop="collectionTableId" label="类别id" min-width="120" />
                  <el-table-column prop="collectionTableName" label="类别名称" min-width="280" :show-overflow-tooltip="true" />
                  <el-table-column prop="collectionTableParentId" label="父类别id" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="collectionTableParentName" label="父类别名称" min-width="140" />
                  <el-table-column prop="collectionTableDetailedExcel" label="数据" min-width="130" />
                  <el-table-column prop="applyFor" label="提交状态" min-width="130">
                    <template #default="scope">
                      <span v-if="scope.row.applyFor" style="color: red;">申请成功未提交</span>
                      <span v-if="!scope.row.applyFor" style="color: green;">申请成功已提交</span>
                    </template>
                  </el-table-column>
              </el-table>
          </div>
          <!--分页器 start-->
          <div class="flex pagination-bg">
              <el-pagination v-model:pCurrentPage="pCurrentPage" v-model:page-size="pPageSize"
                  :page-sizes="[10, 20]" :small="Small" :disabled="Disabled" :background="Background"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSize"
                  @current-change="handleCurrent" />
          </div>
          <!--分页器 end-->
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" v-model="dialoguserVisible">
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
                  :height="500" @select="handleSelectionChange1" >
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
                  :page-sizes="[10, 20]" :small="Small" :disabled="Disabled" :background="Background"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1" />
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
      <!--导出收集表对话框-->
      <el-dialog title="导出收集表" v-model="dialogexportFormVisible">
              <el-form :model="exportForm">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="系">
                        <el-select v-model="exportForm.metId"
                                      placeholder="请选择系">
                              <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                  :value="item.value" />
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="年">
                      <el-select v-model="exportForm.yearId" filterable placeholder="请选择">
                        <el-option
                          v-for="item in  YearList.YearListCode"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogexportFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="exportCollectionConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
      </div>
  </div>
</template>

<script lang="ts" setup>



import { ElMessage, ElTable, FormInstance } from "element-plus";
import { onMounted, reactive, ref } from "vue-demi";
import { AccountManagementAPI, DepartmentListAPI } from "../../api/accountManagement";
import { getApplyForUpdateCollectionTableAPI, getExportExcelCollectionAPI, getTreeListCollection } from "../../api/collectionTableManagement";
import { getYearListAPI } from "../../api/teachingwokingload";
import router from "../../router";
//加载
const loading = ref<boolean>(false)
//列表分页
// 总数
const pTotal = ref(0);
// 第几页
const pCurrentPage = ref<number>(1);
// 每页多少条
const pPageSize = ref<number>(10);
const Small = ref(false);
const Disabled = ref(false);
const Background = ref(false);
const handleSize = (val: number) => {
pPageSize.value = val;
loadApplyForUpdateCollectionInfoList();
};
const handleCurrent = (val: number) => {
pCurrentPage.value = val;
loadApplyForUpdateCollectionInfoList();
};
// 总数
const Total = ref(0);
// 第几页
const CurrentPage = ref<number>(1);
// 每页多少条
const PageSize = ref<number>(10);
const handleSizeChange1 = (val: number) => {
pPageSize.value = val;
loadUserManagementInfoList();
};
const handleCurrentChange1 = (val: number) => {
pCurrentPage.value = val;
loadUserManagementInfoList();
};

//获取提交收集表列表赋值
const adCollectionTableData = ref([]);
//获取提交收集表列表加载
const loadingAdCollection = ref<boolean>(false)
const searchCollectionFormRef = ref<FormInstance>()
//查询获取提交收集表列表参数
const searchCollectionForm = reactive({
    userName:"",
    departmentId:"",
    collectionTableId:"",
    yearId:"",
    numberYearId:"",
})
//用户列表加载
const loadingUser = ref<boolean>(false)
//用户table赋值
const userTableData = ref([]);
const userTableDataRef = ref<FormInstance>()
//添加用户对话框开关
const dialoguserVisible = ref<boolean>(false);
//查看用户
const userNameSearch = async() =>{
    dialoguserVisible.value = true;
    await loadUserManagementInfoList();
}

const searchUserFormRef = ref<InstanceType<typeof ElTable>>()
//查询用户列表参数
const searchUserForm = reactive({
    userName:"",
})
//表格添加用户勾选
const multipleSelection1 = ref<any>([]);
//表格单选
const handleSelectionChange1 = (selection: any,row: any) => {
    multipleSelection1.value = row;
    userTableDataRef.value!.clearSelection(); //先清空选中状态，selection值还在
    if(selection.length == 0){
        return
    }
    userTableDataRef.value!.toggleRowSelection(row, true); //用于切换某行选中状态
};
//确认添加用户组下用户
const addConfirm = async() =>{
    dialoguserVisible.value = false;
    searchCollectionForm.userName = multipleSelection1.value.userName;
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

//收集表类别选项
let collectionTable = reactive({collectionTableCode:[] as any})
//获取收集表类别列表
const getTreeList = async() => {
    try{
        const res = await getTreeListCollection()
        if(res.data.code == '200'){
            const codeValue = res.data.data;
            let departmentCode: { value: any; label: any }[] = [];
            codeValue.forEach((val:{id:string,collectionTableName:string,parentId:string}) => {
              if(val.parentId === '1'){
                departmentCode.push({value:val.id,label:val.collectionTableName})
              }
            }) 
            collectionTable.collectionTableCode = departmentCode
        }else{
            ElMessage.error('获取失败')
        }
    }catch(e){
        console.log(e,'e');
    }
}

//年选择
let YearList = reactive({YearListCode:[] as any})
//获取年限列表
const getYearList = async() => {
    try{
        const res = await getYearListAPI()
        if(res.data.code == '200'){
            const codeValue = res.data.data;
            let YearCode: { value: any; label: any }[] = [];
            codeValue.forEach((val:{id:string,numberYears:string}) => {
              YearCode.push({value:val.id,label:val.numberYears})
            }) 
            YearList.YearListCode = YearCode
        }else{
            ElMessage.error('获取失败')
        }
    }catch(e){
        console.log(e,'e');
    }
} 

//系选择
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

// 重置查询条件
const resetForm = () => {
    //清空查询框数据
    searchCollectionForm.departmentId = "";
    searchCollectionForm.userName = "";
    searchCollectionForm.collectionTableId = "";
    searchCollectionForm.numberYearId = "";
    multipleSelection1.value = "";
    //分页器重置为第一页
    pCurrentPage.value = 1;
    pPageSize.value = 10;
    //重新获取数据
    loadApplyForUpdateCollectionInfoList();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
     if(!formEl) return;
     formEl.validate((valid) => {
          if(valid){
            loadApplyForUpdateCollectionInfoList();
          }else{
               console.log('error');
               return false;
          }
     })
}
//导出收集表信息对话框开关
const dialogexportFormVisible = ref<boolean>(false);
const exportForm = reactive({
  yearId:'',
  metId:'',
});
//导出收集表
const exportCollection = () => {
  dialogexportFormVisible.value = true;
}
//确认导出收集表
const exportCollectionConfirm = async() => {
  await exportCollectionTable();
  dialogexportFormVisible.value = false;
  await loadApplyForUpdateCollectionInfoList();
}




let url: any = import.meta.env // 配置不同环境的域名信息等
const exportCollectionTable = async() => {
  //过渡效果
  loadingAdCollection.value = true;
  location.href = url.VITE_APP_BASE_API+'/collectionTableService/collectionTable/export_excel_collection?'+'tableId=1&yearId='+exportForm.yearId+'&metId='+exportForm.metId
  loadApplyForUpdateCollectionInfoList();
  loadingAdCollection.value = false;
  exportForm.yearId = "";
  exportForm.metId = "";
}


//管理员获取收集表用户提交列表
const loadApplyForUpdateCollectionInfoList = async () => {
loadingAdCollection.value = true;
try{
    const res = await getApplyForUpdateCollectionTableAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         userId:multipleSelection1.value.id,
         departmentId:searchCollectionForm.departmentId,
         numberYearId:searchCollectionForm.numberYearId,
         collectionTableParentId:'1',
         collectionTableId:searchCollectionForm.collectionTableId,
    })
    adCollectionTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loadingAdCollection.value = false;
}
//管理员获取收集表用户提交列表
const loadRESROUTERApplyForUpdateCollectionInfoList = async () => {
loadingAdCollection.value = true;
try{
  const res = await getApplyForUpdateCollectionTableAPI({
            pageNum:pCurrentPage.value,
            pageSize:pPageSize.value,
            userId:'',
            departmentId:RESROUTER.departmentId,
            numberYearId:RESROUTER.numberYearId,
            collectionTableParentId:RESROUTER.collectionTableParentId,
            collectionTableId:RESROUTER.collectionTableId,
        })
        adCollectionTableData.value = res.data.data.records;
        pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loadingAdCollection.value = false;
}

//跳转查看提交表单
const seeSubmitUserWoking = async (row: any) => {
          let text = {
            id:row.id,
            collectionTableParentId:row.collectionTableParentId,  
            collectionTableId:row.collectionTableId,
            collectionTableName:row.collectionTableName,
            collectionTableDetailedExcel:row.collectionTableDetailedExcel,
            excelB:row.collectionTableDetailedExcel.excelB,
            excelC:row.collectionTableDetailedExcel.excelC,
            excelD:row.collectionTableDetailedExcel.excelD,
            excelE:row.collectionTableDetailedExcel.excelE,
            excelF:row.collectionTableDetailedExcel.excelF,
            excelG:row.collectionTableDetailedExcel.excelG,
            excelH:row.collectionTableDetailedExcel.excelH,
            excelI:row.collectionTableDetailedExcel.excelI,
            excelJ:row.collectionTableDetailedExcel.excelJ,
            excelK:row.collectionTableDetailedExcel.excelK,
            excelL:row.collectionTableDetailedExcel.excelL,
            excelM:row.collectionTableDetailedExcel.excelM,
            excelN:row.collectionTableDetailedExcel.excelN,
            integralDisplay:'true',
            disabled:'0',
            applyFor:'true',
          }
          router
              .push({ path: "/home/CollectionTable", query: text })
              .catch((e) => console.error(e));
        }
//路由参数
const RESROUTER = router.currentRoute.value.query as any;

onMounted(() => {
  //判断是否是工作量跳转收集表列表页面
  if(RESROUTER.collectionTableId !== undefined){
        // 获取工作量查看条件参数跳转调用教学工作量信息列表
        loadRESROUTERApplyForUpdateCollectionInfoList()
        //获取年限列表
        getYearList();
        //获取系列表
        getDepartmentList();
        //获取收集表类别
        getTreeList();
        //获取用户列表
        loadUserManagementInfoList();
    }else{
        // 获取教学工作量信息列表
        loadApplyForUpdateCollectionInfoList();
        //获取年限列表
        getYearList();
        //获取系列表
        getDepartmentList();
        //获取收集表类别
        getTreeList();
        //获取用户列表
        loadUserManagementInfoList();
    }
});
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>