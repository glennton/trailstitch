import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './GpxRecordTypeDefs'
import gpxTypeDefs from '../common/typeDefs/gpxTypeDefs'
import gpxRouteTypeDefs from '../GpxRoute/GpxRouteTypeDefs'
import resolvers from './GpxRecordResolvers'
import defaultTypeDefs from '../common/typeDefs/defaultTypeDefs'

//Make and export schema
export default makeExecutableSchema({
  typeDefs: [typeDefs, defaultTypeDefs, gpxTypeDefs, gpxRouteTypeDefs],
  resolvers
});