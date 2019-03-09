import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const testSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});
  
export default testSchema
