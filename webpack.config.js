const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
      port: 80,
      watchFiles: path.join(__dirname, 'src'),
  },
    plugins: [new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
       new HtmlWebpackPlugin({
         template: './src/index.html'
        }),
        new CopyPlugin({
          patterns: [
            { from: 'src/assets', to: 'assets'},
          ],
        })
    ],
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          include: [path.resolve(__dirname, "src")],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      extensionAlias: {
       ".js": [".js", ".ts"],
       ".cjs": [".cjs", ".cts"],
       ".mjs": [".mjs", ".mts"]
      }
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "public"),
      assetModuleFilename: 'assets/[name][ext]',
    },
  };
