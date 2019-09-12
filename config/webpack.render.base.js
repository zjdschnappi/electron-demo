const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./index");

module.exports = {
  entry: {
    app: [path.resolve(__dirname, "../src/renderer/app.tsx")]
  },
  output: {
    path: path.resolve(__dirname, config.dist),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader?cacheDirectory=true"
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "../src/renderer/components")
    },
    extensions: [".jsx", ".js", ".tsx", ".ts"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["app"],
      filename: `./index.html`,
      template: path.resolve(__dirname, "../src/renderer/index.html"),
      inject: "body",
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  target: "electron-renderer",
  node: {
    __dirname: false,
    __filename: false
  }
};
