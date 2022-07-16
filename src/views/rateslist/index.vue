<template>
  <pageHeader title="商品概览" tip="爬不到数据所以没什么信息" />
  <el-main class="pageWrapper" id="summaryPage">
    <div id="leftSide">
      <!-- <Card /> -->
      <List />
    </div>
    <div id="rightSide">
      <Rate />
    </div>
  </el-main>
</template>
<script lang="ts" setup>
import Rate from './components/Rate.vue';
import List from './components/List.vue';
import pageHeader from '@/components/pageHeader.vue';
</script>
<style>
#summaryPage {
  display: flex;
  flex-direction: row;
}
#leftSide {
  flex: 1;
  display: flex;
}
#rightSide {
  padding-left: 20px;
  width: 500px;
  display: flex;
}
.cardTitle {
  font-weight: bold;
  font-size: 20px;
}
</style>
