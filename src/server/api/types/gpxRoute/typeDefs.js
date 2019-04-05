import { gql } from 'apollo-server-express'

const typeDefs = gql`

  # Type Declarations
  type GpxRoute {
    _id: ID!,
    name: String,
    totalDistance: Float,
    dayCount: Int,
    dateFirst: String,
    dateLast: String,
    trackPtCount: Int,
    centralCoords: LatLng,
    totalElevationGain: Float,
    totalElevationLoss: Float,
    overallElevationHighest: Float,
    overallElevationLowest: Float,
    info: Info,
    days: [Day]
  }  

  type Day {
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

  input DayInput {
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

  type Info {
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
  type Query {
    getOneGpxRoute(_id: String!): GpxRoute
  }

  type Mutation {
    createGpxRoute(
      name: String!,
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
      days: [DayInput]
    ): GpxRoute
  } 
`;

export default typeDefs