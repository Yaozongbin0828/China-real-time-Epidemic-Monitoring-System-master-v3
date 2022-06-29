<template>
  <div class="info">
    <div class="cov">
      <div class="title">病毒信息</div>
      <p>病毒：sas-cov-2,其导致疾病命名 COVID-19</p>
      <p>传染源：新冠肺炎患者，无症状感染者</p>
      <p>传播途径：呼吸道飞沫接触传播是主要的传播途径</p>
      <p>潜伏期：一般为3~7天，最长不超过14天</p>
      <p>宿主：野生动物</p>
    </div>

    <div class="hot">
      <div class="hot-title">
        疫情热点
      </div>

      <ul>
        <li v-for="i in news" :key="i.id">
          <div class="icon">最新</div>
          <span>{{ i.title }}</span>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  name: "CovInfo",
  props: {
    news: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="less" scoped>
.info {
  padding: 0.2rem;

  .cov {
    margin-bottom: 0.2rem;
  }

  .title {
    border-left: 0.1rem solid rgb(20, 49, 128);
    padding-left: 0.1rem;
    margin-bottom: 0.2rem;
    font-size: 0.3rem;
  }

  p {
    font-size: 0.25rem;
    line-height: 0.5rem;
    color: #666;
  }
}

.hot {
  border-bottom: 1px solid rgb(233, 230, 230);
  padding-bottom: 0.2rem;

  .hot-title {
    border-left: 0.1rem solid rgb(20, 49, 128);
    padding-left: 0.1rem;
    color: #f74c31;
    font-size: 0.3rem;
  }

  li {
    display: flex;
    align-items: center;
    margin-top: 0.22rem;
    font-size: 0.25rem;

    .icon {
      line-height: 1.5;
      background-color: tomato;
      color: #ffffff;
      padding: 0.03rem 0.08rem;
      margin-right: 0.1rem;
      border-radius: 0.05rem;
    }

    span {
      color: #1a1a1a;
      font-size: .3rem;
      word-break: break-all
    }
  }
}
</style>