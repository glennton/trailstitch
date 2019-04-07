import gql from 'graphql-tag';

const CREATE_USER = gql `
  mutation CreateUser(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
  ) {
    createUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,

    ) {
      success
      payload{
        type
        message
      }
    }
  }
`;

export default CREATE_USER