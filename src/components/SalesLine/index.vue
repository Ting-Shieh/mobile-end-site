<template>
  <div class="sales-line">
    <div class="sales-line-inner">
      <vue-echarts :option="options" style="width:100%;height: 100%"/>
    </div>
  </div>
</template>
<script setup>
import useCptPosition from '@/mock/useCptPosition.js'
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted } from 'vue'
const options = ref({})
const {
  salesLineData
} = useMockData()
const {
  salesLinePosition
} = useCptPosition()
/* eslint-disable */
const topVal = salesLinePosition.top
const heightVal = salesLinePosition.height
onMounted(() => {
  console.log('salesBarData: ', salesLineData.value)
  options.value = {
    title: {
      text: salesLineData.value.title,
      textStyle: {
        color: '#fff'
      },
      top: 10,
      left: 10
    },
    xAxis: {
      type: 'category',
      data: salesLineData.value.axis,
      axisLabel: {
        color: 'rgba(255, 255, 255, .3)'
      },
      axisLine: {
        show: false
      },
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(255, 255, 255, .3)'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        name: salesLineData.value.data1Obj.name,
        type: 'line',
        data: salesLineData.value.data1Obj.data1,
        smooth: true,
        itemStyle: {
          opacity: 0,
          // line 顏色
          color: 'rgb(0, 163, 233)'
        }
      },
      {
        name: salesLineData.value.data2Obj.name,
        type: 'line',
        data: salesLineData.value.data2Obj.data2,
        smooth: true,
        itemStyle: {
          opacity: 0,
          // line 顏色
          color: 'yellow'
        }
      },
      {
        name: salesLineData.value.data3Obj.name,
        type: 'line',
        data: salesLineData.value.data3Obj.data3,
        smooth: true,
        itemStyle: {
          opacity: 0,
          // line 顏色
          color: 'red'
        }
      },
    ]

  }
})
</script>
<style lang="scss" scoped>
  .sales-line{
    position: absolute;
    // top: v-bind(topVal);
    top: 950px;
    left: 0px;
    z-index: 10;
    width: 100%;
    // height: v-bind(heightVal);
    height: 500px;
    padding: 25px 25px 0px;
    box-sizing: border-box;
    .sales-line-inner{
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.05);
    }
  }
</style>
