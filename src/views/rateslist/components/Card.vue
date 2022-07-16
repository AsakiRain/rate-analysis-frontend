<template>
  <el-card :body-style="bodyStyle" id="detailCard">
    <el-row id="basic">
      
    </el-row>
    <!-- <div class="infoWrapper">
      <div class="infoName">{{ detail.name }}</div>
      <el-divider />
      <div>
        <span class="infoLabel">价格区间：</span>
        <span class="infoPrice">￥{{ detail.price }}</span>
      </div>
    </div> -->
  </el-card>
</template>
<script lang="ts" setup>
import { apiGet } from '@/api';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bodyStyle = { padding: 0 };

const detail = reactive({} as any);
const pics = reactive([] as string[]);

apiGet('/api/good/summary', { id: route.query.id }).then((res) => {
  const data = res.data;
  Object.assign(detail, data);
  pics.push(...JSON.parse(data.picture));
});
</script>
<style scoped>
#detailCard{
  flex-grow: 1;
}
#slider {
  width: 50%;
  height: 50%;
}
.detailBody {
  height: 810px;
}
.detailPic {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.infoWrapper {
  padding: 30px;
  flex: 1;
}
.infoName {
  font-size: 24px;
  font-weight: bold;
}
.infoLabel {
  font-size: 16px;
  color: #999;
  font-weight: bold;
}
.infoPrice {
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
