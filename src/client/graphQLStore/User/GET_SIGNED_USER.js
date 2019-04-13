import gql from 'graphql-tag';

export default gql `
  query SignedUser($_id: String!) {
    signedUser(_id: $_id) @client {
      _id,
      firstName,
      lastName,
      gpxRecord,
      exp,
      iat,
      authenticated,
    }
  }
`