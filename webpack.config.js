"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const resolve = (dir) => path.join(__dirname, ".", dir);

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  target:"node",
  entry: "./src/index.js",
  output: {
    path: resolve("dist"), // 输出目录
    filename: "[name].js", // 输出文件
    libraryTarget: "umd",  // 配置如何暴露 library。'var' - （默认值）当 library 加载完成，入口起点的返回值将分配给一个变量。'assign' - 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值（谨慎使用）。"this" - 入口起点的返回值将分配给 this 的一个属性（此名称由 output.library 定义）。'window' - 入口起点的返回值将使用 output.library 中定义的值，分配给 window 对象的这个属性下。'global' - 入口起点的返回值将使用 output.library 中定义的值，分配给 global 对象的这个属性下。'commonjs' - 入口起点的返回值将使用 output.library 中定义的值，分配给 exports 对象，output.library 会被省略。这个名称也意味着，模块用于 CommonJS 环境。'commonjs2' - 入口起点的返回值将分配给 module.exports 对象。这个名称也意味着模块用于 CommonJS 环境。'amd' - 将你的 library 暴露为 AMD 模块。'umd' - 将 library 暴露为所有的模块定义下都可运行的方式，它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量
    library: "sendpalm",  // 表示以什么名字输出。将 library 指定为一个对象，用于给每个 target 起不同的名称 library: { root: 'MyLibrary', amd: 'my-library', commonjs: 'my-common-library' }
    libraryExport: "default",  // 配置公开哪些模块。使用export default语法导出，需要设置为 default，否则引入的库需要使用.default才能引用到导出的对象
    umdNamedDefine: true,  // 对 UMD 的构建过程中的 AMD 模块进行命名，否则就使用匿名的 define
    globalObject: "this",  // 指定挂载这个库的全局对象，默认值是 window。非浏览器环境没有 window 对象，Node.js 中报错 window is not defined，当构建 UMD 包需要兼容浏览器和 Node.js 环境时，值应该设为 this
  
    },
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("src")],
        options: {
          formatter: require("eslint-friendly-formatter"),
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: isProd
    ? [
        new UglifyJsPlugin({
          parallel: true,
          uglifyOptions: {
            warnings: false,
            mangle: true,
          },
          sourceMap: true,
        }),
      ]
    : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      ],
};
