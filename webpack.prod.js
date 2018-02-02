const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

// process.env.NODE_ENV = 'production'

module.exports = merge(common, {
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
              root: "../img",
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
    new ExtractTextPlugin("styles.css"),
    new UglifyJSPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // }),
  ]
});
