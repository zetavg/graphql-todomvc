import React, { Component } from 'react'

import TodoListCard from './TodoListCard'
import TodoListSelect from './TodoListSelect'

export default class TodoApp extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      todoListID: null,
    }
  }

  render() {
    return (
      <div className="todo-list-card-container">
        <TodoListCard todoListID={this.state.todoListID} />
        <footer className="info">
          <p>Double-click to edit a todo</p>
          Todo list:&nbsp;
          <TodoListSelect
            onChangeID={(todoListID) => { this.setState({ todoListID }) }}
          />
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>Created by <a href="http://github.com/zetavg">@zetavg</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    )
  }
}
