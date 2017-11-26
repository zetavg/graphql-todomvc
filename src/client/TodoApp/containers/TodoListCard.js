/* @flow */

import { graphql, createFragmentContainer } from 'react-relay'

import TodoListCardComponent from '../components/TodoListCard'

export default createFragmentContainer(
  TodoListCardComponent,
  graphql`
    fragment TodoListCard_todoList on TodoList {
      ...TodoListHeader_todoList
      ...TodoListItemsWithFilter_todoList
      ...TodoListFooter_todoList
    }
  `,
)
