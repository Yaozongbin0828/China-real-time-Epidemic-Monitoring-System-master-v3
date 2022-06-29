const base = {
    host: 'http://api.tianapi.com', //天行数据 --疫情病毒接口前缀
    covInfo: '/ncov/index?key=f1359d1e6c774a93eddcae38ee92d56f', //疫情的病毒信息 --后缀 key值

    //挖数据
    baseURL: ' https://qayz.api.storeapi.net',
    chinaData: '/api/94/219/format=json&time=3231&appid=18561&sign=4169fbee618b314ee3ee3cbddd75c8d5',
    city: '/api/94/221',

    //轮播图
    swiper: 'http://iwenwiki.com/wapicovid19/ncovimg.php',
    travelQuery: 'https://v2.alapi.cn/api/springTravel/query?token=r3G3yFh9LFFnbePw',
};

export default base;