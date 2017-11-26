import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './relay/environment'

import TodoListSelectContainer from './containers/TodoListSelect'

const TodoListSelect = componentProps => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListSelectQuery {
        viewer {
          ...TodoListSelect_user
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        throw error
      } else if (props) {
        return <TodoListSelectContainer {...componentProps} user={props.viewer} />
      }
      return <div>Loading</div>
    }}
  />
)

export default TodoListSelect
