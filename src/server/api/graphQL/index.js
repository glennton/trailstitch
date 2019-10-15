import { ApolloServer } from 'apollo-server-express'
import { validateToken } from 'ServerUtils/tokenUtilities'
import graphQLConfig from 'Config/graphQL'
import schemas from '../types'
import parseCookie from '../../utils/parseCookie'

//Create new server and assign to schema - single schema merged from multiple schema types
const apolloServer = new ApolloServer({
  schema : schemas,
  //formatError: (err) => { console.log(err.stack); return err },
  context: ( {req} ) => {
    console.log('req')
    const token = req.headers.cookie ? parseCookie('userToken', req.headers.cookie) : null
    if (token) {
      return validateToken(token)
        .then((signedUser) => {
          return signedUser
        })
        .catch((err) => {
          console.log('apolloServer context', err)
        });
    }else{
      return null
    }
  },
});

//Connect apollo to app, set playground url
const graphQL = (app) => {
  apolloServer.applyMiddleware({ app, path: graphQLConfig.endpoint})
}

export default graphQL
  
