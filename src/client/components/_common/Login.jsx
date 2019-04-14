//Core
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Mutation, graphql } from "react-apollo";
import jwt from 'jsonwebtoken'
//import { useMutation } from 'react-apollo-hooks';

//UI Elements
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton'

//GraphQL Store
import UserContext from 'Context/UserContext'
import GET_SIGNED_USER from 'GraphQLStore/User/GET_SIGNED_USER'
import SET_TOKEN from 'GraphQLStore/Login/SET_TOKEN'
import LOGIN from 'GraphQLStore/Login/LOGIN'

//Utils
import validateForEmptyFields from 'Utils/forms/validateForEmptyFields'
import parsePayload from 'Utils/GraphQL/parsePayload'
import { useCookies } from 'react-cookie';
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
  },
  accountButton: {
    justifySelf: 'flex-end',
  },
  accountIcon: {
    color: theme.palette.grey[500],
  },
  accountIconActive: {
    color: theme.palette.primary.main,
  }
})

const Login = props => {

  const { classes, SET_TOKEN } = props;
  const [cookies, setCookie] = useCookies(['user']);
  const { signedUser, token } = useContext(UserContext)
  const popoverTarget = React.createRef()

  //Form States
  const [email, setEmailState] = useState({ value: '', errorMessage: null })
  const [password, setPasswordState] = useState({ value: '', errorMessage: null })
  const [formError, setFormError] = useState(false)
  const [popoverState, setPopoverState] = useState(false)

  //Auth States
  const [isAuth, setAuth] = useState(false)
  const [signedUserName, setSignedUserName] = useState(false)

  //Token
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

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (signedUser) {
      setAuth(signedUser.authenticated)
      setSignedUserName(signedUser.firstName)
    }
  }, [signedUser.authenticated]);

  const handlePopoverOpen = () => {
    setPopoverState(true)
  }
  const handlePopoverClose = () => {
    setPopoverState(false)
  }


  const handleSubmitForm = (login) => (event) => {
    event.preventDefault();

    const validatedSuccessful = validateForEmptyFields(fieldValidation)
    if (validatedSuccessful) {
      setFormError(false)
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
        const userTokenPayload = parsePayload(payload, "userToken")
        const userIdPayload = parsePayload(payload, "userId")
        if (success && userTokenPayload && userIdPayload) {
          handleSuccessfulSubmit(userTokenPayload.value, userIdPayload.value)
        } else {

          const error = parsePayload(payload, "authError").message
          handleSubmitFormErrors(error)
        }
      }).catch((err) => {
        console.log('error', err)
        handleSubmitFormErrors()
      })
    }
  }
  const handleSubmitFormErrors = (errPayload = 'We apologize, an unknown error has occured. Please try logging in again.') => {
    setFormError(errPayload)
  }
  const handleSuccessfulSubmit = (userToken, userId) => {
    SET_TOKEN({ variables: { token: userToken } }).then(() => {
      const signedUser = jwt.decode(userToken);
      setCookie('userToken', userToken)
      setCookie('userData', signedUser)
      setAuth(signedUser.authenticated)
      setSignedUserName(signedUser.firstName)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div ref={popoverTarget}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={handlePopoverOpen}
          color="inherit"
          className={classes.accountButton}
        >
          <AccountCircle className={isAuth ? classes.accountIconActive : classes.accountIcon} />
        </IconButton>
      </div>
      <Popover
        id="simple-popper"
        open={Boolean(popoverState)}
        onClose={handlePopoverClose}
        anchorEl={() => popoverTarget.current}
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
          {isAuth ? (
            <>
              <Typography className={classes.typography}>
                Welcome Back
                {signedUserName ? `, ${signedUserName}` : ''}
                !
              </Typography>
            </>
          ) : (
              <>
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
                          onChange={() => { setEmailState({ ...email, value: event.target.value }) }}
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
                      {formError ? (
                        <Grid>
                          <Typography variant="caption" className={classes.errorMessage}>
                            {formError}
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
              </>
            )}
        </Grid>
      </Popover>
    </>
  );
}

Login.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  SET_TOKEN: PropTypes.func.isRequired,
}

export default compose(
  graphql(SET_TOKEN, { name: 'SET_TOKEN' }),
  hot(module),
  withStyles(styles)
)(Login)