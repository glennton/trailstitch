import gql from 'graphql-tag';

export default gql `
  mutation CreateGpxRoute(
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
    $gpxRouteData: [GpxRouteDataInput]
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
      gpxRouteData: $gpxRouteData,
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