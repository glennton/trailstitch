import mongoose from 'mongoose'
import dbSchema from './dbSchema'

const Model = mongoose.model('gpxRoutes', dbSchema, 'gpxRoutes');

class GpxRoute extends Model {
  static async createGpxRoute(GpxRoute) {
    console.log('//////////////', GpxRoute.days[0].track)
    try {
      const gpxRoute = await GpxRoute.save();
      return gpxRoute._id
    } catch (err) {
      console.log('Error: GPX Route Model: createGpxRoute:', err)
      throw err;
    }
  }
  static async getGpxRoute(queryKey) {
    try {
      const route = await Model.findOne(queryKey)
      return route
    } catch (err) {
      console.log('Error: GPX Route Model: createGpxRoute:', err)
      throw err;
    }
  }
}

export default GpxRoute