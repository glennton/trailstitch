import passwordValidator from 'password-validator'

const validatePassword = (password) => {

  const passwordSchema = new passwordValidator();
  let errorMessage = 'Error:'

  passwordSchema
    .is().min(8)
    .is().max(20)
    .has().not().spaces()

  const result = passwordSchema.validate(password, { list: true })

  if (Array.isArray(result) && result.length === 0) {
    return {isValid : true}
  } else {
    errorMessage += result.includes('min') ? ` Must have a minimum of 8 characters.` : ''
    errorMessage += result.includes('max') ? ` Must have a maximum of 20 characters.` : ''
    errorMessage += result.includes('spaces') ? ` Must not contain any spaces.` : ''

  }
  return { isValid: false, errorMessage: errorMessage }


}

export default validatePassword