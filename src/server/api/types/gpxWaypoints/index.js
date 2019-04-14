import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './GpxWaypointsTypeDefs'
import resolvers from './GpxWaypointsResolvers'

//Make and export schema
export default makeExecutableSchema({
  typeDefs,
  resolvers
});