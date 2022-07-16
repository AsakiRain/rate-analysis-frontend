<template>
  <el-card id="listCard" shadow="never">
    <template #header>
      <div id="listHeader">
        <el-row justify="space-between" align="middle">
          <span class="cardTitle">评论列表</span>
          <el-pagination
            v-if="countLoaded"
            background
            v-model:current-page="currentPage"
            :page-size="20"
            layout="prev, pager, next"
            :total="count"
          />
        </el-row>
      </div>
    </template>
    <el-table
      v-loading="!listLoaded"
      :data="data"
      :height="650"
      :width="920"
      fixed
      highlight-current-row
      @current-change="handleSelect"
    >
      <el-table-column prop="user_name" label="用户名" width="80" />
      <el-table-column prop="item_type" label="颜色分类" width="160" />
      <el-table-column prop="rate_content" label="评论内容" />
      <el-table-column prop="rate_date" label="评论时间" width="165" />
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { apiGet } from '@/api';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const columns = [
  {
    key: 'user_name',
    dataKey: 'user_name',
    title: '用户名',
    width: 70
  },
  {
    key: 'item_type',
    dataKey: 'item_type',
    title: '颜色分类',
    width: 160
  },
  {
    key: 'rate_content',
    dataKey: 'rate_content',
    title: '评论内容',
    width: 450
  },
  {
    key: 'rate_date',
    dataKey: 'rate_date',
    title: '评论时间',
    width: 160
  }
]; //v2 table columns, not used yet

const countLoaded = ref(false);
const listLoaded = ref(false);

const currentPage = ref(1);
const count = ref(0);
const data = ref([] as any[]);

apiGet('/api/good/rates/count', { id: route.query.id }).then((res) => {
  count.value = res.data['COUNT(*)'];
  countLoaded.value = true;
});

watch(
  () => currentPage.value,
  () => {
    listLoaded.value = false;
    apiGet('/api/good/rates', {
      id: route.query.id,
      page: currentPage.value
    }).then((res) => {
      data.value = res.data;
      listLoaded.value = true;
    });
  },
  {
    immediate: true
  }
);

const handleSelect = (row) => {
  if (row)
    router.push({
      path: '/detail/rateslist',
      query: {
        id: route.query.id,
        data: JSON.stringify(row)
      }
    });
};
</script>
<style scoped>
#listCard {
  flex-grow: 1;
}
</style>
