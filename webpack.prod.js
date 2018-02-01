const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// process.env.NODE_ENV = 'production'

module.exports = merge(common, {
  output: {
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          {
            loader: "css-loader",
            options: {
              root: "../img"
              // minimize: true
              // sourceMap: true
            }
          },
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     parser: 'sugarss'
          //   }
          // },
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
              root: "../img",
              // modules: true,
              // localIdentName: "[path][name]__[local]--[hash:base64:5]"
              // importLoaders:1
              // minimize: true
              // sourceMap: true
            }
          },
          {
            loader: "postcss-loader"
            // options: {
            //   parser: "sugarss"
            // }
          }
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // }),
  ]
});
