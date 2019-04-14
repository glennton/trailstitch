import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dbSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  shortid: String,
  gpxRoutes: [
    {
      ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
      shortid: String,
      gpxRoute: { type: Schema.Types.ObjectId, ref: 'GpxRoute' },
      gpxWaypoints: { type: Schema.Types.ObjectId, ref: 'GpxWaypoints' },
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
    }
  ]
})

export default dbSchema