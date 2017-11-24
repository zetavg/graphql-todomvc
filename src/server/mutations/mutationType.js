// @flow

import { GraphQLObjectType } from 'graphql'

import createTodoItemMutation from './createTodoItemMutation'
import updateTodoItemMutation from './updateTodoItemMutation'
import deleteTodoItemMutation from './deleteTodoItemMutation'
import updateAllItemsOnTodoListMutation from './updateAllItemsOnTodoListMutation'
import clearCompletedItemsFromTodoListMutation from './clearCompletedItemsFromTodoListMutation'

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTodoItem: createTodoItemMutation,
    updateTodoItem: updateTodoItemMutation,
    deleteTodoItem: deleteTodoItemMutation,
    updateAllItemsOnTodoList: updateAllItemsOnTodoListMutation,
    clearCompletedItemsFromTodoList: clearCompletedItemsFromTodoListMutation,
  },
})

export default mutationType
