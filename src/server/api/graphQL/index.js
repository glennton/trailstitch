import { ApolloServer , gql} from 'apollo-server-express'
import { playgroundURI } from 'Config/graphQL.js'
import schemas from '../types'

const apolloServer = new ApolloServer({
  schema : schemas
});

const graphQL = (app) => {
  apolloServer.applyMiddleware({ app, path: playgroundURI})
}

export default graphQL
  
