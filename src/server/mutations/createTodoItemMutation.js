// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { getTypeAndIDFromGlobalID } from '../relay'

import todoItemType from '../types/todoItemType'
import todoListType, { todoListItemsConnectionEdgeType } from '../types/todoListType'

import {
  createTodoItem,
  getListFromTodoItem,
  getItemsFromTodoList,
  getEdgeFromDatasetAndNode,
} from '../data'

import pubsub from '../subscriptions/pubsub'
import { TODO_ITEM_CREATED } from '../subscriptions/pubsub/event-types'

const createTodoItemMutation = mutationWithClientMutationId({
  name: 'CreateTodoItem',
  inputFields: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
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
      resolve: async payload => await getListFromTodoItem(payload.todoItem),
    },
    todoListItemsConnectionEdge: {
      type: new GraphQLNonNull(todoListItemsConnectionEdgeType),
      resolve: async payload => getEdgeFromDatasetAndNode(
        // $FlowFixMe
        await getItemsFromTodoList(await getListFromTodoItem(payload.todoItem)),
        payload.todoItem,
      ),
    },
  },
  mutateAndGetPayload: async ({ todoListID: todoListGlobalID, title, completed }) => {
    const { id: todoListID } = getTypeAndIDFromGlobalID(todoListGlobalID)

    const todoItem = await createTodoItem({
      todoListID,
      title,
      completed,
    })

    const payload = {
      todoItem,
    }

    pubsub.publish(TODO_ITEM_CREATED, {
      todoListID: todoListGlobalID,
      ...payload,
    })

    return payload
  },
})

export default createTodoItemMutation
