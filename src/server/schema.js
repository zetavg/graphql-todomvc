import { GraphQLSchema } from 'graphql'

import queryType from './types/queryType'
import mutationType from './mutations/mutationType'

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

export default schema
