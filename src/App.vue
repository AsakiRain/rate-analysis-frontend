<template>
  <router-view />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { provide } from 'vue';

provide('echarts', echarts);
</script>

<style>
body {
  margin: 0;
}
</style>
