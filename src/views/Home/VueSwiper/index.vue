<template>
  <div class="title">
    <span> 全国疫情趋势图 </span>
  </div>
  <div class="swiper">
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(i,index) in swiperArr" :key="index">
          <img :src="i.image" alt="" width="100%"/>
        </div>
      </div>
    </div>

    <!-- 轮播图片按钮 -->
    <ul class="list">
      <li v-for="(item, index) in swiperArr" :key="item.title">
        <div
            class="item"
            :class="{ active: index === num }"
            @click="changeSwiper(index)"
        >
          <div class="inner">
            {{ item.title }}
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import Swiper from 'swiper'
import api from '/@/api/index'
import 'swiper/css/swiper.min.css'
import {ref, onMounted} from 'vue'

const swiperArr = ref([])
const num = ref(0)

onMounted(() => {
  const mySwiper = new Swiper('.swiper-container', {
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    on: {
      slideChange: function () {
        num.value = mySwiper.activeIndex //将swiper的真实index传给vue data的 num,实现下标随轮播图的滑动而切换
      }
    }
  })
  //数据源
  api.getSwiperBanner().then((res) => {
    swiperArr.value = res.data.result;
  });
})

//轮播图
const changeSwiper = (index) => {
  // 高亮选择(当前下标)
  num.value = index;
  // swiper切换
  let mySwiper = document.querySelector(".swiper-container").swiper;
  mySwiper.slideTo(index, 800);
}

</script>

<style lang="less" scoped>
.title {
  padding-left: 0.2rem;
  padding-top: 0.2rem;
  font-size: 0.3rem;

  span {
    display: block;
    border-left: 0.1rem solid rgb(20, 49, 128);
    padding-left: 0.1rem;
  }
}

.swiper {
  margin-top: 0.2rem;
}

img {
  width: 100%;
}

.list {
  display: flex;

  li {
    flex: 1;
    align-items: center;
  }

  .active {
    background-color: #f1f5ff !important;
    color: #4169e2;
  }

  .item {
    padding: 0;
    border-radius: 0.06rem;
    margin: 0 auto;
    width: 90%;
    height: 0.85rem;
    background-color: #f7f7f7;
    font-size: 0.23rem;
    text-align: center;
    display: flex;
    align-items: center;

    .inner {
      margin: 0 auto;
    }
  }
}
</style>