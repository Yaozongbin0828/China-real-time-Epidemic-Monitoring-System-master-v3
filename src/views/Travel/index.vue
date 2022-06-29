<template>
  <div>
    <div class="title">
      <router-link class="select" to="/">返回疫情动态</router-link>
      <div class="top"></div>
    </div>
    <!-- van-field
      label 输入框左侧文本
      is-link 是否展示右侧箭头并开启点击反馈
      readonly 只读
    -->
    <!-- van-cascader
    close 点击关闭图标时触发
    finish 全部选项选择完成后触发
     -->
    <!--show-->
    <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
    />
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
          active-color="#1989fa"
      />
    </van-popup>

    <!--show2-->
    <van-field
        v-model="toCity"
        is-link
        readonly
        label="到达城市"
        placeholder="请选择所在地区"
        @click="show2 = true"

    />
    <van-popup v-model:show="show2" round position="bottom">
      <van-cascader
          v-model="cascaderValue2"
          title="请选择到达城市"
          :options="options"
          @close="show2 = false"
          @finish="toFinish"
          active-color="#1989fa"
      />
    </van-popup>

    <!--search-->
    <div class="search">
      <van-button type="info" size="large" @click="search">
        查询疫情政策
      </van-button>
    </div>


    <!--政策结果-->
    <div class="content" v-show="fromInfo">

      <div class="in">
        <div class="title-2" :class="{mid:fromLevel ==2 && 3,high:fromLevel >=4 }">
          {{ fromInfo.city_name }}
          <span v-if="fromLevel <= 1">低风险</span>
          <span v-if="fromLevel ==2 && 3">中风险</span>
          <span v-if="fromLevel >= 4">高风险</span>
        </div>

        <div class="from">
          <div class="title-in">外出政策</div>
          {{ fromInfo.out_desc }}
        </div>

        <div class="to">
          <div class="title-in">进入政策</div>
          {{ fromInfo.low_in_desc }}
        </div>
      </div>

      <div class="in" :class="{mid:toLevel ==2 && 3,high:toLevel >=4 }">
        <div class="title-2">
          {{ toInfo.city_name }}
          <span v-if="toLevel <= 1">低风险</span>
          <span v-if="toLevel ==2 && 3">中风险</span>
          <span v-if="toLevel >= 4">高风险</span>
        </div>

        <div class="from">
          <div class="title-in">外出政策</div>
          {{ toInfo.out_desc }}
        </div>

        <div class="to">
          <div class="title-in">进入政策</div>
          {{ toInfo.low_in_desc }}
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import api from "/@/api/index";
import axios from "axios";
import {ref, getCurrentInstance, onMounted,} from 'vue';

export default {
  setup() {
    const {proxy} = getCurrentInstance()
    const toCity = ref("");
    const goCity = ref("");
    const show = ref(false);
    const show2 = ref(false);
    const fieldValue = ref("");
    const cascaderValue = ref("");
    const cascaderValue2 = ref("");
    const from = ref("");
    const to = ref("");
    const fromInfo = ref("");
    const toInfo = ref("")


    // 选项列表，child 代表子选项，支持多级嵌套
    const options = [
      {
        text: '浙江省',
        value: '330000',
        child: [{text: '杭州市', value: '330100'}],
      },
      {
        text: '江苏省',
        value: '320000',
        child: [{text: '南京市', value: '320100'}],
      },
    ];

    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({selectedOptions, value,}) => {
      // console.log(selectedOptions, value)

      show.value = false;
      from.value = value;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    };

    const toFinish = ({selectedOptions, value}) => {
      // console.log(selectedOptions, value)

      to.value = value;
      show2.value = false;
      toCity.value = selectedOptions.map((option) => option.text).join("/");
    }

    const search = () => {
      // console.log('---打印选择城市的id---', from.value, to.value)

      api.getTravelQuery({
        from: from.value,
        to: to.value
      }).then((res) => {

        console.log(' --打印数据--', res.data)

        fromInfo.value = res.data.data.from_info;
        toInfo.value = res.data.data.to_info;
        // console.log(' --政策--', fromInfo.value, toInfo.value)

        proxy.fromLevel = parseInt(proxy.fromInfo.risk_level);
        proxy.toLevel = parseInt(proxy.toInfo.risk_level);

      })
    }

    onMounted(() => {
      axios.get('/mock/citys.json').then((res) => {
        let result = res.data.result;
        let arr = [];
        result.forEach((item) => {
          let obj = {};
          obj.text = item.province;
          obj.value = item.province_id;
          //二级区域
          obj.children = [];

          item.citys.forEach((ele) => {
            let children = [];
            children.text = ele.city;
            children.value = ele.city_id;
            // 追加给obj.children
            obj.children.push(children)
          });
          //追加给arr
          arr.push(obj)
        });

        //追加给options
        proxy.options = arr;
      })
    })

    return {
      show,
      show2,
      options,
      onFinish,
      toFinish,
      fieldValue, search,
      cascaderValue, cascaderValue2,
      toCity, goCity, toInfo, fromInfo, from, to
    };
  },
};

</script>

<style lang="less" scoped>
.van-cell {
  width: 95% !important;
  margin: 0 auto;
}

.title {

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
    background: url("../../assets/images/出行防疫政策查询.png") no-repeat;
    background-size: cover;
  }
}

.search {
  padding: 0.2rem;
}

.van-button--info {
  color: #fff;
  background-color: #1989fa;
  border: 1px solid #1989fa;
}


.content {
  padding: 0.2rem;

  .title-in {
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .from {
    background-color: rgb(243, 238, 238);
    border-radius: 0.1rem;
    font-size: 0.2rem;
    // font-weight: 800;
    line-height: 0.4rem;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .to {
    background-color: rgb(243, 238, 238);
    border-radius: 0.1rem;
    font-size: 0.2rem;
    // font-weight: 800;
    line-height: 0.4rem;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .title-2 {
    height: 0.8rem;
    background-color: darkcyan;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    font-weight: 800;
    line-height: 0.8rem;
    padding: 0rem 0.2rem;
    color: white;
    margin-bottom: 0.2rem;
  }

  .mid {
    background-color: wheat !important;
  }

  .high {
    background-color: tomato !important;
  }
}
</style>