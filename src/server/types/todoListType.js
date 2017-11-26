// @flow

import {
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql'
import {
  toGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
} from 'graphql-relay'

import { nodeInterface } from '../relay'

import getType from './_getType'
import todoItemType from './todoItemType'

import {
  getUserFromTodoList,
  getItemsFromTodoList,
  getItemsCountFromTodoList,
  getActiveItemsCountFromTodoList,
  getCompletedItemsCountFromTodoList,
  connectionFor,
} from '../data'

export const { connectionType: todoListItemsConnectionType } = connectionDefinitions({ nodeType: todoItemType })
export const todoListItemsConnectionEdgeType: GraphQLInterfaceType =
  // $FlowFixMe
  todoListItemsConnectionType.getFields().edges.type.ofType

const todoListType = new GraphQLObjectType({
  name: 'TodoList',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userID: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: todoList => toGlobalId('User', todoList.userID),
    },
    user: {
      type: new GraphQLNonNull(getType('userType')),
      resolve: getUserFromTodoList,
    },
    items: {
      type: new GraphQLNonNull(todoListItemsConnectionType),
      args: {
        ...connectionArgs,
        filter: {
          type: new GraphQLEnumType({
            name: 'TodoListItemsFilterEnum',
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
        const todoItems = await getItemsFromTodoList(todoList, { filter })
        return connectionFor(
          // $FlowFixMe
          todoItems,
          args,
        )
      },
    },
    itemsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: getItemsCountFromTodoList,
    },
    activeItemsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: getActiveItemsCountFromTodoList,
    },
    completedItemsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: getCompletedItemsCountFromTodoList,
    },
  }),
})

export default todoListType
