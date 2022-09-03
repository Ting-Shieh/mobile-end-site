<template>
  <div class="sales-radar">
    <div class="sales-radar-inner">
      <vue-echarts :option="options" style="width:100%;height: 100%"/>
    </div>
  </div>
</template>
<script setup>
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted } from 'vue'
const options = ref({})
const {
  salesRadarData
} = useMockData()

onMounted(() => {
  options.value = {
    radar: {
      name: {},
      indicator: salesRadarData.value.indicator
    },
    tooltip: {},
    series: [{
      name: salesRadarData.value.name,
      type: 'radar',
      data: [
        { ...salesRadarData.value.predictData },
        { ...salesRadarData.value.realData }
      ]
    }]
  }
})
</script>
<style lang="scss" scoped>
  .sales-radar{
    position: absolute;
    top: 2650px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 800px;
    padding: 25px 12.5px 0px;
    box-sizing: border-box;
    .sales-radar-inner{
      background: rgba(255,255,255,0.05);
      width: 100%;
      height: 100%;

    }
  }
</style>
