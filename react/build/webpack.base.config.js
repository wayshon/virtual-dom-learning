const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.jsx',
        /**
         * 指定依赖包打包到vendor.js
         */
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist/scripts'),
        publicPath: process.env.NODE_ENV === 'development'
            ? '/dev/'
            : '/',
        filename: process.env.NODE_ENV === 'development' ? `[name].bundle.js` : `[name].${process.env.NODE_ENV}.bundle.js`,
        chunkFilename: process.env.NODE_ENV === 'development' ? `[name].js` : `[name].${process.env.NODE_ENV}.js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                  plugins: [
                    ['import', [{libraryName: 'antd-mobile', style: 'css'}]]
                  ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
              },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    /**
                       * 图片打包路径
                       */
                    outputPath: '../images/',
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: '../media/',
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: '../fonts/',
                    name: '[name].[ext]'
                }
            }
        ]
    },
    externals: [
        {
            '@ctrip/easy': 'ctripEasy'
        },
        {
            '@ctrip/car-react-ctrip': 'carchLibrary'
        }
    ],
}