import gql from 'graphql-tag';

export default gql `
  query GetAllRoutes($ownerId: ID!) {
    getAllRoutes(ownerId: $ownerId) {
        _id
        ownerId
        shortid
        name
        published
        centralCoords{
          lat
          lng
        }
        totalDistance
        dayCount
        dateFirst
        dateLast
        trackPtCount
        totalElevationGain
        totalElevationLoss
        overallElevationHighest
        overallElevationLowest
        gpxRoute
        gpxWaypoints
    }
  }
`



// export default gql `
//   query GetAllRoutes($ownerId: ID!) {
//     getAllRoutes(ownerId: $ownerId) {
//       # ownerId
//       # gpxRecord
//       # name
//       # totalDistance
//       # dayCount
//       # dateFirst
//       # dateLast
//       # trackPtCount
//       # centralCoords {
//       #   lat
//       #   lng
//       # }
//       # totalElevationGain
//       # totalElevationLoss
//       # overallElevationHighest
//       # overallElevationLowest
//       # info {
//       #   Ascent
//       #   AvgAscentRate
//       #   AvgDescentRate
//       #   Descent
//       #   Distance
//       #   MaxAscentRate
//       #   MaxDescentRate
//       #   MaxElevation
//       #   MaxSpeed
//       #   MinElevation
//       #   MovingSpeed
//       #   MovingTime
//       #   StoppedTime
//       #   TotalElapsedTime
//       # },
//       # gpxRouteData] {
//       #   date
//       #   indexStart
//       #   indexEnd
//       #   elevationHighest
//       #   elevationLowest
//       #   distance
//       #   elevationGain
//       #   elevationLoss
//       #   centralCoords {
//       #     lat
//       #     lng
//       #   }
//       #   trackPtStart {
//       #     lat
//       #     lng
//       #   }
//       #   trackPtEnd {
//       #     lat
//       #     lng
//       #   }
//       #   track {
//       #     lat
//       #     lng
//       #     ele
//       #     time
//       #     distanceToNextPoint
//       #     ascent
//       #     descent
//       #   }
//       # }
//     }
//   }
// `;