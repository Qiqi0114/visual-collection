<template>
    <div class="container-bg">
   <div class="menu">
     <el-scrollbar style="width: 200px">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical"
        text-color="#fff"
        router
        :collapse="isCollapse"
        :default-active="route.meta.activeMenu || route.path"
        @open="handleOpen"
        @close="handleClose"
      >
      <template v-for="item in store.getters.asyncRoutes" :index="item.key" :key="item.key">
          <el-sub-menu :index="item.key">
              <!-- 一级导航 -->
              <template #title>
                <el-icon v-if="item.icon === 'Checked'"><Checked /></el-icon>
                <el-icon v-if="item.icon === 'Avatar'"><Avatar /></el-icon>
                <el-icon v-if="item.icon === 'TrendCharts'"><TrendCharts /></el-icon>
                <el-icon v-if="item.icon === 'List'"><List /></el-icon>
                <el-icon v-if="item.icon === 'Histogram'"><Histogram /></el-icon>
                <span>{{ item.title }}</span>
              </template>
              <!-- 二级导航 -->
              <template v-if="item.children.length > 0">
                <el-menu-item-group v-for="val in item.children"  :key="val.key">
                  <el-menu-item
                    :index="val.path">
                    <el-icon v-if="val.icon === 'Edit'"><Edit /></el-icon>
                    <el-icon v-if="val.icon === 'Tickets'"><Tickets /></el-icon>
                    <el-icon v-if="val.icon === 'DataLine'"><DataLine /></el-icon>
                    <el-icon v-if="val.icon === 'Setting'"><Setting /></el-icon>
                    <el-icon v-if="val.icon === 'DataAnalysis'"><DataAnalysis /></el-icon>
                    {{ val.title }}
                  </el-menu-item>
                </el-menu-item-group>
              </template>
              <template v-else>

              </template>
          </el-sub-menu>

        
      </template>
          <div class="collapse-bg">
            <el-icon v-if="isCollapse" @click="test" color="#fff" :size="20">
            <arrow-right-bold color="#fff" />
          </el-icon>
          <el-icon v-else @click="test" color="#fff" :size="20" style="float:left">
            <arrow-left-bold  />
          </el-icon>
          </div>
      </el-menu>
      </el-scrollbar>
   </div>
    <div class="router-container" id="router-container">
    <!-- 头部 -->
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu style="margin-left: auto;"  index="2">
      <template #title><el-icon><User /></el-icon>{{userName}}</template>
      <el-menu-item index="2-1" @click="goUserInfo()">个人信息</el-menu-item>
      <el-menu-item index="2-2" @click="goOut()">退出</el-menu-item>
    </el-sub-menu>
    </el-menu>
        <router-view></router-view>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from "vue-demi";
import { useRoute } from "vue-router";
import {
  ArrowLeftBold,
  ArrowRightBold,
} from '@element-plus/icons-vue';
import {User, Avatar, DataLine, TrendCharts, List, Setting, Tickets, Checked, Edit, Histogram, DataAnalysis} from '@element-plus/icons-vue'
import store from "../../store";
import router from "../../router";
import { computed } from "vue";
const route = useRoute();
const userName = computed(() => store.getters.userName);
//是否水平折叠收起菜单
const isCollapse = ref(false)


const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
//头部默认选中
const activeIndex = ref<string>('1');
//个人信息
const goUserInfo = async() => {
  router.push({ path: "/userInfo", query: {} })
/*   await store.dispatch("getUserInfo"); */
}
//退出
const goOut = async() => {
  router.push({ path: "/login", query: {} })
  await store.dispatch("clearLoginInfo");
}
const test =()=>{
  isCollapse.value = !isCollapse.value;
if (isCollapse.value===true){
  document.getElementById("router-container")!.style.width="calc(1150px + 120px)" ;
  document.getElementById("router-container")!.style.left="80px" ;
}else{
  document.getElementById("router-container")!.style.width="calc(1150px)" ;
  document.getElementById("router-container")!.style.left="200px" ;
}
}
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
.menu{
  width: 200px;
  top: 0;
  bottom: 0;
  position: absolute;
  left: 0;
  bottom: 0px;
}
.el-menu-vertical {
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  margin: 0px;
}

.router-container{
  position: absolute;
  top: 0;
  left: 200px;
  overflow: hidden;
  right: 0;
  width: 1150px;
  margin-bottom: 0px;
  height: 100%;
  z-index: 88;
}
.collapse-bg{
  padding:30px 0px 430px 25px;
  background: #545c64;
}
:deep(.el-scrollbar__view){
  height: 100%;
}
</style>