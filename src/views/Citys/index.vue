<template>
  <div>
    <div class="title">
      <h2>{{ props.cityname }}</h2>
    </div>
    <div class="map">
      <div id="main" style="width: 7rem; height: 8rem"></div>
    </div>
  </div>

</template>

<script setup>
// 导入城市js
import axios from "axios";
import '/@/utils/map'
import {ref, onMounted, getCurrentInstance} from 'vue'


const {proxy} = getCurrentInstance()

onMounted(() => {

  axios.get('/mock/citys.json').then((res) => {
    let arr = res.data.result;

    console.log("--城市数据--", res.data);
    proxy.getCityMap("main", proxy.cityname, arr)
  })
})

const getCityMap = (id, cityname, data) => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = proxy.$echarts.init(document.getElementById(id));

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      //悬浮弹窗
      triggerOn: "click", //提示框触发条件
      enterable: true, //鼠标是否可以进入提示框浮层
      formatter(data) {
        return (
            data.name + '---累计确诊人数：' + data.value
        );
      },
    },
    visualMap: [
      {
        //配置地图颜色
        orient: "horizontal",
        type: "piecewise",
        bottom: 8,
        itemGap: 5,
        itemWidth: 16,
        itemHeight: 10,
        padding: 2,
        textStyle: {
          fontSize: 10,
        },
        pieces: [
          //配置颜色区间
          {
            min: 0,
            max: 0,
            color: "#FFFFFF",
          },
          {
            min: 1,
            max: 100,
            color: "#FDFDCF",
          },
          {
            min: 100,
            max: 1000,
            color: "#FE9E83",
          },
          {
            min: 1000,
            max: 5000,
            color: "#E55A4E",
          },
          {
            min: 5000,
            color: "#4F070D",
          },
        ],
      },
    ],
    series: [
      {
        name: "市",
        type: "map",
        map: cityname,
        roam: false,
        zoom: 1.2,
        aspectScale: 0.75,
        top: 40,
        layoutCenter: ["5%", "5%"],
        label: {
          normal: {
            show: false,
            textStyle: {
              fontSize: 8,
            },
          },
        },
        itemStyle: {
          normal: {
            areaColor: "#f5f5f5",
            borderColor: "rgba(0,0,0,0.2)",
          },
          emphasis: {
            areaColor: "rgba(255,180,0,0.8)",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
          },
        },
        data,

      },
    ],
  };
  //自适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}

// defineProps在<script setup>中自动可用，无需导入
const props = defineProps({
  cityname: {
    type: String,
    default: ''
  }
})


</script>

<style lang="less" scoped>
.title {
  padding: 0.2rem;
  background-color: #E6EDFF;
  font-size: 0.2rem;

  h2 {
    font-size: .45rem;
  }
}

.map {
  background-color: #F7F7F7;

  #main {
    margin: 0.2rem auto;
  }
}
</style>