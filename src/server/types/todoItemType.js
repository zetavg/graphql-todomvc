// @flow

import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { nodeInterface } from '../relay'

const todoItemType = new GraphQLObjectType({
  name: 'TodoItem',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),
    completed: {
      type: GraphQLBoolean,
    },
    title: {
      type: GraphQLString,
    },
  },
})

export default todoItemType
