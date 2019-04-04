import gql from 'graphql-tag';

const CREATE_GPX = gql`
  mutation CreateGpxRouteMitation(
    $name: String!,
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
    # $days: [DayInput]
  ) {
    createGpxRoute(
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
      # days: $days,
    ) {
      _id
    }
  }
`;

export default CREATE_GPX