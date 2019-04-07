import { makeExecutableSchema } from 'graphql-tools'
import defaultTypeDefs from './defaultTypeDefs'
import gpxTypeDefs from './gpxTypeDefs'

export default makeExecutableSchema({
  typeDefs: [defaultTypeDefs, gpxTypeDefs],
  resolvers: {}
});