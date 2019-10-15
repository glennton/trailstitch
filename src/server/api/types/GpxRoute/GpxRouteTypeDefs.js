import { gql } from 'apollo-server-express'

const typeDefs = gql`

  # Type Declarations
  type GpxRoute {
    _id: ID!,
    ownerId: ID!,
    gpxRecord: ID,
    shortid: String,
    gpxRouteData: [GpxRouteData],
  }  
  input InfoInput {
    Ascent: Float,
    AvgAscentRate: Float,
    AvgDescentRate: Float,
    Descent: Float,
    Distance: Float,
    MaxAscentRate: Float,
    MaxDescentRate: Float,
    MaxElevation: Float,
    MaxSpeed: Float,
    MinElevation: Float,
    MovingSpeed: Float,
    MovingTime: Float,
    StoppedTime: Float,
    TotalElapsedTime: Float
  }

  # Queries
  extend type Query {
    getOneGpxRoute(_id: ID, shortid: String): GpxRoute
  }

  extend type Mutation {
    createGpxRoute(
      ownerId: ID!,
      gpxRecord: ID!,
      name: String,
      totalDistance: Float,
      dayCount: Int,
      dateFirst: String,
      dateLast: String,
      trackPtCount: Int,
      centralCoords: LatLngInput,
      totalElevationGain: Float,
      totalElevationLoss: Float,
      overallElevationHighest: Float,
      overallElevationLowest: Float,
      info: InfoInput,
      gpxRouteData: [GpxRouteDataInput]
    ): Response
  } 
`;

export default typeDefs