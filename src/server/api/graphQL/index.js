import {ApolloServer, gql} from 'apollo-server-express'
import {playgroundURI} from 'Config/graphQL.js'
import schema from '../types'

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
    mockedString: String
  }
`;

const resolvers = {
  Query: {
    hello: () =>
      fetch('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
        .then(res => res.json())
        .then(data => data.hello),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => context(req)
})

export default app => {
  apolloServer.applyMiddleware({ app, path: playgroundURI})
}