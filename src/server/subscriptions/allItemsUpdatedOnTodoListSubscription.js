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

import pubsub from './pubsub'
import { ALL_ITEMS_UPDATED_ON_TODO_LIST } from './consts'

import todoItemType from '../types/todoItemType'
import todoListType from '../types/todoListType'

const allItemsUpdatedOnTodoListSubscription = {
  type: new GraphQLObjectType({
    name: 'AllItemsUpdatedOnTodoList',
    fields: {
      todoList: {
        type: new GraphQLNonNull(todoListType),
        resolve: payload => payload.todoList,
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
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator(ALL_ITEMS_UPDATED_ON_TODO_LIST),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default allItemsUpdatedOnTodoListSubscription
