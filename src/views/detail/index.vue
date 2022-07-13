<template>
  <el-header>
    <el-page-header :icon="ArrowLeft" @back="goBack">
      <template #title>
        <span class="subTitle">返回</span>
      </template>
      <template #content>
        <span>
          <el-menu
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
            :default-active="activeMenu"
          >
            <el-menu-item index="/detail/list">评论查看</el-menu-item>
            <el-menu-item index="/detail/cloud">词云统计</el-menu-item>
            <el-menu-item index="/detail/emo">情感分析</el-menu-item>
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
.el-header {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.subTitle {
  line-height: 50px;
}
.el-menu {
  height: 50px;
  background-color: #f5f5f5;
}
.el-menu-item {
  font-weight: bold;
}
</style>
