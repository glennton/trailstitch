export default { 
  TrackPointSchema: {
    lat: Number,
    lng: Number,
    ele: Number,
    time: String,
    distanceToNextPoint: Number,
    ascent: Number,
    descent: Number
  },
  TrackPointStartEndSchema: {
    lat: Number,
    lng: Number,
    ele: Number,
    time: String,
  }
 }