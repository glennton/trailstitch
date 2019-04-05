import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'
import gpxTypeDefs from '../common/gpxTypeDefs'
import resolvers from './resolvers'

//Make and export schema
export default makeExecutableSchema({
  typeDefs: [typeDefs, gpxTypeDefs],
  resolvers
});