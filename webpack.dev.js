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
    port: 3000,
    host: "0.0.0.0",
    contentBase: "./dist",
    allowedHosts: [//配置白名单
      // 'test.com',
    ]
  },
  plugins: [new ExtractTextPlugin("styles.css")],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceMaps:true,
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
