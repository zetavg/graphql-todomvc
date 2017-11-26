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
import { TODO_ITEMS_DELETED } from './pubsub/event-types'

const itemsOnTodoListDeletedSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'ItemsOnTodoListDeleted',
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
    () => pubsub.asyncIterator(TODO_ITEMS_DELETED),
    (payload, args) => payload && payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default itemsOnTodoListDeletedSubscription
