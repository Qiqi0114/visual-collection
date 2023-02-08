<template>
    <div class="container-bg">
      <div class="container">
 <!--表单 start-->
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '2' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="科研成果类别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB2" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="论文题目（或教材、专著、著作权发明专利等名称）" prop="excelF">
                                <el-input v-model="CollectionTableForm.excelF" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="论文发表时间（或书籍出版时间、著作权、专利申请时间）" prop="excelI">
                                <el-date-picker v-model="CollectionTableForm.excelI"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="是否为指导学生获得成果" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC2" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="第一作者（如果为学生请同时写明班级、学号）" prop="excelD">
                                <el-input v-model="CollectionTableForm.excelD" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="通讯作者（其他作者、项目参与人）" prop="excelE">
                                <el-input v-model="CollectionTableForm.excelE" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="出版社或发表刊物名称（论文、著作、教材必填，其他项目填无）" prop="excelG">
                                <el-input v-model="CollectionTableForm.excelG" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="期刊ISSN号" prop="excelH">
                                <el-input v-model="CollectionTableForm.excelH" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="论文检索号（或书号、著作权登记号、发明专利号）" prop="excelJ">
                                <el-input v-model="CollectionTableForm.excelJ" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '3' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="专利类别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB3" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="专利名称（或教材、专著、著作权发明专利等名称）" prop="excelF">
                                <el-input v-model="CollectionTableForm.excelF" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="授权日期（或书籍出版时间、著作权、专利申请时间）" prop="excelI">
                                <el-date-picker v-model="CollectionTableForm.excelI"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="专利性质" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC3" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="第一作者（如果为学生请同时写明班级、学号）" prop="excelD">
                                <el-input v-model="CollectionTableForm.excelD" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="其他作者（其他作者、项目参与人）" prop="excelE">
                                <el-input v-model="CollectionTableForm.excelE" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="专利状态" prop="excelG">
                                <el-input v-model="CollectionTableForm.excelG" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="申请日期" prop="excelH">
                                <el-date-picker v-model="CollectionTableForm.excelH"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="专利号（或书号、著作权登记号、发明专利号）" prop="excelJ">
                                <el-input v-model="CollectionTableForm.excelJ" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '4' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="书籍类别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB4" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="书籍题目（或教材、专著、著作权发明专利等名称）" prop="excelF">
                                <el-input v-model="CollectionTableForm.excelF" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="出版时间（或书籍出版时间、著作权、专利申请时间）" prop="excelI">
                                <el-date-picker v-model="CollectionTableForm.excelI"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="书籍性质" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC4" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="主编（如果为学生请同时写明班级、学号）" prop="excelD">
                                <el-input v-model="CollectionTableForm.excelD" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="副主编（其他作者、项目参与人）" prop="excelE">
                                <el-input v-model="CollectionTableForm.excelE" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="出版社名称" prop="excelG">
                                <el-input v-model="CollectionTableForm.excelG" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="书号" prop="excelH">
                                <el-input v-model="CollectionTableForm.excelH" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="是否为再版教材（或书号、著作权登记号、发明专利号）" prop="excelJ">
                                <el-radio-group v-model="CollectionTableForm.excelJ">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>   
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '5' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="科研项目类别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB5" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="项目名称（或教材、专著、著作权发明专利等名称）" prop="excelF">
                                <el-input v-model="CollectionTableForm.excelF" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="合同经费" prop="excelI">
                                <el-input v-model="CollectionTableForm.excelI" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="项目分类" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC5" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="项目性质" prop="excelD">
                                <el-input v-model="CollectionTableForm.excelD" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="项目状态" prop="excelE">
                                <el-input v-model="CollectionTableForm.excelE" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="项目负责人" prop="excelG">
                                <el-input v-model="CollectionTableForm.excelG" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="立项日期" prop="excelH">
                                <el-date-picker v-model="CollectionTableForm.excelH"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="到账经费" prop="excelJ">
                                <el-input v-model="CollectionTableForm.excelJ" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>    
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '6' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="教学科研获奖级别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB6" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="其他获奖人姓名" prop="excelF">
                                <el-input v-model="CollectionTableForm.excelF" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="科研获奖名称" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC6" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖项目名称（如没有可不填写）" prop="excelD">
                                <el-input v-model="CollectionTableForm.excelD" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="第一获奖人姓名" prop="excelE">
                                <el-input v-model="CollectionTableForm.excelE" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖等级" prop="excelG">
                                <el-input v-model="CollectionTableForm.excelG" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="获奖时间" prop="excelH">
                                <el-date-picker v-model="CollectionTableForm.excelH"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="学校奖励金额" prop="excelJ">
                                <el-input v-model="CollectionTableForm.excelJ" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger"  @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>    
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '7' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="创新创业竞赛级别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB7" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="参赛队伍或参赛作品名称" prop="excelF">
                                <el-input v-model="CollectionTableForm.excelF" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="参赛学生类别" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC7" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="竞赛名称" prop="excelD">
                                <el-input v-model="CollectionTableForm.excelD" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="竞赛类别" prop="excelE">
                                <el-input v-model="CollectionTableForm.excelE" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖时间" prop="excelG">
                                <el-date-picker v-model="CollectionTableForm.excelG"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="获奖等级" prop="excelH">
                                <el-input v-model="CollectionTableForm.excelH" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="参赛学生学院、班级、姓名、学号" prop="excelI">
                                <el-input v-model="CollectionTableForm.excelI" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="学校奖励金额" prop="excelJ">
                                <el-input v-model="CollectionTableForm.excelJ" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>   
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '9' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="竞赛级别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="竞赛名称" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="获奖等级" prop="excelD">
                                <el-select v-model="CollectionTableForm.excelD"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelD9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>  
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖时间" prop="excelE">
                                <el-date-picker v-model="CollectionTableForm.excelE"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>   
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '10' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="竞赛级别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="竞赛名称" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC10" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="获奖等级" prop="excelD">
                                <el-select v-model="CollectionTableForm.excelD"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelD9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>  
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖时间" prop="excelE">
                                <el-date-picker v-model="CollectionTableForm.excelE"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>   
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '11' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="竞赛级别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB11" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="竞赛名称" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC11" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="获奖等级" prop="excelD">
                                <el-select v-model="CollectionTableForm.excelD"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelD9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>  
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖时间" prop="excelE">
                                <el-date-picker v-model="CollectionTableForm.excelE"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>   
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '12' ? true : false)" :disabled="!editFlag">
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
                            <el-form-item label="竞赛级别" prop="excelB">
                                <el-select v-model="CollectionTableForm.excelB"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelB11" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="竞赛名称" prop="excelC">
                                <el-select v-model="CollectionTableForm.excelC"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelC12" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                            <el-form-item label="获奖等级" prop="excelD">
                                <el-select v-model="CollectionTableForm.excelD"
                                            filterable  placeholder="请选择" style="width:90%" clearable>
                                        <el-option v-for="item in excelD9" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>  
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="获奖时间" prop="excelE">
                                <el-date-picker v-model="CollectionTableForm.excelE"
                                    type="date" style="width:90%;" placeholder="选择日期" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

