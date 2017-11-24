// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoListType from '../types/todoListType'
import todoItemType from '../types/todoItemType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { clearCompletedTodoItemsFromTodoList } from '../data'

import pubsub from '../subscriptions/pubsub'
import { COMPLETED_ITEMS_CLEARED_FROM_TODO_LIST } from '../subscriptions/consts'

const clearCompletedItemsFromTodoListMutation = mutationWithClientMutationId({
  name: 'ClearCompletedItemsFromTodoList',
  inputFields: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    todoList: {
      type: new GraphQLNonNull(todoListType),
      resolve: payload => payload.todoList,
    },
    deletedTodoItems: {
      type: new GraphQLNonNull(new GraphQLList(todoItemType)),
      resolve: payload => payload.deletedTodoItems,
    },
  },
  mutateAndGetPayload: async ({ todoListID: todoListGlobalID }) => {
    const { id: todoListID } = getTypeAndIDFromGlobalID(todoListGlobalID)

    const {
      todoList,
      deletedTodoItems,
    } = await clearCompletedTodoItemsFromTodoList(todoListID)

    pubsub.publish(COMPLETED_ITEMS_CLEARED_FROM_TODO_LIST, {
      todoListID: todoListGlobalID,
      todoList,
      deletedTodoItems,
    })

    return {
      todoList,
      deletedTodoItems,
    }
  },
})

export default clearCompletedItemsFromTodoListMutation
