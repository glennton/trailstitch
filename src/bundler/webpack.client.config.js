const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: {
    main: './src/client/index.js'
  },
  output: {
    path: path.join(__dirname, '../', '../', 'dist', 'client'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          "presets": [
            [
              `@babel/env`, {
                "targets": {
                  "node": "current"
                }
              }
            ],
            `@babel/react`
          ]
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    })
  ]
}