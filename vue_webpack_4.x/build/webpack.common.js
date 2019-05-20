const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// chunkhash  需要关闭 hot  
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'static/js/[name].[hash].js',
    path: resolve('dist'),
    chunkFilename:'static/js/[id].[hash].js',
    publicPath: '' // 可以上传cdn
  },
  resolve: {
    //  默认 ['.js','.json']
    extensions: ['.js', '.vue', '.json'],
    // 别名
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components'),
      'common': resolve('src/common'),
      'api': resolve('src/api')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader',
      include: resolve('src'),
      exclude: resolve('node_modules')
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      include: resolve('src'),
      exclude: resolve('node_modules')
    }, {
      test: /\.scss$/,
      use: ["vue-style-loader", "css-loader", "sass-loader"]
    }]
  },
  plugins: [
    // new ClearWebpackPlugin(),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist'),
      ignore: ['*.html']
    }, {
      from: path.resolve(__dirname, '../static'),
      to: path.resolve(__dirname, '../dist/static'),
      ignore: ['.*']
    }])
  ]
}