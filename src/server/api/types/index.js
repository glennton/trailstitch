import { mergeSchemas } from 'graphql-tools'
import gpxRoute from './GpxRoute'
import gpxRecord from './GpxRecord'
import User from './User'

const schemas = mergeSchemas({
  schemas: [
    gpxRoute,
    User,
    gpxRecord,
  ]
})

export default schemas
