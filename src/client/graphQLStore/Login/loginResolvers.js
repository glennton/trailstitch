import gql from 'graphql-tag'
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    setToken: (_, { token }, { cache }) => {
      const decodedToken = jwt.decode(token);
      console.log('decodedToken', decodedToken)
      const query = gql `
        query signedUser{
          signedUser @client {
            token,
            isLoggedIn,
          }
        }
      `
      const prevState = cache.readQuery({ query })
      const data = {
        ...prevState,
        signedUser: {
          ...prevState.signedUser,
          ...decodedToken,
          token: token,
          isLoggedIn: true,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
        }
      }
      console.log('resolver', data)
      cache.writeData({ query, data })
      return data.signedUser
    },
  }
}