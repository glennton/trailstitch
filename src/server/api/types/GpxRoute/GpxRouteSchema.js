import mongoose from 'mongoose'
import TrackPointSchema from '../common/commonDbSchemas'

const Schema = mongoose.Schema

// Set user schema
const dbSchema = new Schema({
  name: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  gpxRecord: { type: Schema.Types.ObjectId, ref: 'GpxRecord', },
  shortid: String,
  gpxRouteData: [
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
      track: [
        {
          lat: Number,
          lng: Number,
          ele: Number,
          time: String,
          distanceToNextPoint: Number,
          ascent: Number,
          descent: Number
        }
      ],
    }
  ]
})

export default dbSchema