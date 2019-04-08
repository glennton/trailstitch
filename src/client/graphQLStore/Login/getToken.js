import gql from 'graphql-tag';

export default gql`
  query {
    currentUser @client {
      token
      isLoggedIn
      recordRef
    }
  }
`