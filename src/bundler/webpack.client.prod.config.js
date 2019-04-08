const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = webpackMerge(commonConfig, {
  entry: [    
    'react-hot-loader/patch', `./src/client/index.jsx`
  ],
  output: {
    path: path.join(__dirname, `../../dist`, `client`),
    publicPath: `./`,
    filename: `[name].js`
  },
  mode: 'production',
  target: `web`,
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, `../../dist`, `client`),
    historyApiFallback: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: `html-loader`,
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: [`file-loader`]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebPackPlugin({
      template: `./src/client/index.html`,
      filename: `./index.html`,
      excludeChunks: [ `server` ]
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
})