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
      color: 'inherit',
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`
    },
    h2: {
      color: 'inherit',
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`,
      fontSize: `3.75em`,
      [defaultTheme.breakpoints.down('sm')]: {

      }
    },
    h3: {
      color: 'inherit',
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`,
    },
    h4: {
      color: 'inherit',
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`
    },
    h5: {
      color: 'inherit',
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: ` 0.15em`
    },
    h6: {
      color: 'inherit',
      fontWeight: 400,
      letterSpacing: ` 0.05em`
    },
    display1: { color: 'inherit' },
    display2: { color: 'inherit' },
    display3: { color: 'inherit' },
    display4: { color: 'inherit' },
    subtitle1: { color: 'inherit' },
    subtitle2: {color: 'inherit'},
    body1Next: {color: 'inherit'},
    body2Next: {color: 'inherit'},
    buttonNext: {color: 'inherit'},
    captionNext: {color: 'inherit'},
    overline: {color: 'inherit'},
    button: {color: 'inherit'},
    caption: {color: 'inherit'},
    body1: {color: 'inherit'},
    body2: {color: 'inherit'},
    subheading: {color: 'inherit'},
    title: {color: 'inherit'},
    headline: {color: 'inherit'},
  },
});

export default theme