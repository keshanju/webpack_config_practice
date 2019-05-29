const path = require('path')
// 引入 webpack
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    // 增加 webpack 配置
    plugins: [
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('production')
        })
    ]
})