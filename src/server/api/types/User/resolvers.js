import validator from 'validator';
import { UserInputError } from 'apollo-server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from 'Auth/jwt'
import validatePassword from 'Config/validatePassword'
import User from './User'
import GpxRecord from '../gpxRecord/GpxRecord'
import { instanceOf } from 'prop-types';


const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: {
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
        await User.attachRecord(NewUserId, recordId)
        return { success: true }
      }catch(err){
        let returnObj = { success: false, payload: [] }
        console.log('err', err)
        if (err instanceof UserInputError){
          const { message, type } = err
          returnObj.payload.push({ message, type })
          console.log('push')
        }
        console.log(returnObj)
        return returnObj
      }
    }
  }
}

export default resolvers

//https://www.npmjs.com/package/validator