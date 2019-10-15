import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './GpxSocialTypeDefs'
import resolvers from './GpxSocialResolvers'

//Make and export schema
export default makeExecutableSchema({
  typeDefs,
  resolvers
});