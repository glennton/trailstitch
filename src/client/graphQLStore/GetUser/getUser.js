import gql from 'graphql-tag';

export default gql `
  query {
    currentUser @client {
      isLoggedIn,
      token,
      recordRef
    }
  }
`