// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoListType from '../types/todoListType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { updateAllTodoItemsInTodoList } from '../data'

const updateAllItemsInTodoListMutation = mutationWithClientMutationId({
  name: 'UpdateAllItemsInTodoList',
  inputFields: {
    todoListID: {
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
    todoList: {
      type: todoListType,
      resolve: payload => payload.todoList,
    },
  },
  mutateAndGetPayload: async ({ todoListID: todoListGlobalID, title, completed }) => {
    const { id: todoListID } = getTypeAndIDFromGlobalID(todoListGlobalID)

    const todoList = await updateAllTodoItemsInTodoList(todoListID, {
      title,
      completed,
    })

    return {
      todoList,
    }
  },
})

export default updateAllItemsInTodoListMutation
