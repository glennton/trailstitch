import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  }
});
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h1: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing:` 0.15em`
    },
    h2: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`,
      fontSize: `3.75em`,
      [defaultTheme.breakpoints.down('sm')]: {

      }
    },
    h3: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`,
    },
    h4: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`
    },
    h5: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`
    },
    h6: {
      fontWeight: 400,
      letterSpacing: ` 0.05em`
    }
  },
});

const render = Component => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContainer>
          <Component />
        </AppContainer>
      </Router>
    </MuiThemeProvider>
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