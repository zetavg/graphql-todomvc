import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from './relay/environment'

import TodoListCardContainer from './containers/TodoListCard'

const TodoListCard = ({ todoListID }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListCardQuery(
        $todoListID: ID
        $count: Int!
        $cursor: String
        $filter: TodoListItemsFilterEnum
      ) {
        viewer {
          todoList(id: $todoListID) {
            ...TodoListCard_todoList
          }
        }
      }
    `}
    variables={{
      todoListID,
      filter: 'all',
      count: 10,
    }}
    render={({ error, props }) => {
      if (error) {
        throw error
      } else if (props) {
        return <TodoListCardContainer todoList={props.viewer.todoList} />
      }
      return <div>Loading</div>
    }}
  />
)

export default TodoListCard
