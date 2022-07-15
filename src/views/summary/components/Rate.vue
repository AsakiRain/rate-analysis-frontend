<template>
  <el-card id="rateCard">
    <template #header>
      <div id="rateHeader">
        <el-row justify="space-between" align="middle">
          <span class="cardTitle">评论详情</span>
          <el-icon id="cardBack" @click="handleBack"><CloseBold /></el-icon>
        </el-row>
      </div>
    </template>
    <div id="rateBody">
      <el-row id="nameRow">
        <span>
          <el-tag
            type="warning"
            :disable-transitions="noAnimate"
            size="small"
            v-if="data.gold_user"
          >
            超级会员
          </el-tag>
          {{ data.user_name }}：
        </span>
      </el-row>
      <el-row id="typeRow">
        <span>
          <el-tag type="info" :disable-transitions="noAnimate" size="small">
            颜色分类
          </el-tag>
          {{ data.item_type }}
        </span>
      </el-row>
      <el-row id="contentRow">
        <span id="rateContent">
          <el-tag :disable-transitions="noAnimate" size="small"
            >初次评价</el-tag
          >
          {{ data.rate_content }}
        </span>
      </el-row>
      <el-row id="picsRow" v-if="data.hasPicture">
        <el-image
          class="ratePic"
          v-for="(pic, index) in data.pics"
          :key="index"
          :src="pic"
          :style="picStyle"
          fit="cover"
          :preview-src-list="data.pics"
          :initial-index="index"
          :hide-on-click-modal="true"
        ></el-image>
      </el-row>
      <el-row id="dateRow">
        <span>
          <el-tag type="info" :disable-transitions="noAnimate" size="small">
            评价时间
          </el-tag>
          {{ data.rate_date }}
        </span>
      </el-row>
      <el-row id="appendRow" v-if="data.hasAppend">
        <span>
          <el-tag type="success" :disable-transitions="noAnimate" size="small">
            收货{{ data.append_days }}天后追加
          </el-tag>
          {{ data.append_comment }}
        </span>
      </el-row>
      <el-row id="appendPicsRow" v-if="data.hasAppendPicture">
        <el-image
          class="ratePic"
          v-for="(pic, index) in data.appendPics"
          :key="index"
          :src="pic"
          :style="picStyle"
          fit="cover"
          :preview-src-list="data.appendPics"
          :initial-index="index"
          :hide-on-click-modal="true"
        ></el-image>
      </el-row>
      <el-row id="replyRow" v-if="data.reply">
        <span>
          <el-tag type="danger" :disable-transitions="noAnimate" size="small">
            商家回复
          </el-tag>
          {{ data.reply }}
        </span>
      </el-row>
      <el-row id="sentimentRow" align="middle">
        <el-tag type="warning" :disable-transitions="noAnimate" size="small">
          满意度
        </el-tag>
        <el-rate
          v-model="data.sentiment"
          :max="10"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}分"
        />
      </el-row>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { CloseBold } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const noAnimate = ref(true);
const picStyle = {
  width: '120px',
  height: '120px'
};

const handleBack = () => {
  router.push({
    path: '/detail/summary',
    query: {
      id: route.query.id
    }
  });
};

const data = computed(() => {
  const raw = JSON.parse(route.query.data as string);
  const hasAppend = raw.append_comment !== 'null';
  const hasPicture = raw.pics !== '[]';
  const append_comment = hasAppend ? JSON.parse(raw.append_comment) : null;
  const pics = hasPicture ? JSON.parse(raw.pics) : null;
  const hasAppendPicture = append_comment && append_comment.pics != [];
  const appendPics = hasAppendPicture ? append_comment.pics : null;
  let result = {
    user_name: raw.user_name,
    item_type: raw.item_type,
    rate_content: raw.rate_content,
    rate_date: raw.rate_date,
    gold_user: raw.gold_user,
    hasAppend,
    hasPicture,
    hasAppendPicture,
    pics,
    appendPics,
    append_days: hasAppend ? append_comment.days : null,
    append_comment: hasAppend ? append_comment.content : null,
    reply: raw.reply,
    sentiment: Math.floor(raw.sentiment * 10 * 100) / 100
  };
  return result;
});
</script>
<style scoped>
#rateCard {
  flex-grow: 1;
}
#cardBack {
  cursor: pointer;
  font-size: 24px;
}
#nameRow {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}
.ratePic {
  margin: 3px;
}
#typeRow,
#contentRow,
#picsRow,
#dateRow,
#appendRow,
#replyRow,
#sentimentRow {
  margin-top: 10px;
}
#typeRow,
#dateRow {
  font-size: 14px;
  color: #999;
}
</style>
