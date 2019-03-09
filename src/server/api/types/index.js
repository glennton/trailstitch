import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

typeDefs = [

];

resolvers = ``

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
  
export default schema