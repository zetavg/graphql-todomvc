// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

import { withFilter } from 'graphql-subscriptions'

import todoListType from '../types/todoListType'
import todoItemType from '../types/todoItemType'

import pubsub from './pubsub'
import { TODO_ITEMS_UPDATED } from './pubsub/event-types'

const itemsOnTodoListUpdatedSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'ItemsOnTodoListUpdated',
    fields: {
      todoList: {
        type: new GraphQLNonNull(todoListType),
        resolve: payload => payload.todoList,
      },
      updatedTodoItemIDs: {
        type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
        resolve: payload => payload.updatedTodoItemIDs,
      },
      updatedTodoItems: {
        type: new GraphQLNonNull(new GraphQLList(todoItemType)),
        resolve: payload => payload.updatedTodoItems,
      },
      changes: {
        type: new GraphQLNonNull(new GraphQLObjectType({
          name: 'ItemsOnTodoListUpdatedChanges',
          fields: {
            title: { type: GraphQLString },
            completed: { type: GraphQLBoolean },
          },
        })),
        resolve: payload => payload.changes,
      },
    },
  }),
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_ITEMS_UPDATED),
    (payload, args) => payload && payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default itemsOnTodoListUpdatedSubscription
