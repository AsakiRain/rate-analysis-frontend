<template>
  <el-header class="navHeader">
    <el-page-header :icon="ArrowLeft" @back="goBack">
      <template #title>
        <span class="subTitle">返回</span>
      </template>
      <template #content>
        <span>
          <el-menu
            background-color="rgb(48, 65, 86)"
            text-color="rgb(191, 203, 217)"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
            :default-active="activeMenu"
          >
            <el-menu-item index="/detail/summary">商品概览</el-menu-item>
            <el-menu-item index="/detail/statistic">数据分析</el-menu-item>
          </el-menu>
        </span>
      </template>
    </el-page-header>
  </el-header>
  <router-view />
</template>
<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const activeMenu = computed(() => {
  return route.path;
});
const goBack = () => {
  router.back();
};

const handleSelect = (path: string) => {
  router.push({
    path: path,
    query: route.query
  });
};
</script>
<style scoped>
.subTitle {
  line-height: 50px;
}
.el-menu {
  height: 50px;
}
.el-menu-item {
  font-weight: bold;
}
</style>
