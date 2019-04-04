import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('gpxRoutes', dbSchema, 'gpxRoutes');

class GpxRoute extends Model {
  static async createGpxRoute(GpxRoute) {
    try {
      const gpxRoute = await GpxRoute.save();
      return gpxRoute._id
    } catch (err) {
      return err;
    }
  }
}

export default GpxRoute