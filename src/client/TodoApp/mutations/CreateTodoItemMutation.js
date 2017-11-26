/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import uuidv4 from 'uuid/v4'

import Mutation from './_Mutation'

import todoItemCreatedUpdater from '../updaters/todoItemCreatedUpdater'

import type { CreateTodoItemMutationVariables } from './__generated__/CreateTodoItemMutation.graphql'

export type CreateTodoItemInput = $Exact<$PropertyType<CreateTodoItemMutationVariables, 'input'>>;

export default class CreateTodoItemMutation extends Mutation<CreateTodoItemInput> {
  static mutation = graphql`
    mutation CreateTodoItemMutation($input: CreateTodoItemInput!) {
      createTodoItem(input: $input) {
        todoListItemsConnectionEdge {
          cursor
          node {
            completed
            id
            title
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

  static constraints = {
    title: {
      presence: { allowEmpty: false },
    },
  }

  getMutationConfig() {
    const { input } = this

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('createTodoItem')
        if (!payload) throw new Error('Cannot get createTodoItem')
        const todoListItemsConnectionEdge = payload.getLinkedRecord('todoListItemsConnectionEdge')
        if (!todoListItemsConnectionEdge) throw new Error('Cannot get todoListItemsConnectionEdge')
        const todoList = payload.getLinkedRecord('todoList')
        if (!todoList) throw new Error('Cannot get todoList')

        todoItemCreatedUpdater(store, {
          todoList,
          todoListItemsConnectionEdge,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        const todoList = store.get(input.todoListID)
        if (!todoList) throw new Error('Cannot get TodoList from store')

        const { temporaryTodoItemEdge } = this._generateTemporaryRecord(store, input)

        todoItemCreatedUpdater(store, {
          todoList,
          todoListItemsConnectionEdge: temporaryTodoItemEdge,
        })
      },
    }
  }

  _generateTemporaryRecord(store: RecordSourceSelectorProxy, input: CreateTodoItemInput) {
    const temporaryTodoItemID = `client:temporaryTodoItem:${uuidv4()}`
    const temporaryTodoItem = store.create(temporaryTodoItemID, 'TodoItem')
    temporaryTodoItem.setValue(temporaryTodoItemID, 'id')
    temporaryTodoItem.setValue(input.title, 'title')
    temporaryTodoItem.setValue(input.completed || false, 'completed')

    const temporaryTodoItemEdge = store.create(
      `client:temporaryTodoItemEdge:${uuidv4()}`,
      'TodoItemEdge',
    )
    temporaryTodoItemEdge.setLinkedRecord(temporaryTodoItem, 'node')

    return {
      temporaryTodoItem,
      temporaryTodoItemEdge,
    }
  }
}
