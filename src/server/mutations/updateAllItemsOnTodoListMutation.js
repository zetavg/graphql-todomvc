// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import todoListType from '../types/todoListType'
import todoItemType from '../types/todoItemType'
import { getTypeAndIDFromGlobalID } from '../relay'

import { updateAllTodoItemsOnTodoList } from '../data'

import pubsub from '../subscriptions/pubsub'
import { ALL_ITEMS_UPDATED_ON_TODO_LIST } from '../subscriptions/consts'

const updateAllItemsOnTodoListMutation = mutationWithClientMutationId({
  name: 'UpdateAllItemsOnTodoList',
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
      type: new GraphQLNonNull(todoListType),
      resolve: payload => payload.todoList,
    },
    updatedTodoItems: {
      type: new GraphQLNonNull(new GraphQLList(todoItemType)),
      resolve: payload => payload.updatedTodoItems,
    },
  },
  mutateAndGetPayload: async ({ todoListID: todoListGlobalID, title, completed }) => {
    const { id: todoListID } = getTypeAndIDFromGlobalID(todoListGlobalID)

    const {
      todoList,
      updatedTodoItems,
    } = await updateAllTodoItemsOnTodoList(todoListID, {
      title,
      completed,
    })

    pubsub.publish(ALL_ITEMS_UPDATED_ON_TODO_LIST, {
      todoListID: todoListGlobalID,
      todoList,
      updatedTodoItems,
      changes: {
        title,
        completed,
      },
    })

    return {
      todoList,
      updatedTodoItems,
    }
  },
})

export default updateAllItemsOnTodoListMutation
