const path = require('path')
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
// const HappyPack = require('happypack') // 多核执行
// AutoDllPlugin  多线程 编译，  dll 都是静态 的js库 例如 vue  vuex  vue-router axios  就可以 用dll
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.css$/,
      exclude: resolve('node_modules'),
      use: ['vue-style-loader', 'css-loader', "postcss-loader"]
    }, {
      test: /\.scss$/,
      exclude: resolve('node_modules'),
      use: ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'img/',
          limit: 100
        }
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'url-loader',
        options: {
          outputPath: 'font/',
        }
      }

    }]
  },
  devServer: {
    contentBase: resolve('dist'),
    overlay: {
      errors: true,
      warnings: true,
    },
    hot: true,
    open: true
  }
})