import mongoose from 'mongoose'
import TrackPointSchema from '../common/commonDbSchemas'

const Schema = mongoose.Schema

const dbSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  gpxWaypoints: [{
    dateKey: String,
    contentId: String,
    pointType: String,
    isMapped: Boolean,
    isExact: Boolean,
    nearestTrackPoint: {
      distance: Number,
      matchedPoint: TrackPointSchema,
      dayIndex: Number,
      trackIndex: Number,
    },
    lat: Number,
    lng: Number,
    ele: Number,
    time: String,
    uuid: String
  }]
})

export default dbSchema