import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    //打包
    publicPath: './',
    // 关闭eslint
    lintOnSave: false,
    //设置别名 @ 路径
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
            "/@": path.resolve(__dirname, 'src'),
        }
    },
    server: {
        cors: true,
        open: true,
        proxy: {
            //配置代理
            '/api': {
                target: 'http://apis.juhe.cn',//聚合接口地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {//重写路径
                    '^/api': ''
                }
            },
            '/city': {
                target: 'https://localhost:3000/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {//重写路径
                    '^/city': '/public'
                }
            },
            '/citys': {
                target: 'https://localhost:3000/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {//重写路径
                    '^/city': '/public'
                }
            },

        },
    }
})
