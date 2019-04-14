import mongoose from 'mongoose'
import dbSchema from './GpxWaypointsSchema'

const Model = mongoose.model('gpxWaypoints', dbSchema, 'gpxWaypoints');

class GpxWaypoints extends Model {
  static async createNewWaypoints(GpxWaypoints) {
    try {
      const gpxWaypoints = await GpxWaypoints.save();
      return gpxWaypoints._id
    } catch (err) {
      throw err;
    }
  }
}

export default GpxWaypoints