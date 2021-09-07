"use strict"

const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const packageJson = require("./package.json");

module.exports = {
  mode: process.env.RELEASE ? "production" : "development",
  entry: path.resolve(__dirname, "src", "App.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: "ifdef-loader",
        options: {
          DEBUG: !process.env.RELEASE,
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "public", "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJson.version),
      __NAME__: JSON.stringify(packageJson.name),
    }),
  ],
};
