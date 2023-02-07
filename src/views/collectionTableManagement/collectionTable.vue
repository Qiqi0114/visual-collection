<template>
    <div class="container-bg">
      <div class="container">
 <!--表单 start-->
 <el-form ref="ruleFormRef" :model="CollectionTableForm.CollectionTable" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    :disabled="RESROUTER.staticZ === '2'">
                    <el-row>
                        <el-col :span="14">
                            <font font-family="微软雅黑" size="5px">{{ RESROUTER.collectionTableParentId === '1' ? '科研工作量' :'其他工作量' }}</font>
                            <font font-family="微软雅黑" size="4px" style="margin-left:25px">{{ RESROUTER.collectionTableName }}</font>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            &nbsp;
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="科研成果类别" prop="oaWharfContractOid">
                                <el-input v-model="CollectionTableForm.CollectionTable.oaWharfContractOid" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="论文题目（或教材、专著、著作权发明专利等名称）" prop="heavyDockCostnow">
                                <el-input v-model="CollectionTableForm.CollectionTable.heavyDockCostnow" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="论文发表时间（或书籍出版时间、著作权、专利申请时间）" prop="startDate">
                                <el-date-picker v-model="CollectionTableForm.CollectionTable.startDate"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="是否为指导学生获得成果" prop="areaPart">
                                <el-radio-group v-model="CollectionTableForm.CollectionTable.areaPart">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="第一作者（如果为学生请同时写明班级、学号）" prop="customerName">
                                <el-input v-model="CollectionTableForm.CollectionTable.customerName" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="通讯作者（其他作者、项目参与人）" prop="heavyDockCostlast">
                                <el-input v-model="CollectionTableForm.CollectionTable.heavyDockCostlast" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="出版社或发表刊物名称（论文、著作、教材必填，其他项目填无）" prop="portOffice">
                                <el-input v-model="CollectionTableForm.CollectionTable.portOffice" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="期刊ISSN号" prop="lightDockCostNow">
                                <el-input v-model="CollectionTableForm.CollectionTable.lightDockCostNow" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="论文检索号（或书号、著作权登记号、发明专利号）" prop="transferDockCostlast">
                                <el-input v-model="CollectionTableForm.CollectionTable.transferDockCostlast" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.staticZ">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.staticZ ? '' : beforeRemove" multiple :limit="3"
                                    :on-exceed="handleExceed" :file-list="fileList1" :data="rentShipData('10')">
                                    <el-button type="primary">点击上传</el-button>
                                    <template #tip>
                                        <div class="el-upload__tip">
                                            (审核：国家企业信用信息公示系统查询该公司信息
                                        </div>
                                        <div class="el-upload__tip">
                                            jpg/png/pjp/pjpeg/jpeg/jfif 文件大小要小于 20MB.
                                        </div>
                                    </template>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <el-row v-if="RESROUTER.staticZ === '1'">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
                </el-form>
                <el-row v-if="RESROUTER.staticZ === '2'">
                  <!-- 已截至显示的 -->
                  <el-button @click="seeUserCollectionTable()">返回</el-button>
                </el-row>
      </div>
    </div>
  </template>
<script lang="ts" setup>
import { FormInstance } from "element-plus/es/components/form";
import { reactive, ref } from "vue-demi";
import router from "../../router";

//路由参数
const RESROUTER = router.currentRoute.value.query as any;
//合同表单加载
const loading = ref(false);
// 表单内容
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
//码头合同数据模型
const CollectionTableForm = reactive({
    CollectionTable: {
        //id
        oaWharfContractOid: "",
        //承诺函
        isPromise: "",
        //合同编号
        contactNum: "",
        //码头全称
        customerName: "",
        //办事处
        portOffice: "",
        //片区
        areaPart: "",
        //合同有效期起
        startDate: "",
        //合同有效期止
        endDate: "",
        //重箱装卸费(去年)
        heavyDockCostlast: "",
        //空箱装卸费(去年)
        lightDockCostlast: "",
        //中转装卸费(去年)
        transferDockCostlast: "",
        //冷藏箱费(去年)
        freezerFeeLast: "",
        //港务费(去年)
        portFeelast: "",
        //理货费(去年)
        tallyFeelast: "",
        //其他杂费(去年)
        othersFeelast: "",
        //重箱装卸费(今年)
        heavyDockCostnow: "",
        //空箱装卸费(今年)
        lightDockCostNow: "",
        //中转装卸费(今年)
        transferDockCostNow: "",
        //冷藏箱费(今年)
        freezerFeeNow: "",
        //港务费(今年)
        portFeeNow: "",
        //理货费(今年)
        tallyFeeNow: "",
        //其他杂费(今年)
        othersFeeNow: "",
        //客户盖章
        isSealed: "",
        //其他信息
        otherThing: "",
        //是否加急
        urgentStatus: "",
        //审批完成日期
        finishDate: "",
        //加急原因
        urgentReason: "",
        //流程启动标记
        startFlowFlag: "",
        //特殊条款
        specialProvisions: "",
        //税号
        dutyparagraph: "",
        //口岸名称
        wharfName: "",
    }
});
//校验
const rules = reactive({
    oaWharfContractOid: [{ required: true, message: "科研成果类别必填", trigger: "blur" }],
    heavyDockCostnow: [{ required: true, message: "论文题目必填", trigger: "blur" }],
    areaPart: [{ required: true, message: "是否为指导学生获得成果必填", trigger: "blur" }],
    startDate: [{ required: true, message: "论文发表时间必填", trigger: "blur" }],
    customerName: [{ required: true, message: "第一作者必填", trigger: "blur" }],
    heavyDockCostlast: [{ required: true, message: "通讯作者必填", trigger: "blur" }],
    portOffice: [{ required: true, message: "出版社或发表刊物名称必填", trigger: "blur" }],
    lightDockCostNow: [{ required: true, message: "期刊ISSN号必填", trigger: "blur" }],
    transferDockCostlast: [{ required: true, message: "论文检索号必填", trigger: "blur" },],
});

const seeUserCollectionTable = async () => {
          router
              .push({ path: "/home/userCollectionTable" })
              .catch((e) => console.error(e));
  }
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>