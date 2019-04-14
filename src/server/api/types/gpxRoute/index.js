import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './GpxRouteTypeDefs'
import gpxTypeDefs from '../common/typeDefs/gpxTypeDefs'
import defaultTypeDefs from '../common/typeDefs/defaultTypeDefs'
import resolvers from './GpxRouteResolvers'

//Make and export schema
export default makeExecutableSchema({
  typeDefs: [defaultTypeDefs, typeDefs, gpxTypeDefs],
  resolvers
});