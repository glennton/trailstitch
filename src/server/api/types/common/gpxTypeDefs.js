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