import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoListFooter extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      activeItemsCount: PropTypes.number.isRequired,
      completedItemsCount: PropTypes.number.isRequired,
    }).isRequired,
    onClearCompletedPress: PropTypes.func.isRequired,
  }

  render() {
    const {
      todoList,
      onClearCompletedPress,
    } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoList.activeItemsCount}</strong>&nbsp;
          {todoList.activeItemsCount > 1 ? 'items' : 'item'} left
        </span>
        {(() => {
          if (todoList.completedItemsCount > 0) {
            return (
              <button
                className="clear-completed"
                onClick={onClearCompletedPress}
              >
                Clear completed
              </button>
            )
          }
          return null
        })()}
      </footer>
    )
  }
}
