<template>
  <el-header class="navHeader">
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content><span class="navTitle">统计信息</span></template>
    </el-page-header>
  </el-header>
</template>
<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { defineProps, toRefs } from 'vue';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: '返回'
  }
});

const { title } = toRefs(props);

const goBack = () => {
  router.back();
};
</script>
<style scoped>
.navHeader {
  background-color: rgb(48, 65, 86);
  color: rgb(191, 203, 217);
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  display: flex;
  align-items: center;
}
.navTitle {
  font-size: 16px;
  font-weight: bold;
  color: rgb(191, 203, 217);
}
</style>
