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
  },
  showBackground: {
    type: Boolean,
    default: true
  }
});

const { data, title, subtitle, name, id, showBackground } = toRefs(props);
const echarts: any = inject('echarts');
let chart: echarts.ECharts;
let option = {
  title: {
    text: title.value,
    subtext: subtitle.value,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
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
      type: 'line',
      smooth: true,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      showBackground: showBackground.value,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
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
