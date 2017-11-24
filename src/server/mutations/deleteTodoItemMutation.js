// @flow

import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import todoItemType from '../types/todoItemType'
import todoListType from '../types/todoListType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { deleteTodoItemByID, getTodoListFromTodoItem } from '../data'

import pubsub from '../subscriptions/pubsub'
import { TODO_ITEM_DELETED } from '../subscriptions/consts'

const deleteTodoItemMutation = mutationWithClientMutationId({
  name: 'DeleteTodoItem',
  inputFields: {
    todoItemID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    todoItem: {
      type: new GraphQLNonNull(todoItemType),
      resolve: payload => payload.todoItem,
    },
    todoList: {
      type: new GraphQLNonNull(todoListType),
      resolve: async payload => await getTodoListFromTodoItem(payload.todoItem),
    },
  },
  mutateAndGetPayload: async ({ todoItemID: todoItemGlobalID }) => {
    const { id: todoItemID } = getTypeAndIDFromGlobalID(todoItemGlobalID)

    const todoItem = await deleteTodoItemByID(todoItemID)

    pubsub.publish(TODO_ITEM_DELETED, { todoListID: toGlobalId('TodoList', todoItem.todoListID), todoItem })

    return {
      todoItem,
    }
  },
})

export default deleteTodoItemMutation
