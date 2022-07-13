<template>
  <el-header>
    <el-page-header :icon="ArrowLeft" @back="goBack">
    <template #title>
      <span class="subTitle">返回</span>
    </template>
      <template #content>
        <span>
          <el-menu :router="true" mode="horizontal" :ellipsis="false">
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
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back();
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
</style>
