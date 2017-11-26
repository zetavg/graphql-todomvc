// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'

import { withFilter } from 'graphql-subscriptions'

import getSubscriptionFieldsFromMutation from './_getSubscriptionFieldsFromMutation'
import deleteTodoItemMutation from '../mutations/deleteTodoItemMutation'

import pubsub from './pubsub'
import { TODO_ITEM_DELETED } from './pubsub/event-types'

const itemOnTodoListDeletedSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'ItemOnTodoListDeleted',
    fields: getSubscriptionFieldsFromMutation(deleteTodoItemMutation),
  }),
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_ITEM_DELETED),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default itemOnTodoListDeletedSubscription
