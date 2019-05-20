# webpack 配置项

## vue 配置项


因webpack 升级4.0  公司内部项目webpack需要升级。  简略配置一波~
```
├── build         # webpack配置
│   ├── webpack.common.js     # 基础
│   ├── webpack.dev.js        # 开发环境配置
│   └── webpack.prod.js       # 生产环境配置
├── public        # 模板
│   └── index.html
├── src           # 项目开发目录
│   ├── common
│   ├── component
│   ├── main.js
│   ├── router
│   ├── store
│   └── views
│       ├── test.png
│       └── test.vue
├── static    # 静态文件
├── dist      # 打包路径
├── package-lock.json
├── package.json       # 项目依赖
├── postcss.config.js  # posscss 配置项
└── webpack.config.js  # webpack 入口
```


---

主要优化点在于开发环境和生产环境的不同配置

> 开发环境  webpack.dev.js 
```
happypack // 多核执行loader
AutoDllPlugin  //  把vue、vue-router、vuex、axios 这类的 框架 和 库 封装到 _dll 里面 
```
主要作用在于 是本地构建环境运行更快
> 生产环境  webpack.prod.js

```
splitChunks  // 重复代码切割
uglifyjs-webpack-plugin // js 压缩
mini-css-extract-plugin // 抽离js 文件的 css
optimize-css-assets-webpack-plugin  // 优化 css
sass-resources-loader  // 全局 sass 变量 不需要每个页面导入
tree-shaking
Scope Hoisting  // 它可以让webpack打包出来的代码文件更小，运行更快，它可以被称作为 "作用域提升"。
```
主要作用在于 打包完毕的文件更小，使重复代码单独切割成一个chunk