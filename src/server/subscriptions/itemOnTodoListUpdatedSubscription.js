// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'

import { withFilter } from 'graphql-subscriptions'

import getSubscriptionFieldsFromMutation from './_getSubscriptionFieldsFromMutation'
import updateTodoItemMutation from '../mutations/updateTodoItemMutation'

import pubsub from './pubsub'
import { TODO_ITEM_UPDATED } from './pubsub/event-types'

const itemOnTodoListUpdatedSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'ItemOnTodoListUpdated',
    fields: getSubscriptionFieldsFromMutation(updateTodoItemMutation),
  }),
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_ITEM_UPDATED),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  // subscribe: () => pubsub.asyncIterator(TODO_ITEM_UPDATED),
  resolve: (payload: mixed) => payload,
}

export default itemOnTodoListUpdatedSubscription
