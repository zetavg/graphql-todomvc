// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoItemType from '../types/todoItemType'
import todoListType, { todoListTodoItemsConnectionType } from '../types/todoListType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { createTodoItem, getTodoListFromTodoItem, getTodoItemsFromTodoList, getEdgeFromDatasetAndNode } from '../data'

import pubsub from '../subscriptions/pubsub'
import { TODO_ITEM_CREATED } from '../subscriptions/consts'

// $FlowFixMe
const todoListTodoItemsConnectionEdgeType = todoListTodoItemsConnectionType.getFields().edges.type.ofType

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
      resolve: async payload => await getTodoListFromTodoItem(payload.todoItem),
    },
    todoListTodoItemsConnectionEdge: {
      // $FlowFixMe
      type: new GraphQLNonNull(todoListTodoItemsConnectionEdgeType),
      resolve: async payload => getEdgeFromDatasetAndNode(
        // $FlowFixMe
        await getTodoItemsFromTodoList(await getTodoListFromTodoItem(payload.todoItem)),
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

    pubsub.publish(TODO_ITEM_CREATED, { todoListID: todoListGlobalID, todoItem })

    return {
      todoItem,
    }
  },
})

export default createTodoItemMutation
