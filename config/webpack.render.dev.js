const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const config = require("./index");
const baseWebpackConfig = require("./webpack.render.base");

module.exports = merge(baseWebpackConfig, {
  module: {},
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    // proxy: {
    //   [config.proxyUrl]: {
    //     target: config.apiUrl,
    //     changeOrigin: true,
    //     pathRewrite: { ["^" + config.proxyUrl]: "" }
    //   }
    // },
    inline: true,
    port: config.server.port
  }
});
