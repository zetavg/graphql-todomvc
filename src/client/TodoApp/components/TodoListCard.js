import React, { Component } from 'react'

import TodoListHeader from '../containers/TodoListHeader'
import TodoListItemsWithFilter from '../containers/TodoListItemsWithFilter'
import TodoListFooter from '../containers/TodoListFooter'

export default class TodoListCard extends Component {
  render() {
    return (
      <section className="todo-list-card">
        <TodoListHeader {...this.props} />
        <TodoListItemsWithFilter {...this.props} />
        <TodoListFooter {...this.props} />
      </section>
    )
  }
}
