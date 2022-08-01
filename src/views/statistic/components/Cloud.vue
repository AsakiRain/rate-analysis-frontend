<template>
  <el-card id="cloudCard" :body-style="{ padding: 0 }" shadow="never">
    <template #header>
      <el-row class="chartHeader" align="middle" :gutter="10">
        <el-col :span="1">词云图</el-col>
        <el-col :span="1">
          <el-button @click="handleClick">自定义</el-button>
        </el-col>
      </el-row>
    </template>
    <div id="cloudChart" class="chartBody"></div>
  </el-card>
  <el-dialog v-model="showCustomize" title="自定义词云图" width="500px">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showCustomize = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
    <el-main id="tabWrapper">
      <el-tabs v-model="actionType">
        <el-tab-pane label="形状" name="shape">
          <el-main>
            <el-radio-group v-model="shape">
              <el-radio-button label="circle">圆形</el-radio-button>
              <el-radio-button label="square">方形</el-radio-button>
              <el-radio-button label="triangle">三角形</el-radio-button>
              <el-radio-button label="pentagon">五边形</el-radio-button>
              <el-radio-button label="star">星形</el-radio-button>
            </el-radio-group>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="image">
          <el-main>
            <!-- <el-upload
            :limit="1"
            accept="image/*"
            :show-file-list="false"
            :auto-upload="false"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload> -->
            <input
              type="file"
              id="upload"
              accept="image/*"
              name="点击上传"
              @click="bindEvent"
            />
          </el-main>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-dialog>
</template>
<script lang="ts" setup>
import { inject, onMounted, watch, ref, toRefs, nextTick } from 'vue';
const props = defineProps({
  data: {
    type: Array,
    default: null
  }
});

const { data } = toRefs(props);
const echarts: any = inject('echarts');
const showCustomize = ref(false);
const actionType = ref('shape');
const shape = ref('circle');
let upload: any;

const handleClick = () => {
  showCustomize.value = true;
};
const handleConfirm = () => {
  showCustomize.value = false;
  if (actionType.value == 'shape') {
    option.series[0].shape = shape.value;
    option.series[0].maskImage = null;
    chart.setOption(option);
    chart.resize();
  }
};
const bindEvent = () => {
  upload = document.getElementById('upload');
  upload.addEventListener('change', changeMask);
};
const changeMask = () => {
  const file = upload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const maskImage = new Image();
      maskImage.src = reader.result as string;
      maskImage.onload = () => {
        option.series[0].maskImage = maskImage;
        chart.setOption(option);
        chart.resize();
        showCustomize.value = false;
      };
    };
  }
};
let chart: any;
let option: any = {
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      type: 'wordCloud',
      shape: 'cirle',
      keepAspect: true,
      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%',
      right: null,
      bottom: null,
      sizeRange: [12, 64],
      rotationRange: [-90, 90],
      rotationStep: 45,
      gridSize: 4,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          return (
            'rgb(' +
            [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') +
            ')'
          );
        }
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          textShadowBlur: 10,
          textShadowColor: '#333'
        }
      },
      data: [] as Array<object>
    }
  ]
};

onMounted(() => {
  const eleDom = document.getElementById('cloudChart');
  chart = echarts.init(eleDom);
  chart.setOption(option);
  chart.resize();
});
watch(
  () => data.value,
  () => {
    option.series[0].data = data.value;
    chart.setOption(option);
    chart.resize();
  }
);
</script>
<style scoped>
#cloudChart {
  height: 750px;
}
#cloudCard {
  flex: 1;
}
#tabWrapper{
  padding-top: 0;
  padding-bottom: 0;
}
</style>
