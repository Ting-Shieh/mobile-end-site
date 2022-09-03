<template>
  <div class="sales-bar">
    <div class="sales-bar-inner">
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
  salesBarData
} = useMockData()
const {
  salesBarPosition
} = useCptPosition()
/* eslint-disable */
const topVal = salesBarPosition.top
const heightVal = salesBarPosition.height

onMounted(() => {
  console.log('salesBarPosition: ', salesBarPosition.value)
  options.value = {
    title: {
      text: salesBarData.value.title,
      textStyle: {
        color: '#fff'
      },
      top: 10
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: salesBarData.value.axis,
      axisLabel: {
        color: '#fff'
      }
    },
    grid: {
      left: '2%',
      // right: '8%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      {
        name: salesBarData.value.data1Obj.name,
        type: 'bar',
        data: salesBarData.value.data1Obj.data1,
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        itemStyle: {
          // 柱子顏色
          color: 'rgb(235, 9, 5)'
        }
      },
      {
        name: salesBarData.value.data2Obj.name,
        type: 'bar',
        data: salesBarData.value.data2Obj.data2,
        itemStyle: {
          color: 'rgb(0, 140, 217)'
        }
      }
    ]

  }
})
</script>
<style lang="scss" scoped>
  .sales-bar{
    position: absolute;
    // top: v-bind(topVal);
    top: 300px;
    left: 0px;
    z-index: 10;
    width: 100%;
    // height: v-bind(heightVal); 
    height: 650px;
    padding: 25px 25px 0px;
    box-sizing: border-box;
    .sales-bar-inner{
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.05);
    }
  }
</style>