<!--                     <el-row v-if="RESROUTER.disabled">
                        <el-col :span="24">
                            <el-form-item class="is-required" label="营业执照">
                                <el-upload class="upload-demo" accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.pdf" action=""
                                    :http-request="uploadFileFun" :before-upload="beforeUploadChuChai"
                                    :before-remove="RESROUTER.disabled ? '' : beforeRemove" multiple :limit="3"
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
                    <el-row v-if="editFlag">
                        <!-- 采集中显示的 -->
                        <el-button type="success" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button v-if="RESROUTER.disabled === '0'" type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>    
                <el-row v-if="!editFlag">
                  <!-- 已截至显示的 -->
                  <el-button type="primary" @click="userApplyForUpdateCollectionTable()">申请修改</el-button>
                  <el-button type="danger" @click="deleteCollectionTable()">删除提交表</el-button>
                  <el-button @click="seeUserCollectionTable()">返回</el-button>
                </el-row>
      </div>
    </div>
  </template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { FormInstance } from "element-plus/es/components/form";
import { onMounted, reactive, ref } from "vue-demi";
import { formModal,saveUserCollectionTableAPI, updateCollectionTableDetailedTextListAPI, userApplyForDeleteCollectionTableAPI, userApplyForUpdateCollectionTableAPI } from "../../api/collectionTableManagement";
import router from "../../router";


