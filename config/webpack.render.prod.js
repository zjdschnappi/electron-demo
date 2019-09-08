const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.render.base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  module: {},
  plugins: [],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  }
});
