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

  <div id="box" style="width: 100%; height: 400px">  <el-empty description="description" /></div>

</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus';
import { onMounted, inject, reactive, ref } from 'vue'; 
import { DepartmentListAPI } from '../../api/accountManagement';
import { getYearListAPI } from '../../api/teachingwokingload';
import { getYearByZAPI, workLoadListAPI } from "../../api/visualizationAttempts";
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
     departmentId:"1",
     yearId:"1",
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
    type EChartsOption = echarts.EChartsOption;
    var option: EChartsOption;
    let echarts: any = inject('echarts');
    const change = () => {
        const myChart = echarts.init(document.getElementById('box'));
        option = {
/*             xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                },
            ], */
            xAxis: {
                data: userName
            },
            yAxis: {},
            series: [
                {
                type: 'bar',
                data: userDataZ
                }
            ]
        };
        option && myChart.setOption(option);
        // 根据页面大小自动响应图表大小
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    };
//人员
let userName :Array<string>= new Array<string>()
//人员z数据
let userDataZ :Array<string>= new Array<string>()
//获取教学工作量
const workLoadList = async() =>{
    try{
        userName = [];
        userDataZ = [];
        const res = await workLoadListAPI({
            yearId:searchForm.yearId,
            mentId:searchForm.departmentId,
        })
        if(res.data.code === 200){
            res.data.data.forEach((item: { userName: string; z: string; }) => {
                userName.push(item.userName)
                userDataZ.push(item.z)
            });
            change();
        }else{
            
        }
    }catch(e){

    }
}
//获取教学工作量合计
const getYearByZ = async() =>{
    try{
        const res = await getYearByZAPI({
            yearId:'',
        })
        if(res.data.code === 200){

        }else{
            
        }
    }catch(e){

    }
}
onMounted(()=>{
    //获取系列表
    getDepartmentList();
    //获取年限列表
    getYearList();
    workLoadList();
})
</script>

<style lang="scss" scoped>

</style>