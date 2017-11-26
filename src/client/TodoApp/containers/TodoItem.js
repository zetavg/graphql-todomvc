/* @flow */

import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import environment from '../relay/environment'

import TodoItemComponent from '../components/TodoItem'

import UpdateTodoItemMutation from '../mutations/UpdateTodoItemMutation'
import DeleteTodoItemMutation from '../mutations/DeleteTodoItemMutation'

type Props = {|
  todoItem: {
    id: string,
    listID: string,
    completed: boolean,
    title: string,
  },
|};

type State = {|
  updateTitleMutation: UpdateTodoItemMutation,
|};

class TodoItemContainer extends Component<Props, State> {
  constructor(props, context) {
    super(props, context)

    const { title } = props.todoItem
    this.state = {
      updateTitleMutation: this._getNewUpdateTodoItemMutation({ title }),
    }
  }

  _getNewUpdateTodoItemMutation = (input) => {
    const { todoItem } = this.props

    return new UpdateTodoItemMutation(environment, {
      todoItemID: todoItem.id,
      ...input,
    }, {
      todoListID: todoItem.listID,
    })
  }

  _handleCompletedChangeValue = (completed) => {
    const mutation = this._getNewUpdateTodoItemMutation({ completed })
    mutation.commit()
  }

  _handleEditTitleChangeText = (title) => {
    const { updateTitleMutation: prevMutation } = this.state
    const updateTitleMutation = UpdateTodoItemMutation.updateInput(prevMutation, { title })
    this.setState({ updateTitleMutation })
  }

  _handleSubmitTitleEditing = () => {
    const { updateTitleMutation } = this.state

    if (updateTitleMutation.isValid) {
      updateTitleMutation.commit()
    } else {
      const { title } = this.props.todoItem
      this.setState({
        updateTitleMutation: this._getNewUpdateTodoItemMutation({ title }),
      })
    }
  }

  _getNewDeleteTodoItemMutation = () => {
    const { todoItem } = this.props

    return new DeleteTodoItemMutation(environment, {
      todoItemID: todoItem.id,
    }, {
      todoListID: todoItem.listID,
    })
  }

  _handleRemovePress = () => {
    const mutation = this._getNewDeleteTodoItemMutation()
    mutation.commit()
  }

  render() {
    const { updateTitleMutation } = this.state

    return (
      <TodoItemComponent
        todoItem={this.props.todoItem}
        onCompletedChangeValue={this._handleCompletedChangeValue}
        editTitleValue={updateTitleMutation.input.title || ''}
        onEditTitleChangeText={this._handleEditTitleChangeText}
        onSubmitTitleEditing={this._handleSubmitTitleEditing}
        onRemovePress={this._handleRemovePress}
      />
    )
  }
}

export default createFragmentContainer(
  TodoItemContainer,
  graphql`
    fragment TodoItem_todoItem on TodoItem {
      id
      listID
      completed
      title
    }
  `,
)
