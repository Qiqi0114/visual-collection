<template>
    <div class="container-bg">
        <div class="container">
          <div>
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
                  <el-form-item label="系" prop="xId">
                  <el-select v-model="searchForm.xId" filterable placeholder="请选择">
                    <el-option
                      v-for="item in  departmentList.departmentListCode"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年限" prop="yearId">
                    <el-select v-model="searchForm.yId" filterable placeholder="请选择">
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
                  <el-form-item style="float: right">
                    <el-upload drag
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
                      <div class="img_box" v-if="imgs">
                        <img src="../../assets/excel.png" />
                      </div>
                      <span class="box_text">导入</span>
                      </el-upload>
                      <br/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
            


          </div>

      </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue-demi";
import { DepartmentListAPI } from "../../api/accountManagement";
import { getYearListAPI, importWorkloadAPI } from "../../api/teachingwokingload";
//条件参数
const searchForm = reactive({
  xId:"",
  yId:"",
})
//系选择
let departmentList = reactive({departmentListCode:[] as any})
//系id
const xId = ref<string>('')

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
//上传excell时，同时允许上传的最大数
const limitNum = ref<number>(1);
// excel文件列表
const fileList = ref<any[]>([]);
//excel图片显示
const imgs = ref<boolean>(false);
// 文件超出个数限制时的钩子
const exceedFile = (files:any, fileList:any) => {
        ElMessage.warning(`只能选择 ${limitNum.value} 个文件，请删除上一个文件`);
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
            form.append('xId', searchForm.xId);
            form.append('yId', searchForm.yId);
            //校验选项
            if(searchForm.xId === "" || searchForm.yId === "") {
              ElMessage.warning((searchForm.xId === "" || searchForm.yId === "") ? '选项未选' :'')
              searchForm.xId = "";
              searchForm.yId = "";
              fileList.value = [];
              return
            }
            const res =await importWorkloadAPI(form)
            if(res.data.code == '200'){
              ElMessage.success(res.data.msg);
            }else{
              ElMessage.error(res.data.msg);
            }
            searchForm.xId = "";
            searchForm.yId = "";
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
      const handleError = (err: any, file: any, fileList: any) => {
        ElMessage.error('文件上传失败');
      }
      const UploadUrl = () =>{
       // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
        return ""
      }
      const uploadFile = () =>{

      }

onMounted(() => {
  getDepartmentList();
  getYearList();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";

.buttonBox {
  padding: 15px;
  display: flex;
  width: 35%;
  justify-content: flex-start;
  & .el-button {
    margin-right: 20px !important;
  }
}

.tableBox {
  padding: 0 15px;
  h3 {
    font-size: 18px;
    color: #f56c6c;
    padding-bottom: 15px;
  }
}
</style>