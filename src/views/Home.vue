<template>
  <div class="home" v-if="!loading">
    <div class="datav-wrapper"></div>
    <top-header/>
    <!--  -->
    <sales-bar  :data='data.salesBar'/>
    <!--  -->
    <sales-line :data='data.saleLine'/>
    <!-- :data='data.salePie' -->
    <sales-pie :data='data.salePie'/>
    <!-- data.salesSun -->
    <sales-sun  />
    <sales-radar />
  </div>
  <div v-else class="home">
    <div class="loading-wrapper">
      {{loadingText}}
    </div>
  </div>
</template>

<script setup>
import TopHeader from '@/components/TopHeader'
import SalesBar from '@/components/SalesBar'
import SalesLine from '@/components/SalesLine'
import SalesPie from '@/components/SalesPie'
import SalesSun from '@/components/SalesSun'
import SalesRadar from '@/components/SalesRadar'
import { apiGetScreenMobileData } from '@/api/mobile-data.js'
import { onUnmounted, onMounted, ref, watch, nextTick } from 'vue'

let task
const loading = ref(true)
const loadingText = ref('加載中')
const data = ref({})
// 兩者方法效果一樣
// // async await
// const getScreenMobileData2 = async () => {
//   const data = await apiGetScreenMobileData()
//   console.log('data:', data)
// }

// Promise then
const getScreenMobileData = () => {
  apiGetScreenMobileData().then(_data => {
    loading.value = false
    task && clearInterval(task)
    console.log('_data:', _data)
    // 等待子組件更新完成
    nextTick(() => {
      data.value = _data
    })
  }).catch(err => {
    console.log('err:', err)
    loading.value = false
  })
}
watch(() => data.value, () => {
   console.log('change!!')
})
onMounted(() => {
  task && clearInterval(task)
  task = setInterval(() => {
    if (loadingText.value === '加載中...') {
      loadingText.value = '加載中'
    } else {
      loadingText.value += '.'
    }
  }, 100)
  getScreenMobileData()
})
onUnmounted(() => {
  task && clearInterval(task)
})
</script>
<style lang="scss" scoped>
  .home{
    position: relative;
    height: 100%;
    .datav-wrapper{
      position: absolute;
      top: 0;
      left: 0px;
      width: 100%;
      height: 100vh;//1336px;
      z-index: 1;
      background-image: url('//www.youbaobao.xyz/datav-res/datav/datav-mobile-bg.jpg');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .loading-wrapper{
    width: 100%;
    height: 100vh;
    font-size: 56px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

  }

</style>
