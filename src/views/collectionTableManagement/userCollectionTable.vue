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
                  <el-col :span="4">
                    <el-form-item label="年限" prop="numberYearId">
                      <el-select v-model="searchForm.numberYearId" filterable placeholder="请选择"  clearable>
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
                  <el-col :span="6">
                    <el-form-item label="收集表状态" prop="staticZ">
                      <el-select v-model="searchForm.staticZ"
                                filterable  placeholder="请选择状态" style="width:90%" clearable>
                              <el-option v-for="item in staticZCode" :key="item.value" :label="item.label"
                                  :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item style="float: right">
                      <el-button type="primary" @click="selectForm(searchFormRef)"
                        >查询</el-button
                      >
                      <el-button @click="resetForm()" type="info">重置</el-button>
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
                <el-button type="success" link :disabled="scope.row.staticZ === '0' || scope.row.staticZ ==='2'" @click="submitUserWoking(scope.row)">提交</el-button>
                <el-button type="primary" link :disabled="scope.row.staticZ ==='0'" @click="seeUserWoking(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="收集表id" min-width="130" :show-overflow-tooltip="true"/>
            <el-table-column prop="collectionTableId" label="收集表类型id" min-width="120" />
            <el-table-column prop="collectionTableName" label="收集表类型名称" min-width="280" />
            <el-table-column prop="collectionTableParentId" label="工作量" min-width="120">
              <template #default="scope">
                <span v-if="scope.row.collectionTableParentId === '1'">科研工作量</span>
                <span v-if="scope.row.collectionTableParentId === '8'">其他工作量</span>
              </template>
            </el-table-column>
            <el-table-column prop="departmentId" label="系id" min-width="120" />
            <el-table-column prop="departmentName" label="系" min-width="200" />
            <el-table-column prop="expirationTime" label="截至时间" min-width="200" />
            <el-table-column prop="numberYearId" label="年id" min-width="120" />
            <el-table-column prop="numberYearName" label="年限" min-width="120" />
            <el-table-column prop="staticZ" fixed="right" label="状态" min-width="120">
              <template #default="scope">
                <span v-if="scope.row.staticZ === '0'">未发布</span>
                <span v-if="scope.row.staticZ === '1'">采集中</span>
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
                  <!-- 查看已提交收集表列表 -->
            <el-dialog title="已提交收集表列表" v-model="dialogSubmitVisible">
              <el-table :data="userSubmitTableData" :border="true" 
                  ref="userTableDataRef" v-loading="loadingUserGroup" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="400">
                  <el-table-column fixed="left" label="操作" min-width="80">
                    <template #default="scope">
                      <el-button v-if="!scope.row.applyFor" type="primary" link  @click="seeSubmitUserWoking(scope.row)">查看</el-button>
                      <el-button v-if="scope.row.applyFor" type="success" link  @click="seeSubmitUserWoking(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="收集表id" min-width="200" />
                  <el-table-column prop="collectionTableId" label="类别id" min-width="120" />
                  <el-table-column prop="collectionTableName" label="类别名称" min-width="280" :show-overflow-tooltip="true" />
                  <el-table-column prop="collectionTableParentId" label="父类别id" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="collectionTableParentName" label="父类别名称" min-width="140" />
                  <el-table-column prop="collectionTableDetailedExcel" label="数据" min-width="130" />
                  <el-table-column prop="applyFor" fixed="right" label="提交状态" min-width="130">
                    <template #default="scope">
                      <span v-if="scope.row.applyFor" style="color: red;">申请成功未提交</span>
                      <span v-if="!scope.row.applyFor" style="color: green;">申请成功已提交</span>
                    </template>
                  </el-table-column>
              </el-table>
          </el-dialog> 
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ElMessage, FormInstance } from "element-plus";
  import { reactive } from "vue";
  import { onMounted, ref } from "vue-demi";
  import {  getUserByCollectionTableDetailedTextListAPI, getUserCollectionTable } from "../../api/collectionTableManagement";
  import { getYearListAPI } from "../../api/teachingwokingload";
  import router from "../../router";
  //加载
  const loading = ref<boolean>(false)
  //加载
  const loadingUserGroup = ref<boolean>(false)
  //table赋值
  const baseInfoTableData = ref([]);
  //用户已提交收集表table赋值
  const userSubmitTableData = ref([]);
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
  loadUserCollectionTableList();
  };
  const handleCurrentChange = (val: number) => {
  pCurrentPage.value = val;
  loadUserCollectionTableList();
  };
  const searchFormRef = ref<FormInstance>()
  //查询参数
  const searchForm = reactive({
       numberYearId:"",
       staticZ:"",
  })

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
      searchForm.numberYearId = "";
      searchForm.staticZ = "";
      //分页器重置为第一页
      pCurrentPage.value = 1;
      pPageSize.value = 10;
      //重新获取数据
      loadUserCollectionTableList();
  };
  //查询分页列表
  const selectForm = (formEl: FormInstance | undefined) => {
       if(!formEl) return;
       formEl.validate((valid) => {
            if(valid){
              loadUserCollectionTableList();
            }else{
                 console.log('error');
                 return false;
            }
       })
  }
  //用户获取收集表列表
  const loadUserCollectionTableList = async () => {
    loading.value = true;
    try {
      const res = await getUserCollectionTable({
        collectionTableParentId:router.currentRoute.value.meta.collectionTableParentId,
        numberYearId:searchForm.numberYearId,
        staticZ:searchForm.staticZ,
        pageNum:pCurrentPage.value,
        pageSize:pPageSize.value,
      });
      baseInfoTableData.value = res.data.data.records;
      pTotal.value = res.data.data.total;
    } catch (error) {}
    loading.value = false;
        //清空查询框数据
      searchForm.numberYearId = "";
      searchForm.staticZ = "";
  };
  
  //查看用户已提交收集表列表对话框开关
const dialogSubmitVisible = ref<boolean>(false);

  const seeUserWoking = async (row: any) => {
    if(row.staticZ !== '0'){
      dialogSubmitVisible.value = true;
      loadingUserGroup.value = true;
      try {
      const res = await getUserByCollectionTableDetailedTextListAPI({
        collectionTableDetailedId:row.id,
      });
      userSubmitTableData.value = res.data.data;
      pTotal.value = res.data.data.total;
    } catch (error) {}
    loadingUserGroup.value = false;  
  }
}     
//跳转提交表单
const submitUserWoking = async (row: any) => {
          let text = {
            id:row.id,
            collectionTableParentId:row.collectionTableParentId,  
            collectionTableId:row.collectionTableId,
            collectionTableName:row.collectionTableName,
            disabled:'1',
          }
          router
              .push({ path: "/home/collectionTable", query: text })
              .catch((e) => console.error(e));
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
            disabled:'0',
            applyFor:row.applyFor,
          }
          router
              .push({ path: "/home/collectionTable", query: text })
              .catch((e) => console.error(e));
        }
  onMounted(() => {
    // 获取教学工作量信息列表
    loadUserCollectionTableList();
    //获取年限列表
    getYearList();
  });
  </script>
  
  <style lang="scss" scoped>
  @import "../../style/public.scss";
  </style>