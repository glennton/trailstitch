import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import defaultTypeDefs from '../common/typeDefs/defaultTypeDefs'

//Make and export schema
export default makeExecutableSchema({
  typeDefs: [typeDefs, defaultTypeDefs],
  resolvers
});