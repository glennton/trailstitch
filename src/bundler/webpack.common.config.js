const path = require("path")

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Styles: path.resolve(__dirname, `../client/components/_styles`),
      Utils: path.resolve(__dirname, `../client/components/_utils`),
      Config: path.resolve(__dirname, `../server/config`),
      Auth: path.resolve(__dirname, `../server/auth`)
    }
  }
}