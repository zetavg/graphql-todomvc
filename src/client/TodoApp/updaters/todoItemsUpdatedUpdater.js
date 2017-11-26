/* @flow */

import type { RelayRecordSourceSelectorProxy } from 'relay-runtime'

const todoItemsUpdatedUpdater = (store: RelayRecordSourceSelectorProxy, {
  updatedTodoItemIDs,
  changes,
}: {
  updatedTodoItemIDs: Iterable<string>,
  changes: {| completed?: boolean, title?: string |},
}) => {
  for (const todoItemID of updatedTodoItemIDs) {
    const todoItem = store.get(todoItemID)
    if (!todoItem) continue

    if (typeof changes.completed === 'boolean') {
      todoItem.setValue(changes.completed, 'completed')
    }

    if (typeof changes.title === 'boolean') {
      todoItem.setValue(changes.title, 'completed')
    }
  }
}

export default todoItemsUpdatedUpdater
