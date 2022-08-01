<template>
  <div>
    <pageHeader title="数据分析" tip="基于评论得出的分析结果" />
    <el-main id="statisticPage" class="pageWrapper">
      <el-row class="chartRow">
        <Pie
          :data="statistic.sales"
          title="销量构成"
          subtitle="分类销量统计"
          name="颜色分类"
          id="sales"
        />
        <Line
          :data="statistic.monthly"
          title="月成交量"
          subtitle="各月份成交数"
          name="月份"
          id="monthly"
          :show-background="false"
        />
      </el-row>
      <el-row class="chartRow">
        <Pie
          :data="statistic.emos"
          title="满意比例"
          subtitle="不同态度构成"
          name="满意度"
          id="emos"
        />
        <Bar
          :data="statistic.adjs"
          title="买家描述"
          subtitle="评论中对于商品的形容词"
          name="形容词"
          id="adjs"
          :item-style="itemStyle"
          :emphasis-item-style="emphasis_itemStyle"
        />
      </el-row>
      <el-row class="chartRow">
        <Wave
          :data="statistic.hourly"
          title="购买时段"
          subtitle="分时段购买量统计"
          name="数量"
          id="hourly"
        />
      </el-row>
      <el-row class="chartRow">
        <Bar
          :data="statistic.words"
          title="词频统计"
          subtitle="评论分词统计"
          name="词语"
          id="words"
          :item-style="itemStyle"
          :emphasis-item-style="emphasis_itemStyle"
        />
      </el-row>
      <el-row class="chartRow">
        <Cloud :data="statistic.cloud" />
      </el-row>
    </el-main>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import { apiGet } from '@/api';
import pageHeader from '@/components/pageHeader.vue';
import Cloud from '@/views/statistic/components/Cloud.vue';
import Pie from '@/views/statistic/components/Pie.vue';
import Bar from '@/views/statistic/components/Bar.vue';
import Wave from '@/views/statistic/components/Wave.vue';
import Line from '@/views/statistic/components/Line.vue';
import { ElMessage } from 'element-plus';

interface statistic {
  sales: Array<object>;
  emos: Array<object>;
  hourly: Array<string>;
  monthly: Array<string>;
  adjs: Array<string>;
  words: Array<Array<string> | Array<number>>;
  cloud: Array<object>;
}

provide('echarts', echarts);

const route = useRoute();
const statistic = ref({} as statistic);
const itemStyle = {
  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#83bff6' },
    { offset: 0.5, color: '#188df0' },
    { offset: 1, color: '#188df0' }
  ])
};
const emphasis_itemStyle = {
  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#2378f7' },
    { offset: 0.7, color: '#2378f7' },
    { offset: 1, color: '#83bff6' }
  ])
};

apiGet('/api/good/statistic', { id: route.query.id })
  .then((res) => {
    statistic.value = res.data;
  })
  .catch((err) => {
    ElMessage.error(err.message);
  });
</script>
<style>
.chartHeader {
  font-size: 16px;
  font-weight: bold;
}
.chartCard {
  flex: 1;
  height: 540px;
}
.chartRow {
  display: flex;
}
.chartCard:nth-child(2) {
  margin-left: 20px;
}
.chartBody {
  width: 100%;
  height: 440px;
}
#statisticPage > * {
  margin-bottom: 20px;
}
</style>
