import { gql } from 'apollo-server-express'

const gpxTypeDefs = gql `
  type LatLng {
    lat: Float,
    lng: Float
  }

  input LatLngInput {
    lat: Float,
    lng: Float
  }

  type TrackPoint {
    lat: Float,
    lng: Float,
    ele: Float,
    time: String,
    distanceToNextPoint: Float,
    ascent: Float,
    descent: Float
  }

  type TrackPointStartEnd {
    lat: Float,
    lng: Float,
    ele: Float,
    time: String,
  }

  input TrackPointStartEndInput {
    lat: Float,
    lng: Float,
    ele: Float,
    time: String,
  }

  type GpxRouteData {
    date: String,
    indexStart: Int,
    indexEnd: Int,
    elevationHighest: Float,
    elevationLowest: Float,
    distance: Float,
    elevationGain: Float,
    elevationLoss: Float,
    centralCoords: LatLng,
    trackPtStart: TrackPointStartEnd,
    trackPtEnd: TrackPointStartEnd,
    track: [TrackPoint],
  }

  input GpxRouteDataInput {
    date: String,
    indexStart: Int,
    indexEnd: Int,
    elevationHighest: Float,
    elevationLowest: Float,
    distance: Float,
    elevationGain: Float,
    elevationLoss: Float,
    centralCoords: LatLngInput,
    trackPtStart: TrackPointStartEndInput,
    trackPtEnd: TrackPointStartEndInput,
    track: [TrackPointInput],
  }
  input TrackPointInput {
    lat: Float,
    lng: Float,
    ele: Float,
    time: String,
    distanceToNextPoint: Float,
    ascent: Float,
    descent: Float
  }
`

export default gpxTypeDefs