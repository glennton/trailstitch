//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Mutation } from "react-apollo";

//UI Elements
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import { jssWrapper, jssModalWrapperOuter, jssModalWrapperInner } from 'Styles/globalStyles'

//Development Data
import CREATE_USER from 'GQL/CREATE_USER'
//import DummyData from 'Utils/DummyData'

//Utils
import validatePassword from './passwordValidation'
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
  }
})

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitSuccessful: false,
      user: {
        firstName : {value: '', errorMessage: null},
        lastName : {value: '', errorMessage: null},
        email : {value: '', errorMessage: null},
        password : {value: '', errorMessage: null},
      },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  checkPassword = (value) => {
    const { isValid = false, errorMessage = ''} = validatePassword(value)
    if ( isValid ){
      this.setState({
        passwordError: null
      })
    }
    else{
      this.setState({
        passwordError: errorMessage,
      })
    }
  }
  checkEmail = (value) => {
    const emailIsValid = validator.isEmail(value)
    if (emailIsValid) {
      this.setState({
        emailError: null,
      })
    }
    else {
      this.setState({
        emailError: 'Please enter a valid email address',
      })
    }
  } 
  handleChange = (field) => (event) => {
    const value = event.target.value
    if (field === 'password') { this.checkPassword(value) }
    if (field === 'email') { this.checkEmail(value) }
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [field]: {
          value,
        },
      }
    }))
  };

  handleSubmitForm = (createUser) => (event) => {
    event.preventDefault();
    const { user } = this.state
    const errors = this.checkForErrors()
    const validatedSuccessful = errors.every((e) => e)

    if (validatedSuccessful){
      const { firstName, lastName, email, password} = user
      createUser(
        {
          variables: {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
          }
        }
      ).then(({data}) => {
        const { createUser } = data
        const { success, payload } = createUser
        if (success){
          this.handleSuccessfulSubmit()
        }else{
          this.handleSubmitFormErrors(payload)
        }
      }).catch(()=>{
        this.handleSubmitFormErrors()
      })
    }
  }
  handleSubmitFormErrors = (errPayload) => {
    const { emailError } = this.state
    if ( errPayload.length > 0 ){
      errPayload.map((e) => {
        if (e.type === "duplicateEmail" && !emailError){
          this.setState({
            emailError: "This email has already been registered, please enter a new email address."
          })
        }
      })
    }else{
      //showgenericerror
    }
  }
  handleSuccessfulSubmit = () => {

  }
  checkForErrors = () => {
    const { user, passwordError, emailError } = this.state
    return Object.keys(user).map( (key) => {
      const field = user[key]
      const { value, errorMessage } = field
      if (!value && !errorMessage) {
        this.setState(prevState => ({
          user: {
            ...prevState.user,
            [key]: {
              ...prevState.user[key],
              errorMessage: 'Field cannot be empty.',
            },
          }
        }))
        return false
      }
      if (value) {
        this.setState(prevState => ({
          user: {
            ...prevState.user,
            [key]: {
              ...prevState.user[key],
              errorMessage: null,
            },
          }
        }))
        return value && !passwordError && !emailError
      }
      return false
    })
  }

  render() {
    const { classes } = this.props;
    const { user, emailError, passwordError } = this.state
    return (
      <Grid container direction="row" className={classes.wrapper}>
        <Mutation mutation={CREATE_USER}>
          {(createUser) => (
            <form autoComplete="on" className={classNames(classes.wrapper, classes.formContainer)} onSubmit={this.handleSubmitForm(createUser)}>
              <Grid container className={classes.modalWrapperOuter}>
                <Grid container className={classes.modalWrapperInner} spacing={16}>
                  <Grid item xs={12} sm={6} className={classes.inputContainer}>
                    <FormControl className={classes.input} error={user.firstName.errorMessage != null}>
                      <Input
                        id="outlined-firstName"
                        label="firstName"
                        placeholder="First Name"
                        className={classes.input}
                        value={user.firstName.value || ''}
                        autoComplete="given-name"
                        onChange={this.handleChange('firstName')}
                        variant="outlined"
                      />
                      {user.firstName.errorMessage ? (
                        <FormHelperText error>{user.firstName.errorMessage}</FormHelperText>
                      ) : <FormHelperText>&nbsp;</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.inputContainer}>
                    <FormControl className={classes.input} error={user.lastName.errorMessage != null}>
                      <Input
                        id="outlined-lastName"
                        label="lastName"
                        placeholder="Last Name"
                        className={classes.input}
                        value={user.lastName.value || ''}
                        autoComplete="family-name"
                        onChange={this.handleChange('lastName')}
                        variant="outlined"
                      />
                    </FormControl>
                    {user.lastName.errorMessage ? (
                      <FormHelperText error>{user.lastName.errorMessage}</FormHelperText>
                    ) : <FormHelperText>&nbsp;</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} className={classes.inputContainer}>
                    <FormControl className={classes.input} error={user.email.errorMessage != null || emailError != null}>
                      <Input
                        id="outlined-email-input"
                        label="Email"
                        placeholder="Email"
                        className={classes.input}
                        value={user.email.value || ''}
                        onChange={this.handleChange('email')}
                        type="email"
                        autoComplete="email"
                        variant="outlined"
                      />
                    </FormControl>
                    {user.email.errorMessage ? (
                      <FormHelperText error>{user.email.errorMessage}</FormHelperText>
                    ) : emailError ? (
                      <FormHelperText error>{emailError}</FormHelperText>
                    ) : <FormHelperText>&nbsp;</FormHelperText> }
                  </Grid>
                  <Grid item xs={12} className={classes.inputContainer}>
                    <FormControl className={classes.input} error={user.password.errorMessage != null || passwordError != null}>
                      <Input                        
                        id="outlined-password-input"
                        label="Password"
                        placeholder="Password"
                        className={classes.input}
                        value={user.password.value || ''}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        variant="outlined"
                      />
                      {user.password.errorMessage ? (
                        <FormHelperText error>{user.password.errorMessage}</FormHelperText>
                      ) : passwordError ? (
                        <FormHelperText error>{passwordError}</FormHelperText>
                      ): <FormHelperText>Use 8 or more characters. We reccomend using a mix of letters, numbers &amp; symbols</FormHelperText>}
                    </FormControl>
                  </Grid>
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
          )}
        </Mutation>
      </Grid>
    );
  }
}

CreateAccount.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(CreateAccount)