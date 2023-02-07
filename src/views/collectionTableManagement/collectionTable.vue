<template>
    <div class="container-bg">
      <div class="container">
 <!--表单 start-->
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '2' ? true : false)" :disabled="RESROUTER.disabled === '0'? true :false">
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
                                <el-input v-model="CollectionTableForm.excelB" />
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
                                <el-radio-group v-model="CollectionTableForm.excelC">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
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
                    <el-row v-if="RESROUTER.disabled === '1'? true :false">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '3' ? true : false)" :disabled="RESROUTER.disabled === '0'? true :false">
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
                                <el-input v-model="CollectionTableForm.excelB" />
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
                                <el-radio-group v-model="CollectionTableForm.excelC">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
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
                    <el-row v-if="RESROUTER.disabled === '1'? true :false">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '4' ? true : false)" :disabled="RESROUTER.disabled === '0'? true :false">
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
                                <el-input v-model="CollectionTableForm.excelB" />
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
                                <el-radio-group v-model="CollectionTableForm.excelC">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
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
                    <el-row v-if="RESROUTER.disabled === '1'? true :false">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>   
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '5' ? true : false)" :disabled="RESROUTER.disabled === '0'? true :false">
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
                                <el-input v-model="CollectionTableForm.excelB" />
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
                                <el-radio-group v-model="CollectionTableForm.excelC">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
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
                    <el-row v-if="RESROUTER.disabled === '1'? true :false">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>    
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '6' ? true : false)" :disabled="RESROUTER.disabled === '0'? true :false">
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
                                <el-input v-model="CollectionTableForm.excelB" />
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
                                <el-radio-group v-model="CollectionTableForm.excelC">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
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
                    <el-row v-if="RESROUTER.disabled === '1'? true :false">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>    
            <el-form ref="ruleFormRef" :model="CollectionTableForm" :rules="rules"
                    label-width="420px" class="demo-CollectionTableForm" :size="formSize" v-loading="loading"
                    v-if="(RESROUTER.collectionTableId === '7' ? true : false)" :disabled="RESROUTER.disabled === '0'? true :false">
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
                                <el-input v-model="CollectionTableForm.excelB" />
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
                                <el-radio-group v-model="CollectionTableForm.excelC">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
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
                    <el-row v-if="RESROUTER.disabled === '1'? true :false">
                        <!-- 采集中显示的 -->
                        <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="seeUserCollectionTable()">返回</el-button>
                    </el-row>
            </el-form>    
                <el-row v-if="RESROUTER.disabled === '0'? true :false">
                  <!-- 已截至显示的 -->
                  <el-button @click="seeUserCollectionTable()">返回</el-button>
                </el-row>
      </div>
    </div>
  </template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus/es/components/form";
import { onMounted, reactive, ref } from "vue-demi";
import { formModal,saveUserCollectionTableAPI } from "../../api/collectionTableManagement";
import router from "../../router";

//路由参数
const RESROUTER = router.currentRoute.value.query as any;
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

const submitForm = async () => {
/*     //判断是否申请加急清空
    if (CollectionTableForm.urgentStatus == "0") {
        CollectionTableForm.finishDate = "";
        CollectionTableForm.urgentReason = "";
    } */
    console.log(CollectionTableForm);
    
    Promise.all([ruleFormRef.value].map((item: any) => item.validate()))
        .then(async () => {
            const res = await saveUserCollectionTableAPI({
                collectionTableDetailedId:RESROUTER.id,
                collectionTableDetailedExcel:CollectionTableForm,
            })
        })
        .catch((e) => {
            ElMessage.error("未完整填写，请检查后提交！");
        });
};

const seeUserCollectionTable = async () => {
          router
              .push({ path: "/home/userCollectionTable" })
              .catch((e) => console.error(e));
  }
onMounted(() => {
    console.log(RESROUTER);
    if(RESROUTER.disabled){
        CollectionTableForm.excelB = RESROUTER.excelB;
        CollectionTableForm.excelC = RESROUTER.excelC;
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
    }
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>