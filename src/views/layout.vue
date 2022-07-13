<template>
  <el-container id="wrapper">
    <el-aside>
      <Header />
      <Menu />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
</script>
<style scoped>
#wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-aside {
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow: hidden;
}
.el-main {
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>
