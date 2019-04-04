import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from 'react-hot-loader';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import theme from './theme'

const client = new ApolloClient({
  uri: '//localhost:8080/graphql'
})

const render = Component => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContainer>
            <Component />
          </AppContainer>
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>  
    ,
    document.getElementById('app')
  );
}

render(App);

// if (module.hot) {
//   module.hot.accept('./components/App.jsx', () => {
//     const NextRootContainer = require('./components/App').default;
//     render(NextRootContainer);
//   });
// }

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) });
}