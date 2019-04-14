import gql from 'graphql-tag';

export default gql `
  query getAllRoutes($shortid: String, $_id: ID) {
    getGpxRoute(shortid: $shortid, _id: $_id) {
      ownerId
      gpxRecord
      name
      totalDistance
      dayCount
      dateFirst
      dateLast
      trackPtCount
      centralCoords {
        lat
        lng
      }
      totalElevationGain
      totalElevationLoss
      overallElevationHighest
      overallElevationLowest
      info {
        Ascent
        AvgAscentRate
        AvgDescentRate
        Descent
        Distance
        MaxAscentRate
        MaxDescentRate
        MaxElevation
        MaxSpeed
        MinElevation
        MovingSpeed
        MovingTime
        StoppedTime
        TotalElapsedTime
      },
      days {
        date
        indexStart
        indexEnd
        elevationHighest
        elevationLowest
        distance
        elevationGain
        elevationLoss
        centralCoords {
          lat
          lng
        }
        trackPtStart {
          lat
          lng
        }
        trackPtEnd {
          lat
          lng
        }
        track {
          lat
          lng
          ele
          time
          distanceToNextPoint
          ascent
          descent
        }
      }
    }
  }
`;