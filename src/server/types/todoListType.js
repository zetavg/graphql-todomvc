// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
} from 'graphql'
import { globalIdField, connectionDefinitions, connectionArgs } from 'graphql-relay'

import { nodeInterface } from '../relay'
import {
  getTodoItemsFromTodoList,
  getTodoItemsCountFromTodoList,
  getActiveTodoItemsCountFromTodoList,
  getCompletedTodoItemsCountFromTodoList,
  connectionFrom,
} from '../data'
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
      args: {
        ...connectionArgs,
        filter: {
          type: new GraphQLEnumType({
            name: 'TodoListTodoItemsFilterEnum',
            values: {
              all: { value: 'all' },
              active: { value: 'active' },
              completed: { value: 'completed' },
            },
          }),
        },
      },
      resolve: async (todoList, args) => {
        const { filter } = args
        const todoItems = await getTodoItemsFromTodoList(todoList, { filter })
        return connectionFrom(
          // $FlowFixMe
          (todoItems: Array<Data>),
          args,
        )
      },
    },
    todoItemsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (todoList) => getTodoItemsCountFromTodoList(todoList),
    },
    activeTodoItemsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (todoList) => getActiveTodoItemsCountFromTodoList(todoList),
    },
    completedTodoItemsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (todoList) => getCompletedTodoItemsCountFromTodoList(todoList),
    },
  },
})

export default todoListType
