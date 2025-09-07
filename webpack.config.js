const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const musicRemoteUrl = process.env.MUSIC_LIBRARY_URL || "http://localhost:3002/remoteEntry.js"

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    clean: true,
  },
  resolve: { extensions: [".js", ".jsx"] },
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader", "postcss-loader"] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: "asset/resource" }
    ]
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "container",
      remotes: {
        music_library: `music_library@${musicRemoteUrl}`
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html")
    })
  ]
};