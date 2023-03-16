<template>
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
<div id="box" style="width: 100%; height: 40%">  <el-empty description="description" /></div>
    <!-- 总系搜索部分 -->
    <div class="search-section">
      <el-row>
        <el-col>
          <el-form
            ref="searchZFormRef"
            :model="searchZForm"
            :inline="true"
            style="width: 100%"
          >
            <el-row>
              <el-col :span="4">
                <el-form-item label="年限" prop="yearId">
                  <el-select v-model="searchZForm.yearId" filterable placeholder="请选择"  clearable>
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
                  <el-button type="primary" @click="selectZForm(searchZFormRef)"
                    >查询</el-button
                  >
                  <el-button @click="resetZForm()" type="info">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
  </div>
<div id="boxZ" style="width: 100%; height: 40%">  <el-empty description="description" /></div>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus';
import { onMounted, inject, reactive, ref, computed } from 'vue'; 
import { DepartmentListAPI } from '../../api/accountManagement';
import { getYearListAPI } from '../../api/teachingwokingload';
import { getScientificResearchOtherIntegralAPI, getScientificResearchOtherUserAPI, getYearByZAPI, workLoadListAPI } from "../../api/visualizationAttempts";
import store from '../../store';

const departmentId = computed(() => store.getters.departmentId);
const searchFormRef = ref<FormInstance>()
//查询系z参数
const searchForm = reactive({
   departmentId:"",
   yearId:"1",
})
const searchZFormRef = ref<FormInstance>()
//查询总系参数
const searchZForm = reactive({
   yearId:"1",
})

//系选中
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
  searchForm.departmentId = "";
  searchForm.yearId = "";
  
  //重新获取数据
  workLoadList();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
   if(!formEl) return;
   formEl.validate((valid) => {
        if(valid){
          workLoadList();
        }else{
             console.log('error');
             return false;
        }
   })
}
// 重置总系查询条件
const resetZForm = () => {
  //清空查询框数据
  searchZForm.yearId = "";
  
  //重新获取数据
  getYearByZ();
};
//查询总系分页列表
const selectZForm = (formEl: FormInstance | undefined) => {
   if(!formEl) return;
   formEl.validate((valid) => {
        if(valid){
          getYearByZ();
        }else{
             console.log('error');
             return false;
        }
   })
}
  type EChartsOption = echarts.EChartsOption;
  var option: EChartsOption;
  let echarts: any = inject('echarts');
  const change = () => {
      const myChart = echarts.init(document.getElementById('box'));
      option = {
        legend: {},
        dataset: {
          source: sourceData
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。将x轴标签全显示出来axisLabel
        xAxis: { 
          type: 'category',
          axisLabel:{
            interval:0,
          }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      };
      option && myChart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener('resize', function () {
          myChart.resize();
      });
  };
  const changeZ = () => {
      const myChart = echarts.init(document.getElementById('boxZ'));
      option = {
        legend: {},
        dataset: {
          source: zData
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。将x轴标签全显示出来axisLabel
        xAxis: { 
          type: 'category',
          axisLabel:{
            interval:0,
          }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      };
      option && myChart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener('resize', function () {
          myChart.resize();
      });
  };
//数据
let sourceData :Array<Array<string>> = new Array<Array<string>>();
//获取教学工作量
const workLoadList = async() =>{
  try{
      sourceData = [];
      const res = await getScientificResearchOtherUserAPI({
          yearId:searchForm.yearId,
          demtId:searchForm.departmentId,
          cParentId:'8'
      })
      if(res.data.code === 200){
        let temp :string[] = [];
        temp.push('product', '积分总计', '学院额外奖励分值总计', '总计')
        sourceData.push(temp);
        for(let key in res.data.data){
          let temp :string[] = [];
          temp.push(key)
          temp.push(res.data.data[key].积分合计)
          temp.push(res.data.data[key].奖励分值)
          temp.push(res.data.data[key].总计)
          sourceData.push(temp);
        }
          console.log(sourceData);
          change();
      }else{
          
      }
  }catch(e){

  }
}
//总系数据
let zData :Array<Array<string>> = new Array<Array<string>>();
//获取教学工作量合计
const getYearByZ = async() =>{
  try{
      zData = [];
      const res = await getScientificResearchOtherIntegralAPI({
          yearId:searchZForm.yearId,
          cParentId:'8',
      })
      let temp :string[] = [];
      temp.push('product', '积分总计', '学院额外奖励分值总计', '总计')
      zData.push(temp);
      if(res.data.code === 200){
        let name :string[] = []
        for(let key in res.data.data){
          let temp :string[] = [];
          let nam :string[] = [];
          nam = Object.keys(res.data.data[key])
          name.push(nam[0])
          temp.push(res.data.data[key][nam[0]].积分合计)
          temp.push(res.data.data[key][nam[0]].奖励分值)
          temp.push(res.data.data[key][nam[0]].总计)
          zData.push(temp);
        }
        for(let key = 1; key < zData.length; key++ ){
          zData[key].unshift(name[key - 1],0)
        }
        changeZ();
      }else{
          
      }
  }catch(e){

  }
}
onMounted(()=>{

  //判断是用户系默认
  if(departmentId.value!== undefined && departmentId.value!== '9'){
  searchForm.departmentId = departmentId.value
  }
  //获取系列表
  getDepartmentList();

  //获取年限列表
  getYearList();
  workLoadList();
  getYearByZ();
})
</script>

<style lang="scss" scoped>

</style>