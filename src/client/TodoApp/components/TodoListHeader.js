import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddTodoItemInput from '../containers/AddTodoItemInput'

export default class TodoListHeader extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { todoList } = this.props

    return (
      <header className="header">
        <h1>{todoList.name}</h1>
        <AddTodoItemInput todoList={todoList} />
      </header>
    )
  }
}
