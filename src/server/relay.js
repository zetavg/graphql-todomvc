// @flow

import { nodeDefinitions } from 'graphql-relay'
import atob from 'atob'

import { getDataByID } from './data'
import type {
  User,
  TodoList,
  TodoItem,
} from './data'

export const getTypeAndIDFromGlobalID = (gid: string) => {
  const [type, id] = atob(gid).split(':')
  return { type, id }
}

export const getObjectFromGlobalID = (gid: string) => {
  const { id } = getTypeAndIDFromGlobalID(gid)
  return getDataByID(id)
}

export const getTypeFromObject = (obj: User | TodoList | TodoItem) => {
  switch (obj.__type) {
    case 'User':
      return require('./types/userType').default
    case 'TodoList':
      return require('./types/todoListType').default
    case 'TodoItem':
      return require('./types/todoItemType').default
    default:
      return null
  }
}

export const { nodeInterface, nodeField } = nodeDefinitions(
  getObjectFromGlobalID,
  getTypeFromObject,
)
