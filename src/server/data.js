/**
 * In-memory storage of the application data.
 *
 * The data is saved as variables and will be reset after the server restarts,
 * but you could imagine saving and retrieving this data from a remote database
 * rather than remote JavaScript variables in a more complex application.
 *
 * @flow
 */

import uuidv4 from 'uuid/v4'
import atob from 'atob'
import btoa from 'btoa'
import leftPad from 'left-pad'

/**
 * Flow types.
 */

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
  +itemIDs: Array<string>,
}

export interface TodoItem {
  +__type: 'TodoItem',
  +id: string,
  +listID: string,
  +title: string,
  +completed: boolean,
}

export type Data = User | TodoList | TodoItem;

/**
 * Defines initial data for the todo application.
 */

const defaultUserID = '00000000-0000-0000-0000-000000000000'
const todoList0ID = '00000001-0000-0000-0000-000000000000'
const todoList1ID = '00000001-0000-0000-0000-000000000001'

const todoList0TodoItem0: TodoItem = {
  __type: 'TodoItem',
  id: '00000002-0000-0000-0000-000000000000',
  listID: todoList0ID,
  title: 'Taste JavaScript',
  completed: true,
}

const todoList0TodoItem1: TodoItem = {
  __type: 'TodoItem',
  id: '00000002-0000-0000-0000-000000000001',
  listID: todoList0ID,
  title: 'Buy a unicorn',
  completed: false,
}

const todoList0: TodoList = {
  __type: 'TodoList',
  userID: defaultUserID,
  id: todoList0ID,
  name: 'Todos',
  itemIDs: [todoList0TodoItem0.id, todoList0TodoItem1.id],
}

const todoList1TodoItems: Array<TodoItem> = [...Array(100)].map((_, i) => ({
  __type: 'TodoItem',
  id: `00000002-0001-0000-0000-0000000000${leftPad(i, 2, '0')}`,
  listID: todoList1ID,
  title: `Item ${i}`,
  completed: false,
}))

const todoList1: TodoList = {
  __type: 'TodoList',
  userID: defaultUserID,
  id: todoList1ID,
  name: 'Another List',
  itemIDs: todoList1TodoItems.map(i => i.id),
}

const defaultUser: User = {
  __type: 'User',
  id: defaultUserID,
  todoListIDs: [todoList0.id, todoList1.id],
}

/**
 * In-memory data source.
 *
 * All objects will be stored in this map with their id (uuid) as the key.
 */
const dataSource = {
  [defaultUser.id]: defaultUser,
  [todoList0.id]: todoList0,
  [todoList1.id]: todoList1,
  [todoList0TodoItem0.id]: todoList0TodoItem0,
  [todoList0TodoItem1.id]: todoList0TodoItem1,
  ...todoList1TodoItems.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}),
}

/**
 * Query for data with the given id.
 */
export const getDataByID = async (id: string): Promise<Data> => {
  return dataSource[id]
}

/**
 * Get the authenticated user using the given credentials.
 */
export const getAuthenticatedUser = async (): Promise<User> => {
  return defaultUser
}

/**
 * Fetch todo lists from the given user.
 */
export const getTodoListsFromUser = async (user: User): Promise<Array<TodoList>> => {
  return user.todoListIDs.map(id => dataSource[id])
}

/**
 * Fetch a specific todo list from the given user.
 */
export const getTodoListFromUser = async (user: User, todoListID: string): Promise<TodoList> => {
  const userTodoListID = user.todoListIDs.find(id => id === todoListID)
  if (!userTodoListID) throw new Error('Cannot find todo list')
  return dataSource[userTodoListID]
}

/**
 * Fetch the first todo list from the given user.
 */
export const getFirstTodoListFromUser = async (user: User): Promise<?TodoList> => {
  if (!user.todoListIDs[0]) return null
  return dataSource[user.todoListIDs[0]]
}

/**
 * Fetch the user from the given todo list.
 */
export const getUserFromTodoList = async (todoList: TodoList): Promise<TodoList> => {
  return dataSource[todoList.userID]
}

/**
 * Fetch items from the given todo list.
 */
export const getItemsFromTodoList = async (todoList: TodoList, {
  filter,
}: {|
  filter?: string,
|} = {}): Promise<Array<TodoItem>> => {
  const todoItems = todoList.itemIDs.map(id => dataSource[id])

  switch (filter) {
    default:
      return todoItems
    case 'completed':
      return todoItems.filter(i => i.completed)
    case 'active':
      return todoItems.filter(i => !i.completed)
  }
}

