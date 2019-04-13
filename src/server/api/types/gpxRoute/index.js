import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typeDefs'
import gpxTypeDefs from '../common/typeDefs/gpxTypeDefs'
import defaultTypeDefs from '../common/typeDefs/defaultTypeDefs'
import resolvers from './resolvers'

//Make and export schema
export default makeExecutableSchema({
  typeDefs: [defaultTypeDefs, typeDefs, gpxTypeDefs],
  resolvers
});