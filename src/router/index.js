// router
import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('../views/Home/index.vue')
        },
        {
            path: '/area',
            name: 'Area',
            component: () => import('../views/CovArea/index.vue')
        },
        {
            path: '/prevention',
            name: 'Prevention',
            component: () => import('../views/Prevention/index.vue')
        },
        {
            path: '/citys/:cityname',
            name: 'Citys',
            component: () => import('../views/Citys/index.vue'),
            props: true
        },
        {
            path: '/travel',
            name: 'Travel',
            component: () => import('../views/Travel/index.vue')
        },
        {
            path: '/searchCity',
            name: 'SearchCity',
            component: () => import('../views/SearchCity/index.vue')
        }
    ]
})

export default router