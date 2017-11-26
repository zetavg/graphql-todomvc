// @flow

import { GraphQLObjectType } from 'graphql'

import createTodoItemMutation from './createTodoItemMutation'
import updateTodoItemMutation from './updateTodoItemMutation'
import deleteTodoItemMutation from './deleteTodoItemMutation'
import updateAllItemsOnTodoListMutation from './updateAllItemsOnTodoListMutation'
import deleteCompletedItemsOnTodoListMutation from './deleteCompletedItemsOnTodoListMutation'

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTodoItem: createTodoItemMutation,
    updateTodoItem: updateTodoItemMutation,
    deleteTodoItem: deleteTodoItemMutation,
    updateAllItemsOnTodoList: updateAllItemsOnTodoListMutation,
    deleteCompletedItemsOnTodoList: deleteCompletedItemsOnTodoListMutation,
  },
})

export default mutationType