//合同表单加载
const loading = ref(false);
// 表单内容
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
//码头合同数据模型
const CollectionTableForm = reactive<formModal>({
    excelB:"",
    excelC:"",
    excelD:"",
    excelE:"",
    excelF:"",
    excelG:"",
    excelH:"",
    excelI:"",
    excelJ:"",
    excelK:"",
    excelL:"",
    excelM:"",
    excelN:"",
});

//选项
let excelB2 = [
    {
        value: 'SCI论文',
        label: "SCI论文",
    },
    {
        value: 'EI期刊论文',
        label: "EI期刊论文",
    },
    {
        value: 'EI会议论文',
        label: "EI会议论文",
    },
    {
        value: '中文核心期刊',
        label: "中文核心期刊",
    },
    {
        value: '国际期刊',
        label: "国际期刊",
    },
    {
        value: '国际会议',
        label: "国际会议",
    },
    {
        value: '普通省级论文',
        label: "普通省级论文",
    },
]
let excelC2 = [
    {
        value: '个人科研论文',
        label: "个人科研论文",
    },
    {
        value: '指导学生论文',
        label: "指导学生论文",
    },
    {
        value: '教研论文',
        label: "教研论文",
    },
]
let excelB3 = [
    {
        value: '发明专利',
        label: "发明专利",
    },
    {
        value: '实用新型',
        label: "实用新型",
    },
    {
        value: '软件著作权',
        label: "软件著作权",
    },
]
let excelC3 = [
    {
        value: '教师个人',
        label: "教师个人",
    },
    {
        value: '指导学生',
        label: "指导学生",
    },
]
let excelB4 = [
    {
        value: '著作',
        label: "著作",
    },
    {
        value: '教材',
        label: "教材",
    },
]
let excelC4 = [
    {
        value: '个人专著',
        label: "个人专著",
    },
    {
        value: '校级立项教材',
        label: "校级立项教材",
    },
    {
        value: '校企合作教材',
        label: "校企合作教材",
    },
    {
        value: '省级规划教材',
        label: "省级规划教材",
    },
    {
        value: '国家级规划教材',
        label: "国家级规划教材",
    },
]
let excelB5 = [
    {
        value: '国家级项目',
        label: "国家级项目",
    },
    {
        value: '教育部项目',
        label: "教育部项目",
    },
    {
        value: '省级项目',
        label: "省级项目",
    },
    {
        value: '地市级项目',
        label: "地市级项目",
    },
    {
        value: '校级项目',
        label: "校级项目",
    },
]
let excelC5 = [
    {
        value: '国家自然科学基金',
        label: "国家自然科学基金",
    },
    {
        value: '省自然科学基金',
        label: "省自然科学基金",
    },
    {
        value: '教育部科技项目',
        label: "教育部科技项目",
    },
    {
        value: '省科技厅项目',
        label: "省科技厅项目",
    },
    {
        value: '省重点研发项目',
        label: "省重点研发项目",
    },
    {
        value: '省级其他项目',
        label: "省级其他项目",
    },
    {
        value: '省教育厅项目',
        label: "省教育厅项目",
    },
    {
        value: '校级科研项目',
        label: "校级科研项目",
    },
    {
        value: '教育部教改项目',
        label: "教育部教改项目",
    },
    {
        value: '省教改项目',
        label: "省教改项目",
    },
    {
        value: '省级建设项目',
        label: "省级建设项目",
    },
    {
        value: '校级建设项目',
        label: "校级建设项目",
    },
    {
        value: '校质量工程项目',
        label: "校质量工程项目",
    },
]
let excelB6 = [
    {
        value: '国家级',
        label: "国家级",
    },
    {
        value: '省级（教育部）',
        label: "省级（教育部）",
    },
    {
        value: '市级',
        label: "市级",
    },
    {
        value: '校级',
        label: "校级",
    },
    {
        value: '院级',
        label: "院级",
    },
]
let excelC6 = [
    {
        value: '科学技术进步奖',
        label: "科学技术进步奖",
    },
    {
        value: '教学成果奖',
        label: "教学成果奖",
    },
    {
        value: '杰出教学贡献奖',
        label: "杰出教学贡献奖",
    },
    {
        value: '教学名师',
        label: "教学名师",
    },
    {
        value: '教学质量优秀奖',
        label: "教学质量优秀奖",
    },
    {
        value: '优质课堂奖',
        label: "优质课堂奖",
    },
    {
        value: '青年教师教学竞赛',
        label: "青年教师教学竞赛",
    },
    {
        value: '线上教学竞赛',
        label: "线上教学竞赛",
    },
    {
        value: '课程思政教学设计竞赛',
        label: "课程思政教学设计竞赛",
    },
    {
        value: '教学创新竞赛',
        label: "教学创新竞赛",
    },
    {
        value: '多媒体课件大赛',
        label: "多媒体课件大赛",
    },
    {
        value: '其他',
        label: "其他",
    },
]
let excelB7 = [
    {
        value: '国际级',
        label: "国际级",
    },
    {
        value: '国家级',
        label: "国家级",
    },
    {
        value: '省部级',
        label: "省部级",
    },
    {
        value: '市级',
        label: "市级",
    },
    {
        value: '校级',
        label: "校级",
    },
]
let excelC7 = [
    {
        value: '本科生',
        label: "本科生",
    },
    {
        value: '研究生',
        label: "研究生",
    },
]
let excelB9 = [
    {
        value: '国家级',
        label: "国家级",
    },
    {
        value: '省级（教育部）',
        label: "省级（教育部）",
    },
    {
        value: '市级',
        label: "市级",
    },
    {
        value: '校级',
        label: "校级",
    },
    {
        value: '院级',
        label: "院级",
    },
]
let excelC9 = [
    {
        value: '青年教师教学竞赛',
        label: "青年教师教学竞赛",
    },
    {
        value: '线上教学竞赛',
        label: "线上教学竞赛",
    },
    {
        value: '课程思政教学设计竞赛',
        label: "课程思政教学设计竞赛",
    },
    {
        value: '教学创新竞赛',
        label: "教学创新竞赛",
    },
]
let excelD9 = [
    {
        value: '特等奖',
        label: "特等奖",
    },
    {
        value: '一等奖',
        label: "一等奖",
    },
    {
        value: '二等奖',
        label: "二等奖",
    },
    {
        value: '三等奖',
        label: "三等奖",
    },
]
let excelC10 = [
    {
        value: '教学成果奖',
        label: "教学成果奖",
    },
    {
        value: '科技进步奖',
        label: "科技进步奖",
    },
    {
        value: '优质课堂奖',
        label: "优质课堂奖",
    },
    {
        value: '教学质量优秀奖',
        label: "教学质量优秀奖",
    },
    {
        value: '教学名师',
        label: "教学名师",
    },
    {
        value: '杰出教学贡献奖',
        label: "杰出教学贡献奖",
    },
    {
        value: '优秀毕业设计指导教师',
        label: "优秀毕业设计指导教师",
    },
]
let excelB11 = [
    {
        value: '国家级',
        label: "国家级",
    },
    {
        value: '省级',
        label: "省级",
    },
    {
        value: '市级',
        label: "市级",
    },
    {
        value: '校级',
        label: "校级",
    },
    {
        value: '院级',
        label: "院级",
    },
]
let excelC11 = [
    {
        value: '优秀共产党员',
        label: "优秀共产党员",
    },
    {
        value: '优秀党务工作者',
        label: "优秀党务工作者",
    },
    {
        value: '师德标兵',
        label: "师德标兵",
    },
    {
        value: '先进党委',
        label: "先进党委",
    },
    {
        value: '先进党支部',
        label: "先进党支部",
    },
]
let excelC12 = [
    {
        value: '优秀教师',
        label: "优秀教师",
    },
    {
        value: '优秀教育工作者',
        label: "优秀教育工作者",
    },
    {
        value: '教学管理先进个人',
        label: "教学管理先进个人",
    },
    {
        value: '优秀基层教学组织',
        label: "优秀基层教学组织",
    },
    {
        value: '优秀科技工作者',
        label: "优秀科技工作者",
    },
    {
        value: '优秀青年科技工作者',
        label: "优秀青年科技工作者",
    },
    {
        value: '优秀研究生论文',
        label: "优秀研究生论文",
    },
]

