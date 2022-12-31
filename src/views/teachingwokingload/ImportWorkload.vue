<template>
    <router-view />
    <div class="mlist-bg" v-if="router.currentRoute.value.meta.show">
        <!--页头-->
        <Header />
        <!--中间内容区域-->
        <div class="container-bg">
            <div class="container">
                <!-- 搜索部分 -->
                <div class="search-section">
                    <el-row>
                        <el-col>
                            <el-form ref="searchFormRef" :model="searchForm" :inline="true" style="width:100%">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="合同编号" prop="contactNum">
                                            <el-input v-model.contactNum="searchForm.contactNum"
                                                placeholder="请输入合同编号" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="客户全称" prop="customerName">
                                            <el-input v-model.customerName="searchForm.customerName"
                                                placeholder="请输入客户全称" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="量价互保" prop="qphbFLAG">
                                            <el-checkbox v-model.qphbFLAG="searchForm.qphbFLAG"
                                                @change="selectForm(searchFormRef)" true-label="1" false-label="0">
                                            </el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item style="float: right;">
                                            <el-button type="success" @click="selectForm(searchFormRef)">查询</el-button>
                                            <el-button @click="resetForm()" type="info">重置</el-button>
                                            <el-button type="primary" @click="addAgreementPrice()">新建格式合同
                                            </el-button>
                                            <el-button type="primary" @click="addFormatRentShip()">新建非格式合同
                                            </el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </el-col>
                    </el-row>
                </div>

                <!-- 表格部分 -->
                <div class="table-bg" ref="tableContainer" style="width: 99%;">
                    <el-table :data="baseInfoTableData" :border="true" @cell-click="clickAgreementPriceRow"
                        ref="baseInfoTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                        :height="tableHeight">
                        <el-table-column prop="contactNum" label="合同编号" min-width="130" />
                        <el-table-column prop="portOffice" label="办事处" min-width="120" />
                        <el-table-column prop="areaPart" label="片区" min-width="120" />
                        <el-table-column prop="customerName" label="客户全称" min-width="260" />
                        <el-table-column prop="registeredCapital" label="注册资金(万)" min-width="120" />
                        <el-table-column prop="monthlyShipments" label="月发货量" min-width="120" />
                        <el-table-column prop="monthlyShipmentsUnit" label="月发货量单位" min-width="120"/>
                        <el-table-column prop="performPerson" label="谈判人" min-width="120" />
                        <el-table-column prop="startDate" label="合同有效期起" min-width="130" />
                        <el-table-column prop="endDate" label="合同有效期止 " min-width="130" />
                        <el-table-column prop="flow" label="流向 " min-width="150" />
                        <el-table-column prop="cargoType" label="货种" min-width="120" />
                        <el-table-column prop="qphbFLAG" label="量价互保" min-width="85"/>
                        <el-table-column prop="startFlowFlag" label="流程启动标记" min-width="140"/>
                    </el-table>
                </div>
                <!--分页器 start-->
<!--                 <div class="flex pagination-bg">
                    <el-pagination v-model:currentPage="pCurrentPage" v-model:page-size="pPageSize"
                        :page-sizes="[10, 20]" :small="pSmall" :disabled="pDisabled" :background="pBackground"
                        layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                </div> -->
                <!--分页器 end-->

            </div>

        </div>
        <!--页脚-->
        <Footer />

    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

</script>

<style lang="scss" scoped>
@import "../../style/public.scss"
</style>