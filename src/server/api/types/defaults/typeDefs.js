import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

export default typeDefs