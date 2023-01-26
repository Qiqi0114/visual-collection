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
                  <el-form-item label="姓名" prop="userName">
                    <el-input
                      v-model.userName="searchForm.userName"
                      placeholder="请输入姓名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="系" prop="xId">
                    <el-select v-model="searchForm.xId"
                                    placeholder="请选择系" style="width:90%">
                            <el-option v-for="item in departmentList.departmentListCode" :key="item.value" :label="item.label"
                                :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="年" prop="yId">
                    <el-input
                      v-model.yId="searchForm.yId"
                      placeholder="请选择年"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item style="float: right">
                    <el-button type="success" @click="selectForm(searchFormRef)"
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
          :height="500"
        >
          <el-table-column prop="id" label="用户id" min-width="130" />
          <el-table-column prop="teachCourse" label="讲授课程" min-width="120" />
          <el-table-column prop="openingSchool" label="开课学院" min-width="120" />
          <el-table-column prop="schoolAccounting" label="核算学院" min-width="90" />
          <el-table-column prop="natureCurriculum" label="课程性质" min-width="120" />
          <el-table-column prop="teachingTerm" label="授课学期" min-width="120" />
          <el-table-column prop="classRoom" label="班级" min-width="120" />
          <el-table-column prop="k1" label="k1" min-width="120" />
          <el-table-column prop="k2" label="k2" min-width="120" />
          <el-table-column prop="k3" label="k3" min-width="120" />
          <el-table-column prop="K4" label="K4" min-width="120" />
          <el-table-column prop="K5" label="K5" min-width="120" />
          <el-table-column prop="K6" label="K6" min-width="120" />
          <el-table-column prop="J" label="J-计划学时" min-width="120" />
          <el-table-column prop="f" label="F" min-width="120" />
          <el-table-column prop="r" label="R-人数" min-width="120" />
          <el-table-column prop="y1" label="Y（用于考核）" min-width="120" />
          <el-table-column prop="y2" label="Y（计算津贴）" min-width="120" />
          <el-table-column prop="classRoom2" label="班级" min-width="120" />
          <el-table-column prop="teachingContent" label="教学内容" min-width="120" />
          <el-table-column prop="jj" label="J-计划周数" min-width="120" />
          <el-table-column prop="k7" label="k7" min-width="120" />
          <el-table-column prop="s1" label="S1" min-width="120" />
          <el-table-column prop="workloadCorrelationId" label="id" min-width="120" />
          <el-table-column prop="rstudent" label="学生人数" min-width="120" />
        </el-table>
      </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { reactive } from "vue";
import { onMounted, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { DepartmentListAPI } from "../../api/accountManagement";
import { getTeachingWokingInfoList } from "../../api/teachingwokingload";
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
     xId:"",
     yId:"",
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
            console.log(departmentCode);
            
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
    searchForm.userName = "";
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
      xId:searchForm.xId,
      yId:searchForm.yId,
    });
    baseInfoTableData.value = res.data.data.records;
  } catch (error) {}
  loading.value = false;
};

onMounted(() => {
  // 获取教学工作量信息列表
  loadTeachingWokingInfoList();
  //获取系列表
  getDepartmentList()
});
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>