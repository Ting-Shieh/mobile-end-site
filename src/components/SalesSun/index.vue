<template>
  <div class="sales-sun">
    <div class="sales-sun-inner">
      <vue-echarts :option="options" style="width:100%;height: 100%"/>
    </div>
  </div>
</template>
<script setup>
import useMockData from '@/mock/useMockData.js'
import { ref, onMounted } from 'vue'
const options = ref({})
const { salesSunData, sunColors } = useMockData()
const bgColor = '#2E2733'

onMounted(() => {
  // console.log('salesSunData:', salesSunData.value)
  options.value = {
    backgroundColor: bgColor,
    colors: sunColors,
    series: [
      {
        type: 'sunburst',
        data: salesSunData.value,
        center: ['50%', '48%'],
        // 一層圈代表一個{}
        levels: [
          {},
          {
            r0: 0,
            r: 40,
            label: {
              rotate: 0
            }
          },
          {
            r0: 40,
            r: 105
          },
          {
            r0: 115,
            r: 140,
            itemStyle: {
              color: 'transparent',
              shadowColor: sunColors[2],
              shadowBlur: 2
            },
            label: {
              rotate: 'tangential',
              fontSize: 10,
              color: sunColors[0]
            }
          },
          {
            r0: 140,
            r: 145,
            itemStyle: {
              shadowColor: sunColors[0],
              shadowBlur: 80 // 外圈會有淡淡陰影
            },
            label: {
              // 文字顯示在外面
              position: 'outside',
              textShadowColor: '#333',
              textShadowBlur: 5
            },
            downplay: {
              // 未選中的扇形塊
              label: {
                opacity: 0.4
              }
            }
          }
        ],
        // 全局的label
        label: {
          rotate: 'radial',
          color: bgColor
        },
        // 全局的
        itemStyle: {
          borderColor: bgColor,
          borderWidth: 2
        }
      }
    ]
  }
})
</script>
<style lang="scss" scoped>
  .sales-sun{
    position: absolute;
    top: 1850px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 800px;
    padding: 25px 25px 0px;
    box-sizing: border-box;
    .sales-sun-inner{
      background: rgba(255,255,255,0.05);
      width: 100%;
      height: 100%;

    }
  }
</style>
