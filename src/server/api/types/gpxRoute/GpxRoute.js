import mongoose from 'mongoose'
import dbSchema from './GpxRouteSchema'

const Model = mongoose.model('gpxRoutes', dbSchema, 'gpxRoutes');

class GpxRoute extends Model {
  static async createGpxRoute(GpxRoute) {
    try {
      const gpxRoute = await GpxRoute.save();
      return gpxRoute._id
    } catch (err) {
      console.log('Error: GPX Route Model: createGpxRoute:', err)
      throw err;
    }
  }
  static async getOneGpxRoute(queryObj, queryFields = []) {
    try {
      const response = await Model.findOne(queryObj, [...queryFields]);
      return response ? response : null
    } catch (err) {
      console.log('Error: GPX Route Model: createGpxRoute:', err)
      throw err;
    }
  }
}

export default GpxRoute