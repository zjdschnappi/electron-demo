const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./index");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/renderer/app.tsx")
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
      },
      {
        test: /\.(less|css)$/,
        // include: path.resolve(__dirname, "../src/renderer/styles"),
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        loader: "url-loader",
        exclude: path.resolve(__dirname, "../src/renderer/assets/emoji"),
        options: {
          limit: 8192,
          name: "assets/[name].[ext]",
          outputPath: "./",
          publicPath: config.publicPath
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "../src/renderer/components"),
      styles: path.resolve(__dirname, "../src/renderer/styles")
    },
    extensions: [".jsx", ".js", ".tsx", ".ts"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/renderer/index.html")
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, "../src/renderer/assets"),
          to: path.resolve(__dirname, `${config.dist}/assets`)
        }
      ],
      {
        cache: true
      }
    )
  ],
  target: "electron-renderer",
  node: {
    __dirname: false,
    __filename: false
  }
};
