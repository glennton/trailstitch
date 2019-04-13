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
      console.log('ERRRRRRR' ,err)
      throw err;
    }
  }
  static async addNewRecord(ownerId, gpxWaypoints, gpxRoute ) {
    console.log('static async addNewRecord', ownerId, gpxWaypoints, gpxRoute)
    try {
      const newRecord = await Model.findOneAndUpdate({
          ownerId,
        }, {
          $push: { gpxRoutes: {
            gpxRoute,
            gpxWaypoints
          }}
        },
        (res) => console.log(res)
      );
      return newRecord._id
    } catch (err) {
      throw err;
    }
  }
}

export default GpxRecord



