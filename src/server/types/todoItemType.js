// @flow

import {
  GraphQLNonNull,
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
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

export default todoItemType
