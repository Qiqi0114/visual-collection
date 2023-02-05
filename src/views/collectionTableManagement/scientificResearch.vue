<template>
  <div class="container-bg">
    <div class="container">
      <!-- 搜索部分 -->
      <div class="search-section">
        <el-row>
          <el-col>
            <el-form
              ref="searchFormRef"
              :model="searchForm"
              :inline="true"
              style="width: 100%"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item label="系" prop="departmentId">
                    <el-select v-model="searchForm.departmentId"
                              filterable  placeholder="请选择系" style="width:90%" clearable>
                            <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="年限" prop="yearId">
                    <el-select v-model="searchForm.yearId" filterable placeholder="请选择"  clearable>
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
                <el-col :span="8">
                  <el-form-item label="收集表类别" prop="collectionTableId">
                    <el-select v-model="searchForm.collectionTableId"
                              filterable  placeholder="请选择类别" style="width:90%" clearable>
                            <el-option v-for="item in collectionTable.collectionTableCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收集表状态" prop="staticZ">
                    <el-select v-model="searchForm.staticZ"
                              filterable  placeholder="请选择状态" style="width:90%" clearable>
                            <el-option v-for="item in staticZCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item style="float: right">
                    <el-button type="primary" @click="selectForm(searchFormRef)"
                      >查询</el-button
                    >
                    <el-button @click="resetForm()" type="info">重置</el-button>
                    <el-button @click="addCollection()" type="success">发布收集表</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>

      <!-- 表格部分 -->
      <div class="table-bg" ref="tableContainer" style="width: 99%">
        <el-table
          :data="baseInfoTableData"
          :border="true"
          ref="baseInfoTableDataRef"
          v-loading="loading"
          :header-cell-style="{ background: '#F5F6FA' }"
          :height="450"
        >
          <el-table-column fixed="left" label="操作" min-width="120">
            <template #default="scope">
              <el-button type="primary" link @click="seeUserWoking(scope.row)">查看</el-button>
              <el-button type="danger" link @click="deleteCollectionTable(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="收集表id" min-width="130" />
          <el-table-column prop="collectionTableId" label="收集表类型id" min-width="120" />
          <el-table-column prop="collectionTableName" label="收集表类型名称" min-width="120" />
          <el-table-column prop="collectionTableParentId" label="工作量" min-width="120">
            <template #default="scope">
              <span v-if="scope.row.collectionTableParentId === '1'">科研工作量</span>
              <span v-if="scope.row.collectionTableParentId === '8'">其他工作量</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentId" label="系id" min-width="120" />
          <el-table-column prop="departmentName" label="系" min-width="90" />
          <el-table-column prop="expirationTime" label="截至时间" min-width="120" />
          <el-table-column prop="numberYearId" label="年id" min-width="120" />
          <el-table-column prop="numberYearName" label="年限" min-width="120" />
          <el-table-column prop="staticZ" fixed="right" label="状态" min-width="120">
            <template #default="scope">
              <span v-if="scope.row.staticZ === '0'">未发布 <el-button type="primary" link @click="changedCollection(scope.row,'1')">发布</el-button></span>
              <span v-if="scope.row.staticZ === '1'">采集中 <el-button type="danger" link @click="changedCollection(scope.row,'2')">截至</el-button></span>
              <span v-if="scope.row.staticZ === '2'">已截至</span>
            </template>
          </el-table-column>
        </el-table>
          <!--分页器 start-->
          <div class="flex pagination-bg">
              <el-pagination v-model:currentPage="pCurrentPage" v-model:page-size="pPageSize"
                  :page-sizes="[10, 20]" :small="pSmall" :disabled="pDisabled" :background="pBackground"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
          </div>
          <!--分页器 end-->
      </div>

      <!--添加科研收集表对话框-->
      <el-dialog title="添加科研收集表" v-model="dialogAddFormVisible">
              <el-form :model="addForm">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="系">
                        <el-select v-model="addForm.departmentId"
                                      placeholder="请选择系">
                              <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                  :value="item.value" />
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="年">
                      <el-select v-model="addForm.numberYearId" filterable placeholder="请选择">
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
                  <el-col :span="12">
                  <el-form-item label="收集表类别" prop="collectionTableId">
                    <el-select v-model="addForm.collectionTableId"
                              filterable  placeholder="请选择类别" style="width:90%" clearable>
                            <el-option v-for="item in collectionTable.collectionTableCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                            <el-col :span="12">
                              <el-form-item label="截至时间">
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    format="YYYY/MM/DD HH:mm:ss"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="选择截至时间"
                                />
                            </el-form-item>
                            </el-col>
                </el-row>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addCollectionConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { reactive } from "vue";
