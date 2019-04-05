import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('gpxWaypoints', dbSchema, 'gpxWaypoints');

class GpxWaypoints extends Model {
  static async createNewWaypoints(GpxWaypoints) {
    try {
      const gpxWaypoints = await GpxWaypoints.save();
      return gpxWaypoints._id
    } catch (err) {
      return err;
    }
  }
}

export default GpxWaypoints