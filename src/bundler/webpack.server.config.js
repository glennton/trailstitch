const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: {
      server: `./src/server/server.js`,
    },
    output: {
      path: path.join(__dirname, `../../dist`, `server`),
      publicPath: `/`,
      filename: `[name].js`
    },
    resolve:{
      alias: {
        Config: path.resolve(__dirname, `../server/config`),
        Auth: path.resolve(__dirname, `../server/auth`),
      }
    },
    target: `node`,
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: `babel-loader`
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        }
      ]
    }
  }