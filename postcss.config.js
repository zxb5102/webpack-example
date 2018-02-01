module.exports = {
//   parser: 'sugarss',
  map: false,
  plugins: [
    // require('autoprefixer')(),
    require("postcss-cssnext")(),
    require('lost')(),
  ]
//   from: '/path/to/src.sss',
//   to: '/path/to/dest.css',
//   plugins: {
//     'postcss-plugin': {}
//   }
}