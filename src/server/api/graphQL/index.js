import { ApolloServer } from 'apollo-server-express'
import graphQLConfig from 'Config/graphQL'
import schemas from '../types'

//Create new server and assign to schema - single schema merged from multiple schema types
const apolloServer = new ApolloServer({
  schema : schemas
});

//Connect apollo to app, set playground url
const graphQL = (app) => {
  apolloServer.applyMiddleware({ app, path: graphQLConfig.playgroundURI})
}

export default graphQL
  