//校验
const rules = reactive({
    excelB: [{ required: true, message: "科研成果类别必填", trigger: "blur" }],
    excelF: [{ required: true, message: "论文题目必填", trigger: "blur" }],
    excelC: [{ required: true, message: "是否为指导学生获得成果必填", trigger: "blur" }],
    excelI: [{ required: true, message: "论文发表时间必填", trigger: "blur" }],
    excelD: [{ required: true, message: "第一作者必填", trigger: "blur" }],
    excelE: [{ required: true, message: "通讯作者必填", trigger: "blur" }],
    excelG: [{ required: true, message: "出版社或发表刊物名称必填", trigger: "blur" }],
    excelH: [{ required: true, message: "期刊ISSN号必填", trigger: "blur" }],
    excelJ: [{ required: true, message: "论文检索号必填", trigger: "blur" },],
});

//提交
const submitForm = async () => {
/*     //判断是否申请加急清空
    if (CollectionTableForm.urgentStatus == "0") {
        CollectionTableForm.finishDate = "";
        CollectionTableForm.urgentReason = "";
    } */
    console.log(CollectionTableForm);
    
    Promise.all([ruleFormRef.value].map((item: any) => item.validate()))
        .then(async () => {
            if(RESROUTER.disabled === '1'){
                //提交收集表
                const res = await saveUserCollectionTableAPI({
                    collectionTableDetailedId:RESROUTER.id,
                    collectionTableDetailedExcel:CollectionTableForm,
                })
                if (res.data.code == "200") {
                    ElMessage({
                        message: "提交成功",
                        duration: 1500,
                        type: "success",
                    });
                    //判断是科研、其他工作量收集表
                    if(RESROUTER.collectionTableParentId === '1'){
                        //提交成功后返回科研工作量页面
                        router.push({ path: "/home/userCollectionTable" })
                    }else if(RESROUTER.collectionTableParentId === '8'){
                        //提交成功后返回其他工作量页面
                        router.push({ path: "/home/userOtherCollectionTable" })
                    }  
                } else {
                    ElMessage.error(res.data.msg)
                }
            }else if(RESROUTER.disabled === '0'){
                //提交修改申请同意的收集表
                const res = await updateCollectionTableDetailedTextListAPI({
                    id:RESROUTER.id,
                    collectionTableDetailedExcel:CollectionTableForm,
                })
                if (res.data.code == "200") {
                    ElMessage({
                        message: "再次提交成功",
                        duration: 1500,
                        type: "success",
                    });
                    //判断是科研、其他工作量收集表
                    if(RESROUTER.collectionTableParentId === '1'){
                        //提交成功后返回科研工作量页面
                        router.push({ path: "/home/userCollectionTable" })
                    }else if(RESROUTER.collectionTableParentId === '8'){
                        //提交成功后返回其他工作量页面
                        router.push({ path: "/home/userOtherCollectionTable" })
                    }  
                } else {
                    ElMessage.error(res.data.msg)
                }
            }       
        })
        .catch((e) => {
            ElMessage.error("未完整填写，请检查后提交！");
        });
};
//申请修改已提交的收集表
  const userApplyForUpdateCollectionTable = async () => {
    loading.value = true;
    try {
      const res = await userApplyForUpdateCollectionTableAPI({
        id:RESROUTER.id,
      });
      if (res.data.code == "200") {
          ElMessage({
              message: "已申请",
              duration: 1500,
              type: "success",
          });
          //判断是科研、其他工作量收集表
          if(RESROUTER.collectionTableParentId === '1'){
            //已申请后返回科研工作量页面
            router.push({ path: "/home/userCollectionTable" })
          }else if(RESROUTER.collectionTableParentId === '8'){
            //已申请后返回其他工作量页面
            router.push({ path: "/home/userOtherCollectionTable" })
          }  
      } else {
          ElMessage.error(res.data.msg)
      }
    } catch (error) {}
    loading.value = false;
  };

