import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type UserID {
    _id: ID,
  }

  type User {
    _id: ID!,
    firstName: String,
    lastName: String,
    email: String,
    gpxRecord: ID,
    token: String,
  }
  type SignedUser {
    _id: ID!,
    firstName: String,
    lastName: String,
    gpxRecord: String,
    exp: String,
    iat: String,
    authenticated: Boolean
  }
  extend type Query {
    getOneUser(_id: String!): User
  }
  extend type Mutation {
    createUser(
      firstName: String,
      lastName: String,
      password: String!,
      email: String!,
    ): Response
    login(
      password: String!,
      email: String!,
    ): Response
    validateToken(
      token: String!
    ): SignedUser
  }
`;

export default typeDefs