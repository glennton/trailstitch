import typeDefs from './typeDefs.js'
import { makeExecutableSchema } from 'graphql-tools'

const typeSchema = makeExecutableSchema({
  typeDefs
});

export default typeSchema