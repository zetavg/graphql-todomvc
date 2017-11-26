/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'
import todoListItemsConnectionNames from '../registrations/todoListItemsConnectionNames'

const todoItemUpdatedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoList,
  todoItem,
}: {
  todoItem: RelayRecordProxy,
  todoList: RelayRecordProxy,
}) => {
  const todoItemID = todoItem.getValue('id')
  if (typeof todoItemID !== 'string') return
  const completed = todoItem.getValue('completed')
  if (typeof completed !== 'boolean') return

  todoListItemsConnectionNames.forEach((connName) => {
    ['active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoList,
        connName,
        { filter },
      )
      if (!conn) return
      if ((filter === 'completed') === completed) {
        // TODO: Refetch the connection
      } else {
        ConnectionHandler.deleteNode(conn, todoItemID)
      }
    })
  })
}

export default todoItemUpdatedUpdater
