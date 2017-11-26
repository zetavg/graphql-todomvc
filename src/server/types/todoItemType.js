// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql'
import { toGlobalId, globalIdField } from 'graphql-relay'

import { nodeInterface } from '../relay'

import getType from './_getType'

import { getListFromTodoItem } from '../data'

const todoItemType = new GraphQLObjectType({
  name: 'TodoItem',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    completed: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    listID: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: todoItem => toGlobalId('TodoList', todoItem.listID),
    },
    list: {
      type: new GraphQLNonNull(getType('todoListType')),
      resolve: getListFromTodoItem,
    },
  }),
})

export default todoItemType
