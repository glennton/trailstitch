import mongoose from 'mongoose'
import dbSchema from './UserSchema'

const Model = mongoose.model('users', dbSchema, 'users');

class User extends Model {
  static async checkIfUserFieldExists(queryObj, queryFields = []) {
    try {
      const response = await Model.findOne(queryObj, [...queryFields]);
      return response ? response : null
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
        'shortid',
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
      const response = await Model.findOneAndUpdate(
        {
          _id,
        },
        {$set: {
          gpxRecord,
        }},
        (res)=>console.log(res)
      );
      return response
    } catch (err) {
      throw err;
    }
  }
}

export default User