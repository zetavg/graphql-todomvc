// @flow

import { GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { globalIdField, connectionDefinitions, connectionArgs } from 'graphql-relay'

import { nodeInterface } from '../relay'
import { getTodoListsFromUser, connectionFrom } from '../data'
import type { Data } from '../data'
import todoListType from './todoListType'

const { connectionType: todoListsConnection } = connectionDefinitions({ nodeType: todoListType })

const userType = new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),
    todoLists: {
      type: new GraphQLNonNull(todoListsConnection),
      args: connectionArgs,
      resolve: async (user, args) => {
        const todoLists = await getTodoListsFromUser(user)
        return connectionFrom(
          // $FlowFixMe
          (todoLists: Array<Data>),
          args,
        )
      },
    },
    firstTodoList: {
      type: todoListType,
      resolve: async (user) => {
        const todoLists = await getTodoListsFromUser(user)
        return todoLists[0]
      },
    },
  },
})

export default userType
