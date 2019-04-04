import { createMuiTheme } from '@material-ui/core/styles';

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
      letterSpacing: ` 0.15em`
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

export default theme