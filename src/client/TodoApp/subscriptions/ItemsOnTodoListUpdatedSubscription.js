/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'

import Subscription from './_Subscription'

import todoItemsUpdatedUpdater from '../updaters/todoItemsUpdatedUpdater'

import type { ItemsOnTodoListUpdatedSubscriptionVariables }
  from './__generated__/ItemsOnTodoListUpdatedSubscription.graphql'

export default class ItemsOnTodoListUpdatedSubscription
  extends Subscription<ItemsOnTodoListUpdatedSubscriptionVariables> {
  static subscription = graphql`
    subscription ItemsOnTodoListUpdatedSubscription(
      $todoListID: ID!
    ) {
      itemsOnTodoListUpdated(todoListID: $todoListID) {
        updatedTodoItemIDs
        changes {
          title
          completed
        }
        todoList {
          id
          completedItemsCount
          activeItemsCount
        }
      }
    }
  `

  getSubscriptionConfig() {
    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('itemsOnTodoListUpdated')
        if (!payload) throw new Error('cannot get itemsOnTodoListUpdated')
        const updatedTodoItemIDs = payload.getValue('updatedTodoItemIDs')
        if (!updatedTodoItemIDs) throw new Error('cannot get updatedTodoItemIDs')
        const changes = payload.getLinkedRecord('changes')
        if (!changes) throw new Error('cannot get changes')
        const title = changes.getValue('title')
        const completed = changes.getValue('completed')

        todoItemsUpdatedUpdater(store, {
          updatedTodoItemIDs,
          changes: {
            title: (typeof title === 'string') ? title : undefined,
            completed: (typeof completed === 'boolean') ? completed : undefined,
          },
        })
      },
    }
  }
}
