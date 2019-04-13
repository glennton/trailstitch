import gql from 'graphql-tag';

const VALIDATE_TOKEN = gql `
  mutation validateToken(
    $token: String!
  ) {
    validateToken(
      token: $token
    ) {
      _id,
      firstName,
      lastName,
      gpxRecord,
      exp,
      iat,
      authenticated,
    }
  }
`;

export default VALIDATE_TOKEN