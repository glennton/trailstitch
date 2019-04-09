import validator from 'validator';
import { UserInputError, AuthenticationError } from 'apollo-server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {JWT_SECRET, JWT_EXPIRY} from 'Auth/jwt'
import validatePassword from 'Config/validatePassword'

//Models
import User from './User'
import GpxRecord from '../gpxRecord/GpxRecord'

const signToken = async (privateUser) => {
  const expiry = JWT_EXPIRY()
  const signedUser = {
    firstName: privateUser.firstName,
    lastName: privateUser.lastName,
    authenticated: true,
    gpxRecord: privateUser.gpxRecord,
    privs: privateUser.privs || ''
  }
  return jwt.sign( signedUser, JWT_SECRET, { expiresIn: expiry })
}


const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: {
    async login(root, params) {
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
      // const signToken = async (privateUser) => {
      //   const expiry = JWT_EXPIRY()
      //   const signedUser = {
      //     firstName: privateUser.firstName,
      //     lastName: privateUser.lastName,
      //     authenticated: true,
      //     gpxRecord: privateUser.gpxRecord,
      //     privs: privateUser.privs || ''
      //   }
      //   return jwt.sign({ signedUser }, JWT_SECRET, { expiresIn: expiry })
      // }
      try {
        const privateUser = await getUser(email)
        const isValid = await validatePassword(privateUser)
        const token = await signToken(privateUser)
        if (isValid && token){
          return { success: true, payload: [{ type: 'token', value: token }] }
        }else{
          throw new AuthenticationError('Authentication Error')
        }        
      }catch(err){        
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
        console.log('token', token)
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