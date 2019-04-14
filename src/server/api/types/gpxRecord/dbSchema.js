import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dbSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  shortid: String,
  gpxRoutes: [
    {
      gpxRoute: { type: Schema.Types.ObjectId, ref: 'GpxRoute' },
      gpxWaypoints: { type: Schema.Types.ObjectId, ref: 'GpxWaypoints' },
    }
  ]
})

export default dbSchema