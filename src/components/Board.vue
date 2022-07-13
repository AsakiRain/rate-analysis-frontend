<template>
  <div class="cardWrapper">
    <el-card
      v-for="good in goods"
      :key="good.id"
      :body-style="bodyStyle"
      class="goodCard"
      shadow="hover"
      @click="handleClick(good)"
    >
      <div class="goodBody">
        <el-image :src="good.pic" class="goodPic">
          <template #error>
            <div class="errSlot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="goodInfo">
          <div class="goodName">{{ good.name }}</div>
          <div class="goodSales">销量：{{ good.sales }}</div>
          <div class="goodPrice">￥{{ good.price }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { apiGet } from '@/api';
import { reactive } from 'vue';
import { Picture } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

interface Good {
  id: string;
  name: string;
  pic: string;
  price: number;
  sales: number;
}

const router = useRouter();

const bodyStyle = { padding: 0, height: '100px' };

const goods = reactive([] as any);

apiGet('/goods').then((res) => {
  const data = res.data;
  goods.push(...data);
});

const handleClick = (good: Good) => {
  router.push({
    path: '/detail',
    query: {
      id: good.id
    }
  });
};
</script>
<style scoped>
.cardWrapper {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}
.goodCard {
  padding: 0;
  height: 100px;
  cursor: pointer;
}
.goodBody {
  display: flex;
}
.goodPic {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 100px;
  width: 100px;
}
.goodInfo {
  padding: 16px;
}
.goodName {
  font-size: 18px;
  font-weight: bold;
}
.goodSales {
  font-size: 14px;
  color: #999;
}
.goodPrice {
  font-size: 16px;
  color: #f5a623;
}
.errSlot {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfdfdf;
}
.errSlot > .el-icon {
  font-size: 32px;
}
</style>
