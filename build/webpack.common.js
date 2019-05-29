const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
module.exports = {
    entry: path.join(srcPath, 'index'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: '/img/',
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
}