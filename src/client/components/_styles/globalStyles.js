import theme from '../../theme'

export const jssWrapper = {
  width: `100%`,
  maxWidth: theme.breakpoints.values.lg,
  margin: `0 auto`,
}
export const jssWrapperPadding = {
  paddingLeft: 4 * theme.spacing.unit,
  paddingRight: 4 * theme.spacing.unit,
  [theme.breakpoints.up('lg')]: { //1280
    paddingLeft: 0,
    paddingRight: 0,
  },
}

export const jssModalWrapperOuter = {
  flexBasis: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
}
export const jssModalWrapperInner = {
  flexBasis: '90vw',
  padding: 2 * theme.spacing.unit,
  [theme.breakpoints.up('sm')]: { 
    flexBasis: '70vw',
  },
  [theme.breakpoints.up('md')]: {
    flexBasis: '50vw',
  },
  [theme.breakpoints.up('lg')]: {
    flexBasis: '40vw',
  },
}
