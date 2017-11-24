// @flow

import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoListType from '../types/todoListType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { clearCompletedTodoItemsFromTodoList } from '../data'

const clearCompletedItemsFromTodoListMutation = mutationWithClientMutationId({
  name: 'ClearCompletedItemsFromTodoList',
  inputFields: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    todoList: {
      type: todoListType,
      resolve: payload => payload.todoList,
    },
  },
  mutateAndGetPayload: async ({ todoListID: todoListGlobalID }) => {
    const { id: todoListID } = getTypeAndIDFromGlobalID(todoListGlobalID)

    const todoList = await clearCompletedTodoItemsFromTodoList(todoListID)

    return {
      todoList,
    }
  },
})

export default clearCompletedItemsFromTodoListMutation
