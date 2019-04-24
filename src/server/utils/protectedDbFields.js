import { AuthenticationError } from 'apollo-server'

/** @function
 * @param { Object } credentials - User credentials to validate
 * @param { Object } credentials.signedUser - Validated user, token decoded
 * @param { Object } credentials.clientUser - Client described user, untrusted
 * @param { Object[] } credentials.keysToCompare - Keys to validate passed as strings
 */

const validateCredentials = async (credentials) => {
  const { signedUser, clientUser, keysToCompare } = credentials
  let invalidFields = []
  keysToCompare.map((key) => {
    if (signedUser[key] !== clientUser[key]){
      invalidFields.push(key)
    }
  });
  if (invalidFields.length){
    throw new AuthenticationError(`Error Authenticating User Fields: ${invalidFields}`)
  }else{
    return true
  }
}

const validateResolverRequest = async (data, credentials) => {
  try{
    const credentialsValid = await validateCredentials(credentials)
    return Promise.all([credentialsValid])
  }catch(err){
    return err
  }
}

export default validateResolverRequest
