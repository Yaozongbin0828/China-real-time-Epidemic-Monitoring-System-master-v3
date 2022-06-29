<template>
  <div class="out">
    <span class="total">
        截至北京时间 {{ onlyFormat(covDesc.modifyTime) }}
    </span>
    <div class="inner">
      <div class="one">
        <div>
          <span class="incr" style="color: red">{{ covDesc.currentConfirmedIncr }}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: red">{{ covDesc.currentConfirmedCount }}</span>
          <span>现存确诊</span>
        </div>

        <div>
          <span class="incr" style="color: green">{{ covDesc.suspectedCount }}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: green">{{ covDesc.yesterdaySuspectedCountIncr }}</span>
          <span>境外输入</span>
        </div>

        <div>
          <span class="incr" style="color: orange">{{ covDesc.suspectedIncr }}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: orange">{{ covDesc.seriousCount }}</span>
          <span>现存无症状</span>
        </div>
      </div>

      <div class="two">
        <div>
          <span class="incr" style="color: purple">{{ covDesc.confirmedIncr }}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: purple">{{ covDesc.confirmedCount }}</span>
          <span>累计确诊</span>
        </div>

        <div>
          <span class="incr" style="color: yellowgreen">{{ covDesc.deadIncr }}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: yellowgreen">{{ covDesc.deadCount }}</span>
          <span>累计死亡</span>
        </div>

        <div>
          <span class="incr" style="color: blue">{{ covDesc.curedIncr }}</span>
          <span>较昨日增加</span>
          <span class="num" style="color: blue">{{ covDesc.curedCount }}</span>
          <span>累计治愈</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted} from 'vue'

export default defineComponent({
  name: "CovNumber",
  props: {
    covDesc: {
      type: Object,
      required: true
    },
  },
  setup() {
    onMounted(() => {
      onlyFormat()
    })

    //时间戳
    const onlyFormat = (timeStamp) => {
      let date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
          (date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) + "-";
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
          (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
          ":";
      let s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }

    return {
      onlyFormat,
    }
  },
})
</script>

<style lang="less" scoped>
.out {
  margin-top: 0.2rem;
  background-color: white;
  height: 5.5rem;

  .incr {
    font-size: 0.3rem;
  }

  .total {
    font-size: 0.25rem;
    display: block;
    width: 95%;
    margin: 0.1rem auto;
  }

  span {
    font-size: 0.2rem;
  }

  .num {
    font-size: 0.35rem;
    font-weight: bolder;
  }

  .inner {
    width: 95%;
    height: 85%;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 0.1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 .04rem .12rem 0 rgba(0, 0, 0, .07);

    .one {
      flex: 1;
      display: flex;
      border-bottom: 1px solid rgb(233, 230, 230);
      align-items: center;

      div {
        flex: 1;
        // border: 1px solid;
        display: flex;
        flex-direction: column;

        span {
          text-align: center;
        }
      }
    }

    .two {
      flex: 1;
      display: flex;
      align-items: center;

      div {
        flex: 1;
        display: flex;
        flex-direction: column;

        span {
          text-align: center;
        }
      }
    }
  }
}
</style>