const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    // new webpack.ProvidePlugin({
    //   $: ""
    // }),
    new ExtractTextPlugin("styles.css")
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract([
      //     {
      //       loader: "css-loader",
      //       options: {
      //         root: "../img",
      //         sourceMap: true
      //       }
      //     },
      //     {
      //       loader: "less-loader",
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ])
      // },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract([
      //     {
      //       loader: "css-loader",
      //       options: {
      //         root: "../img",
      //         sourceMap: true
      //       }
      //     }
      //   ])
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              root: "./img",
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "anywhere/img/[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};
