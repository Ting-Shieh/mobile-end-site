<template>
  <div class="sales-pie">
    <div class="sales-pie-inner">
      <div class="sales-pie-item">
        <div class="sales-pie-item-inner">
          <vue-echarts :option="options1" style="width: 100%; height: 100%" />
        </div>
      </div>
      <div class="sales-pie-item">
        <div class="sales-pie-item-inner">
          <vue-echarts :option="options2" style="width: 100%; height: 100%" />
        </div>
      </div>
      <div class="sales-pie-item">
        <div class="sales-pie-item-inner">
          <vue-echarts :option="options3" style="width: 100%; height: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted, defineProps, watch, computed } from 'vue'
const props = defineProps({
  data: {
    type: Array
  }
})
const options1 = ref({})
const options2 = ref({})
const options3 = ref({})
const { salesPieData } = useMockData()
const createOptions = (title, val, range) => {
  return {
    title: [
      {
        text: title,
        textStyle: {
          color: 'rgba(255, 255, 255, .3)',
          fontSize: 12
        },
        top: 3
      },
      {
        text: val,
        textStyle: {
          color: 'rgb(255, 255, 255 )',
          fontSize: 16,
          fontWeight: 500
        },
        top: '43%',
        left: '32%'
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter (params) {
        // console.log(parmas)
        return `${params.data.name} <br />${params.data.value}`
      }
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['65%', '80%'], // 內外圈半徑
        label: {
          show: false
        },
        data: [
          {
            value: range[0],
            name: '數據',
            itemStyle: {
              color: 'rgb(0, 140, 217)'
            }
          },
          {
            value: range[1],
            name: '數據',
            itemStyle: {
              color: 'rgb(35, 69, 145)'
            }
          }
        ]
      }
    ]
  }
}
const isDevModel = computed(
  () => props.data === 'null' || typeof props.data === 'undefined'
)
const update = () => {
  let _data1
  let _data2
  let _data3
  console.log('Pie: isDevModel', isDevModel)
  if (!isDevModel.value && props.data) {
    const [data1, data2, data3] = props.data
    console.log('update Pie', data1)
    _data1 = data1
    _data2 = data2
    _data3 = data3
  }
  options1.value = createOptions(
    isDevModel.value ? salesPieData.value.data1Obj.title : _data1.name,
    isDevModel.value ? salesPieData.value.data1Obj.value : _data1.total,
    isDevModel.value ? salesPieData.value.data1Obj.range : _data1.data
  )

  options2.value = createOptions(
    isDevModel.value ? salesPieData.value.data2Obj.title : _data2.name,
    isDevModel.value ? salesPieData.value.data2Obj.value : _data2.total,
    isDevModel.value ? salesPieData.value.data2Obj.range : _data1.data
  )
  options3.value = createOptions(
    isDevModel.value ? salesPieData.value.data3Obj.title : _data3.name,
    isDevModel.value ? salesPieData.value.data3Obj.value : _data3.total,
    isDevModel.value ? salesPieData.value.data3Obj.range : _data1.data
  )
}
watch(
  () => props.data,
  () => {
    update()
  },
  {
    immediate: true
  }
)

onMounted(() => {
  update()
})
</script>
<style lang="scss" scoped>
.sales-pie {
  position: absolute;
  top: 1450px;
  left: 0px;
  z-index: 10;
  width: 100%;
  height: 400px;
  padding: 25px 12.5px 0px;
  box-sizing: border-box;
  .sales-pie-inner {
    display: flex;
    width: 100%;
    height: 100%;
    .sales-pie-item {
      width: 33.33%;
      height: 100%;
      flex: 0 0 33.33%;
      padding: 0px 12.5px;
      box-sizing: border-box;
      .sales-pie-item-inner {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}
</style>
