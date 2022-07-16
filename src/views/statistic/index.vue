<template>
  <div>
    <pageHeader title="数据分析" tip="就1000条评论还分析什么东西" />
    <el-main id="statisticPage" class="pageWrapper">
      <el-row><Cloud /></el-row>
      <Sales />
      <Description />
    </el-main>
  </div>
</template>
<script lang="ts" setup>
import pageHeader from '@/components/pageHeader.vue';
import Cloud from '@/views/statistic/components/Cloud.vue';
import Sales from '@/views/statistic/components/Sales.vue';
import Description from '@/views/statistic/components/Description.vue';
</script>
<style>
.chartHeader {
  font-size: 16px;
  font-weight: bold;
}
.chartCard {
  width: 680px;
  height: 580px;
}
.chartBody {
  width: 640px;
  height: 480px;
}
#statisticPage > * {
  margin-bottom: 20px;
}
</style>
