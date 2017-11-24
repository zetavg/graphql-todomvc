// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'
import { withFilter } from 'graphql-subscriptions'

import pubsub from './pubsub'
import { COMPLETED_ITEMS_CLEARED_FROM_TODO_LIST } from './consts'

import todoItemType from '../types/todoItemType'
import todoListType from '../types/todoListType'

const completedItemsClearedFromTodoListSubscription = {
  type: new GraphQLObjectType({
    name: 'CompletedItemsClearedFromTodoList',
    fields: {
      todoList: {
        type: new GraphQLNonNull(todoListType),
        resolve: payload => payload.todoList,
      },
      deletedTodoItems: {
        type: new GraphQLNonNull(new GraphQLList(todoItemType)),
        resolve: payload => payload.deletedTodoItems,
      },
    },
  }),
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator(COMPLETED_ITEMS_CLEARED_FROM_TODO_LIST),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default completedItemsClearedFromTodoListSubscription
