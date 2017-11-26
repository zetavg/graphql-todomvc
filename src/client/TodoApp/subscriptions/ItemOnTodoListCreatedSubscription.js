/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy, RelayRecordProxy } from 'relay-runtime'
import uuidv4 from 'uuid/v4'

import Subscription from './_Subscription'

import todoItemCreatedUpdater from '../updaters/todoItemCreatedUpdater'

import type { ItemOnTodoListCreatedSubscriptionVariables }
  from './__generated__/ItemOnTodoListCreatedSubscription.graphql'

export default class ItemOnTodoListCreatedSubscription
  extends Subscription<ItemOnTodoListCreatedSubscriptionVariables> {
  static subscription = graphql`
    subscription ItemOnTodoListCreatedSubscription(
      $todoListID: ID!
    ) {
      itemOnTodoListCreated(todoListID: $todoListID) {
        todoItem {
          id
          completed
          title
          listID
        }
        todoListItemsConnectionEdge {
          cursor
          node {
            id
          }
        }
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
        const payload = store.getRootField('itemOnTodoListCreated')
        if (!payload) throw new Error('cannot get itemOnTodoListCreated')
        const todoItem = payload.getLinkedRecord('todoItem')
        if (!todoItem) throw new Error('cannot get todoItem')
        const todoList = store.get(todoListID)
        if (!todoList) throw new Error('cannot get todoList')
        const todoListItemsConnectionEdge = payload.getLinkedRecord('todoListItemsConnectionEdge')
        if (!todoListItemsConnectionEdge) throw new Error('cannot get todoListItemsConnectionEdge')

        todoItemCreatedUpdater(store, {
          todoList,
          todoListItemsConnectionEdge,
        })

        this._updateItemsCounts(store, todoList, todoItem)
      },
    }
  }

  _updateItemsCounts(
    store: RecordSourceSelectorProxy,
    todoList: RelayRecordProxy,
    todoItem: RelayRecordProxy,
  ) {
    const currentItemsCount = todoList.getValue('todoItemsCount')
    if (typeof currentItemsCount === 'number') {
      todoList.setValue(
        currentItemsCount + 1,
        'todoItemsCount',
      )
    }

    const completed = todoItem.getValue('completed')
    const currentCompletedItemsCount = todoList.getValue('completedTodoItemsCount')
    const currentActiveItemsCount = todoList.getValue('activeTodoItemsCount')

    if (completed && typeof currentCompletedItemsCount === 'number') {
      todoList.setValue(
        currentCompletedItemsCount + 1,
        'completedTodoItemsCount',
      )
    } else if (typeof currentActiveItemsCount === 'number') {
      todoList.setValue(
        currentActiveItemsCount + 1,
        'activeTodoItemsCount',
      )
    }
  }
}
