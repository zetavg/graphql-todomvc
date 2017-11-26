// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { getTypeAndIDFromGlobalID } from '../relay'

import todoListType from '../types/todoListType'
import todoItemType from '../types/todoItemType'

import { updateAllItemsOnTodoList } from '../data'

import pubsub from '../subscriptions/pubsub'
import { ALL_ITEMS_UPDATED_ON_TODO_LIST } from '../subscriptions/pubsub/event-types'

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
    updatedTodoItemIDs: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
      resolve: payload => payload.updatedTodoItemIDs,
    },
    updatedTodoItems: {
      type: new GraphQLNonNull(new GraphQLList(todoItemType)),
      resolve: payload => payload.updatedTodoItems,
    },
  },
  mutateAndGetPayload: async ({ todoListID: todoListGlobalID, title, completed }) => {
    const { id: todoListID } = getTypeAndIDFromGlobalID(todoListGlobalID)

    const { todoList, updatedTodoItems, updatedTodoItemIDs } = await updateAllItemsOnTodoList(todoListID, {
      title,
      completed,
    })

    const updatedTodoItemGlobalIDs = updatedTodoItemIDs.map(id => toGlobalId('TodoItem', id))

    pubsub.publish(ALL_ITEMS_UPDATED_ON_TODO_LIST, {
      todoListID: todoListGlobalID,
      todoList,
      updatedTodoItemIDs: updatedTodoItemGlobalIDs,
      updatedTodoItems,
      changes: {
        title,
        completed,
      },
    })

    return {
      todoList,
      updatedTodoItemIDs: updatedTodoItemGlobalIDs,
      updatedTodoItems,
    }
  },
})

export default updateAllItemsOnTodoListMutation
