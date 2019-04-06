import validator from 'validator';
import { ApolloError } from 'apollo-server'
import validatePassword from 'Config/validatePassword'
import User from './User'
import GpxRecord from '../gpxRecord/GpxRecord'

const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: {
    async createUser(root, params){
      const { userId, password, firstName, lastName, email } = params
      const validateFields = async (email, password) =>{
        //Email Validation
        if (validator.isEmail(email) === false){ throw new ApolloError('Not a valid email address') }
      }
      const defineNewUser = async (recordId) => {
        try {
          return new User({
            userId, 
            password, 
            firstName, 
            lastName, 
            email: validator.normalizeEmail(email),
            gpxRecord: recordId
          });
        } catch (error) {
          throw error;
        }
      };
      const checkForDuplicates = ({ userId, email }) => {
        if (userId && email) { throw new ApolloError('Email Address and Username provided already exists.') }
        if (userId && !email) { throw new ApolloError('Username provided already exists.') }
        if (!userId && email) { throw new ApolloError('Email address provided already exists.') }
      }
      try{
        const fieldsIsValid = await validateFields(email, password)
        const passwordIsValid  = await validatePassword(userId, password)
        const userIdExists = await User.checkIfUserFieldExists({ userId })
        const userEmailExists = await User.checkIfUserFieldExists({ email })
        const duplicateCheck = await Promise.all([userIdExists, userEmailExists, fieldsIsValid, passwordIsValid])
          .then((res) => {
            return { userId: res[0], email: res[1], }
          })
          .catch(err => err)
        await checkForDuplicates(duplicateCheck)
        const recordID = await GpxRecord.createBlankRecord()
        const NewUser = await defineNewUser(recordID)
        return await User.createUser(NewUser)
      }catch(err){
        return err
      }
    }
  }
}

export default resolvers

//https://www.npmjs.com/package/validator