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
    trackPtStart: TrackPoint,
    trackPtEnd: TrackPoint,
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
    trackPtStart: TrackPointInput,
    trackPtEnd: TrackPointInput,
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