import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type GpxRecord {
    _id: ID!
    ownerId: ID!
    shortid: String
    gpxRoutes: [GpxRecordRoutes]
  }
  type GpxRecordRoutes {
    _id: ID!
    ownerId: ID!
    shortid: String
    name: String,
    published: Boolean
    gpxRoute: ID
    gpxWaypoints: ID
    totalDistance: Float
    dayCount: Int
    dateFirst: String
    dateLast: String
    trackPtCount: Int
    centralCoords: LatLng
    totalElevationGain: Float
    totalElevationLoss: Float
    overallElevationHighest: Float
    overallElevationLowest: Float
    info: Info
    gpxRouteData: [GpxRouteData]
  }
  type Info {
    Ascent: Float
    AvgAscentRate: Float
    AvgDescentRate: Float
    Descent: Float
    Distance: Float
    MaxAscentRate: Float
    MaxDescentRate: Float
    MaxElevation: Float
    MaxSpeed: Float
    MinElevation: Float
    MovingSpeed: Float
    MovingTime: Float
    StoppedTime: Float
    TotalElapsedTime: Float
  }
  # Queries
  extend type Query {
    getOneGpxRecordEntry(_id: ID, shortid: String): GpxRecordRoutes
    getAllRoutes(ownerId: ID!): [GpxRecordRoutes]
  }


`

export default typeDefs