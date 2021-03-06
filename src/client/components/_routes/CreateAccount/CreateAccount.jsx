//Core
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { graphql } from "react-apollo";

//UI Elements
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { jssWrapper, jssModalWrapperOuter, jssModalWrapperInner } from 'Styles/globalStyles'
import Typography from '@material-ui/core/Typography'

//GraphQL Store
import UserContext from 'Context/UserContext'
import CREATE_USER from 'GraphQLStore/User/CREATE_USER'

//Utils
import validateForEmptyFields from 'Utils/forms/validateForEmptyFields'
import parsePayload from 'Utils/GraphQL/parsePayload'
import CreateAccountSuccess from './CreateAccountSuccess';
//import validatePassword from './passwordValidation'

//Components

const styles = theme => ({
  wrapper: {
    ...jssWrapper
  },
  modalWrapperOuter: {
    ...jssModalWrapperOuter,
  },
  modalWrapperInner: {
    ...jssModalWrapperInner,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    align: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 2 * theme.spacing.unit,
  },
  input: {
    width: '100%',
  },
  submitBtnContainer: {
    paddingTop: 4 * theme.spacing.unit
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit
  }
})

const CreateAccount = (props) => {

  const { classes, CREATE_USER } = props;
  const { setUserCookies } = useContext(UserContext)

  const [firstName, setFirstNameState] = useState({ value: '', errorMessage: null })
  const [lastName, setLastNameState] = useState({ value: '', errorMessage: null })
  const [email, setEmailState] = useState({ value: '', errorMessage: null })
  const [password, setPasswordState] = useState({ value: '', errorMessage: null })
  const [passwordValidation, setPasswordValidationError] = useState(null)
  const [emailValidation, setemailValidationError] = useState(null)
  const [formError, setFormError] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const fieldValidation = [
    { fieldData: firstName, setState: setFirstNameState },
    { fieldData: lastName, setState: setLastNameState },
    { fieldData: email, setState: setEmailState },
    { fieldData: password, setState: setPasswordState }
  ]

  //TODO
  // const checkPassword = (value) => {
  //   const { isValid = false, errorMessage = ''} = validatePassword(value)
  //   if ( isValid ){
  //     setPasswordValidationError()
  //   }
  //   else{
  //     setPasswordValidationError(errorMessage)
  //   }
  // }
  //TODO
  // const checkEmail = (value) => {
  //   const emailIsValid = validator.isEmail(value)
  //   if (emailIsValid) {
  //     setemailValidationError(null)
  //   }
  //   else {
  //     setemailValidationError('Please enter a valid email address')
  //   }
  // } 

  const handleSubmitForm = () => (event) => {
    event.preventDefault();
    const validatedSuccessful = validateForEmptyFields(fieldValidation)
    if (validatedSuccessful){
      CREATE_USER(
        {
          variables: {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
          }
        }
      ).then(({data}) => {
        console.log('create user success: ', data)
        const { createUser } = data
        const { success, payload } = createUser
        const tokenPayload = parsePayload(payload, "token")
        if (success && tokenPayload){
          handleSuccessfulSubmit(tokenPayload.value)
        }else{
          const error = parsePayload(payload, "duplicateEmail").message
          handleSubmitFormErrors(error)
        }
      }).catch((err)=>{
        console.log('create user error: ', err)
        handleSubmitFormErrors()
      })
    }
  }
  
  const handleSubmitFormErrors = (errPayload = 'We apologize, an unknown error has occured. Please try logging in again.') => {
    setFormError(errPayload)
  }

  const handleSuccessfulSubmit = (token) => {
    setSubmitSuccess(true)
    setUserCookies(token)
    setFirstNameState({ value: '', errorMessage: null })
    setLastNameState({ value: '', errorMessage: null })
    setEmailState({ value: '', errorMessage: null })
    setPasswordState({ value: '', errorMessage: null })
    setemailValidationError(null)
    setFormError(null)
  }

  return (
    <Grid container direction="row" className={classes.wrapper}>
      {!submitSuccess ? (
        <form autoComplete="on" className={classNames(classes.wrapper, classes.formContainer)} onSubmit={handleSubmitForm()}>
          <Grid container className={classes.modalWrapperOuter}>
            <Grid container className={classes.modalWrapperInner} spacing={16}>
              <Grid item xs={12} sm={6} className={classes.inputContainer}>
                <FormControl className={classes.input} error={firstName.errorMessage != null}>
                  <Input
                    id="outlined-firstName"
                    label="firstName"
                    placeholder="First Name"
                    className={classes.input}
                    value={firstName.value || ''}
                    autoComplete="given-name"
                    onChange={() => { setFirstNameState({ ...firstName, value: event.target.value }) }}
                    variant="outlined"
                  />
                  {firstName.errorMessage ? (
                    <FormHelperText error>{firstName.errorMessage}</FormHelperText>
                  ) : <FormHelperText>&nbsp;</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.inputContainer}>
                <FormControl className={classes.input} error={lastName.errorMessage != null}>
                  <Input
                    id="outlined-lastName"
                    label="lastName"
                    placeholder="Last Name"
                    className={classes.input}
                    value={lastName.value || ''}
                    autoComplete="family-name"
                    onChange={() => { setLastNameState({ ...lastName, value: event.target.value }) }}
                    variant="outlined"
                  />
                </FormControl>
                {lastName.errorMessage ? (
                  <FormHelperText error>{lastName.errorMessage}</FormHelperText>
                ) : <FormHelperText>&nbsp;</FormHelperText>}
              </Grid>
              <Grid item xs={12} className={classes.inputContainer}>
                <FormControl className={classes.input} error={email.errorMessage != null || emailValidation != null}>
                  <Input
                    id="outlined-email-input"
                    label="Email"
                    placeholder="Email"
                    className={classes.input}
                    value={email.value || ''}
                    onChange={() => { setEmailState({ ...email, value: event.target.value }) }}
                    type="email"
                    autoComplete="new-email"
                    variant="outlined"
                  />
                </FormControl>
                {email.errorMessage ? (
                  <FormHelperText error>{email.errorMessage}</FormHelperText>
                ) : emailValidation ? (
                  <FormHelperText error>{emailValidation}</FormHelperText>
                ) : <FormHelperText>&nbsp;</FormHelperText> }
              </Grid>
              <Grid item xs={12} className={classes.inputContainer}>
                <FormControl className={classes.input} error={password.errorMessage != null || passwordValidation != null}>
                  <Input                        
                    id="outlined-password-input"
                    label="Password"
                    placeholder="Password"
                    className={classes.input}
                    value={password.value || ''}
                    type="password"
                    autoComplete="new-password"
                    onChange={() => { setPasswordState({ ...password, value: event.target.value }) }}
                    variant="outlined"
                  />
                  {password.errorMessage ? (
                    <FormHelperText error>{password.errorMessage}</FormHelperText>
                  ) : passwordValidation ? (
                    <FormHelperText error>{passwordValidation}</FormHelperText>
                  ): <FormHelperText>Use 8 or more characters. We reccomend using a mix of letters, numbers &amp; symbols</FormHelperText>}
                </FormControl>
              </Grid>
              {formError ? (
                <Grid item xs={12}>
                  <Typography variant="caption" className={classes.errorMessage}>
                    {formError}
                  </Typography>
                </Grid>
              ) : ''}               
              <Grid item xs={12} className={classes.submitBtnContainer}>
                <Grid container justify="flex-end">
                  <Button variant="contained" type="submit" value="Submit" size="medium" color="primary" className={classes.submitBtn}>
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      ) : <CreateAccountSuccess /> }

    </Grid>
  );
}

CreateAccount.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  CREATE_USER: PropTypes.func.isRequired,
}

export default compose(
  graphql(CREATE_USER, { name: 'CREATE_USER' }),
  hot(module),
  withStyles(styles)
)(CreateAccount)