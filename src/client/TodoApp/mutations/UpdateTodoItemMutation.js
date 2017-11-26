/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import validate from 'validate.js'

import Mutation from './_Mutation'

import todoItemUpdatedUpdater from '../updaters/todoItemUpdatedUpdater'

import type { UpdateTodoItemMutationVariables } from './__generated__/UpdateTodoItemMutation.graphql'

export type UpdateTodoItemInput = $Exact<$PropertyType<UpdateTodoItemMutationVariables, 'input'>>;

export type UpdateTodoItemOptions = {|
  todoListID: string,
|};

export default class UpdateTodoItemMutation extends Mutation<UpdateTodoItemInput, UpdateTodoItemOptions> {
  static mutation = graphql`
    mutation UpdateTodoItemMutation($input: UpdateTodoItemInput!) {
      updateTodoItem(input: $input) {
        todoItem {
          id
          title
          completed
        }
        todoList {
          id
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
    title: (value: string) => {
      // Ensure the title is not a blank string
      if (!validate.isDefined(value)) return {}

      return {
        presence: { allowEmpty: false },
      }
    },
  }

  getMutationConfig() {
    const { input, options } = this

    const optimisticResponsePayload = {
      todoItem: {
        id: input.todoItemID,
        title: input.title,
        completed: input.completed,
      },
    }

    return {
      optimisticResponse: {
        updateTodoItem: optimisticResponsePayload,
      },
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('updateTodoItem')
        if (!payload) throw new Error('Cannot get updateTodoItem')
        const todoItem = payload.getLinkedRecord('todoItem')
        if (!todoItem) throw new Error('Cannot get todoItem')
        const todoList = payload.getLinkedRecord('todoList')
        if (!todoList) throw new Error('Cannot get todoList')

        todoItemUpdatedUpdater(store, {
          todoItem,
          todoList,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        if (!options.todoListID) return
        const todoList = store.get(options.todoListID)
        if (!todoList) throw new Error('Cannot get todoList')
        const todoItem = store.get(input.todoItemID)
        if (!todoItem) throw new Error('Cannot get todoItem')

        todoItemUpdatedUpdater(store, {
          todoList,
          todoItem,
        })
      },
    }
  }
}
