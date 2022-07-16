<template>
  <el-card class="chartCard" id="salesCard">
    <template #header>
      <div class="chartHeader">
        <span>颜色分类</span>
      </div>
    </template>
    <div id="salesChart" class="chartBody"></div>
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
    text: '颜色分类',
    subtext: '买家选择组成',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom'
  },
  series: [
    {
      name: '加载中，请稍等',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
let option: echarts.EChartsOption;

onMounted(() => {
  const eleDom = document.getElementById('salesChart')!;
  const chart = echarts.init(eleDom);
  chart.setOption(optionRaw);
  apiGet('/api/good/statistic/sales', { id: route.query.id }).then((res) => {
    option = {
      series: [
        {
          name: '颜色分类',
          type: 'pie',
          radius: '50%',
          data: JSON.parse(res.data),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
  });
});
</script>
<style scoped></style>
