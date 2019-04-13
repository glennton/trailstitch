import gql from 'graphql-tag';

export default gql `
  mutation CreateGpxRouteMitation(
    $ownerId: ID!,
    $gpxRecord: ID!,
    $name: String,
    $totalDistance: Float,
    $dayCount: Int,
    $dateFirst: String,
    $dateLast: String,
    $trackPtCount: Int,
    $centralCoords: LatLngInput,
    $totalElevationGain: Float,
    $totalElevationLoss: Float,
    $overallElevationHighest: Float,
    $overallElevationLowest: Float,
    $info: InfoInput,
    $days: [DayInput]
  ) {
    createGpxRoute(
      ownerId: $ownerId,
      gpxRecord: $gpxRecord,
      name: $name,
      totalDistance: $totalDistance,
      dayCount: $dayCount,
      dateFirst: $dateFirst,
      dateLast: $dateLast,
      trackPtCount: $trackPtCount,
      centralCoords: $centralCoords,
      totalElevationGain: $totalElevationGain,
      totalElevationLoss: $totalElevationLoss,
      overallElevationHighest: $overallElevationHighest,
      overallElevationLowest: $overallElevationLowest,
      info: $info,
      days: $days,
    ) {
      success
      payload {
        type
        message
        value
      }
    }
  }
`;