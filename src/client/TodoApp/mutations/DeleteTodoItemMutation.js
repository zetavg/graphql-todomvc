/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'

import Mutation from './_Mutation'

import todoItemDeletedUpdater from '../updaters/todoItemDeletedUpdater'

import type { DeleteTodoItemMutationVariables } from './__generated__/DeleteTodoItemMutation.graphql'

export type DeleteTodoItemInput = $Exact<$PropertyType<DeleteTodoItemMutationVariables, 'input'>>;

export type DeleteTodoItemOptions = {|
  todoListID: string,
|};

export default class DeleteTodoItemMutation extends Mutation<DeleteTodoItemInput, DeleteTodoItemOptions> {
  static mutation = graphql`
    mutation DeleteTodoItemMutation($input: DeleteTodoItemInput!) {
      deleteTodoItem(input: $input) {
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

  static constraints = {
    // TODO: add async validation to ensure todo item with the id exists
    todoItemID: {
      presence: true,
    },
  }

  getMutationConfig() {
    const { input, options } = this

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('deleteTodoItem')
        if (!payload) throw new Error('Cannot get deleteTodoItem')
        const todoList = payload.getLinkedRecord('todoList')
        if (!todoList) throw new Error('Cannot get todoList')

        todoItemDeletedUpdater(store, {
          todoList,
          deletedTodoItemID: input.todoItemID,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        if (!options.todoListID) return
        const todoList = store.get(options.todoListID)
        if (!todoList) throw new Error('Cannot get todoList')

        todoItemDeletedUpdater(store, {
          todoList,
          deletedTodoItemID: input.todoItemID,
        })
      },
    }
  }
}
