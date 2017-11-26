// @flow

import { GraphQLObjectType } from 'graphql'

import itemOnTodoListCreatedSubscription from './itemOnTodoListCreatedSubscription'
import itemOnTodoListUpdatedSubscription from './itemOnTodoListUpdatedSubscription'
import itemOnTodoListDeletedSubscription from './itemOnTodoListDeletedSubscription'
import allItemsUpdatedOnTodoListSubscription from './allItemsUpdatedOnTodoListSubscription'
import completedItemsDeletedOnTodoListSubscription from './completedItemsDeletedOnTodoListSubscription'

// $FlowFixMe
const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    itemOnTodoListCreated: itemOnTodoListCreatedSubscription,
    itemOnTodoListUpdated: itemOnTodoListUpdatedSubscription,
    itemOnTodoListDeleted: itemOnTodoListDeletedSubscription,
    allItemsUpdatedOnTodoList: allItemsUpdatedOnTodoListSubscription,
    completedItemsDeletedOnTodoList: completedItemsDeletedOnTodoListSubscription,
  },
})

export default subscriptionType
