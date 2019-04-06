import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const { ApolloError } = require('apollo-server')

const Model = mongoose.model('users', dbSchema, 'users');

class User extends Model {
  static async checkIfUserFieldExists(userObj) {
    try {
      const response = await User.findOne(userObj, ['_id']);
      return response !== null
    } catch (error) {
      return error;
    }
  }
  static async createUser(NewUser) {
    try {
      const UserResponse = await NewUser.save();
      return UserResponse._id
    } catch (err) {
      return err;
    }
  }
  // static async function(arg) {
  //   try {
  //     return arg
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

export default User