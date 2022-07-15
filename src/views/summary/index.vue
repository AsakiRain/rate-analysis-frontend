<template>
  <pageHeader title="商品概览" tip="爬不到数据所以没什么信息" />
  <el-main class="pageWrapper" id="summaryPage">
    <div id="leftSide">
      <!-- <Card /> -->
      <List />
    </div>
    <div id="rightSide">
      <Card v-if="show == 'card'" />
      <Rate v-if="show == 'rate'" />
    </div>
  </el-main>
</template>
<script lang="ts" setup>
import Card from './components/Card.vue';
import Rate from './components/Rate.vue';
import List from './components/List.vue';
import pageHeader from '@/components/pageHeader.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const data = computed(() => {
  return JSON.parse(route.query.data as string);
});
const show = computed(() => {
  if (route.query.data) {
    return 'rate';
  } else {
    return 'card';
  }
});
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
