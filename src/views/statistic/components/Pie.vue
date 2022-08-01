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
  legend: {
    orient: 'vertical',
    bottom: 'bottom'
  },
  series: [
    {
      name: name.value,
      type: 'pie',
      radius: '50%',
      data: [] as Array<object>,
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

onMounted(() => {
  const ele = document.getElementById(id.value + 'Chart');
  chart = echarts.init(ele);
  chart.setOption(option);
  chart.resize();
});
watch(
  () => data.value,
  () => {
    option.series[0].data = data.value as Array<object>;
    chart.setOption(option);
    chart.resize();
  }
);
</script>
<style scoped></style>
