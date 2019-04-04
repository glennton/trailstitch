import { mergeSchemas } from 'graphql-tools'
import defaultSchema from './defaults'
import testSchema from './test'
import gpxRoutes from './gpxRoutes'

const schemas = mergeSchemas({
  schemas: [
    defaultSchema,
    gpxRoutes,
    testSchema
  ]
})

export default schemas
