//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Mutation } from "react-apollo";
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
//Components

const styles = theme => ({
  popoverContainer: {
    padding: 2 * theme.spacing.unit,
    minWidth: '250px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 2 * theme.spacing.unit,
  },
  input: {
    flex: '1',
    marginBottom: theme.spacing.unit,
  }
})

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
        email: { value: '', errorMessage: null },
        password: { value: '', errorMessage: null },
      }
    }
  }

  handleChange = (field) => (event) => {
    const value = event.target.value
    //if (field === 'password') { this.checkPassword(value) }
    //if (field === 'email') { this.checkEmail(value) }
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [field]: {
          value,
        },
      }
    }))
  };
  handleSubmitForm = (login) => (event) => {
    event.preventDefault();
    const { user } = this.state
    const errors = this.checkForErrors()
    const validatedSuccessful = errors.every((e) => e)

    if (validatedSuccessful) {
      const { email, password } = user
      console.log(email, password)
      login(
        {
          variables: {
            email: email.value,
            password: password.value,
          }
        }
      ).then(({ data }) => {
        console.log(data)
        const { login } = data
        const { success, payload } = login
        if (success) {
          this.handleSuccessfulSubmit()
        } else {
          this.handleSubmitFormErrors(payload)
        }
      }).catch(() => {
        this.handleSubmitFormErrors()
      })
    }
  }
  handleSubmitFormErrors = (errPayload) => {
    if (errPayload.length > 0) {
      errPayload.map((e) => {
        if (e.type === "duplicateEmail" && !emailError) {
          this.setState({
            emailError: "This email has already been registered, please enter a new email address."
          })
        }
      })
    } else {
      //showgenericerror
    }
  }
  handleSuccessfulSubmit = () => {

  }
  checkForErrors = () => {
    const { user, passwordError, emailError } = this.state
    return Object.keys(user).map((key) => {
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
    const { classes, onClose, anchorEl, openState, } = this.props;
    const { user } = this.state
    return (
      <Popover
        id="simple-popper"
        open={openState}
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
              <form className={classes.formContainer} autoComplete="on" onSubmit={this.handleSubmitForm(login)}>
                <FormControl className={classes.input} error={user.email.errorMessage != null}>
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
                <FormControl className={classes.input} error={user.password.errorMessage != null}>
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
                </FormControl>
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
}

Login.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  openState: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.func.isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(Login)