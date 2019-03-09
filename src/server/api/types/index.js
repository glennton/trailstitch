import { mergeSchemas } from 'graphql-tools'
import defaultSchema from './defaults'
import testSchema from './test'

const schemas = mergeSchemas({
  schemas: [
    defaultSchema,
    testSchema
  ]
})

export default schemas
