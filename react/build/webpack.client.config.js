const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
// const AssetsPlugin = require('assets-webpack-plugin')
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

const config = merge(base, {
    plugins: [
        /**
         * 配置环境变量
         */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }
        }),

        new webpack.DefinePlugin({
          $: "jquery", 
          jQuery: "jquery", 
          "window.jQuery": "jquery" 
        }),

        /**
         * 使用[chunkhash]时更改了业务逻辑代码
         * 为了不对vendor.chunk.js产生影响
         * 这里需要使用HashedModuleIdsPlugin和manifest
         * 参考: http://geek.csdn.net/news/detail/135599
         */
        new webpack.HashedModuleIdsPlugin(),
        /**
         * 提取公共模块
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 2
        }),
        /**
         * manifest.js(被抽离出来的Webpack的运行时代码)
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        /**
         * 生成html文件
         */
        new HTMLPlugin({
            template: './src/template.html',
            filename: '../index.html',
        }),
        /**
         * 生成记录版本号的mapping文件
         */
        // new AssetsPlugin({
        //     filename: './dist/webpack.assets.json',
        //     processOutput: function(assets) {
        //         return JSON.stringify(assets)
        //     }
        // })
    ]
})

if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(
        new UglifyEsPlugin({ toplevel: true })
    )    
}

// if (process.env.NODE_ENV !== 'development') {
//     config.plugins.push(
//         /**
//          * 压缩JS
//          * 去掉debugger
//          * 去掉console
//          */
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false,
//                 // drop_debugger: true,
//                 // drop_console: true,
//             }
//         })
//     )    
// }

module.exports = config