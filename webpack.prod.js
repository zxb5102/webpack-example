const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

// process.env.NODE_ENV = 'production'

module.exports = merge(common, {
  entry: {
    Polyfill: "babel-polyfill",
    index: "./src/index.js",
    home: "./src/home.js",
    login: "./src/login.js"
  },
  output: {
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceMaps: false,
            // minified:true,
            presets: [["es2015", { modules: false }]]
            /* 
              这里添加了去除无效代码的功能  结合代码的压缩工具就可以去除没有用到的代码了
              一但使用了 babel-loader 的 es2015，webpack 2.0 默认的 modules 就会被 babel 转成 commonjs 的模块了，
              享受不到 tree shaking 的福利了
              site :https://xiekw2010.github.io/2017/05/16/webpack-2-0-%E9%85%8D%E7%BD%AE%E8%BF%9B%E9%98%B6%E5%B0%8F%E8%AE%B0%EF%BC%88code-spiltting-tree-shaking%EF%BC%89/
            */
          }
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          {
            loader: "css-loader",
            options: {
              root: "../img"
              // minimize: true
              // minimize: true
              // sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              plugins: [require("postcss-cssnext")()]
            }
          },
          {
            loader: "less-loader",
            options: {
              // sourceMap: true
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
              root: "../img"
              // minimize: true //会自动去除我们的css注释
              // modules: true,
              // localIdentName: "[path][name]__[local]--[hash:base64:5]"
              // importLoaders:1
              // minimize: true
              // sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              plugins: [require("postcss-cssnext")()]
            }
          }
        ])
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', //生成的html存放路径，相对于path
      template: './src/index.html', //html模板路径
      // inject: 'body', //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值
      chunks: ['Polyfill', 'index','commons'],//需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { //压缩HTML文件    
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: false //删除空白符与换行符
      // }
  }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './login.html', //生成的html存放路径，相对于path
      template: './src/login.html', //html模板路径
      // inject: 'body', //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值
      chunks: ['Polyfill', 'login','commons'],//需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { //压缩HTML文件    
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: false //删除空白符与换行符
      // }
  }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './home.html', //生成的html存放路径，相对于path
      template: './src/home.html', //html模板路径
      // inject: 'body', //js插入的位置，true/'head'/'body'/false
      // hash: true, //为静态资源生成hash值
      chunks: ['Polyfill', 'home','commons'],//需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { //压缩HTML文件    
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: false //删除空白符与换行符
      // }
  }),
    new ExtractTextPlugin("styles.css"),
    new UglifyJSPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename:"[name].bundle.js",
      minChunks: 3
      /*
        指定最少需要被多个个chunk 引用才算是一个公共的模块 这里配置的至少要 3个页面引用 才行 当前就3个页面引用
        测试 改为4 的时候没有提取出公共的文件来 
      */
      //site: https://doc.webpack-china.org/plugins/commons-chunk-plugin 详细说明
    })
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // }),
  ]
});
