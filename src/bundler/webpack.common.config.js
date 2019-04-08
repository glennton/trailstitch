const path = require("path")

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Routes: path.resolve(__dirname, `../client/components/_routes`),
      Common: path.resolve(__dirname, `../client/components/_common`),
      Styles: path.resolve(__dirname, `../client/components/_styles`),
      Utils: path.resolve(__dirname, `../client/components/_utils`),
      GQL: path.resolve(__dirname, `../client/components/_gql`),
      GraphQLStore: path.resolve(__dirname, `../client/graphQLStore`),
      ClientConfig: path.resolve(__dirname, `../client/config`),
      Config: path.resolve(__dirname, `../server/config`),
      Auth: path.resolve(__dirname, `../server/auth`)
    }
  }
}