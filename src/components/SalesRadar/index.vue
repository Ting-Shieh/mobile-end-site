<template>
  <div class="sales-radar">
    <div class="sales-radar-inner">
      <vue-echarts :option="options" style="width:100%;height: 100%"/>
    </div>
  </div>
</template>
<script setup>
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted, defineProps, watch, computed } from 'vue'

const props = defineProps({
  data: {
    type: Object
  }
})
const options = ref({})
const {
  salesRadarData
} = useMockData()
const isDevModel = computed(() => props.data === 'null' || typeof (props.data) === 'undefined')

const update = () => {
  let apiData
  let apiIndicator
  console.log('isDevModel.value', isDevModel.value)
  if (!isDevModel.value) {
    apiData = props.data.data
    apiIndicator = props.data.indicator
  }
  options.value = {
    radar: {
      name: {},
      indicator: isDevModel.value ? salesRadarData.value.indicator : apiIndicator
    },
    tooltip: {},
    series: [{
      name: isDevModel.value ? salesRadarData.value.name : '運營指標',
      type: 'radar',
      data: [
        isDevModel.value ? { ...salesRadarData.value.predictData } : { ...apiData[0] },
        isDevModel.value ? { ...salesRadarData.value.realData } : { ...apiData[1] }
      ]
    }]
  }
}
watch(() => props.data, (n, o) => {
  console.log('watch:', n, o)
  update()
}, {
  immediate: true
})
onMounted(() => {
  console.log('props.data:', props.data)
  update()
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
