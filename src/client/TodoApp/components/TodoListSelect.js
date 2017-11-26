import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoListSelect extends Component {
  static propTypes = {
    user: PropTypes.shape({
      todoLists: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired).isRequired,
      }).isRequired,
    }).isRequired,
    onChangeID: PropTypes.func,
  }

  render() {
    const { user } = this.props

    return (
      <select
        className="todo-list-select"
        onChange={(e) => {
          if (this.props.onChangeID) {
            this.props.onChangeID(e.target.value)
          }
        }}
      >
        {user.todoLists.edges.map((edge) => {
          const { node } = edge
          return <option key={node.id} value={node.id}>{node.name}</option>
        })}
      </select>
    )
  }
}
