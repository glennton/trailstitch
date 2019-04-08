import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from 'react-hot-loader';

import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import App from './components/App/App';
import theme from './theme'
import clientStore from 'GraphQLStore'

const render = Component => {
  ReactDOM.render(
    <ApolloProvider client={clientStore}>
      <ApolloHooksProvider client={clientStore}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppContainer>
              <Component />
            </AppContainer>
          </Router>
        </MuiThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>  
    ,
    document.getElementById('app')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => { render(App) });
}