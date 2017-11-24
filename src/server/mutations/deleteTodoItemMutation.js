// @flow

import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoItemType from '../types/todoItemType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { deleteTodoItemByID } from '../data'

const deleteTodoItemMutation = mutationWithClientMutationId({
  name: 'DeleteTodoItem',
  inputFields: {
    todoItemID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    todoItem: {
      type: todoItemType,
      resolve: payload => payload.todoItem,
    },
  },
  mutateAndGetPayload: async ({ todoItemID: todoItemGlobalID }) => {
    const { id: todoItemID } = getTypeAndIDFromGlobalID(todoItemGlobalID)

    const todoItem = await deleteTodoItemByID(todoItemID)

    return {
      todoItem,
    }
  },
})

export default deleteTodoItemMutation
