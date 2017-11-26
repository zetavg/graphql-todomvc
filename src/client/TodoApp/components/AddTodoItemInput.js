import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ENTER_KEY_CODE = 13

export default class AddTodoItemInput extends Component {
  static propTypes = {
    todoItemNameValue: PropTypes.string,
    onChangeTodoItemName: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
  }

  static defaultProps = {
    todoItemNameValue: '',
  }

  componentDidMount() {
    this.input.focus()
  }

  _handleChange = (e) => {
    this.props.onChangeTodoItemName(e.target.value)
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.props.onSubmitEditing()
    }
  }

  render() {
    const { todoItemNameValue } = this.props

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        ref={ref => this.input = ref}
        onChange={this._handleChange}
        onKeyDown={this._handleKeyDown}
        value={todoItemNameValue}
      />
    )
  }
}
