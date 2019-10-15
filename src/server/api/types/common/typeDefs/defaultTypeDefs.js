import { gql } from 'apollo-server-express'

const defaultTypeDefs = gql `
  type Query {
    _empty: String
  }
  type _id {
    _id: String
  }
  type Mutation {
    _empty: String
  }
  type Response {
    success: Boolean,
    payload: [ResponseMessage]
  }
  type ResponseMessage {
    type: String,
    message: String
    value: String
  }
`

export default defaultTypeDefs