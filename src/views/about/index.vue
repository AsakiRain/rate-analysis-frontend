<template>
  <pageHeader title="关于" tip="不知道要说什么" />
  <el-main class="pageWrapper">
    <el-row justify="center" id="titleRow" class="row">
      <div id="welcome">
        <div id="subTitle">2022软件开发实践1</div>
        <div id="bigTitle">天猫评论分析系统</div>
      </div>
    </el-row>
    <el-row justify="center" class="row">
      <el-col :span="8">
        <el-descriptions :column="1" :border="true">
          <template #title>
            <div id="titleSlot">团队成员及分工</div>
          </template>
          <el-descriptions-item label="瞿吴吉">
            代码整合，数据库
          </el-descriptions-item>
          <el-descriptions-item label="郁辰">前后端的搭建</el-descriptions-item>
          <el-descriptions-item label="时扣">爬虫</el-descriptions-item>
          <el-descriptions-item label="张佳明">数据分析</el-descriptions-item>
          <el-descriptions-item label="李忠民">情感分析</el-descriptions-item>
          <el-descriptions-item label="陈斌">关键词提取</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row justify="center" class="row">
      <el-col :span="8">
        <el-descriptions :column="1" :border="true">
          <template #title>
            <div id="titleSlot">技术栈</div>
          </template>
          <el-descriptions-item label="前端">
            <div class="tagWrapper">
              <el-tag type="info">TypeScript</el-tag>
              <el-tag type="success">Vue3</el-tag>
              <el-tag type="warning">Vite</el-tag>
              <el-tag>Element Plus</el-tag>
              <el-tag type="danger">Echarts</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="后端">
            <div class="tagWrapper">
              <el-tag type="danger">Flask</el-tag>
              <el-tag>MySQL</el-tag>
              <el-tag type="success">PyMysql</el-tag>
              <el-tag type="warning">SQLAlchemy</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="数据处理">
            <div class="tagWrapper">
              <el-tag>SnowNLP</el-tag>
              <el-tag type="danger">jieba</el-tag>
              <el-tag type="success">Pandas</el-tag>
              <el-tag type="warning">matplotlib</el-tag>
              <el-tag type="info">numpy</el-tag>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-main>
</template>
<script setup lang="ts">
import pageHeader from '@/components/pageHeader.vue';
</script>
<style scope>
#titleRow {
  margin-top: 20px;
  margin-bottom: 40px;
}
#subTitle {
  font-size: 24px;
  color: #999;
}
#bigTitle {
  font-size: 48px;
}
.tagWrapper > * {
  margin-right: 10px;
}
.row{
  margin-bottom: 20px;
}
</style>
