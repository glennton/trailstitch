import { mergeSchemas } from 'graphql-tools'
import testSchema from './test'
import gpxRoute from './gpxRoute'

const schemas = mergeSchemas({
  schemas: [
    gpxRoute,
    testSchema
  ]
})

export default schemas
