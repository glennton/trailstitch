import theme from '../../theme'

export const jssWrapper = {
  width: `100%`,
  maxWidth: theme.breakpoints.values.lg,
  margin: `0 auto`,
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
