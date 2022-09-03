<template>
  <div class="top-header">
    <div class="title">數據大屏</div>
    <div class="sub-title">移動端報表</div>
    <div class="update-time">最後更新時間: 1分鐘前</div>
  </div>
</template>
<script setup>
import { } from 'vue'
</script>
<style scoped lang="scss">
.top-header{
  color: #fff;
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 300px;
  z-index: 10;
  padding: 50px 24px 24px;
  box-sizing: border-box;
  .title{
    font-size: 48px;
    font-weight: 500;
  }
  .sub-title{
    font-size: 36px;
    margin-top: 20px;
  }
 .update-time{
    font-size: 24px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    margin-top: 40px;
  }
}
</style>
