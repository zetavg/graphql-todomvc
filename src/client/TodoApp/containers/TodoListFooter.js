/* @flow */

import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'

import environment from '../relay/environment'

import TodoListFooterComponent from '../components/TodoListFooter'

import DeleteCompletedItemsOnTodoListMutation from '../mutations/DeleteCompletedItemsOnTodoListMutation'

type Props = {|
  todoList: {
    id: string,
  },
|};

class TodoListFooterContainer extends Component<Props> {
  _getNewClearCompletedItemsMutation = () => {
    const { todoList } = this.props

    return new DeleteCompletedItemsOnTodoListMutation(environment, {
      todoListID: todoList.id,
    })
  }

  _handleClearCompletedPress = () => {
    const mutation = this._getNewClearCompletedItemsMutation()
    mutation.commit()
  }

  render() {
    const { todoList } = this.props

    return (
      <TodoListFooterComponent
        todoList={todoList}
        onClearCompletedPress={this._handleClearCompletedPress}
      />
    )
  }
}

export default createFragmentContainer(
  TodoListFooterContainer,
  graphql`
    fragment TodoListFooter_todoList on TodoList {
      id
      activeItemsCount
      completedItemsCount
    }
  `,
)
