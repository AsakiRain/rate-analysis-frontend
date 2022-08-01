<template>
  <el-card class="chartCard" shadow="never">
    <template #header>
      <div class="chartHeader">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="chartBody" :id="id + 'Chart'"></div>
  </el-card>
</template>
<script lang="ts" setup>
import { inject, onMounted, watch, toRefs } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: null
  },
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
});

const { data, title, subtitle, name, id } = toRefs(props);
const echarts: any = inject('echarts');
let chart: echarts.ECharts;
let option = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: title.value,
    subtext: subtitle.value,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
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
      name: name.value,
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};

onMounted(() => {
  const ele = document.getElementById(id.value + 'Chart');
  chart = echarts.init(ele);
  chart.setOption(option);
  chart.resize();
});
watch(
  () => data.value,
  () => {
    option.xAxis.data = data.value[0] as Array<string>;
    option.series[0].data = data.value[1] as Array<number>;
    chart.setOption(option);
    chart.resize();
  }
);
</script>
<style scoped></style>
