/* @flow */

import { graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import type { RecordSourceSelectorProxy, RelayRecordProxy } from 'relay-runtime'

import Mutation from './_Mutation'

import todoItemsUpdatedUpdater from '../updaters/todoItemsUpdatedUpdater'
import todoListItemsConnectionNames from '../registrations/todoListItemsConnectionNames'

import type { UpdateAllItemsOnTodoListMutationVariables }
  from './__generated__/UpdateAllItemsOnTodoListMutation.graphql'

export type UpdateAllItemsOnTodoListInput = $Exact<$PropertyType<UpdateAllItemsOnTodoListMutationVariables, 'input'>>;

export default class UpdateAllItemsOnTodoListMutation extends Mutation<UpdateAllItemsOnTodoListInput> {
  static mutation = graphql`
    mutation UpdateAllItemsOnTodoListMutation($input: UpdateAllItemsOnTodoListInput!) {
      updateAllItemsOnTodoList(input: $input) {
        todoList {
          id
          completedItemsCount
          activeItemsCount
        }
        updatedTodoItemIDs
      }
    }
  `

  static constraints = {
    // TODO: add async validation to ensure todo list with the id exists
    todoListID: {
      presence: true,
    },
  }

  getMutationConfig() {
    const { input } = this

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('updateAllItemsOnTodoList')
        if (!payload) throw new Error('Cannot get updateAllItemsOnTodoList')
        const updatedTodoItemIDs = payload.getValue('updatedTodoItemIDs')

        todoItemsUpdatedUpdater(store, {
          updatedTodoItemIDs,
          changes: {
            title: (typeof input.title === 'string') ? input.title : undefined,
            completed: (typeof input.completed === 'boolean') ? input.completed : undefined,
          },
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        const todoList = store.get(input.todoListID)
        if (!todoList) return

        this._optimisticallyUpdateTodoListItemsCounts(store, todoList, input)

        const updatedTodoItemIDs = this._getUpdatedTodoItemIDsFromTodoList(store, todoList)

        todoItemsUpdatedUpdater(store, {
          updatedTodoItemIDs,
          changes: {
            title: (typeof input.title === 'string') ? input.title : undefined,
            completed: (typeof input.completed === 'boolean') ? input.completed : undefined,
          },
        })
      },
    }
  }

  _optimisticallyUpdateTodoListItemsCounts(
    store: RecordSourceSelectorProxy,
    todoList: RelayRecordProxy,
    input: UpdateAllItemsOnTodoListInput,
  ) {
    if (typeof input.completed !== 'boolean') return

    const itemsCount = todoList.getValue('itemsCount')

    if (input.completed) {
      todoList.setValue(0, 'activeItemsCount')
      if (typeof itemsCount === 'number') todoList.setValue(itemsCount, 'completedItemsCount')
    } else {
      todoList.setValue(0, 'completedItemsCount')
      if (typeof itemsCount === 'number') todoList.setValue(itemsCount, 'activeItemsCount')
    }
  }

  _getUpdatedTodoItemIDsFromTodoList(
    store: RecordSourceSelectorProxy,
    todoList: RelayRecordProxy,
  ) {
    const updatedTodoItemIDs: Set<string> = new Set()

    todoListItemsConnectionNames.forEach((connName) => {
      ['all', 'active', 'completed'].forEach((filter) => {
        const conn = ConnectionHandler.getConnection(
          todoList,
          connName,
          { filter },
        )
        if (!conn) return
        conn.getLinkedRecords('edges')
          .map(edge => edge.getLinkedRecord('node').getValue('id'))
          .filter(id => id)
          .forEach(id => updatedTodoItemIDs.add(id))
      })
    })

    return updatedTodoItemIDs
  }
}
