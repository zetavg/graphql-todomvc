// @flow

import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { getTypeAndIDFromGlobalID } from '../relay'

import todoItemType from '../types/todoItemType'
import todoListType from '../types/todoListType'

import { deleteTodoItem, getListFromTodoItem } from '../data'

import pubsub from '../subscriptions/pubsub'
import { TODO_ITEM_DELETED } from '../subscriptions/pubsub/event-types'

const deleteTodoItemMutation = mutationWithClientMutationId({
  name: 'DeleteTodoItem',
  inputFields: {
    todoItemID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    deletedTodoItemID: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: payload => payload.deletedTodoItemID,
    },
    deletedtodoItem: {
      type: new GraphQLNonNull(todoItemType),
      resolve: payload => payload.todoItem,
    },
    todoList: {
      type: new GraphQLNonNull(todoListType),
      resolve: async payload => await getListFromTodoItem(payload.todoItem),
    },
  },
  mutateAndGetPayload: async ({ todoItemID: todoItemGlobalID }) => {
    const { id: todoItemID } = getTypeAndIDFromGlobalID(todoItemGlobalID)

    const todoItem = await deleteTodoItem(todoItemID)

    const payload = {
      todoItem,
      deletedTodoItemID: todoItemGlobalID,
    }

    pubsub.publish(TODO_ITEM_DELETED, {
      todoListID: toGlobalId('TodoList', todoItem.listID),
      ...payload,
    })

    return payload
  },
})

export default deleteTodoItemMutation
