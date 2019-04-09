import mongoose from 'mongoose'
import TrackPointSchema from '../common/commonDbSchemas'

const Schema = mongoose.Schema

// Set user schema
const dbSchema = new Schema({
  name: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  totalDistance: Number,
  dayCount: Number,
  dateFirst: String,
  dateLast: String,
  trackPtCount: Number,
  centralCoords: {
    lat: Number,
    lng: Number
  },
  totalElevationGain: Number,
  totalElevationLoss: Number,
  overallElevationHighest: Number,
  overallElevationLowest: Number,
  info: {
    Ascent: Number,
    AvgAscentRate: Number,
    AvgDescentRate: Number,
    Descent: Number,
    Distance: Number,
    MaxAscentRate: Number,
    MaxDescentRate: Number,
    MaxElevation: Number,
    MaxSpeed: Number,
    MinElevation: Number,
    MovingSpeed: Number,
    MovingTime: Number,
    StoppedTime: Number,
    TotalElapsedTime: Number,
  },
  days: [
    {
      date: String,
      indexStart: Number,
      indexEnd: Number,
      elevationHighest: Number,
      elevationLowest: Number,
      distance: Number,
      elevationGain: Number,
      elevationLoss: Number,
      centralCoords: {
        lat: Number,
        lng: Number,
      },
      trackPtStart: TrackPointSchema,
      trackPtEnd: TrackPointSchema,
      track: [TrackPointSchema],
    }
  ]
})

export default dbSchema