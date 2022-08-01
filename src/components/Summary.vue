<template>
  <el-main id="summaryBody" :loading="isLoading">
    <el-carousel :interval="3000" arrow="always" id="slider" height="400px">
      <el-carousel-item v-for="(pic, index) in data.pics" :key="index">
        <el-image :src="pic" fit="cover" class="sliderImage">
          <template #placeholder>
            <div class="placeholderSlot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <el-descriptions :column="1" :border="true" id="infoWrapper">
      <template #title>
        <div id="titleSlot">{{ data.name }}</div>
      </template>
      <el-descriptions-item label="商品ID">{{ id }}</el-descriptions-item>
      <el-descriptions-item label="价格区间">
        <span id="infoPrice">￥{{ data.price }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="颜色分类">
        <el-popover
          placement="right-start"
          title="所有颜色分类"
          trigger="click"
          width="400px"
        >
          <template #reference>
            <el-button>点击查看</el-button>
          </template>
          <el-row v-for="type in data.types" class="tag">
            <el-tag size="small">
              {{ type }}
            </el-tag>
          </el-row>
        </el-popover>
      </el-descriptions-item>
    </el-descriptions>
  </el-main>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { apiGet } from '@/api';
import { Picture } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

interface data {
  name: string;
  price: string;
  pics: string[];
  descore: string[];
  types: any[];
}
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const { id } = toRefs(props);
const isLoading = ref(true);
const data = ref({} as data);

watch(
  () => id.value,
  () => {
    if (id.value != '' && id.value != null) {
      isLoading.value = true;
      apiGet('/api/good/summary', { id: id.value })
        .then((res) => {
          data.value = res.data;
        })
        .catch((err) => {
          ElMessage.error(err.message);
        });
    }
  },
  { immediate: true }
);
</script>
<style scoped>
#summaryBody {
  padding: 10px 20px 0 20px;
  display: flex;
  width: 860px;
}
#slider {
  width: 400px;
}
.placeholderSlot {
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sliderImage {
  height: 400px;
  width: 400px;
  border-radius: 4px;
}
#titleSlot {
  font-size: 24px;
  font-weight: bold;
}
.tag {
  margin-bottom: 4px;
}
#infoWrapper {
  width: 400px;
  margin-left: 20px;
}
#infoPrice {
  color: #f5a623;
}
</style>
