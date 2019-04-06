import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dbSchema = new Schema({
  gpxRoute: { type: Schema.Types.ObjectId, ref: 'GpxRoute' },
  gpxWaypoints: { type: Schema.Types.ObjectId, ref: 'GpxWaypoints' },
})

export default dbSchema