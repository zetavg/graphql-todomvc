// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'

import { withFilter } from 'graphql-subscriptions'

import todoListType from '../types/todoListType'
import todoItemType from '../types/todoItemType'

import pubsub from './pubsub'
import { COMPLETED_ITEMS_DELETED_ON_TODO_LIST } from './pubsub/event-types'

const completedItemsDeletedOnTodoListSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'CompletedItemsDeletedOnTodoList',
    fields: {
      todoList: {
        type: new GraphQLNonNull(todoListType),
        resolve: payload => payload.todoList,
      },
      deletedTodoItemIDs: {
        type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
        resolve: payload => payload.deletedTodoItemIDs,
      },
      deletedTodoItems: {
        type: new GraphQLNonNull(new GraphQLList(todoItemType)),
        resolve: payload => payload.deletedTodoItems,
      },
    },
  }),
  subscribe: withFilter(
    () => pubsub.asyncIterator(COMPLETED_ITEMS_DELETED_ON_TODO_LIST),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default completedItemsDeletedOnTodoListSubscription
