<template>
  <pageHeader title="商品选择" tip="选择想查看的商品" />
  <el-main class="pageWrapper">
    <Board />
  </el-main>
</template>
<script setup lang="ts">
import Board from '@/components/Board.vue';
import pageHeader from '@/components/pageHeader.vue';
</script>
<style scoped></style>
