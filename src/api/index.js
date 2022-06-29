// 请求接口的方法
import axios from 'axios'
// 接口地址
import base from './base.js'

const api = {
    // 病毒信息获取
    getCovInfo() {
        return axios.get(base.host + base.covInfo);
    },

    // 获取国内各省疫情数据--地图
    getChinaData() {
        return axios.get('https://vyps.api.storeapi.net/api/94/219?format=json&appid=15127&sign=43365cae8000fe79a6dafe4f6645e6ba');
        // return axios.get('https://vyps.api.storeapi.net/api/94/219?format=json&appid=18561&sign=ae531e8af6c035f08d1481fec2cbd0c7');
    },

    //轮播图
    getSwiperBanner() {
        return axios.get(base.swiper)
    },

    getTravelQuery(params) {
        return axios.get(base.travelQuery, {
            params
        })
    }
}

export default api