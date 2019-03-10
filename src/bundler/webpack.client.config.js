
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env', {
                    targets: {
                      "node": "current"
                    }
                  }
                ],
                `@babel/react`
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              presets: ['react'],
            }
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        })
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
    new ExtractTextPlugin('style.css')
  ],
}