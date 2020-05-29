const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWbpack = require('optimize-css-assets-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    minimizer: [
      new optimizeCssAssetsWbpack()
    ]
  },
  module: {
    rules: [
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
      template:'[name].[contentHash].css',
      ignoreOrder: false
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets/'
        }
      ]
    })
  ]
}
