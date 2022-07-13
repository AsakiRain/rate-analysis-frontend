<template>
  <el-header>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content><span class="headerTitle">商品选择</span></template>
    </el-page-header>
  </el-header>
  <el-main>
    <div class="pageTitle">商品选择</div>
    <div class="tip">请选择想查看的商品</div>
    <el-divider />
    <Board />
  </el-main>
</template>
<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Board from '@/components/Board.vue';
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
.headerTitle {
  font-size: 16px;
  font-weight: bold;
}
.pageTitle {
  font-size: 26px;
}
.tip {
  font-size: 14px;
  color: #999;
}
</style>
