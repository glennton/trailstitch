import { AuthenticationError } from 'apollo-server'
import shortid from 'shortid'
import GpxRoute from './GpxRoute'
import GpxWaypoints from '../GpxWaypoints/GpxWaypoints'
import GpxRecord from '../GpxRecord/GpxRecord'
import User from '../User/User'



const resolvers = {
  Query: {
    async getOneGpxRoute(obj, params, context) {     
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
        const Route = await GpxRoute.getOneGpxRoute(queryParamter)
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
      console.log('gpxRecordExists', params.gpxRecord.length !== 0)
      const gpxRecordExists = params.gpxRecord.length !== 0
      const routeShortid = shortid.generate()
      const recordShortid = shortid.generate()
      const recordEntryShortid = shortid.generate()
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
            ownerId,
            shortid: routeShortid,
            gpxRecord,
            days,
          });
        } catch (err) {
          console.log('Error: GPX Route Resolver: defineNewRoute: ', err)
          throw err;
        }
      };

      const defineNewRecordEntry = (newWaypoints, newRoute) => {
        return {
          ownerId,
          shortid: recordEntryShortid,
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
          gpxRoute: newRoute,
          gpxWaypoints: newWaypoints,
        }
      }

      const defineNewRecord = (ownerId, newWaypoints, newRoute) => {
        try {
          return new GpxRecord({
            ownerId,
            name,
            shortid: recordShortid,
            gpxRoutes: [
              defineNewRecordEntry(newWaypoints, newRoute)
            ]
          });
        } catch (err) {
          console.log('Error: GPX Route Resolver: defineNewRecord: ', err)
          throw err;
        }
      }
      const setRecord = async (newWaypoints, newRoute, newRecordEntry) => { //TODO PROTECT ROUTES WITH VERIFICATION
        try {
          if (gpxRecordExists) {
            // Normal operation - return record id defined by client
            const newRecord = await GpxRecord.addNewRecord({ ownerId: ownerId }, newRecordEntry)
            return newRecord.shortid
          }else{
            // If record somehow does not exist on client user, search for any records under client user id
            const gpxRecordCheck = await GpxRecord.getOneGpxRecord({ ownerId: ownerId }, ['_id'])
            const gpxRecordCheckId = gpxRecordCheck._id
            if (gpxRecordCheckId) {
              // GPX Record was found - Attach to route and reattach to user
              newRoute.gpxRecord = gpxRecordCheckId
              await User.attachRecord(ownerId, gpxRecordCheckId)
              const newRecord = await GpxRecord.addNewRecord({ ownerId: ownerId }, newRecordEntry)
              return newRecord.shortid
            }else{
              // No GPX Record was found - Create New Record - Attach to route and reattach to user
              const newRecord = await defineNewRecord(ownerId, newWaypoints, newRoute)
              newRoute.gpxRecord = newRecord
              await User.attachRecord(ownerId, newRecord)
              await GpxRecord.createGpxRecord(newRecord)
              return newRecord.shortid
            }
          }
        } catch (err) {
          console.log('Error: GPX Route Resolver: setRecord: ', err)
        }        
      }
      try {
        //const verifiedClientRecordId
        const newRecordEntry = defineNewRecordEntry(newWaypoints, newRoute)
        const newWaypoints = await defineNewWaypoints()
        const newRoute = await defineNewRoute()
        const RecordId = await setRecord(newWaypoints, newRoute, newRecordEntry)
        const RouteId = await GpxRoute.createGpxRoute(newRoute)
        const refreshToken = RecordId === gpxRecord ? false : true  //Resign token in case user record information changed
        await GpxWaypoints.createNewWaypoints(newWaypoints)
        return { success: true, payload: [
          { type: 'RouteId', value: RouteId },
          { type: 'RouteUrl', value: routeShortid },
          { type: 'RecordUrl', value: recordEntryShortid },
          { type: 'RefreshToken', value: refreshToken }]
        }
      } catch (err) {
          console.log('Error: GPX Route Resolver: ', err)
        throw err;
      }
    }    
  }
}

export default resolvers