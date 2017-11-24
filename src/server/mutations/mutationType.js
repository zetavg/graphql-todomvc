// @flow

import { GraphQLObjectType } from 'graphql'

import createTodoItemMutation from './createTodoItemMutation'
import updateTodoItemMutation from './updateTodoItemMutation'
import deleteTodoItemMutation from './deleteTodoItemMutation'
import updateAllItemsInTodoListMutation from './updateAllItemsInTodoListMutation'
import clearCompletedItemsFromTodoListMutation from './clearCompletedItemsFromTodoListMutation'

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTodoItem: createTodoItemMutation,
    updateTodoItem: updateTodoItemMutation,
    deleteTodoItem: deleteTodoItemMutation,
    updateAllItemsInTodoList: updateAllItemsInTodoListMutation,
    clearCompletedItemsFromTodoList: clearCompletedItemsFromTodoListMutation,
  },
})

export default mutationType
