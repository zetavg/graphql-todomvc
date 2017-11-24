// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'
import { withFilter } from 'graphql-subscriptions'

import pubsub from './pubsub'
import { TODO_ITEM_CREATED } from './consts'

import todoItemType from '../types/todoItemType'
import todoListType, { todoListTodoItemsConnectionType } from '../types/todoListType'

import { getTodoListFromTodoItem, getTodoItemsFromTodoList, getEdgeFromDatasetAndNode } from '../data'

// $FlowFixMe
const todoListTodoItemsConnectionEdgeType = todoListTodoItemsConnectionType.getFields().edges.type.ofType

const itemOnTodoListCreatedSubscription = {
  type: new GraphQLObjectType({
    name: 'ItemOnTodoListCreated',
    fields: {
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
  }),
  args: {
    todoListID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_ITEM_CREATED),
    (payload, args) => payload.todoListID === args.todoListID,
  ),
  resolve: (payload: mixed) => payload,
}

export default itemOnTodoListCreatedSubscription
