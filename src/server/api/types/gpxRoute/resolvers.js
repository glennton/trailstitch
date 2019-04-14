import { AuthenticationError } from 'apollo-server'
import shortid from 'shortid'
import GpxRoute from './GpxRoute'
import GpxWaypoints from '../gpxWaypoints/GpxWaypoints'
import GpxRecord from '../gpxRecord/GpxRecord'
import User from '../User/User'



const resolvers = {
  Query: {
    async getGpxRoute(obj, params, context) {     
      console.log('getGpxRoute')
      let queryParamter = {}
      if (!params._id && !params.shortid) {
        throw new Error('Specify id or email');
      }
      queryParamter = params._id ? { _id: params._id } : { shortid: params.shortid }

      const validateOwnerID = (Route) => {
        if( Route.ownerId == context._id ){
          return Route
        }else{
          throw new AuthenticationError('Authentication Error')
        }
      }

      try {
        const Route = await GpxRoute.getGpxRoute(queryParamter)
        const validatedRoute = validateOwnerID(Route)
        return validatedRoute
      } catch (err) {
        console.log('Error: GPX Route Resolver: getGpxRoute: ', err)
        throw err
      }
    }
  },
  Mutation: {
    async createGpxRoute(root, params, context) {

      const { name, ownerId, gpxRecord, totalDistance, dayCount, dateFirst, dateLast, trackPtCount, centralCoords, totalElevationGain, totalElevationLoss, overallElevationHighest, overallElevationLowest, info, days } = params;
      if (context._id !== ownerId) { throw new AuthenticationError('Authentication Error') }
      const gpxRecordExists = params.gpxRecord.length !== 0
      const routeShortid = shortid.generate()
      const recordShortid = shortid.generate()
      const waypointShortid = shortid.generate()
      const defineNewWaypoints = async () => {
        try {
          return new GpxWaypoints({
            ownerId,
            shortid: waypointShortid,
            gpxWaypoints: []
          });
        } catch (err) {
          console.log('Error: GPX Route Resolver: defineNewWaypoints: ', err)
          throw err;
        }
      }

      const defineNewRoute = async () => {
        try {
          return new GpxRoute({
            name,
            ownerId,
            shortid: routeShortid,
            gpxRecord,
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
        } catch (err) {
          console.log('Error: GPX Route Resolver: defineNewRoute: ', err)
          throw err;
        }
      };

      const defineNewRecord = (ownerId, newWaypoints, newRoute) => {
        try {
          return new GpxRecord({
            ownerId,
            shortid: recordShortid,
            gpxRoutes: [
              {
                gpxRoute: newRoute,
                gpxWaypoints: newWaypoints,
              }
            ]
          });
        } catch (err) {
          console.log('Error: GPX Route Resolver: defineNewRecord: ', err)
          throw err;
        }
      }
      const setRecord = async (newWaypoints, newRoute) => {
        try {
          if (gpxRecordExists) {
            return await GpxRecord.addNewRecord(ownerId, newWaypoints, newRoute)
          }else{
            //If record somehow does not exist
            //Check user to see if gpx record is found exists
            const userRecord = await User.checkIfUserFieldExists({ _id: ownerId }, ['gpxRecord'])
            if (userRecord.gpxRecord) { 
              newRoute.gpxRecord = userRecord.gpxRecord
              return userRecord.gpxRecord 
            }else{
              const newRecord = await defineNewRecord(ownerId, newWaypoints, newRoute)
              newRoute.gpxRecord = newRecord
              return await GpxRecord.createGpxRecord(newRecord)
            }
          }
        } catch (err) {
          console.log('Error: GPX Route Resolver: setRecord: ', err)
        }        
      }
      try {
        const newWaypoints = await defineNewWaypoints()
        const newRoute = await defineNewRoute()
        const RecordId = await setRecord(newWaypoints, newRoute)
        const RouteId = await GpxRoute.createGpxRoute(newRoute)
        await GpxWaypoints.createNewWaypoints(newWaypoints)
        return { success: true, payload: [
          { type: 'RouteId', value: RouteId },
          { type: 'RouteUrl', value: routeShortid },
          { type: 'RecordId', value: RecordId }]
        }
      } catch (err) {
          console.log('Error: GPX Route Resolver: ', err)
        throw err;
      }
    }    
  }
}

export default resolvers