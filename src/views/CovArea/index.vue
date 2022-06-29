<template>
  <div class="out">
    <router-link to="/" class="select">返回疫情动态</router-link>

    <div class="top"></div>
    <div class="content">
      <!--判断高风险地区是否存在-->
      <template v-if="high.length >0">
        <div class="title">
          <i class="fa fa-exclamation-triangle" style="color: firebrick"></i>
          &nbsp;高风险地区{{ high.length }}个
        </div>
        <ul>
          <!--下标为0 （+1） + {{i}}内容渲染-->
          <li v-for="(i, index) in high" :key="index">{{ (index + 1) }}.{{ i }}</li>
        </ul>
      </template>

      <template v-if="mid.length > 0">
        <div class="title">
          <span class="fa fa-exclamation-triangle" style="color: orange"></span>
          中风险地区{{ mid.length }}个
        </div>
        <ul>
          <li v-for="(i, index) in mid" :key="index">{{ (index + 1) }}.{{ i }}</li>
        </ul>
      </template>

    </div>
  </div>
</template>

<script setup>
import api from "/@/api/index";
import {ref, onMounted} from 'vue'

const high = ref([])
const mid = ref([])

onMounted(() => {
  api.getCovInfo().then((res) => {
    high.value = res.data.newslist[0].riskarea.high;
    mid.value = res.data.newslist[0].riskarea.mid;
    console.log('高风险 低风险', res.data);
  });
})

</script>

<style scoped lang="less">
.out {
  //padding: 0.15rem;
  background-color: rgb(243, 238, 238);
  height: 100vh;

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

  .top {
    position: relative;
    width: 100%;
    height: 0;
    margin-bottom: -44%;
    padding-top: 74.7%;
    color: #fff;
    background: url("../../assets/images/全国疫情风险地区汇总.png") no-repeat;
    background-size: cover;
  }

  .content {
    position: relative;
    z-index: 1;
    background-color: white;
    padding: 0.1rem 0.2rem;
    border-radius: 0.1rem;
    margin: 0 .16rem;

    .title {
      margin-bottom: 0.1rem;
      display: flex;
      align-items: center;
      font-size: 0.3rem;
      margin-top: 0.2rem;

      span {
        margin-right: 0.1rem;

      }
    }

    ul {


      li {
        // height: 0.7rem;
        background-color: rgb(243, 238, 238);
        margin-bottom: 0.1rem;
        padding: 0 0.2rem;
        line-height: 0.5rem;
        font-size: 0.2rem;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>