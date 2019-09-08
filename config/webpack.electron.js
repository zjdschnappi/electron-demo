const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = require("./index");

module.exports = {
  entry: [path.resolve(__dirname, "../src/main/main.ts")],
  output: {
    path: path.resolve(__dirname, config.dist),
    filename: "main.js"
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".json"]
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, "../resource"),
          to: path.resolve(__dirname, `${config.dist}/resource`)
        }
      ],
      {
        cache: true
      }
    )
  ],
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false
  }
};
