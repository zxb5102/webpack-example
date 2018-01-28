const merge = require("webpack-merge");
const common = require("./webpack.common.js");

// process.env.NODE_ENV = 'development'

module.exports = merge(common, {
  output: {
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  }
});
