<template>
  <el-menu
    background-color="#f5f5f5"
    id="menu"
    :default-active="activeMenu"
    :router="true"
  >
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/stat">
      <el-icon><Histogram /></el-icon>
      <span>统计信息</span>
    </el-menu-item>
    <el-menu-item index="/goods">
      <el-icon><GoodsFilled /></el-icon>
      <span>商品选择</span>
    </el-menu-item>
    <el-sub-menu index="/detail">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>商品详情</span>
      </template>
      <el-menu-item index="/detail/list" :disabled="!inDetail"
        >评论列表</el-menu-item
      >
      <el-menu-item index="/detail/cloud" :disabled="!inDetail"
        >词云统计</el-menu-item
      >
      <el-menu-item index="/detail/emo" :disabled="!inDetail"
        >情感分析</el-menu-item
      >
    </el-sub-menu>
    <el-menu-item index="/about">
      <el-icon><InfoFilled /></el-icon>
      <span>关于</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import {
  HomeFilled,
  Histogram,
  GoodsFilled,
  InfoFilled,
  Menu
} from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const inDetail = ref(false);

watch(
  () => router.currentRoute.value.fullPath,
  (val: string) => {
    const paths = val.split('/');
    if (paths[1] === 'detail') {
      inDetail.value = true;
    } else {
      inDetail.value = false;
    }
  },
  {
    immediate: true
  }
);
const activeMenu = computed(() => {
  return route.path;
});
</script>
<style scoped>
#menu {
  flex-grow: 1;
}
.el-menu-item,
.el-sub-menu__title * {
  font-size: 16px;
}
</style>
