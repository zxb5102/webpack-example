var path = require('path');
var glob = require('glob');
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// process.env.NODE_ENV = 'development'
const myPlugins = [
  new ExtractTextPlugin("styles.css"),
];
const entrys = getEntry("./src/*.js");
entrys["Polyfill"] = "babel-polyfill";
module.exports = merge(common, {
  entry: entrys,
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
  plugins: myPlugins.concat(getPlugins()),
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
/**
 * 
 * @param {*} globPath 传递一个应该匹配的js文件匹配表达式
 * 返回示例 
 * {
 *    home :"./src/home.js",
 *    login :"./src/login.js"
 * }
 */
function getEntry(globPath) {
  var files = glob.sync(globPath);
  var entries = {},
    entry,
    dirname,
    basename,
    pathname,
    extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    // pathname = path.join(dirname, basename);
    // pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[basename] = "./" + entry;
  }
  return entries;
}
/**
 * 返回 插件列表 用于生成  HTML 文件
 */
function getPlugins() {
  const ary = [];
  const entries = getEntry('src/*.js');
  for (key in entries) {
    ary.push(
      new HtmlWebpackPlugin({
        //根据模板插入css/js等生成最终HTML
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: "./"+key+".html", //生成的html存放路径，相对于path
        template: "./src/"+key+".html", //html模板路径
        // inject: 'body', //js插入的位置，true/'head'/'body'/false
        // hash: true, //为静态资源生成hash值
        chunks: ["Polyfill", key, "commons"] //需要引入的chunk，不配置就会引入所有页面的资源
        // minify: { //压缩HTML文件
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: false //删除空白符与换行符
        // }
      })
    );
  }
  return ary;
}
