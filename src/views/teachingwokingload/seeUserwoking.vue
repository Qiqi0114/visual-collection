<template>
        <!-- 表格部分 -->
        <div class="table-bg" ref="tableContainer" style="width: 99%">
        <el-table
          :data="baseInfoTableData"
          :border="true"
          ref="baseInfoTableDataRef"
          v-loading="loading"
          :header-cell-style="{ background: '#F5F6FA' }"
          :height="550"
        >
          <el-table-column label="K1－课堂教学类别系数：博士研究生课1，硕士研究生课0.5，其它课为0.0。  K2－双语教学课系数：一级水平0.2，二级水平 0.4，三级水平 0.8。   K3－开新课系数：开新课系数0.7（无实验）、1.0（有实验）。K4－作业系数：作业量特别大系数0.1，其它情况0.0。   K5－合班系数：合班系数的确定原则是按自然班计算。1个自然班，合班系数为1；对只招一个班的专业，专业课单班系数为1.2；因专业需要实施的单班授课，在保证批改作业量较大的前提下，经学院审核，可按只招一个班的专业处理，系数为1.2；选修课按35人一个班折算；选修课按 35 人一个班折算； 硕士生导师为研究生上课≤30 人视为一个自然班，每多 5 人增加系数 0.1，增加系数最大值为 0.5。   K6－教学质量系数：学期教学质量考核优秀者，其当学期授课系数 0.1（此系数不涉及独立实践课程；校院教学质量奖获得者由学院文件相关条款奖励，不在此范围内）。K7-实践教学系数。K8-就业率奖励系数（针对毕业设计工作量，不含毕业实习工作量；该系数和实践系数无关）：毕业设计指导教师指导的学生省内就业率 85%以上，就业率奖励系数 1.1；整体就业率 80%以上的，就业率奖励系数 1；整体就业率 51%-80%的，就业率奖励系数 0.8，整体就业率 50%及以下，就业率奖励系数 0.5。该系数由学院办公室根据学办提供的年终考评时统计数据进行核算。">
          <el-table-column label="(一)教学业绩分值F=（K1+K2+K3+K4+K5+K6)*J">
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
          </el-table-column>
          <el-table-column label="（二）指导研究生Y=R*30（35）">
            <el-table-column prop="r" label="R-人数" min-width="120" />
            <el-table-column prop="y1" label="Y（用于考核）" min-width="120" />
            <el-table-column prop="y2" label="Y（计算津贴）" min-width="120" />
          </el-table-column>
          <el-table-column label="（三）实践教学S=R*J*K">
            <el-table-column prop="classRoom2" label="班级" min-width="120" />
            <el-table-column prop="teachingContent" label="教学内容" min-width="120" />
            <el-table-column prop="rstudent" label="R-学生人数" min-width="120" />
            <el-table-column prop="jj" label="J-计划周数" min-width="120" />
            <el-table-column prop="k7" label="k7" min-width="120" />
            <el-table-column prop="s1" label="S1" min-width="120" />
          </el-table-column>
          <el-table-column label="Z=F+Y+S">
            <el-table-column prop="z" fixed="right" label="未乘就业率系数的总工作量" min-width="220" />
          </el-table-column>
          </el-table-column>

        </el-table>
      </div>
</template>

<script lang="ts" setup>
import { join } from "path/posix";
import { onMounted, ref } from "vue-demi";
import { getTeachingWokingInfoList } from "../../api/teachingwokingload";
import router from "../../router";
const queryRouter = router.currentRoute.value.query;
//加载
const loading = ref<boolean>(false)
//table赋值
const baseInfoTableData = ref<any[]>([]);
//获取教学工作量信息表
const loadTeachingWokingInfoList = async () => {
  loading.value = true;
  try {
    const res = await getTeachingWokingInfoList({
      pageNum:queryRouter.pageNum,
      pageSize:queryRouter.pageSize,
      userName:queryRouter.userName,
      departmentId:queryRouter.departmentId,
      yearId:queryRouter.yearId,
    });
    baseInfoTableData.value = res.data.data.records[0].workloadList;
    //合计z
    baseInfoTableData.value[17].z = res.data.data.records[0].z;
  } catch (error) {}
  loading.value = false;
};
onMounted(() => {
  loadTeachingWokingInfoList()
})
</script>

<style lang="scss" scoped>

</style>