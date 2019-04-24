import { AuthenticationError } from 'apollo-server'
import GpxRecord from './GpxRecord'
import GpxRoute from '../GpxRoute/GpxRoute'

const resolvers = {
  Query: {
    async getOneGpxRecordEntry(obj, params, context) {
      console.log('getOneGpxRecordEntry')
      let queryParamter = {}
      if (!params._id && !params.shortid) {
        throw new Error('Specify id or email');
      }
      queryParamter = params._id ? { _id: params._id } : { shortid: params.shortid }
      const validateOwnerID = (Record) => {
        if (Record.ownerId == context._id || Record.published) {
          return Record
        } else {
          throw new AuthenticationError('Authentication Error')
        }
      }
      try {
        const Record = await GpxRecord.getOneGpxRecordEntry(queryParamter)
        const Route = await GpxRoute.getOneGpxRoute({ _id: Record.gpxRoute })
        const validatedRecord = validateOwnerID(Record)
        const validatedRoute = validateOwnerID(Route)
        const returnData = {
          ...validatedRecord.toObject(),
          gpxRouteData: [ ...validatedRoute.toObject().gpxRouteData ]
        }
        console.log('returnData', returnData)
        return returnData
      } catch (err) {
        console.log('Error: GPX Route Resolver: getOneGpxRecordEntry: ', err)
        throw err
      }
    }
  },
  Mutation: {
    
  }
}
export default resolvers