const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  plugins: [
    new CleanWebpackPlugin(["dist/*"],{
      //  exclude: [ 'styles.css' ],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./src/others"),
        to: path.resolve(__dirname, "dist/others"),
        ignore: [".*"]
      }
    ])
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
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
