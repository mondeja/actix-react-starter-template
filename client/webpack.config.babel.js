import path from "path";

import { DefinePlugin } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import packageJson from "./package.json";

const config = {
  mode: process.env.RELEASE ? "production" : "development",
  entry: path.resolve(__dirname, "src", "main.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: "ifdef-loader",
        options: {
          DEBUG: !process.env.RELEASE,
        },
      },
      {
        test: /\.css$/i,
        use: [
          process.env.RELEASE ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      __VERSION__: JSON.stringify(packageJson.version),
      __NAME__: JSON.stringify(packageJson.name),
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
};

export default config;
