<template>
  <div class="sales-line">
    <div class="sales-line-inner">
      <vue-echarts :option="options" style="width:100%;height: 100%"/>
    </div>
  </div>
</template>
<script setup>
// import useCptPosition from '@/mock/useCptPosition.js'
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted, defineProps, watch, computed } from 'vue'
const props = defineProps({
  data: {
    type: Object
  }
})
const options = ref({})
const {
  salesLineData
} = useMockData()
// const {
//   salesLinePosition
// } = useCptPosition()
// /* eslint-disable */
// const topVal = salesLinePosition.top
// const heightVal = salesLinePosition.height
const isDevModel = computed(() => Object.keys(props.data).length === 0)

const update = () => {
  if (props.data && Object.keys(props.data).length !== 0) {
    const { axis, data1, data2, data3 } = props.data
    options.value = {
      title: {
        text: isDevModel.value ? salesLineData.value.title : '分時訪問&成交趨勢圖',
        textStyle: {
          color: '#fff'
        },
        top: 10,
        left: 10
      },
      xAxis: {
        type: 'category',
        data: isDevModel.value ? salesLineData.value.axis : axis,
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
          name: isDevModel.value ? salesLineData.value.data1Obj.name : '成交量',
          type: 'line',
          data: isDevModel.value ? salesLineData.value.data1Obj.data1 : data1,
          smooth: true,
          itemStyle: {
            opacity: 0,
            // line 顏色
            color: 'rgb(0, 163, 233)'
          }
        },
        {
          name: isDevModel.value ? salesLineData.value.data2Obj.name : '成交量',
          type: 'line',
          data: isDevModel.value ? salesLineData.value.data2Obj.data2 : data2,
          smooth: true,
          itemStyle: {
            opacity: 0,
            // line 顏色
            color: 'yellow'
          }
        },
        {
          name: isDevModel.value ? salesLineData.value.data3Obj.name : 'KPI',
          type: 'line',
          data: isDevModel.value ? salesLineData.value.data3Obj.data3 : data3,
          smooth: true,
          itemStyle: {
            opacity: 0,
            // line 顏色
            color: 'red'
          }
        }
      ]

    }
  }
}

watch(() => props.data, () => {
  update()
}, {
  immediate: true
})
onMounted(() => {
  // console.log('salesBarData: ', salesLineData.value)
  update()
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
