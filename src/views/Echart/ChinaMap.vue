<template>
  <div>
    <div class="title">
      <span> 国内疫情地图 </span>
    </div>
    <!-- 地图容器 -->
    <van-tabs :active="active" color="#7232dd" animated @change="change">
      <van-tab title="当前确诊">
        <div class="map">
          <div id="nowMain" style="width: 7rem; height: 6rem"></div>
        </div>
      </van-tab>

      <van-tab title="累计确诊">
        <div class="map">
          <div id="main" style="width: 7rem; height: 6rem"></div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
// 导入中国地图json
import "echarts/map/js/china";
import api from "/@/api/index";
import {ref, onMounted, getCurrentInstance, nextTick} from 'vue'

export default {
  name: 'ChinaMap',
  setup() {
    const active = ref(0)
    const arr = ref([])
    const {proxy} = getCurrentInstance()

    onMounted(() => {
      // 获取疫情数据
      api.getChinaData().then((res) => {
        // 获取省份数据
        let citys = res.data.retdata;
        let arr = [];//累计
        let nowArr = []; //现存

        for (let i = 0; i < citys.length; i++) {
          let obj = {};
          let now = {};
          obj.name = citys[i].xArea; //地区
          obj.value = citys[i].confirm;
          now.name = citys[i].xArea;
          now.value = citys[i].curConfirm;//累计确诊
          arr.push(obj);
          nowArr.push(now);
        }

        proxy.arr = arr;
        //将onMounted获取到的arr放入到data里面的arr中，方便下面change() 函数调用
        // 显示地图 [{name: '内蒙古', value: 200}, {name: '北京', value: 200}]

        // Vue 延迟加载
        nextTick(() => {
          proxy.getChinaMap('nowMain', nowArr);
        })
      });


    })

    const getChinaMap = (id, data) => {
      // 基于准备好的dom，初始化echarts实例
      let myChart = proxy.$echarts.init(document.getElementById(id));

      // 指定图表的配置项和数据
      let option = {
        //提示框组件
        tooltip: {
          //悬浮弹窗
          triggerOn: "click", //提示框触发条件
          enterable: true, //鼠标是否可以进入提示框浮层
          formatter(item) {//格式化数据
            // console.log(item)
            return '<a href="#/citys/' + item.name + '" style="color:#fff">省份：' + item.name + '--现存确诊</a>' + ':' + item.value;
          },
          // formatter: '{b}'
        },
        //视觉映射组件
        visualMap: [
          {
            //配置地图颜色
            orient: "horizontal",
            type: "piecewise",//离散
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
        // 图表类型
        series: [
          {
            name: "省",
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.2,
            aspectScale: 0.75,
            top: 40,
            layoutCenter: ["5%", "5%"],
            label: {
              normal: {
                show: true,
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
              //高亮
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

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      //地图自适应
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }

    const change = (title) => {
      if (title == 1) {
        //vue延迟加载(获取最新)
        nextTick(() => {
          proxy.getChinaMap("main", proxy.arr);
        })
      }
    }

    return {
      active, arr, getChinaMap, change
    };
  },
};
</script>

<style scoped lang="less">
.title {
  padding-left: 0.2rem;
  font-size: 0.3rem;

  span {
    display: block;
    border-left: 0.1rem solid rgb(20, 49, 128);
    padding-left: 0.1rem;
  }
}

.map {
  background-color: #f5f5f5;
  width: 100%;

  div {
    margin: 0 auto;
  }
}
</style>