import gql from 'graphql-tag';

export default gql `
  query {
    signedUser @client {
      firstName
      isLoggedIn,
      token,
      recordRef,
      lastName
      exp
      iat
    }
  }
`