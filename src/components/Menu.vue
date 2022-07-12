<template>
  <el-menu background-color="#f5f5f5" :router="true" id="menu">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/stat">统计</el-menu-item>
    <el-menu-item index="/good">商品</el-menu-item>
    <el-menu-item index="/about">关于</el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup></script>
<style scoped>
#menu {
  flex-grow: 1;
}
.el-menu-item{
  font-size: 16px;
}
</style>
