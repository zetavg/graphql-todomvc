/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  DataID,
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'
import todoListItemsConnectionNames from '../registrations/todoListItemsConnectionNames'

const todoItemDeletedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoList,
  deletedTodoItemID,
}: {
  todoList: RelayRecordProxy,
  deletedTodoItemID: DataID,
}) => {
  todoListItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoList,
        connName,
        { filter },
      )
      if (!conn) return
      ConnectionHandler.deleteNode(conn, deletedTodoItemID)
    })
  })
  // TODO: Remove the todo item itself from store
}

export default todoItemDeletedUpdater
