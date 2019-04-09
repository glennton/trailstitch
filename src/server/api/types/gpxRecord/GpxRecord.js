import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('gpxRecords', dbSchema, 'gpxRecords');

class GpxRecord extends Model {
  static async createBlankRecord() {
    try {
      const GpxRecord = new Model({

      })
      const newGpxRecord = await GpxRecord.save();
      return newGpxRecord._id
    } catch (err) {
      throw err;
    }
  }
  static async createGpxRecord(GpxRecord) {
    try {
      const newGpxRecord = await GpxRecord.save();
      return newGpxRecord._id
    } catch (err) {
      throw err;
    }
  }
}

export default GpxRecord


