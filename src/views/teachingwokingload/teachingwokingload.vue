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
                  <el-form-item label="姓名" prop="userName">
                    <el-input
                      v-model.userName="searchForm.userName"
                      placeholder="请输入姓名"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="系" prop="departmentId">
                    <el-select v-model="searchForm.departmentId"
                              filterable  placeholder="请选择系" style="width:90%">
                            <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年限" prop="yearId">
                    <el-select v-model="searchForm.yearId" filterable placeholder="请选择">
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
                  <el-form-item style="float: right">
                    <el-button type="success" @click="selectForm(searchFormRef)"
                      >查询</el-button
                    >
                    <el-button @click="resetForm()" type="info">重置</el-button>
                    <el-button @click="deleteXYWoking()" type="danger">删除</el-button>
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
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
              <el-button type="primary" link @click="seeUserWoking(scope.row)">查看</el-button>
              <el-button type="danger" link @click="deleteUserWoking(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="用户id" min-width="180" :show-overflow-tooltip="true"/>
          <el-table-column prop="numberYears" label="年限" min-width="80" />
          <el-table-column prop="userName" fixed="left" label="人员名称" min-width="120" />
          <el-table-column prop="departmentName" label="系" min-width="200" />
          <el-table-column prop="f" label="教学业绩分值F" min-width="120" />
          <el-table-column prop="y1" label="Y（用于考核）" min-width="120" />
          <el-table-column prop="y2" label="Y（计算津贴）" min-width="120" />
          <el-table-column prop="s1" label="s1合计" min-width="120" />
          <el-table-column prop="z" label="未乘就业率系数的总工作量Z" min-width="220" />
        </el-table>
        <!--分页器 start-->
        <div class="flex pagination-bg">
          <el-pagination
            v-model:currentPage="pCurrentPage"
            v-model:page-size="pPageSize"
            :page-sizes="[10, 20]"
            :small="pSmall"
            :disabled="pDisabled"
            :background="pBackground"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <!--分页器 end-->
      </div>

      <!--删除对话框-->
      <el-dialog title="删除教学工作量" v-model="dialogDelFormVisible">
              <el-form :model="delForm">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="系">
                        <el-select v-model="delForm.searForm.xId"
                                      placeholder="请选择系" style="width:90%">
                              <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                  :value="item.value" />
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="年">
                      <el-select v-model="delForm.searForm.yId" filterable placeholder="请选择">
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
                  <el-button @click="dialogDelFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="delXYConfirm()"
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
import { deleteUserWokingAPI, deleteXYWokingAPI, getTeachingWokingInfoList, getYearListAPI } from "../../api/teachingwokingload";
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
    loadTeachingWokingInfoList();
};
const handleCurrentChange = (val: number) => {
    pCurrentPage.value = val;
    loadTeachingWokingInfoList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
     userName:"",
     departmentId:"",
     yearId:"",
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
// 重置查询条件
const resetForm = () => {
    //清空查询框数据
    searchForm.userName = "";
    searchForm.departmentId = "";
    searchForm.yearId = "";
    //分页器重置为第一页
    pCurrentPage.value = 1;
    pPageSize.value = 10;
    //重新获取数据
    loadTeachingWokingInfoList();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
     if(!formEl) return;
     formEl.validate((valid) => {
          if(valid){
            loadTeachingWokingInfoList();
          }else{
               console.log('error');
               return false;
          }
     })
}
//获取教学工作量信息表
const loadTeachingWokingInfoList = async () => {
  loading.value = true;
  try {
    const res = await getTeachingWokingInfoList({
      pageNum:pCurrentPage.value,
      pageSize:pPageSize.value,
      userName:searchForm.userName,
      departmentId:searchForm.departmentId,
      yearId:searchForm.yearId,
    });
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
  } catch (error) {}
  loading.value = false;
};
//添加用户信息对话框开关
const dialogDelFormVisible = ref<boolean>(false);
const delForm = reactive({
searForm:{
  xId:'',
  yId:'',
}
});
const deleteXYWoking = () => {
  dialogDelFormVisible.value = true;
}
const delXYConfirm = async() => {
  try{
    //删除的过渡效果
    loading.value = true;
    const res = await deleteXYWokingAPI({
      xId:delForm.searForm.xId,
      yId:delForm.searForm.yId,
    })
    if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadTeachingWokingInfoList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  } catch(e){console.log(e,'error');}
  dialogDelFormVisible.value = false;
}
//删除用户信息
const deleteUserWoking = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteUserWokingAPI({id:row.id});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadTeachingWokingInfoList();
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
            .push({ path: "/home/seeUserwoking", query: text })
            .catch((e) => console.error(e));
      }
onMounted(() => {
  // 获取教学工作量信息列表
  loadTeachingWokingInfoList();
  //获取系列表
  getDepartmentList();
  //获取年限列表
  getYearList();
});
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>