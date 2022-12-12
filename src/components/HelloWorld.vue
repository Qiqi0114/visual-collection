<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <el-button type="primary">主要按钮</el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
