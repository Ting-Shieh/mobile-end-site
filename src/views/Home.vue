<template>
  <div class="home">
    <div class="datav-wrapper"></div>
    <top-header />
    <sales-bar />
    <sales-line />
    <sales-pie />
    <sales-sun />
    <sales-radar />
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
import { onMounted } from 'vue'

onMounted(() => {
  console.log(apiGetScreenMobileData())
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

</style>
