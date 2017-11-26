import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from '../containers/TodoItem'

export default class TodoListItems extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      itemsCount: PropTypes.number.isRequired,
      completedItemsCount: PropTypes.number.isRequired,
      items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired).isRequired,
      }).isRequired,
    }).isRequired,
    onLoadMoreTriggered: PropTypes.func.isRequired,
    onMarkAllCompletedChangeValue: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      // refreshing: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll)
    this._handleScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll)
  }

  refreshLayout = () => {
    this._handleScroll()
  }

  _handleScroll = () => {
    const scrollBottom = document.body.clientHeight - window.innerHeight - window.scrollY
    if (scrollBottom < 100) this.props.onLoadMoreTriggered(this._handleScroll)
  }

  _handleToggleAllChange = (e) => {
    this.props.onMarkAllCompletedChangeValue(e.target.checked)
  }

  render() {
    const { todoList } = this.props
    const { items } = todoList

    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={this._handleToggleAllChange}
          checked={todoList.itemsCount === todoList.completedItemsCount}
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {items.edges.map(edge => <TodoItem key={edge.node.id} todoItem={edge.node} />)}
        </ul>
      </section>
    )
  }
}
