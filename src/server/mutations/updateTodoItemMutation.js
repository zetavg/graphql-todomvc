// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import todoItemType from '../types/todoItemType'
import todoListType from '../types/todoListType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { updateTodoItem } from '../data'

import pubsub from '../subscriptions/pubsub'
import { TODO_ITEM_UPDATED } from '../subscriptions/consts'

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
      type: new GraphQLNonNull(todoItemType),
      resolve: payload => payload.todoItem,
    },
    todoList: {
      type: new GraphQLNonNull(todoListType),
      resolve: payload => payload.todoList,
    },
  },
  mutateAndGetPayload: async ({ todoItemID: todoItemGlobalID, title, completed }) => {
    const { id: todoItemID } = getTypeAndIDFromGlobalID(todoItemGlobalID)

    const todoItem = await updateTodoItem(todoItemID, {
      title,
      completed,
    })

    pubsub.publish(TODO_ITEM_UPDATED, { todoListID: toGlobalId('TodoList', todoItem.todoListID), todoItem })

    return {
      todoItem,
    }
  },
})

export default updateTodoItemMutation
