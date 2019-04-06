import passwordValidator from 'password-validator'
import { ApolloError } from 'apollo-server'

const validatePassword = async ( username, password ) => {

  try{
    
    const passwordSchema = new passwordValidator();
    let errorMessage = 'Error:'

    passwordSchema      
      .is().min(8)
      .is().max(20)
      .has().not().spaces()

    const result = passwordSchema.validate(password, { list: true })

    console.log('result', result)
    if (Array.isArray(result) && result.length === 0) {
      return
    }else{
      errorMessage += result.includes('min') ? ` Must have a minimum of 8 characters.` : ''
      errorMessage += result.includes('max') ? ` Must have a maximum of 20 characters.` : ''
      errorMessage += result.includes('spaces') ? ` Must not contain any spaces.` : ''
      
    }
    throw new ApolloError(errorMessage)

  }catch(err){
    throw err
  }
}

export default validatePassword