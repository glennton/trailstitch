import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

//Make and export schema
export default makeExecutableSchema({
  typeDefs,
  resolvers
});