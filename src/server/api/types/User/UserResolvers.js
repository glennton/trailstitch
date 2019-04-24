import validator from 'validator';
import { UserInputError, AuthenticationError } from 'apollo-server'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import validatePassword from 'Config/validatePassword'
import { validateToken, signToken } from 'ServerUtils/tokenUtilities'

//Models
import User from './User'
import GpxRecord from '../GpxRecord/GpxRecord'

const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: { //TODO Refresh Token Resolver - if existing token is valid, refresh and send new token, tell client to update, ie after uploading new gpx
    async validateToken(root, params){
      const { token } = params
      try {
        const signedUser = await validateToken(token)        
        return signedUser
      } catch (error) {
          console.log('Error: validateToken: ', error)
        throw error
      }
    },
    async login(root, params) {
      console.log('login')
      const {password, email } = params;
      const getUser = async (email) => {
        const user = await User.login({ email })
        if(user){
          return user
        }else{
          throw new AuthenticationError('Authentication Error')
        }
      }
      const validatePassword = async (privateUser) => {
        const result = bcrypt.compareSync(password, privateUser.password)
        if(result === true){
          return true
        }else{
          throw new AuthenticationError('Authentication Error')
        }
      }
      try {
        const privateUser = await getUser(email)
        const isValid = await validatePassword(privateUser)
        const token = await signToken(privateUser)
        if (isValid && token){
          return { success: true, payload: [{ type: 'userToken', value: token }, { type: 'userId', value: privateUser._id }] }
        }else{
          throw new AuthenticationError('Authentication Error')
        }        
      }catch(err){     
        console.log('Error: User Resolver: login: ', err)
        let returnObj = { success: false, payload: [] }
        if (err instanceof AuthenticationError) {
          returnObj.payload.push(
            { 
              message: 'The email and password provided did not match our records.', 
              type: 'authError' }
          )
        }
        if (returnObj.payload.length <= 0){
          returnObj.payload.push(
            { 
              message: 'The email and password provided did not match our records.', 
              type: 'authError' 
            }
          )
        }
        return returnObj
      }
    },
    async createUser(root, params){
      const { password, firstName, lastName, email } = params
      const validateFields = async (email) =>{
        //Email Validation
        if (validator.isEmail(email) === false){ throw new UserInputError('Not a valid email address', { message: 'Error: Email is not valid', type: 'emailNotValid' }) }
      }
      const defineNewUser = async (hashedPassword) => {
        try {
          return new User({
            password: hashedPassword,
            shortid: shortid.generate(),
            firstName, 
            lastName, 
            email: validator.normalizeEmail(email),
          });
        } catch (error) {
          throw error;
        }
      };
      const checkForDuplicates = ({ email }) => {
        if (email) { throw new UserInputError('Duplicate Email', { message: 'Error: Email already exists', type: 'duplicateEmail' }) }
      }
      try{
        const fieldsIsValid = await validateFields(email, password)
        const passwordIsValid  = await validatePassword(password)
        const userEmailExists = await User.checkIfUserFieldExists({ email })
        console.log('userEmailExists')
        const duplicateCheck = await Promise.all([userEmailExists, fieldsIsValid, passwordIsValid])
          .then((res) => {
            return { email: res[0] }
          })
          .catch(err => err)
        await checkForDuplicates(duplicateCheck)
        const hashedPassword = await bcrypt.hash(params.password, 10);
        const NewUser = await defineNewUser(hashedPassword)
        const NewUserId = await User.createUser(NewUser)
        const recordId = await GpxRecord.createBlankRecord()
        const privateUser = await User.attachRecord(NewUserId, recordId)
        const token = await signToken(privateUser)
        return { success: true, payload: [{ type: 'token', value: token }] }
      }catch(err){
        console.log(err)
        let returnObj = { success: false, payload: [] }
        if (err instanceof UserInputError){
          const { message, type } = err
          returnObj.payload.push({ message, type })
          console.log('push')
        }
        return returnObj
      }
    }
  }
}

export default resolvers

//https://www.npmjs.com/package/validator