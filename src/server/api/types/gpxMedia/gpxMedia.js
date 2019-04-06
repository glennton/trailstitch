import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('gpxRecords', dbSchema, 'gpxRecords');

class gpxMedia extends Model {
  static async createBlankRecord() {
    try {
      const gpxMedia = new Model({

      })
      const newGpxMedia = await gpxMedia.save();
      return newGpxMedia._id
    } catch (err) {
      throw err;
    }
  }
  static async createGpxRecord(gpxMedia) {
    try {
      const newGpxMedia = await gpxMedia.save();
      return newGpxMedia._id
    } catch (err) {
      throw err;
    }
  }
}

export default gpxMedia



