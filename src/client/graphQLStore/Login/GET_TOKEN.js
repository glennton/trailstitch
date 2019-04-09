import gql from 'graphql-tag';

export default gql`
  query {
    signedUser @client {
      firstName
      lastName
      token
      isLoggedIn
      recordRef
      exp
      iat
    }
  }
`