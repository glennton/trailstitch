import gql from 'graphql-tag';

export default gql `
  query getOneGpxRoute($shortid: String, $_id: ID) {
    getOneGpxRoute(shortid: $shortid, _id: $_id) {
      ownerId
      gpxRecord
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