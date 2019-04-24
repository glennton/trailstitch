import { mergeSchemas } from 'graphql-tools'
//import GpxRoute from './GpxRoute'
import GpxRoute from './GpxRoute'
import GpxRecord from './GpxRecord'
import User from './User'

const schemas = mergeSchemas({
  schemas: [
    GpxRoute,
    User,
    GpxRecord,
  ]
})

export default schemas
