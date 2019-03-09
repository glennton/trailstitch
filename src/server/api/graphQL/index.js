import {ApolloServer} from 'apollo-server-express'
import {playgroundURI} from 'Config/graphQL.js'
import schemas from '../types'

const apolloServer = new ApolloServer({
  schema : schemas,
  context: req => context(req)
})

export default app => {
  apolloServer.applyMiddleware({ app, path: playgroundURI})
}