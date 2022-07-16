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
          <div class="goodName" v-if="good.name">{{ good.name }}</div>
          <div class="goodName" v-else>ID：{{ good.id }}</div>
          <div class="goodState">
            <el-tag :type="getType(good.state)">{{
              getText(good.state)
            }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog v-model="showInfo" title="商品概览" width="860px">
      <Summary :id="current.state == 2 ? current.id : ''" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showInfo = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showState" title="收集状态" width="860px">
      <State :id="current.state == 1 ? current.id : ''" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showState = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { apiGet } from '@/api';
import { ref } from 'vue';
import { Picture } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Summary from '@/components/Summary.vue';
import State from '@/components/State.vue';

interface good {
  id: string;
  name?: string;
  state: number;
  pic?: string;
}

const router = useRouter();
const bodyStyle = { padding: 0, height: '100px' };
const showInfo = ref(false);
const showState = ref(false);
const current = ref({} as good);
const goods = ref([] as good[]);

const getType = (state: number) => {
  switch (state) {
    case -1:
      return 'danger';
    case 1:
      return '';
    case 2:
      return 'success';
  }
};

const getText = (state: number) => {
  switch (state) {
    case -1:
      return '发生错误';
    case 1:
      return '收集中';
    case 2:
      return '已完成';
  }
};
apiGet('/api/goods').then((res) => {
  goods.value = res.data;
});

const handleClick = (good: good) => {
  current.value = good;
  switch (current.value.state) {
    case -1:
      break;
    case 1:
      showState.value = true;
      break;
    case 2:
      showInfo.value = true;
      break;
  }
};
const handleConfirm = () => {
  switch (current.value.state) {
    case -1:
      break;
    case 1:
      showState.value = false;
      break;
    case 2:
      showInfo.value = false;
      router.push({
        path: '/detail/rateslist',
        query: {
          id: current.value.id
        }
      });
      break;
  }
};
</script>
<style>
.cardWrapper {
  box-sizing: border-box;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(auto-fit, minmax(400px, 32%));
  grid-gap: 20px;
}
.goodCard {
  padding: 0;
  height: 100px;
  cursor: pointer;
  /* width: 400px; */
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
  padding: 10px;
  flex: 1;
}
.goodName {
  font-size: 16px;
  font-weight: bold;
}
.goodState {
  margin-top: 10px;
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
.el-dialog__body {
  padding: 0;
}
</style>
