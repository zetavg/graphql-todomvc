/* @flow */

import { graphql, createFragmentContainer } from 'react-relay'

import TodoListSelectComponent from '../components/TodoListSelect'

export default createFragmentContainer(
  TodoListSelectComponent,
  graphql`
    fragment TodoListSelect_user on User {
      todoLists {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
)
