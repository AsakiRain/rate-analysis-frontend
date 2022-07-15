<template>
  <el-container id="wrapper">
    <el-aside id="sider">
      <Header />
      <Menu />
    </el-aside>
    <el-main id="mainWrapper">
      <router-view />
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
</script>
<style>
#wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#sider {
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow: hidden;
}
#mainWrapper {
  padding: 0;
  display: flex;
  flex-direction: column;
}
.pageWrapper {
  background-color: #f0f2f5;
  flex: 1;
}
</style>
