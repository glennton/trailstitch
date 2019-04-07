import { mergeSchemas } from 'graphql-tools'
import testSchema from './test'
import gpxRoute from './gpxRoute'
import User from './User'

const schemas = mergeSchemas({
  schemas: [
    gpxRoute,
    testSchema,
    User,
  ]
})

export default schemas
