<template>
  <el-main id="stateBody">
    <el-descriptions :column="1" :border="true" id="infoWrapper">
      <template #title>
        <div id="titleSlot">ID：{{ data.id }}</div>
      </template>
      <el-descriptions-item label="基本信息">
        <el-tag :type="getType(data.summary)">{{
          getText(data.summary)
        }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="评论列表">
        <el-tag :type="getType(data.rates)">
          {{ getText(data.rates) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="情感分析">
        <el-tag :type="getType(data.sentiment)">{{
          getText(data.sentiment)
        }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="统计数据">
        <el-tag :type="getType(data.statistic)">{{
          getText(data.statistic)
        }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-main>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { apiGet } from '@/api';
import { ElMessage } from 'element-plus';

interface data {
  cloud: number;
  description: number;
  id: string;
  rates: number;
  sentiment: number;
  state: number;
  statistic: number;
  summary: number;
}

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});
const { id } = toRefs(props);
const data = ref({
  cloud: 0,
  description: 0,
  id: '',
  rates: 0,
  sentiment: 0,
  state: 0,
  statistic: 0,
  summary: 0
} as data);
let watcher: any;
const update = () => {
  apiGet('/api/good/state', { id: id.value })
    .then((res) => {
      data.value = res.data;
      if (data.value.state == -1 && watcher) {
        clearInterval(watcher);
        ElMessage.error(`任务ID：${data.value.id} 失败！`);
      }
    })
    .catch((err) => {
      if (watcher) clearInterval(watcher);
      ElMessage.error(err.message);
    });
};

const getText = (state: number) => {
  switch (state) {
    case -1:
      return '失败';
    case 0:
      return '等待中';
    case 1:
      return '运行中';
    case 2:
      return '已完成';
  }
};

const getType = (state: number) => {
  switch (state) {
    case -1:
      return 'danger';
    case 0:
      return 'info';
    case 1:
      return '';
    case 2:
      return 'success';
  }
};

watch(
  () => id.value,
  () => {
    if (id.value != '' && id.value != null) {
      clearInterval(watcher);
      update();
      watcher = setInterval(() => {
        console.log('::Watcher retriving data...');
        update();
      }, 1000);
    }
  },
  { immediate: true }
);
</script>
<style scoped>
#titleSlot {
  font-size: 24px;
  font-weight: bold;
}
</style>
