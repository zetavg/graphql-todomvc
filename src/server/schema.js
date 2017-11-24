import { GraphQLSchema } from 'graphql'

import queryType from './types/queryType'
import mutationType from './mutations/mutationType'
import subscriptionType from './subscriptions/subscriptionType'

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  subscription: subscriptionType,
})

export default schema
