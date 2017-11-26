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
import { ALL_ITEMS_UPDATED_ON_TODO_LIST } from './pubsub/event-types'

const allItemsUpdatedOnTodoListSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'AllItemsUpdatedOnTodoList',
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
          name: 'AllItemsUpdatedOnTodoListChanges',
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
    () => pubsub.asyncIterator(ALL_ITEMS_UPDATED_ON_TODO_LIST),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default allItemsUpdatedOnTodoListSubscription
