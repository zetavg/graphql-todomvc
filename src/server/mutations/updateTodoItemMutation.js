// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { getTypeAndIDFromGlobalID } from '../relay'

import todoItemType from '../types/todoItemType'
import todoListType from '../types/todoListType'

import { updateTodoItem, getListFromTodoItem } from '../data'

import pubsub from '../subscriptions/pubsub'
import { TODO_ITEM_UPDATED } from '../subscriptions/pubsub/event-types'

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
      resolve: async payload => getListFromTodoItem(payload.todoItem),
    },
  },
  mutateAndGetPayload: async ({ todoItemID: todoItemGlobalID, title, completed }) => {
    const { id: todoItemID } = getTypeAndIDFromGlobalID(todoItemGlobalID)

    // $FlowFixMe
    const todoItem = await updateTodoItem(todoItemID, {
      title,
      completed,
    })

    const payload = {
      todoItem,
    }

    pubsub.publish(TODO_ITEM_UPDATED, {
      todoListID: toGlobalId('TodoList', todoItem.listID),
      ...payload,
    })

    return payload
  },
})

export default updateTodoItemMutation
