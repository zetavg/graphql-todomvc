// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql'
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
} from 'graphql-relay'

import { nodeInterface, getTypeAndIDFromGlobalID } from '../relay'

import todoListType from './todoListType'

import {
  getTodoListsFromUser,
  getTodoListFromUser,
  getFirstTodoListFromUser,
  connectionFor,
} from '../data'

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
        return connectionFor(
          // $FlowFixMe
          todoLists,
          args,
        )
      },
    },
    todoList: {
      type: todoListType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: async (user, { id }) => {
        if (id) {
          const { id: todoListID } = getTypeAndIDFromGlobalID(id)
          return getTodoListFromUser(user, todoListID)
        }

        return await getFirstTodoListFromUser(user)
      },
    },
  },
})

export default userType
