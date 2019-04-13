import { AuthenticationError } from 'apollo-server'

import GpxRoute from './GpxRoute'
import GpxWaypoints from '../gpxWaypoints/GpxWaypoints'
import GpxRecord from '../gpxRecord/GpxRecord'
import User from '../User/User'
const resolvers = {
  Query: {
    // async exampleFunction(obj, params, context, info){

    // }
  },
  Mutation: {
    async createGpxRoute(root, params, context) {
      const { name, ownerId, gpxRecord, totalDistance, dayCount, dateFirst, dateLast, trackPtCount, centralCoords, totalElevationGain, totalElevationLoss, overallElevationHighest, overallElevationLowest, info, days } = params;
      
      if (context._id !== ownerId) { throw new AuthenticationError('Authentication Error') }
      const gpxRecordExists = params.gpxRecord.length !== 0

      const defineNewWaypoints = async () => {
        try {
          return new GpxWaypoints({
            ownerId,
            gpxWaypoints: []
          });
        } catch (error) {
          throw error;
        }
      }

      const defineNewRoute = async () => {
        try {
          return new GpxRoute({
            name,
            ownerId,
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
        } catch (error) {
          throw error;
        }
      };

      const defineNewRecord = (ownerId, newWaypoints, newRoute) => {
        try {
          return new GpxRecord({
            ownerId,
            gpxRoutes: [
              {
                gpxRoute: newRoute,
                gpxWaypoints: newWaypoints,
              }
            ]
          });
        } catch (error) {
          throw error;
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
              return userRecord.gpxRecord 
            }else{
              const newRecord = await defineNewRecord(ownerId, newWaypoints, newRoute)
              newRoute.gpxRecord = newRecord
              return await GpxRecord.createGpxRecord(newRecord)
            }
          }
        } catch (error) {
          console.log(error)
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
          { type: 'RecordId', value: RecordId }]
        }
      } catch (error) {
          console.log('error', error)
        throw error;
      }
    }    
  }
}

export default resolvers