<template>
  <el-main id="summaryBody" :loading="isLoading">
    {{ data.name }}
  </el-main>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { apiGet } from '@/api';
import { ElMessage } from 'element-plus';

interface data {
  name: string;
  price: string;
  id: string;
  status: string;
  sales: string;
  picture: string;
  description: string;
  descore: string;
}
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const { id } = toRefs(props);
const isLoading = ref(true);
const data = ref({
  name: '获取中',
  price: '获取中',
  id: '获取中',
  status: '获取中',
  sales: '[]',
  picture: '[]',
  description: '[]',
  descore: '[]'
} as data);

watch(
  () => id.value,
  () => {
    isLoading.value = true;
    apiGet('/api/good/summary', { id: id.value })
      .then((res) => {
        data.value = res.data;
      })
      .catch((err) => {
        isLoading.value = false;
        return ElMessage.error(err.message);
      });
  },
  { immediate: true }
);
</script>
<style scoped>
#summaryBody {
  padding: 0;
}
</style>
