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
  <el-dialog v-model="showDialog" :title="dialogTitle" width="30%">
    <el-main v-if="actionType == 0 || actionType == 1">{{ message }}</el-main>
    <Summary v-if="actionType == 2" :id="id" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="isQuerying">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import pageHeader from '@/components/pageHeader.vue';
import { ref } from 'vue';
import { apiGet } from '@/api';
import { ElMessage } from 'element-plus';
import Summary from '@/components/Summary.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isParsing = ref(false);
const isQuerying = ref(false);
const input = ref('');
const showDialog = ref(false);
const actionType = ref(-1);
const message = ref('');
const dialogTitle = ref('');
const id = ref('');

const handleConfirm = () => {
  isQuerying.value = true;
  switch (actionType.value) {
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
          id: id.value
        }
      });
      break;
  }
  isQuerying.value = false;
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
  id.value = args['id'];
  isParsing.value = true;
  apiGet('/api/parse', { id: id.value })
    .then((res) => {
      isParsing.value = false;
      actionType.value = res.data.status;
      switch (actionType.value) {
        case 0:
          dialogTitle.value = '提示';
          message.value = '该商品没有被数据库收录，你想要添加爬虫任务吗';
          break;
        case 1:
          dialogTitle.value = '提示';
          message.value = '该商品正在爬取，将导航到商品选择页面';
          break;
        case 2:
          dialogTitle.value = '商品概览';
          break;
      }
      showDialog.value = true;
    })
    .catch((err) => {
      isParsing.value = false;
      return ElMessage.error(err.message);
    });
};
</script>
<style scoped>
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
</style>
