/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'

import Subscription from './_Subscription'

import todoItemUpdatedUpdater from '../updaters/todoItemUpdatedUpdater'

import type { ItemOnTodoListUpdatedSubscriptionVariables }
  from './__generated__/ItemOnTodoListUpdatedSubscription.graphql'

export default class ItemOnTodoListUpdatedSubscription
  extends Subscription<ItemOnTodoListUpdatedSubscriptionVariables> {
  static subscription = graphql`
    subscription ItemOnTodoListUpdatedSubscription(
      $todoListID: ID!
    ) {
      itemOnTodoListUpdated(todoListID: $todoListID) {
        todoItem {
          id
          completed
          title
          listID
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
    const { todoListID } = this.variables

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('itemOnTodoListUpdated')
        if (!payload) throw new Error('cannot get itemOnTodoListUpdated')
        const todoItem = payload.getLinkedRecord('todoItem')
        if (!todoItem) throw new Error('cannot get todoItem')
        const todoList = store.get(todoListID)
        if (!todoList) throw new Error('cannot get todoList')

        todoItemUpdatedUpdater(store, {
          todoList,
          todoItem,
        })
      },
    }
  }
}
