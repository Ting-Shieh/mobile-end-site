<template>
  <div class="sales-bar">
    <div class="sales-bar-inner">
      {{axis}}
      <vue-echarts :option="options" style="width:100%;height: 100%"/>
    </div>
  </div>
</template>
<script setup>
import useCptPosition from '@/mock/useCptPosition.js'
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted, defineProps, computed, watch } from 'vue'
const props = defineProps({
  data: {
    type: Object
  }
})
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
// 
const isDevModel = computed(()=> Object.keys(props.data).length === 0 ? true:false)
const update = () => {

  if (props.data && Object.keys(props.data).length !== 0 && props.data.axis) {
    const {axis, data1, data2} = props.data
    // console.log("_data: ", props.data.axis[1])
  
  
    options.value = {
      title: {
        text: isDevModel.value ?  salesBarData.value.title: '今日銷售額',
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
        data: isDevModel.value ? salesBarData.value.axis : axis, // salesBarData.value.axis,
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
          name: isDevModel.value ? salesBarData.value.data1Obj.name: '平台流量',
          type: 'bar',
          data: isDevModel.value ? salesBarData.value.data1Obj.data1  : data1,
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
          name: isDevModel.value ? salesBarData.value.data2Obj.name: '外部流量',
          type: 'bar',
          data: isDevModel.value ? salesBarData.value.data2Obj.data2  : data2,
          itemStyle: {
            color: 'rgb(0, 140, 217)'
          }
        }
      ]
    }
  }
}
watch(() => props.data, () => {

  console.log("watch: ",props.data)
  update()
}, {
  immediate: true
})
onMounted(() => {
  
  update()
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
