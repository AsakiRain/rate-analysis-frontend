<template>
  <el-header>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content><span class="pageHeaderContent">商品</span></template>
    </el-page-header>
  </el-header>
  <el-main><router-view /></el-main>
</template>
<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
<style scoped>
.el-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  display: flex;
  align-items: center;
}
.pageHeaderContent {
  font-size: 16px;
  font-weight: bold;
}
</style>
