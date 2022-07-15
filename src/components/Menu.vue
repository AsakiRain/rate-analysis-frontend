<template>
  <el-menu
    background-color="rgb(48, 65, 86)"
    text-color="rgb(191, 203, 217)"
    id="menu"
    :default-active="activeMenu"
    @select="handleSelect"
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
      <el-menu-item index="/detail/summary" :disabled="!inDetail"
        >商品概览</el-menu-item
      >
      <el-menu-item index="/detail/statistic" :disabled="!inDetail"
        >数据分析</el-menu-item
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

const activeMenu = computed(() => {
  return route.path;
});

watch(
  () => router.currentRoute.value.fullPath,
  (val: string) => {
    const to = val.slice(1, 7);
    if (to === 'detail') {
      inDetail.value = true;
    } else {
      inDetail.value = false;
    }
  },
  {
    immediate: true
  }
);

const handleSelect = (path: string) => {
  if (path.slice(1, 7) === 'detail') {
    router.push({
      path: path,
      query: route.query
    });
  } else {
    router.push(path);
  }
};
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
