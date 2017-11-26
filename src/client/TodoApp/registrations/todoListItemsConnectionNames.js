/* @flow */

/**
 * Updaters can use this registration to iterate over each connection and
 * update them.
 */
const todoListItemsConnectionNames: Array<string> = []
export default todoListItemsConnectionNames

/**
 * Containers that queries the 'todoItems' connection on a 'TodoList' node
 * should register their key with this function.
 */
export const registerTodoListItemsConnectionName =
  (key: string): void => { todoListItemsConnectionNames.push(key) }
