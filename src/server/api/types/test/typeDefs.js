import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User{
    id: Int!,
    name: String,
    username: String,
    address: Address
  }
  type Address{
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: Geo
  }
  type Geo{
    lat: String,
    lng: String
  }
  type Query {
    getUser(num: Int!): User,
    getAllUsers: [User]
  }
`

export default typeDefs