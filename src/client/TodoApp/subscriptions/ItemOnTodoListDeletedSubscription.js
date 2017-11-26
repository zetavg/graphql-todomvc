/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'

import Subscription from './_Subscription'

import type { ItemOnTodoListDeletedSubscriptionVariables } from './__generated__/ItemOnTodoListDeletedSubscription.graphql'

import todoItemDeletedUpdater from '../updaters/todoItemDeletedUpdater'

export default class ItemOnTodoListDeletedSubscription extends Subscription<ItemOnTodoListDeletedSubscriptionVariables> {
  static subscription = graphql`
    subscription ItemOnTodoListDeletedSubscription(
      $todoListID: ID!
    ) {
      itemOnTodoListDeleted(todoListID: $todoListID) {
        deletedTodoItemID
        todoList {
          id
          itemsCount
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
        const payload = store.getRootField('itemOnTodoListDeleted')
        if (!payload) throw new Error('Cannot get itemOnTodoListDeleted')
        const deletedTodoItemID = payload.getValue('deletedTodoItemID')
        if (!deletedTodoItemID) throw new Error('cannot get deletedTodoItemID')
        const todoList = store.get(todoListID)
        if (!todoList) throw new Error('cannot get todoList')

        todoItemDeletedUpdater(store, {
          todoList,
          deletedTodoItemID,
        })
      },
    }
  }
}
