<script setup lang="ts">
</script>

<template>
  <!-- 路由不同路径组件复用不刷新解决  :key="$route.href" -->
  <router-view :key="$route.href"/>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
