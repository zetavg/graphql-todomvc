// @flow

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { getTypeAndIDFromGlobalID } from '../relay'

import todoListType from '../types/todoListType'
import todoItemType from '../types/todoItemType'

import { deleteCompletedItemsOnTodoList } from '../data'

import pubsub from '../subscriptions/pubsub'
import { COMPLETED_ITEMS_DELETED_ON_TODO_LIST } from '../subscriptions/pubsub/event-types'

const deleteCompletedItemsOnTodoListMutation = mutationWithClientMutationId({
  name: 'DeleteCompletedItemsOnTodoList',
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
    deletedTodoItemIDs: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
      resolve: payload => payload.deletedTodoItemIDs,
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
      deletedTodoItemIDs,
      deletedTodoItems,
    } = await deleteCompletedItemsOnTodoList(todoListID)

    const deletedTodoItemGlobalIDs = deletedTodoItemIDs.map(id => toGlobalId('TodoItem', id))

    pubsub.publish(COMPLETED_ITEMS_DELETED_ON_TODO_LIST, {
      todoListID: todoListGlobalID,
      todoList,
      deletedTodoItemIDs: deletedTodoItemGlobalIDs,
      deletedTodoItems,
    })

    return {
      todoList,
      deletedTodoItemIDs: deletedTodoItemGlobalIDs,
      deletedTodoItems,
    }
  },
})

export default deleteCompletedItemsOnTodoListMutation
