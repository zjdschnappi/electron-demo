const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [path.resolve(__dirname, "../src/main/main.ts")],
  output: {
    path: path.resolve(__dirname, "../dist"),
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
  plugins: [],
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false
  }
};
