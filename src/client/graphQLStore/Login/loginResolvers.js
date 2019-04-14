import gql from 'graphql-tag'
import jwt from 'jsonwebtoken'

export default {
  Query: {
    signedUser: (_, {_id}, { cache }) => {
      const id = `SignedUser:${_id}`
      const fragment = gql `
        fragment signedUser on SignedUser {
          _id,
          firstName,
          lastName,
          gpxRecord,
          exp,
          iat,
          authenticated,
        }
      `
      return cache.readFragment({ fragment, id });

    },
    getOneGpxRoute: (_, params, { cache }) => {
      console.log('CACHE', params, cache)
    }
  },
  Mutation: {
    setToken: (_, { token }, { cache }) => {
      console.log('TOKEN', token)

      const decodedToken = jwt.decode(token);

      const query = gql `
        query signedUser{
          signedUser @client {
            token,
          }
        }
      `
      const prevState = cache.readQuery({ query })
      console.log('decodedToken', decodedToken)
      console.log('prevState', prevState)
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
      console.log('data :', data);
      console.log('cache.data.data :', cache.data.data);
      cache.writeData({ query, data })
      return data.signedUser
    },
  }
}