/**
 * Get the number of items on a given todo list.
 */
export const getItemsCountFromTodoList = async (todoList: TodoList): Promise<number> => {
  return todoList.itemIDs.length
}

/**
 * Get the number of active items on a given todo list.
 */
export const getActiveItemsCountFromTodoList = async (todoList: TodoList): Promise<number> => {
  return todoList.itemIDs.map(id => dataSource[id]).filter(i => !i.completed).length
}

/**
 * Get the number of completed items on a given todo list.
 */
export const getCompletedItemsCountFromTodoList = async (todoList: TodoList): Promise<number> => {
  return todoList.itemIDs.map(id => dataSource[id]).filter(i => i.completed).length
}

/**
 * Fetch the todo list from a given todo item.
 */
export const getListFromTodoItem = async (todoItem: TodoItem): Promise<TodoList> => {
  return dataSource[todoItem.listID]
}

/**
 * Create a todo item.
 */
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
    listID: todoListID,
    title,
    completed: completed || false,
  }

  dataSource[newTodoItem.id] = newTodoItem
  todoList.itemIDs.push(newTodoItem.id)

  return newTodoItem
}

/**
 * Update a todo item.
 */
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

/**
 * Delete a todo item.
 */
export const deleteTodoItem = async (todoItemID: string): Promise<TodoItem> => {
  const todoItem = dataSource[todoItemID]
  const todoList = dataSource[todoItem.listID]
  todoList.itemIDs.splice(todoList.itemIDs.indexOf(todoItem.id), 1)
  delete dataSource[todoItemID]
  return todoItem
}

/**
 * Update all todo items on a given todo list.
 */
export const updateAllItemsOnTodoList = async (todoListID: string, {
  title,
  completed,
}: {
  title?: string,
  completed?: boolean,
}): Promise<{
  todoList: TodoList,
  updatedTodoItemIDs: Array<string>,
  updatedTodoItems: Array<TodoItem>,
}> => {
  const todoList = dataSource[todoListID]
  const updatedTodoItems = []

  for (const todoItemID of todoList.itemIDs) {
    const todoItem = dataSource[todoItemID]

    if (typeof completed === 'boolean') {
      todoItem.completed = completed
    }

    if (title && typeof title === 'string') {
      todoItem.title = title
    }

    updatedTodoItems.push(todoItem)
  }

  const updatedTodoItemIDs = updatedTodoItems.map(o => o.id)

  return {
    todoList,
    updatedTodoItems,
    updatedTodoItemIDs,
  }
}

/**
 * Delete completed items on a given todo list.
 */
export const deleteCompletedItemsOnTodoList = async (
  todoListID: string,
): Promise<{
  todoList: TodoList,
  deletedTodoItemIDs: Array<string>,
  deletedTodoItems: Array<TodoItem>,
}> => {
  const todoList = dataSource[todoListID]
  const deletedTodoItems = []

  todoList.itemIDs = todoList.itemIDs.filter((todoItemID) => {
    if (!dataSource[todoItemID].completed) return true
    deletedTodoItems.push(dataSource[todoItemID])
    delete dataSource[todoItemID]
    return false
  })

  const deletedTodoItemIDs = deletedTodoItems.map(o => o.id)

  return {
    todoList,
    deletedTodoItems,
    deletedTodoItemIDs,
  }
}

/**
 * Relay Connection helpers.
 */

/**
 * Get the cursor for a given node in the given dataset.
 */
export const getCursorFromDatasetAndNode = (dataset: Array<Data>, node: Data) => {
  return btoa(`id-cursor:${node.id}`)
}

/**
 * Get the edge for a given node in the given dataset.
 */
export const getEdgeFromDatasetAndNode = (dataset: Array<Data>, node: Data) => {
  return {
    cursor: getCursorFromDatasetAndNode(dataset, node),
    node,
  }
}

/**
 * Get the connection for a given dataset with the given args.
 */
export const connectionFor = (dataset: Array<Data>, args: {
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

const getIndexFromDatasetAndCursor = (dataset: Array<Data>, cursor: string) => {
  const [cursorType, cursorData] = atob(cursor).split(':')

  switch (cursorType) {
    case 'id-cursor':
      return dataset.findIndex(d => d.id === cursorData)
    default:
      return -1
  }
}
