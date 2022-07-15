<template>
  <pageHeader title="商品概览" tip="爬不到数据所以没什么信息" />
  <el-main class="pageWrapper">
    <Card />
    <List />
  </el-main>
</template>
<script lang="ts" setup>
import Card from './components/Card.vue';
import List from './components/List.vue';
import pageHeader from '@/components/pageHeader.vue';
</script>
<style scoped></style>
