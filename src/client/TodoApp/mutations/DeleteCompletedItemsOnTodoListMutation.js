/* @flow */

import { graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import type { RecordSourceSelectorProxy, RelayRecordProxy } from 'relay-runtime'

import Mutation from './_Mutation'

import todoListItemsConnectionNames from '../registrations/todoListItemsConnectionNames'
import todoItemsDeletedUpdater from '../updaters/todoItemsDeletedUpdater'

import type { DeleteCompletedItemsOnTodoListMutationVariables }
  from './__generated__/DeleteCompletedItemsOnTodoListMutation.graphql'

export type DeleteCompletedItemsOnTodoListInput =
  $Exact<$PropertyType<DeleteCompletedItemsOnTodoListMutationVariables, 'input'>>;

export default class DeleteCompletedItemsOnTodoListMutation extends Mutation<DeleteCompletedItemsOnTodoListInput> {
  static mutation = graphql`
    mutation DeleteCompletedItemsOnTodoListMutation($input: DeleteCompletedItemsOnTodoListInput!) {
      deleteCompletedItemsOnTodoList(input: $input) {
        deletedTodoItemIDs
        todoList {
          id
          itemsCount
          completedItemsCount
        }
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
        const payload = store.getRootField('deleteCompletedItemsOnTodoList')
        if (!payload) throw new Error('Cannot get deleteCompletedItemsOnTodoList')
        const todoList = payload.getLinkedRecord('todoList')
        if (!todoList) throw new Error('Cannot get todoList')
        const deletedTodoItemIDs = payload.getValue('deletedTodoItemIDs')
        if (!deletedTodoItemIDs) throw new Error('Cannot get deletedTodoItemIDs')

        todoItemsDeletedUpdater(store, {
          todoList,
          deletedTodoItemIDs,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        const todoList = store.get(input.todoListID)
        if (!todoList) throw new Error('Cannot get todoList')

        todoList.setValue(0, 'completedItemsCount')

        const deletedTodoItemIDs = this._getDeletedTodoItemIDsFromTodoList(store, todoList)

        todoItemsDeletedUpdater(store, {
          todoList,
          deletedTodoItemIDs,
        })
      },
    }
  }

  _getDeletedTodoItemIDsFromTodoList(
    store: RecordSourceSelectorProxy,
    todoList: RelayRecordProxy,
  ) {
    const deletedTodoItemIDs: Set<string> = new Set()

    todoListItemsConnectionNames.forEach((connName) => {
      ['all', 'completed'].forEach((filter) => {
        const conn = ConnectionHandler.getConnection(
          todoList,
          connName,
          { filter },
        )
        if (!conn) return

        let nodes = conn.getLinkedRecords('edges')
          .map(edge => edge.getLinkedRecord('node'))

        if (filter !== 'completed') {
          nodes = nodes.filter(node => node.getValue('completed'))
        }

        nodes
          .map(node => node.getValue('id'))
          .filter(id => id)
          .forEach(id => deletedTodoItemIDs.add(id))
      })
    })

    return deletedTodoItemIDs
  }
}
