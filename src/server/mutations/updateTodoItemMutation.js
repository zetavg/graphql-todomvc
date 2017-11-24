// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoItemType from '../types/todoItemType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { updateTodoItem } from '../data'

const updateTodoItemMutation = mutationWithClientMutationId({
  name: 'UpdateTodoItem',
  inputFields: {
    todoItemID: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString,
    },
    completed: {
      type: GraphQLBoolean,
    },
  },
  outputFields: {
    todoItem: {
      type: todoItemType,
      resolve: payload => payload.todoItem,
    },
  },
  mutateAndGetPayload: async ({ todoItemID: todoItemGlobalID, title, completed }) => {
    const { id: todoItemID } = getTypeAndIDFromGlobalID(todoItemGlobalID)

    const todoItem = await updateTodoItem(todoItemID, {
      title,
      completed,
    })

    return {
      todoItem,
    }
  },
})

export default updateTodoItemMutation
