import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './components/App'

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
      letterSpacing: ` 0.15em`
    },
    h3: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`
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
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('app')
);