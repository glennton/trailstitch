import { AuthenticationError } from 'apollo-server'
import GpxRecord from './GpxRecord'

const resolvers = {
  Query: {
    async getOneGpxRecordEntry(obj, params, context) {
      let queryParamter = {}
      const gpxRecord = context.gpxRecord
      if (!params._id && !params.shortid) {
        throw new Error('Specify id or email');
      }
      queryParamter = params._id ? { _id: params._id } : { shortid: params.shortid }

      const validateOwnerID = (Record) => {
        if (Record.ownerId == context.ownerId) {
          return Record
        } else {
          throw new AuthenticationError('Authentication Error')
        }
      }
      try {
        const Record = await GpxRecord.getOneGpxRecordEntry({ _id: gpxRecord }, queryParamter, ['gpxRoute'])
        console.log('Record', Record)
        const validatedRecord = validateOwnerID(Record)
        return validatedRecord
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