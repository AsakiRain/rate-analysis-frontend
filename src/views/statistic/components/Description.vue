<template>
  <el-card class="chartCard" id="descriptionCard">
    <template #header>
      <div class="chartHeader">
        <span>描述词频</span>
      </div>
    </template>
    <div id="descriptionChart" class="chartBody"></div>
  </el-card>
</template>
<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import { apiGet } from '@/api';
import { useRoute } from 'vue-router';

const route = useRoute();
const echarts: any = inject('echarts');
const optionRaw: echarts.EChartsOption = {
  title: {
    text: '描述词频',
    subtext: '描述商品的关键词',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: [
      '获取中',
      '获取中',
      '获取中',
      '获取中',
      '获取中',
      '获取中',
      '获取中',
      '获取中',
      '获取中',
      '获取中'
    ]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};
let option: echarts.EChartsOption;

onMounted(() => {
  const eleDom = document.getElementById('descriptionChart')!;
  const chart = echarts.init(eleDom);
  chart.setOption(optionRaw);
  apiGet('/api/good/statistic/description', { id: route.query.id }).then(
    (res) => {
      const data = JSON.parse(res.data);
      option = {
        xAxis: {
          type: 'category',
          data: data[0]
        },
        series: [
          {
            data: data[1],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      chart.setOption(option);
    }
  );
});
</script>
<style scoped></style>
