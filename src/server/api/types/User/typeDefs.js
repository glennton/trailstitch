import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type UserID {
    _id: ID,
  }

  type User {
    _id: ID!,
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    gpxRecord: ID
  }
  type Query {
    getOneUser(_id: String!): User
  }
  type Mutation {
    createUser(
      userId: String!,
      firstName: String,
      lastName: String,
      password: String!,
      email: String!,
    ): User
  }
`;

export default typeDefs