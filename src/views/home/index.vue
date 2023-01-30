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
      <template v-for="item in $router.options.routes[2].children" :key="item.meta.key">
        <template v-if="item.children">
          <el-sub-menu :index="item.meta.key">
              <!-- 一级导航 -->
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.meta.title }}</span>
              </template>
              <!-- 二级导航 -->
              <template v-if="item.children">
                <el-menu-item-group v-for="val in item.children"  :key="val.meta.key">
                  <template v-if="val.children">
                    <el-sub-menu v-for="ele in item.children" :key="ele.meta.key" :index="ele.path">
                      <template #title>
                        <el-icon><location /></el-icon>
                        <span>{{ item.meta.title }}</span>
                      </template>
                      <el-menu-item  :index="ele.path">{{ ele.meta.title }}</el-menu-item>
                    </el-sub-menu>
                  </template>
                  <template v-else>
                  <el-menu-item
                    :index="val.path">
                    {{ val.meta.title }}
                  </el-menu-item>
                </template>
                </el-menu-item-group>

              </template>
          </el-sub-menu>
        </template>
        
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
    <el-sub-menu index="2">
      <template #title>账号</template>
      <el-menu-item index="2-1" @click="goOut()">退出</el-menu-item>
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
  Setting,
  ArrowLeftBold,
  ArrowRightBold,
} from '@element-plus/icons-vue';
import store from "../../store";
import router from "../../router";
const route = useRoute();

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
//退出
const goOut = async() => {
  router.push({ path: "/login", query: {} })
  await store.dispatch("clearLoginInfo");
}
const test =()=>{
  isCollapse.value = !isCollapse.value;
if (isCollapse.value===true){
  document.getElementById("router-container")!.style.width="calc(100% - 63px)" ;
}else{
  document.getElementById("router-container")!.style.width="calc(100% - 200px)" ;
}
}
</script>

<style lang="scss" scoped>
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
  overflow: hidden;
  right: 0;
  width: 1050px;
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