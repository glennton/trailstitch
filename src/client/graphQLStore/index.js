import ApolloClient from 'apollo-client'

import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'

import resolvers from './resolvers'

const cache = new InMemoryCache();

const defaultState = {
  currentUser: {
    __typename: 'CurrentUser',
    isLoggedIn: false,
    token: null,
    recordRef: 'test'
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers,
})

const clientStore = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: '//localhost:8080/graphql',
    })
  ]),  
})

export default clientStore