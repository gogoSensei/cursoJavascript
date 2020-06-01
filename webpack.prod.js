const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const optimizeCssAssetsWbpack = require('optimize-css-assets-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new optimizeCssAssetsWbpack()
    ]
  },
  output: {
    filename: 'main.[contentHash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use:[ 
          'babel-loader' 
        ]
      },
      {
        test: /\.css$/,
        exclude: /styles\.css/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /styles\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        loader:'html-loader',
        options: {
          attributes: false,
          minimize: true
        },
      },
      {
        test: /\.(png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template:'./src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css',
      ignoreOrder: false
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets/'
        }
      ]
    }),
    new CleanWebpackPlugin(),
    new MinifyPlugin(),
    new HtmlWebpackPlugin(),
  ]
}
