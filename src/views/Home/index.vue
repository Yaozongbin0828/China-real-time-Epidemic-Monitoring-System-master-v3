<template>
  <div class="home">
    <div class="logo">
      <img src="../../assets/images/Cube.jpg" alt=""/>
      <!--<router-link class="select" to="/searchCity">{{ city }}</router-link>-->
      <div class="select" @click="goSearchCity">{{ city }}</div>
    </div>

    <CovInfo :news="news"></CovInfo>

    <NavBar></NavBar>

    <CovNumber :covDesc="covDesc"></CovNumber>

    <ChinaMap></ChinaMap>

    <VueSwiper></VueSwiper>
  </div>
</template>

<script>
import CovInfo from "./CovInfo/index.vue";
import CovNumber from './CovNumber/index.vue'
import ChinaMap from "../Echart/ChinaMap.vue";
import VueSwiper from './VueSwiper/index.vue'
import NavBar from './NavBar/index.vue'
import api from "/@/api/index";

import {onMounted, ref, getCurrentInstance,} from "vue";
import {useRouter} from 'vue-router'

export default {
  name: 'Home',
  components: {CovInfo, CovNumber, ChinaMap, VueSwiper, NavBar},
  setup() {
    const city = ref("城市选择");
    const covDesc = ref({});
    const news = ref([]);
    const router = useRouter();
    //获取上下文实例
    //const { ctx }  = getCurrentInstance();  //  方式一，这种方式只能在开发环境下使用，生产环境下的ctx将访问不到
    const {proxy} = getCurrentInstance() //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）

    onMounted(() => {
      // console.log(ctx, "ctx");

      api.getCovInfo().then((res) => {
        covDesc.value = res.data.newslist[0].desc;
        news.value = res.data.newslist[0].news;
        // console.log(res.data);

      });

      //获取本地储存  返回点击城市的名称
      let city = localStorage.getItem('city');
      if (city) {
        proxy.city = city + '疫情'
      }

      // 全局导航守卫 跳转到该路由时返回顶部
      router.afterEach(() => {
        window.scrollTo(0, 0);
      })

    });

    const goSearchCity = () => {
      router.push({
        path: '/searchCity'
      })
    }

    return {
      city, covDesc, news, goSearchCity,
    }

  }
}

</script>

<style lang="less" scoped>
.logo {
  position: relative;

  img {
    width: 100%;
  }

  .select {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    color: white;
    padding: 0.1rem 0.2rem;
    background-color: rgba(61, 64, 69, 0.5);
    border-radius: 0.4rem;
  }
}

.home {
  padding-bottom: 0.2rem;
}


</style>
