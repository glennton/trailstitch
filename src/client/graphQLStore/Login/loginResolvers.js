import gql from 'graphql-tag'

export default {
  Mutation: {
    setToken: (_, { token }, { cache }) => {
      
      const query = gql`
        query currentUser{
          currentUser @client {
            token,
            isLoggedIn,
          }
        }
      `

      const prevState = cache.readQuery({ query })
      const data = {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          token,
          isLoggedIn: true,
        }
      }
      cache.writeData({ query, data })
      console.log('query', cache.readQuery({ query }))
      return null
    },
  }
}
