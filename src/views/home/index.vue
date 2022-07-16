<template>
  <pageHeader title="首页" tip="首页其实不需要这个组件" />
  <el-main class="pageWrapper">
    <el-row justify="center" id="welcomeRow">
      <div id="welcome">
        <div id="subWelcome">欢迎使用</div>
        <div id="bigWelcome">天猫评论分析系统</div>
      </div>
    </el-row>
    <el-row id="inputRow" justify="center" align="middle" :gutter="10">
      <el-col :span="12">
        <el-input
          v-model="input"
          placeholder="在此处粘贴商品链接"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </el-col>
      <el-button type="primary" :loading="isParsing" @click="handleParse">
        解析
      </el-button>
    </el-row>
  </el-main>
  <el-dialog v-model="showMessage" title="提示" width="30%">
    <el-main id="messageWrapper">{{ message }}</el-main>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showMessage = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showInfo" title="商品概览" width="860px">
    <Summary :id="good_id" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showInfo = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import pageHeader from '@/components/pageHeader.vue';
import Summary from '@/components/Summary.vue';
import { ref } from 'vue';
import { apiGet } from '@/api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const isParsing = ref(false);
const input = ref('https://detail.tmall.com/item.htm?id=538766297543');
const showMessage = ref(false);
const showInfo = ref(false);
const state = ref(-1);
const message = ref('');
const good_id = ref('');

const handleConfirm = () => {
  switch (state.value) {
    case 0:
      ElMessage.success('操作成功');
      router.push({
        path: '/goods'
      });
      break;
    case 1:
      router.push({
        path: '/goods'
      });
      break;
    case 2:
      router.push({
        path: '/detail/rateslist',
        query: {
          id: good_id.value
        }
      });
      break;
  }
};

const handleParse = () => {
  const url = input.value.trim();
  if (url === '') return ElMessage.error('请输入商品链接');
  const queryString = url.split('?')[1];
  if (!queryString) return ElMessage.error('请输入完整商品链接');
  const queryArgs = queryString.split('&');
  let args = {};
  for (const arg of queryArgs) {
    const [key, value] = arg.split('=');
    args[key] = value;
  }
  if (args['id'] == undefined || args['id'] == '')
    return ElMessage.error('请输入完整商品链接');
  const id = args['id'];
  isParsing.value = true;
  apiGet('/api/parse', { id: id })
    .then((res) => {
      isParsing.value = false;
      state.value = res.data.state;
      switch (state.value) {
        case 0:
          message.value = '该商品没有记录，是否启动收集任务？';
          showMessage.value = true;
          break;
        case 1:
          message.value = '该商品的任务正在运行，将跳转到商品选择页面';
          showMessage.value = true;
          break;
        case 2:
          good_id.value = id;
          showInfo.value = true;
          break;
      }
    })
    .catch((err) => {
      isParsing.value = false;
      return ElMessage.error(err.message);
    });
};
</script>
<style>
#welcomeRow {
  margin-top: 20px;
  margin-bottom: 40px;
}
#subWelcome {
  font-size: 24px;
  color: #999;
}
#bigWelcome {
  font-size: 48px;
}
.el-dialog__body {
  padding: 0;
}
#messageWrapper {
  text-align: center;
  font-size: 16px;
}
</style>
