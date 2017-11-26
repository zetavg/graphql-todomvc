/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'

import todoListItemsConnectionNames from '../registrations/todoListItemsConnectionNames'

const todoItemCreatedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoList,
  todoListItemsConnectionEdge,
}: {
  todoList: RelayRecordProxy,
  todoListItemsConnectionEdge: RelayRecordProxy,
}) => {
  const todoItem = todoListItemsConnectionEdge.getLinkedRecord('node')
  if (!todoItem) throw new Error('Cannot get node from todoListItemsConnectionEdge')
  const todoItemCompleted = todoItem.getValue('completed')

  todoListItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoList,
        connName,
        { filter },
      )
      if (!conn) return

      if (
        (filter === 'all') ||
        (filter === 'active' && !todoItemCompleted) ||
        (filter === 'completed' && todoItemCompleted)
      ) {
        ConnectionHandler.insertEdgeAfter(conn, todoListItemsConnectionEdge)
      }
    })
  })
}

export default todoItemCreatedUpdater
