/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'
import todoListItemsConnectionNames from '../registrations/todoListItemsConnectionNames'

const todoItemsRemovedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoList,
  deletedTodoItemIDs,
}: {
  deletedTodoItemIDs: Iterable<string>,
  todoList: RelayRecordProxy,
}) => {
  todoListItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoList,
        connName,
        { filter },
      )
      if (!conn) return

      for (const id of deletedTodoItemIDs) {
        ConnectionHandler.deleteNode(conn, id)
      }
    })
  })
  // TODO: Remove the todo items itself from store
}

export default todoItemsRemovedUpdater
