// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { globalIdField, connectionDefinitions, connectionArgs } from 'graphql-relay'

import { nodeInterface } from '../relay'
import { getTodoItemsFromTodoList, connectionFrom } from '../data'
import type { Data } from '../data'
import todoItemType from './todoItemType'

export const { connectionType: todoListTodoItemsConnectionType } = connectionDefinitions({ nodeType: todoItemType })

const todoListType = new GraphQLObjectType({
  name: 'TodoList',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    items: {
      type: new GraphQLNonNull(todoListTodoItemsConnectionType),
      args: connectionArgs,
      resolve: async (todoList, args) => {
        const todoItems = await getTodoItemsFromTodoList(todoList)
        return connectionFrom(
          // $FlowFixMe
          (todoItems: Array<Data>),
          args,
        )
      },
    },
  },
})

export default todoListType
