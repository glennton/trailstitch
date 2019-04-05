import GpxRoute from './GpxRoute'
import GpxWaypoints from '../gpxWaypoints/GpxWaypoints'
import GpxRecord from '../gpxRecord/GpxRecord'

const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: {
    async createGpxRoute(root, params) {
      const defineNewGpx = async () => {
        try {
          const { name, id, totalDistance, dayCount, dateFirst, dateLast, trackPtCount, centralCoords, totalElevationGain, totalElevationLoss, overallElevationHighest, overallElevationLowest, info, days } = params;
          return new GpxRoute({
            name,
            id,
            totalDistance,
            dayCount,
            dateFirst,
            dateLast,
            trackPtCount,
            centralCoords,
            totalElevationGain,
            totalElevationLoss,
            overallElevationHighest,
            overallElevationLowest,
            info,
            days,
          });
        } catch (error) {
          throw error;
        }
      };
      const createWaypointRecord = async () => {
        try {
          return new GpxWaypoints({
            
          });
        } catch (error) {
          throw error;
        }
      }
      const createRouteRecord = (Route, Waypoint) => {
        try {
          return new GpxRecord({
            gpxRoute: Route,
            gpxWaypoint: Waypoint,

          });
        } catch (error) {
          throw error;
        }
      }
      try {
        const Route = await defineNewGpx()
        const RouteId = await GpxRoute.createGpxRoute(Route)

        const Waypoint = await createWaypointRecord()
        const WaypointId = await GpxWaypoints.createNewWaypoints(Waypoint)

        const Record = await createRouteRecord(Route, Waypoint)
        const RecordId = await GpxRecord.createGpxRecord(Record)
                
        return { RouteId, WaypointId, RecordId }
      } catch (error) {
        throw error;
      }
    }    
  }
}

export default resolvers