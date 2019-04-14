import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './UserTypeDefs'
import resolvers from './UserResolvers'
import defaultTypeDefs from '../common/typeDefs/defaultTypeDefs'
//Make and export schema
export default makeExecutableSchema({
  typeDefs: [typeDefs, defaultTypeDefs],
  resolvers
});