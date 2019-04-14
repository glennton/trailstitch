import gql from 'graphql-tag';

export default gql `
  query getOneGpxRecordEntry($shortid: String, $_id: ID) {
    getOneGpxRecordEntry(shortid: $shortid, _id: $_id) {
      ownerId
      shortid
      gpxRoute
      gpxWaypoints
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
      }
    }
  }
`;