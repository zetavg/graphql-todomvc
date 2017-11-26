// @flow

import { GraphQLObjectType } from 'graphql'

import itemOnTodoListCreatedSubscription from './itemOnTodoListCreatedSubscription'
import itemOnTodoListUpdatedSubscription from './itemOnTodoListUpdatedSubscription'
import itemOnTodoListDeletedSubscription from './itemOnTodoListDeletedSubscription'
import itemsOnTodoListUpdatedSubscription from './itemsOnTodoListUpdatedSubscription'
import itemsOnTodoListDeletedSubscription from './itemsOnTodoListDeletedSubscription'

// $FlowFixMe
const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    itemOnTodoListCreated: itemOnTodoListCreatedSubscription,
    itemOnTodoListUpdated: itemOnTodoListUpdatedSubscription,
    itemOnTodoListDeleted: itemOnTodoListDeletedSubscription,
    itemsOnTodoListUpdated: itemsOnTodoListUpdatedSubscription,
    itemsOnTodoListDeleted: itemsOnTodoListDeletedSubscription,
  },
})

export default subscriptionType
