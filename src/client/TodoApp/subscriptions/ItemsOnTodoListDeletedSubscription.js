/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import Subscription from './_Subscription'

import type { ItemsOnTodoListDeletedSubscriptionVariables }
  from './__generated__/ItemsOnTodoListDeletedSubscription.graphql'

import todoItemsDeletedUpdater from '../updaters/todoItemsDeletedUpdater'

export default class ItemsOnTodoListDeletedSubscription extends Subscription<ItemsOnTodoListDeletedSubscriptionVariables> {
  static subscription = graphql`
    subscription ItemsOnTodoListDeletedSubscription(
      $todoListID: ID!
    ) {
      itemsOnTodoListDeleted(todoListID: $todoListID) {
        deletedTodoItemIDs
        todoList {
          id
          completedItemsCount
          activeItemsCount
        }
      }
    }
  `

  getSubscriptionConfig() {
    const { todoListID } = this.variables

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('itemsOnTodoListDeleted')
        if (!payload) throw new Error('cannot get itemsOnTodoListDeleted')
        const deletedTodoItemIDs = payload.getValue('deletedTodoItemIDs')
        if (!deletedTodoItemIDs) throw new Error('cannot get deletedTodoItemIDs')
        const todoList = store.get(todoListID)
        if (!todoList) throw new Error('cannot get todoList')

        todoItemsDeletedUpdater(store, {
          todoList,
          deletedTodoItemIDs,
        })
      },
    }
  }
}
