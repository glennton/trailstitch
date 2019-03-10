
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    main: `./src/client/index.jsx`
  },
  output: {
    path: path.join(__dirname, `../../dist`, `client`),
    publicPath: `/`,
    filename: `[name].js`
  },
  resolve:{
    extensions: ['.js', '.jsx']
  },
  target: `web`,
  devtool: `#source-map`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]

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
}