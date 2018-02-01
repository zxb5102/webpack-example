const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// process.env.NODE_ENV = 'development'

module.exports = merge(common, {
  output: {
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins:[
    new ExtractTextPlugin("styles.css")
  ],
  module:{
    rules:[
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
            loader:"postcss-loader",
            options:{
              sourceMap:true,
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
            loader:"postcss-loader",
            options:{
              sourceMap:true,
            }
          },
        ])
      }
    ]
  }
});
