import gql from 'graphql-tag';

export default gql `
  mutation setToken( $token: String! ){
    setToken(token: $token) @client
  }
`