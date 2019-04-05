import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dbSchema = new Schema({
  gpxRoute: { type: Schema.Types.ObjectId, ref: 'GpxRoute',required: true },
  gpxWaypoint: { type: Schema.Types.ObjectId, ref: 'GpxWaypoints', required: true },
})

export default dbSchema