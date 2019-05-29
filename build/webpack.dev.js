const path = require('path')
// 引入 webpack
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
module.exports = smart(webpackCommonConf, {
    mode: 'development',
    devServer: {
        port: 3000,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: false,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩
         // 设置代理
         proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    },
    // 增加 webpack 配置
    plugins: [
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('development')
        })
    
    ]
})