<template>
  <div class="headerWrapper">
    <div class="titleWrapper">
      <div class="pageTitle">{{ title }}</div>
      <div class="tip">{{ tip }}</div>
    </div>
    <!-- <el-divider /> -->
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  }
});
const { title, tip } = toRefs(props);
</script>
<style scoped>
.headerWrapper{
  margin: 20px;
}
.pageTitle {
  font-size: 26px;
}
.tip {
  font-size: 14px;
  color: #999;
}
</style>
