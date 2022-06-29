<template>
  <div class="selectCity">
    <div class="title">城市选择</div>
    <!--城市列表-->
    <van-index-bar :index-list="indexList">
      <template v-for="(item,index) in cityList" :key="index">
        <van-index-anchor :index="item.initial"></van-index-anchor>
        <van-cell
            @click="goHome"
            v-for="(citem,cindex) in item.list"
            :key="cindex"
            :title="citem.name"
        />
      </template>
    </van-index-bar>


  </div>
</template>

<script setup>
import axios from "axios";
import {ref, onMounted,} from 'vue'
import {useRouter} from 'vue-router'

const cityList = ref({});
const indexList = ref([]);
const router = useRouter();

onMounted(() => {
  cityLists()
})

const cityLists = () => {
  axios.get('/mock/city.json').then((res) => {
    // 城市列表遍历
    cityList.value = res.data.city
    //城市开头字母遍历
    indexList.value = res.data.city.initial;
    // console.log(res.data)

  }).catch((err) => {
    console.log(err)
  })
}

const goHome = (event) => {
  console.log('点击', event);
  console.log(event.target.innerText)
  //   1. 点击获取当前城市名称
  //   2. 跳转首页
  //   3.获取城市名称传递给首页
  // 本地存储传参
  localStorage.setItem('city', event.target.innerText)
  // 返回home
  router.push({
    path: '/'
  });
}

</script>

<style lang="less" scoped>
.selectCity {
  background-color: #f5f5f5;

  .title {
    padding: 0.2rem;
    font-size: .35rem;
    text-align: center;
    background-color: #ffffff;
  }
}

.van-index-anchor {
  padding: 0 !important;
}

</style>