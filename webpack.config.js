const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: [
    './src/scripts/index.ts',
    './src/styles/index.scss'
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "bundle.css"
  })],
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
  },
  devServer: {
    static: './public',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
