import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'

const typeSchema = makeExecutableSchema({
  typeDefs
});

export default typeSchema