//删除提交表
const deleteCollectionTable = async() => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      const res = await userApplyForDeleteCollectionTableAPI({id:RESROUTER.id});
      if (res.data.code == "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
                //判断是科研、其他工作量收集表
                if(RESROUTER.collectionTableParentId === '1'){
                    //确认删除后返回科研工作量页面
                    router.push({ path: "/home/userCollectionTable" })
                }else if(RESROUTER.collectionTableParentId === '8'){
                    //确认删除后返回其他工作量页面
                    router.push({ path: "/home/userOtherCollectionTable" })
                }  
      } else {ElMessage.error(res.data.msg)}
  })
  .catch(() => {console.log('error');});
}
  

//返回收集表列表页面
const seeUserCollectionTable = async () => {
        //判断是科研、其他工作量收集表
                if(RESROUTER.collectionTableParentId === '1'){
                    router
                    .push({ path: "/home/userCollectionTable" })
                    .catch((e) => console.error(e));
                }else if(RESROUTER.collectionTableParentId === '8'){
                    router
                    .push({ path: "/home/userOtherCollectionTable" })
                    .catch((e) => console.error(e));
                }  
  }
//路由参数
const RESROUTER = router.currentRoute.value.query as any;
//查看已提交页面是否有权限修改禁用开关
const editFlag = ref<boolean>(false);
onMounted(() => {
    console.log(RESROUTER);
    //查看已提交、修改表单
    if(RESROUTER.disabled === '0'){
        CollectionTableForm.excelB = RESROUTER.excelB;
        CollectionTableForm.excelC = RESROUTER.excelC;
        CollectionTableForm.excelD = RESROUTER.excelD;
        CollectionTableForm.excelE = RESROUTER.excelE;
        CollectionTableForm.excelF = RESROUTER.excelF;
        CollectionTableForm.excelG = RESROUTER.excelG;
        CollectionTableForm.excelH = RESROUTER.excelH;
        CollectionTableForm.excelI = RESROUTER.excelI;
        CollectionTableForm.excelJ = RESROUTER.excelJ;
        CollectionTableForm.excelK = RESROUTER.excelK;
        CollectionTableForm.excelL = RESROUTER.excelL;
        CollectionTableForm.excelM = RESROUTER.excelM;
        CollectionTableForm.excelN = RESROUTER.excelN;
        //未得到申请权限
        if(RESROUTER.applyFor === 'false'){
            editFlag.value = false;
        //得到申请权限
        }else if(RESROUTER.applyFor === 'true'){
            editFlag.value = true;
        }
    //查看提交表单
    }else if(RESROUTER.disabled === '1'){
        editFlag.value = true;
    }
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>