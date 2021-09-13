import path from "path";

import { DefinePlugin, Configuration } from "webpack";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin";
import LiveReloadPlugin from "webpack-livereload-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import WebpackObfuscator from "webpack-obfuscator";

import packageJson from "./package.json";

const pluginsConfig = (): any[] => {
  const plugins: any[] = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new DefinePlugin({
      __NAME__: JSON.stringify(packageJson.name),
      __VERSION__: JSON.stringify(packageJson.version),
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new StyleLintPlugin(),
  ];

  if (process.env.WATCH) {
    const [protocol, hostname, port] = ["http", "127.0.0.1", 35729];

    plugins.push(
      new LiveReloadPlugin({
        protocol: protocol,
        hostname: hostname,
        port: port,
      })
    );
    plugins.push(
      new HtmlWebpackTagsPlugin({
        tags: [`${protocol}://${hostname}:${port}/livereload.js`],
        append: true,
      })
    );
  }

  if (process.env.RELEASE) {
    plugins.push(
      new WebpackObfuscator({
        rotateStringArray: true,
      })
    );
  }

  return plugins;
};

const config: Configuration = {
  mode: process.env.RELEASE ? "production" : "development",
  entry: path.resolve(__dirname, "src", "main.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  devtool: process.env.RELEASE ? "source-map" : "eval-source-map",
  watch: process.env.WATCH ? true : false,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
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
        test: /\.s?[ac]ss$/i,
        use: [
          process.env.RELEASE ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: pluginsConfig(),
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};

export default config;
