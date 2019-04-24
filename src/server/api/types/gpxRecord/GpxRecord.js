import mongoose from 'mongoose'
import dbSchema from './GpxRecordSchema'

const Model = mongoose.model('gpxRecords', dbSchema, 'gpxRecords');

class GpxRecord extends Model {
  static async getAllRoutes() {
    try {
      return Model.find({}, ['']);
    } catch (err) {
      console.log('Error: GPX Record Model: getAllRoutes:', err)
      throw err;
    }
  }
  static async getOneGpxRecordEntry( queryObj, queryFields = []) {
    try {
      //const response = await Model.find({'gpxRoutes.shortid': '1_H3qqp57C'}, [...queryFields]);
      const response = await Model.findOne({ "gpxRoutes": { "$elemMatch": queryObj }, ...queryFields }, { "gpxRoutes.$": 1 })
      return response.gpxRoutes ? response.gpxRoutes[0] : null
    } catch (err) {
      console.log('Error: GPX Record Model: getOneGpxRecordEntry:', err)
      throw err;
    }
  }
  static async getOneGpxRecord(queryObj, queryFields = []) {
    try {      
      const response = await Model.findOne(queryObj, [...queryFields]);
      console.log('response', response)
      return response ? response : null
    } catch (err) {
      console.log('Error: GPX Record Model: getOneGpxRecord:', err)
      throw err;
    }
  }
  static async createBlankRecord() {
    try {
      const GpxRecord = new Model({

      })
      const newGpxRecord = await GpxRecord.save();
      return newGpxRecord._id
    } catch (err) {
      console.log('Error: GPX Record Model: createBlankRecord:', err)
      throw err;
    }
  }
  static async createGpxRecord(GpxRecord) {
    try {
      const newGpxRecord = await GpxRecord.save();
      return newGpxRecord._id
    } catch (err) {
      console.log('Error: GPX Record Model: createGpxRecord:', err)
      throw err;
    }
  }
  static async addNewRecord(queryId, newRecordEntry) {
    try {
      const newRecord = await Model.findOneAndUpdate(queryId,
        { $push: { gpxRoutes: newRecordEntry } },
        { safe: true, upsert: true }
      );
      return newRecord
    } catch (err) {
      console.log('Error: GPX Record Model: addNewRecord:', err)
      throw err;
    }
  }
}

export default GpxRecord



