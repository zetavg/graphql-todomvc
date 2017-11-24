// @flow

import uuidv4 from 'uuid/v4'
import atob from 'atob'
import btoa from 'btoa'
import leftPad from 'left-pad'

export interface User {
  +__type: 'User',
  +id: string,
  +todoListIDs: Array<string>,
}

export interface TodoList {
  +__type: 'TodoList',
  +userID: string,
  +id: string,
  +name: string,
  +todoItemIDs: Array<string>,
}

export interface TodoItem {
  +__type: 'TodoItem',
  +id: string,
  +todoListID: string,
  +title: string,
  +completed: boolean,
}

export type Data = User | TodoList | TodoItem;

const defaultUserID = '00000000-0000-0000-0000-000000000000'
const todoList0ID = '00000001-0000-0000-0000-000000000000'
const todoList1ID = '00000001-0000-0000-0000-000000000001'

const todoList0TodoItem0: TodoItem = {
  __type: 'TodoItem',
  id: '00000002-0000-0000-0000-000000000000',
  todoListID: todoList0ID,
  title: 'Taste JavaScript',
  completed: true,
}

const todoList0TodoItem1: TodoItem = {
  __type: 'TodoItem',
  id: '00000002-0000-0000-0000-000000000001',
  todoListID: todoList0ID,
  title: 'Buy a unicorn',
  completed: false,
}

const todoList0: TodoList = {
  __type: 'TodoList',
  userID: defaultUserID,
  id: todoList0ID,
  name: 'Todos',
  todoItemIDs: [todoList0TodoItem0.id, todoList0TodoItem1.id],
}

const todoList1TodoItems: Array<TodoItem> = [...Array(100)].map((_, i) => ({
  __type: 'TodoItem',
  id: `00000002-0001-0000-0000-0000000000${leftPad(i, 2, '0')}`,
  todoListID: todoList1ID,
  title: `Item ${i}`,
  completed: false,
}))

const todoList1: TodoList = {
  __type: 'TodoList',
  userID: defaultUserID,
  id: todoList1ID,
  name: 'Another List',
  todoItemIDs: todoList1TodoItems.map(i => i.id),
}

const defaultUser: User = {
  __type: 'User',
  id: defaultUserID,
  todoListIDs: [todoList0.id, todoList1.id],
}

const dataSource = {
  [defaultUser.id]: defaultUser,
  [todoList0.id]: todoList0,
  [todoList1.id]: todoList1,
  [todoList0TodoItem0.id]: todoList0TodoItem0,
  [todoList0TodoItem1.id]: todoList0TodoItem1,
  ...todoList1TodoItems.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}),
}

export const getDataByID = async (id: string): Promise<Data> => {
  return dataSource[id]
}

export const getAuthenticatedUser = async (): Promise<User> => {
  return defaultUser
}

export const getTodoListsFromUser = async (user: User): Promise<Array<TodoList>> => {
  return user.todoListIDs.map(id => dataSource[id])
}

export const getTodoItemsFromTodoList = async (todoList: TodoList): Promise<Array<TodoItem>> => {
  return todoList.todoItemIDs.map(id => dataSource[id])
}

export const getTodoListFromTodoItem = async (todoItem: TodoItem): Promise<TodoList> => {
  return dataSource[todoItem.todoListID]
}

export const createTodoItem = async ({
  todoListID,
  title,
  completed,
}: {|
  todoListID: string,
  title: string,
  completed?: boolean,
|}): Promise<TodoItem> => {
  const todoList: TodoList = dataSource[todoListID]

  const newTodoItem: TodoItem = {
    __type: 'TodoItem',
    id: uuidv4(),
    todoListID,
    title,
    completed: completed || false,
  }

  dataSource[newTodoItem.id] = newTodoItem
  todoList.todoItemIDs.push(newTodoItem.id)

  return newTodoItem
}

export const updateTodoItem = async (todoItemID: string, {
  title,
  completed,
}: {
  title?: string,
  completed?: boolean,
}): Promise<TodoItem> => {
  const todoItem = dataSource[todoItemID]

  if (typeof completed === 'boolean') {
    todoItem.completed = completed
  }

  if (title && typeof title === 'string') {
    todoItem.title = title
  }

  return todoItem
}

export const deleteTodoItemByID = async (todoItemID: string): Promise<TodoItem> => {
  const todoItem = dataSource[todoItemID]
  const todoList = await getTodoListFromTodoItem(todoItem)
  todoList.todoItemIDs.splice(todoList.todoItemIDs.indexOf(todoItem.id), 1)
  delete dataSource[todoItemID]
  return todoItem
}

export const updateAllTodoItemsInTodoList = async (todoListID: string, {
  title,
  completed,
}: {
  title?: string,
  completed?: boolean,
}): Promise<TodoList> => {
  const todoList = dataSource[todoListID]
  for (const todoItemID of todoList.todoItemIDs) {
    const todoItem = dataSource[todoItemID]

    if (typeof completed === 'boolean') {
      todoItem.completed = completed
    }

    if (title && typeof title === 'string') {
      todoItem.title = title
    }
  }

  return todoList
}

export const clearCompletedTodoItemsFromTodoList = async (todoListID: string): Promise<TodoList> => {
  const todoList = dataSource[todoListID]

  todoList.todoItemIDs = todoList.todoItemIDs.filter((todoItemID) => {
    if (!dataSource[todoItemID].completed) return true
    delete dataSource[todoItemID]
    return false
  })

  return todoList
}

export const getIndexFromDatasetAndCursor = (dataset: Array<Data>, cursor: string) => {
  const [cursorType, cursorData] = atob(cursor).split(':')

  switch (cursorType) {
    case 'id-cursor':
      return dataset.findIndex(d => d.id === cursorData)
    default:
      return -1
  }
}

export const getCursorFromDatasetAndNode = (dataset: Array<Data>, node: Data) => {
  return btoa(`id-cursor:${node.id}`)
}

export const getEdgeFromDatasetAndNode = (dataset: Array<Data>, node: Data) => {
  return {
    cursor: getCursorFromDatasetAndNode(dataset, node),
    node,
  }
}

export const connectionFrom = (dataset: Array<Data>, args: {
  before?: ?string,
  after?: ?string,
  first?: ?number,
  last?: ?number,
}) => {
  const {
    after,
    before,
    first,
    last,
  } = args

  let startIndex = (typeof after === 'string' ? getIndexFromDatasetAndCursor(dataset, after) + 1 : 0)
  let endIndex = (typeof before === 'string' ? getIndexFromDatasetAndCursor(dataset, before) - 1 : dataset.length - 1)
  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error('Argument "first" must be a non-negative integer')
    }

    endIndex = Math.min(
      endIndex,
      (startIndex + first) - 1,
    )
  }

  if (typeof last === 'number') {
    if (last < 0) {
      throw new Error('Argument "last" must be a non-negative integer')
    }

    startIndex = Math.max(
      startIndex,
      (endIndex - last) + 1,
    )
  }

  const datasetSlice = dataset.slice(startIndex, endIndex + 1)

  const edges = datasetSlice.map(i => getEdgeFromDatasetAndNode(dataset, i))

  const firstEdge = edges[0]
  const lastEdge = edges[edges.length - 1]

  return {
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage: typeof last === 'number' ? startIndex > 0 : false,
      hasNextPage: typeof first === 'number' ? endIndex < dataset.length - 1 : false,
    },
  }
}
