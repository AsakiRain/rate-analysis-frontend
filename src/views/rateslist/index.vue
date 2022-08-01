<template>
  <pageHeader title="评论查看" tip="显示详细的爬取结果" />
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
