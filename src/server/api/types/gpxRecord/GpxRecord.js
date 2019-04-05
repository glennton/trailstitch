import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('gpxRecords', dbSchema, 'gpxRecords');

class GpxRecord extends Model {
  static async createGpxRecord(GpxRecord) {
    try {
      const newGpxRecord = await GpxRecord.save();
      return newGpxRecord._id
    } catch (err) {
      return err;
    }
  }
}

export default GpxRecord