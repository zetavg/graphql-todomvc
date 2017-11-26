// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'

import { withFilter } from 'graphql-subscriptions'

import getSubscriptionFieldsFromMutation from './_getSubscriptionFieldsFromMutation'
import createTodoItemMutation from '../mutations/createTodoItemMutation'

import pubsub from './pubsub'
import { TODO_ITEM_CREATED } from './pubsub/event-types'

const itemOnTodoListCreatedSubscription = {
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: new GraphQLObjectType({
    name: 'ItemOnTodoListCreated',
    fields: getSubscriptionFieldsFromMutation(createTodoItemMutation),
  }),
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_ITEM_CREATED),
    (payload, args) => payload && payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default itemOnTodoListCreatedSubscription
