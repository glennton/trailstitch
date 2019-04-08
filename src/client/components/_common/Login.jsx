//Core
import React, { useState} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Mutation, graphql } from "react-apollo";

import getToken from 'GraphQLStore/Login/getToken'
import setToken from 'GraphQLStore/Login/setToken'
//import { useMutation } from 'react-apollo-hooks';

//UI Elements
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
//Development Data
//import DummyData from 'Utils/DummyData'

//Utils
import LOGIN from 'GQL/Login'
import validateForEmptyFields from 'Utils/forms/validateForEmptyFields'
import parsePayload from 'Utils/GraphQL/parsePayload'

//Components

const styles = theme => ({
  popoverContainer: {
    padding: 2 * theme.spacing.unit,
    width: '250px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 2 * theme.spacing.unit,
  },
  input: {
    flex: '1',
    marginBottom: theme.spacing.unit,
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit
  }
})

const Login = props => {

  const { classes, onClose, anchorEl, openState, currentUser, setToken } = props;
  const [email, setEmailState] = useState({ value: '', errorMessage: null })
  const [password, setPasswordState] = useState({ value: '', errorMessage: null })
  const [authError, setAuthError ] = useState(false)
  console.log('currentUser', currentUser)
  const fieldValidation = [
    {
      fieldData: email,
      setState: setEmailState,
    },
    {
      fieldData: password,
      setState: setPasswordState,
    }
  ]

  // const loginMutation = useMutation(LOGIN, {
  //   variables: {
  //     email: email.value,
  //     password: password.value,
  //   }
  // })

  //const [passwordError, setPasswordErrorState] = useState(null)

  const handleSubmitForm = (login) => (event) => {
    event.preventDefault();

    const validatedSuccessful = validateForEmptyFields(fieldValidation)
    if (validatedSuccessful) {
      setAuthError(false)
      login(
        {
          variables: {
            email: email.value,
            password: password.value,
          }
        }
      ).then(({ data }) => {
        const { login } = data
        const { success, payload } = login
        const tokenPayload = parsePayload(payload, "token")
        if (success && tokenPayload) {
          handleSuccessfulSubmit(tokenPayload.value)
        } else {
          const error = parsePayload(payload, "authError").message
          handleSubmitFormErrors(error)
        }
      }).catch(() => {
        handleSubmitFormErrors()
      })
    }


  }
  const handleSubmitFormErrors = (errPayload = 'We apologize, an unknown error has occured. Please try logging in again.') => {    
    setAuthError(errPayload)
  }
  const handleSuccessfulSubmit = (token) => {
    console.log({ variables: { token } })
    setToken({variables: {token}})
  }

  return (
    <Popover
      id="simple-popper"
      open={Boolean(openState && anchorEl())}
      anchorEl={anchorEl()}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Grid container className={classes.popoverContainer} direction="column">
        <Typography className={classes.typography}>Have an account?</Typography>
        <Mutation mutation={LOGIN}>
          {(login) => (
            <form className={classes.formContainer} autoComplete="on" onSubmit={handleSubmitForm(login)}>
              <FormControl className={classes.input} error={email.errorMessage != null}>
                <Input
                  id="outlined-email-input"
                  label="Email"
                  placeholder="Email"
                  className={classes.input}
                  value={email.value || ''}
                  onChange={() => { setEmailState({ ...email, value: event.target.value })}}
                  type="email"
                  autoComplete="email"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className={classes.input} error={password.errorMessage != null}>
                <Input
                  id="outlined-password-input"
                  label="Password"
                  placeholder="Password"
                  className={classes.input}
                  value={password.value || ''}
                  type="password"
                  autoComplete="current-password"
                  onChange={() => { setPasswordState({ ...email, value: event.target.value }) }}
                  variant="outlined"
                />
              </FormControl>
              {authError ? (
                <Grid>
                  <Typography variant="caption" className={classes.errorMessage}>
                    {authError}
                  </Typography>
                </Grid>
              ) : ''}               
              <Grid container justify="flex-end">
                <Button variant="contained" type="submit" value="Submit" size="medium" color="primary" className={classes.submitBtn}>
                  Continue
                </Button>
              </Grid>
            </form>
          )}

        </Mutation>
      </Grid>
    </Popover>
  );
}

Login.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  openState: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.func.isRequired,
}

export default compose(
  graphql(setToken, {name: 'setToken'}),
  graphql(getToken, {
    props: ({data: {currentUser, loading} }) => ({
      currentUser,
      loading
    })
  }),
  hot(module),
  withStyles(styles)
)(Login)