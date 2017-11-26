import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoListItems from '../containers/TodoListItems'

export default class TodoListItemsWithFilter extends Component {
  static propTypes = {
    todoListItemsRef: PropTypes.any,
    todoList: PropTypes.shape({}).isRequired,
    filterValue: PropTypes.string.isRequired,
    onFilterPress: PropTypes.func.isRequired,
  }

  render() {
    const {
      todoListItemsRef,
      todoList,
      filterValue,
      onFilterPress,
    } = this.props

    return (
      <div className="items-with-filter">
        <TodoListItems
          componentRef={todoListItemsRef}
          todoList={todoList}
        />
        <ul className="filters">
          <li>
            <button
              className={filterValue === 'all' ? 'selected' : null}
              onClick={() => onFilterPress('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filterValue === 'active' ? 'selected' : null}
              onClick={() => onFilterPress('active')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filterValue === 'completed' ? 'selected' : null}
              onClick={() => onFilterPress('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
