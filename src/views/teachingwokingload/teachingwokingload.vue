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
          <el-table-column prop="userName" label="用户全称" min-width="120" />
          <el-table-column prop="passWord" label="密码" min-width="120" />
          <el-table-column prop="userSex" label="用户性别" min-width="90" />
          <el-table-column prop="userPhone" label="手机号" min-width="120" />
          <el-table-column prop="userEmail" label="用户邮箱" min-width="120" />
          <el-table-column prop="roleId" label="角色id" min-width="85">
            <template #default="scope">
              <span v-if="scope.row.roleId === '1'">管理员</span>
              <span v-if="scope.row.roleId === '2'">用户</span>
            </template>
          </el-table-column>
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
import { FormInstance } from "element-plus";
import { reactive } from "vue";
import { onMounted, ref } from "vue-demi";
import { useRouter } from "vue-router";
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
})
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
    const res = await getTeachingWokingInfoList();
    baseInfoTableData.value = res.data.data;
  } catch (error) {}
  loading.value = false;
};

onMounted(() => {
  // 获取教学工作量信息列表
  loadTeachingWokingInfoList();

  console.log(store.getters.gettoken);
});
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>