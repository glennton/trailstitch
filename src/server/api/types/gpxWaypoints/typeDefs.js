import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type GpxWaypoints {
    _id: ID!,
    routeRefID: ID,
    waypoints: [Waypoint]
  }
  type Waypoint {
    dateKey: String,
    contentId: String,
    pointType: String,
    isMapped: Boolean,
    isExact: Boolean,
    nearestTrackPoint: nearestTrackPoint ,
    lat: Int,
    lng: Int,
    ele: Int,
    time: String,
    uuid: String
  }  
  type nearestTrackPoint {
    distance: Int,
    matchedPoint: TrackPoint,
    dayIndex: Int,
    trackIndex: Int,
  }
  input GpxWaypointsInput {
    routeRefID: ID!,
    waypoints: [WaypointInput]
  }
  input WaypointInput {
    dateKey: String,
    contentId: String,
    pointType: String,
    isMapped: Boolean,
    isExact: Boolean,
    nearestTrackPoint: nearestTrackPoint ,
    lat: Int,
    lng: Int,
    ele: Int,
    time: String,
    uuid: String
  }  
  input nearestTrackPointInput {
    distance: Int,
    matchedPoint: TrackPointInput,
    dayIndex: Int,
    trackIndex: Int,
  }
`

export default typeDefs