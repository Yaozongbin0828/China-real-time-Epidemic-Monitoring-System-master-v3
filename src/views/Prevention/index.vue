<template>
  <div>
    <img src="@/assets/images/防疫物资title.png" alt=""/>
    <router-link to="/" class="select">返回疫情动态</router-link>
    <div class="back">
      <van-tabs v-model="active" animated>
        <van-tab title="洗手液"
        ><img src="@/assets/images/防疫物资洗手液.png" alt=""
        /></van-tab>
        <van-tab title="温度计"
        ><img src="@/assets/images/防疫物资温度计.png" alt=""
        /></van-tab>
        <van-tab title="口罩"
        ><img src="@/assets/images/防疫物资口罩.png" alt=""
        /></van-tab>
        <van-tab title="消毒剂"
        ><img src="@/assets/images/防疫物资消毒剂.png" alt=""
        /></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const active = ref(0)
</script>

<style lang="less" scoped>
.select {
  position: absolute;
  z-index: 1;
  top: 0.4rem;
  right: 0.2rem;
  color: white;
  padding: 0.1rem 0.2rem;
  background-color: rgba(61, 64, 69, 0.5);
  border-radius: 0.4rem;
}

img {
  width: 100%;
}

.back {
  background-color: #3343ff;
  width: 100%;
  height: 100%;
}
</style>