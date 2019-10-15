import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './GpxRouteTypeDefs'
import resolvers from './GpxRouteResolvers'
import gpxTypeDefs from '../common/typeDefs/gpxTypeDefs'
import defaultTypeDefs from '../common/typeDefs/defaultTypeDefs'

//Make and export schema
export default makeExecutableSchema({
  typeDefs: [typeDefs, defaultTypeDefs, gpxTypeDefs],
  resolvers
});