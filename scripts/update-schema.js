import fs from 'fs'
import path from 'path'
import { graphql }  from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'
import schema from '../src/server/schema'

// Save user readable type system shorthand of schema
const schemaFilePath = path.join(__dirname, '..', 'schema.graphql')
fs.writeFileSync(
  schemaFilePath,
  printSchema(schema),
)
console.log(`GraphQL schema updated: ${schemaFilePath}`)
