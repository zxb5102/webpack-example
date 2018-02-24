const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// process.env.NODE_ENV = 'development'

module.exports = merge(common, {
  entry: {
    Polyfill: "babel-polyfill",
    index: "./src/index.js",
    home: "./src/home.js",
    login: "./src/login.js"
  },
  output: {
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    contentBase: "./dist",
    allowedHosts: [
      //配置白名单
      // 'test.com',
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: "./index.html", //生成的html存放路径，相对于path
      template: "./src/index.html", //html模板路径
      // inject: 'body', //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值
      chunks: ["Polyfill", "index" ] //需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { //压缩HTML文件
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: false //删除空白符与换行符
      // }
    }),
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: "./login.html", //生成的html存放路径，相对于path
      template: "./src/login.html", //html模板路径
      // inject: 'body', //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值
      chunks: ["Polyfill", "login" ] //需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { //压缩HTML文件
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: false //删除空白符与换行符
      // }
    }),
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: "./home.html", //生成的html存放路径，相对于path
      template: "./src/home.html", //html模板路径
      // inject: 'body', //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值
      chunks: ["Polyfill", "home" ] //需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { //压缩HTML文件
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: false //删除空白符与换行符
      // }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceMaps: true,
            presets: ["es2015"]
          }
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          {
            loader: "css-loader",
            options: {
              root: "../img",
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("postcss-cssnext")()]
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ])
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: "css-loader",
            options: {
              root: "../img",
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("postcss-cssnext")()]
            }
          }
        ])
      }
    ]
  }
});
