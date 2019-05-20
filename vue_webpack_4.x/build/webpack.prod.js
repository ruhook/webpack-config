const path = require('path')
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理dist
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // js 压缩
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离js 文件的 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 优化 css

// sass-resources-loader  全局 sass 变量 不需要每个页面导入
// tree-shaking
// Scope Hoisting 它可以让webpack打包出来的代码文件更小，运行更快，它可以被称作为 "作用域提升"。
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  module: {
    rules: [{
      test: '/\.css$/',
      exclude: resolve('node_modules'),
      use: [
        // MiniCssExtractPlugin.loader, 
        'vue-style-loader', 'css-loader', "postcss-loader"
      ]
    }, {
      test: /\.scss$/,
      exclude: resolve('node_modules'),
      use: [
        // MiniCssExtractPlugin.loader, 
        'vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/img/',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: false,
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: "[id].css"
    })
  ]
})