/* @flow */

import { graphql, createFragmentContainer } from 'react-relay'

import TodoListHeaderComponent from '../components/TodoListHeader'

export default createFragmentContainer(
  TodoListHeaderComponent,
  graphql`
    fragment TodoListHeader_todoList on TodoList {
      name
      ...AddTodoItemInput_todoList
    }
  `,
)
