import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import { makeExecutableSchema } from 'graphql-tools'

const testSchema = makeExecutableSchema({
  typeDefs
});
  
export default testSchema
