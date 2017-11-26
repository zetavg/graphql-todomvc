/* @flow */

import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import type { DataID } from 'react-relay'
import environment from '../relay/environment'

import AddTodoItemInputComponent from '../components/AddTodoItemInput'

import CreateTodoItemMutation from '../mutations/CreateTodoItemMutation'

type Props = {|
  todoList: {
    id: DataID,
  },
|};

type State = {
  mutation: CreateTodoItemMutation,
};

class AddTodoItemInputContainer extends Component<Props, State> {
  constructor(props, context) {
    super(props, context)

    this.state = {
      mutation: this._getNewMutation(),
    }
  }

  _getNewMutation = () => {
    const { todoList } = this.props

    return new CreateTodoItemMutation(environment, {
      todoListID: todoList.id,
    })
  }

  _handleTodoItemNameChange = (todoItemName) => {
    const { mutation } = this.state
    this.setState({
      mutation: CreateTodoItemMutation.updateInput(mutation, { title: todoItemName }),
    })
  }

  _handleSubmitEditing = async () => {
    const { mutation } = this.state

    try {
      this.setState({ mutation: this._getNewMutation() })
      await mutation.commit()
    } catch (e) {
      this.setState({ mutation })
    }
  }

  render() {
    const { mutation } = this.state

    return (
      <AddTodoItemInputComponent
        todoItemNameValue={mutation.input.title}
        onChangeTodoItemName={this._handleTodoItemNameChange}
        onSubmitEditing={this._handleSubmitEditing}
      />
    )
  }
}

export default createFragmentContainer(
  AddTodoItemInputContainer,
  graphql`
    fragment AddTodoItemInput_todoList on TodoList {
      id
    }
  `,
)