import { onMounted, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { DepartmentListAPI } from "../../api/accountManagement";
import { changedCollectionTableAPI, deleteCollectionTableAPI, getCollectionTableListList, getTreeListCollection, saveCollectionTableAPI } from "../../api/collectionTableManagement";
import { addCollectionAPI, getYearListAPI } from "../../api/teachingwokingload";
import router from "../../router";
import store from "../../store";
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
loadCollectionTableList();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadCollectionTableList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
     id:"1",
     collectionTableId:"",
     departmentId:"",
     yearId:"",
     staticZ:"",
})
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
//收集表类别选项
let collectionTable = reactive({collectionTableCode:[] as any})
//获取系列表
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


//收集表状态选项
let staticZCode = [
  {
    value: '0',
    label: "未发布",
  },
  {
    value: '1',
    label: "采集中",
  },
  {
    value: '2',
    label: "已截至",
  }
]
// 重置查询条件
const resetForm = () => {
    //清空查询框数据
    searchForm.departmentId = "";
    searchForm.yearId = "";
    searchForm.staticZ = "";
    searchForm.collectionTableId = "";
    //分页器重置为第一页
    pCurrentPage.value = 1;
    pPageSize.value = 10;
    //重新获取数据
    loadCollectionTableList();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
     if(!formEl) return;
     formEl.validate((valid) => {
          if(valid){
            loadCollectionTableList();
          }else{
               console.log('error');
               return false;
          }
     })
}
//获取教学工作量信息表
const loadCollectionTableList = async () => {
  loading.value = true;
  try {
    const res = await getCollectionTableListList({
      id:searchForm.id, 
      collectionTableId:searchForm.collectionTableId,
      departmentId:searchForm.departmentId,
      yearId:searchForm.yearId,
      staticZ:searchForm.staticZ,
      pageNum:pCurrentPage.value,
      pageSize:pPageSize.value,
    });
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
  } catch (error) {}
  loading.value = false;
      //清空查询框数据
    searchForm.departmentId = "";
    searchForm.yearId = "";
    searchForm.staticZ = "";
    searchForm.collectionTableId = "";
    //分页器重置为第一页
    pCurrentPage.value = 1;
    pPageSize.value = 10;
};

const changedCollection = async(row:any,type:string) => {
  try{
    //过渡效果
    loading.value = true;
    const res = await changedCollectionTableAPI({
      id:row.id,
      staticZ:type
    })
    if (res.data.code == "200") {
          ElMessage({
              message: "状态更改成功",
              duration: 1500,
              type: "success",
          });
          loadCollectionTableList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  } catch(e){console.log(e,'error');}
}

//时间赋值
const value1 = ref('')

//添加收集表信息对话框开关
const dialogAddFormVisible = ref<boolean>(false);
const addForm = reactive({
  departmentId:'',
  numberYearId:'',
  expirationTime:'',
  collectionTableId:'',
});
//添加收集表
const addCollection = () => {
  dialogAddFormVisible.value = true;
}
//确认添加收集表
const addCollectionConfirm = async() => {
  addForm.expirationTime = value1.value;
  await saveCollectionTable();
  dialogAddFormVisible.value = false;
  await loadCollectionTableList();
}
const saveCollectionTable = async() => {
  try{
    //过渡效果
    loading.value = true;
    const res = await saveCollectionTableAPI({
      departmentId:addForm.departmentId,
      numberYearId:addForm.numberYearId,
      expirationTime:addForm.expirationTime,
      collectionTableId:addForm.collectionTableId,
    })
    if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadCollectionTableList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  } catch(e){console.log(e,'error');}
  addForm.departmentId = "";
  addForm.numberYearId = "";
  addForm.expirationTime = "";
  addForm.collectionTableId = "";
}
//删除收集表信息
const deleteCollectionTable = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteCollectionTableAPI({id:row.id});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadCollectionTableList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

const seeUserWoking = async (row: any) => {
        let text = {
          pageNum:pCurrentPage.value,
          pageSize:pPageSize.value,
          userName:row.userName,
          departmentId:searchForm.departmentId,
          yearId:searchForm.yearId,
        }
        router
            .push({ path: "/home/collectionTable", query: text })
            .catch((e) => console.error(e));
      }
onMounted(() => {
  // 获取教学工作量信息列表
  loadCollectionTableList();
  //获取系列表
  getDepartmentList();
  //获取年限列表
  getYearList();
  //获取收集表类别
  getTreeList();
});
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>