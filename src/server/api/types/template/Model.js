import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('COLLECTIONNAME', dbSchema, 'COLLECTIONNAME');

class MODELNAME extends Model {
  // static async function(arg) {
  //   try {
  //     return arg
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

export default MODELNAME