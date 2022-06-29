<template>
  <div>
    <div class="list">
      <div @click="goArea">
        <i class="fa fa-users" style="color: #fbab2a"></i>
        <div>风险地区</div>
      </div>
      <div>
        <i class="fa fa-flask" style="color: #13cc9a"></i>
        <div>核酸检测</div>
      </div>
      <div @click="goPrevention">
        <i class="fa fa-shield" style="color: #6974ff"></i>
        <div>防疫物资</div>
      </div>
      <div @click="goTravel">
        <i class="fa fa-road" style="color: #4d88ff"></i>
        <div>出行政策</div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
  name: "NavBar",
  setup() {
    const router = useRouter()
    //useRouter
    const goArea = () => {
      router.push({
        path: "/area",
      });
    };


    const goPrevention = () => {
      router.push({
        path: "/prevention",
      });
    };

    const goTravel = () => {
      router.push({
        path: "/travel",
      });
    };

    return {
      goArea, goPrevention, goTravel,
    }

  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: center;
  padding: .2rem;
  height: 1.3rem;
  border-bottom: 1px solid rgb(233, 230, 230);

  div {
    flex: 1;
    text-align: center;

    i {
      font-size: 0.6rem;
      padding: 0.1rem;
    }
  }
}
</style>