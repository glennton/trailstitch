import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('users', dbSchema, 'users');

class User extends Model {
  static async checkIfUserFieldExists(userObj) {
    try {
      const response = await User.findOne(userObj, ['_id']);
      console.log(userObj, response)
      return response !== null
    } catch (error) {
      throw error;
    }
  }
  static async login({email}) {
    try {
      return Model.findOne({
        email,
      }, [
        'firstName',
        'lastName',
        'email',
        'password',
        'gpxRecord',
      ]);
    } catch (error) {
      throw error;
    }
  }
  static async createUser(NewUser) {
    try {
      const UserResponse = await NewUser.save();
      return UserResponse._id
    } catch (err) {
      throw err;
    }
  }
  static async attachRecord(_id, gpxRecord) {
    try {
      const UserResponse = await Model.findOneAndUpdate(
        {
          _id,
        },
        {$set: {
          gpxRecord,
        }},
        (res)=>console.log(res)
      );
      return UserResponse
    } catch (err) {
      throw err;
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