/* @flow */

import React, { Component } from 'react'
import { graphql, createRefetchContainer } from 'react-relay'
import type { RefetchContainerRelayProp } from 'react-relay'

import TodoListItemsWithFilterComponent from '../components/TodoListItemsWithFilter'

type Props = {|
  todoList: {},
  relay: RefetchContainerRelayProp,
|};

type State = {|
  filter: 'all' | 'active' | 'completed',
|};

class TodoListItemsWithFilterContainer extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  todoListItems: TodoListItemsWithFilterComponent;
  /* eslint-enable react/sort-comp */

  constructor(props, context) {
    super(props, context)

    this.state = {
      filter: 'all',
    }
  }

  setFilter = (filter, callback) => {
    this.props.relay.refetch({ filter }, null, callback, { force: false })
    this.setState({ filter })
  }

  _handleFilterPress = (filter) => {
    this.setFilter(filter, () => {
      if (
        this.todoListItems &&
        this.todoListItems.refreshLayout
      ) {
        this.todoListItems.refreshLayout()
      }
    })
  }

  render() {
    const { todoList } = this.props
    const { filter } = this.state

    return (
      <TodoListItemsWithFilterComponent
        todoListItemsRef={ref => this.todoListItems = ref}
        todoList={todoList}
        filterValue={filter}
        onFilterPress={this._handleFilterPress}
      />
    )
  }
}

export default createRefetchContainer(
  TodoListItemsWithFilterContainer,
  graphql`
    fragment TodoListItemsWithFilter_todoList on TodoList
    @argumentDefinitions(
      filter: { type: "TodoListItemsFilterEnum", defaultValue: "all" }
      count: { type: "Int", defaultValue: 10 }
    ) {
      ...TodoListItems_todoList
    }
  `,
  graphql`
    query TodoListItemsWithFilterRefetchQuery(
      $todoListID: ID
      $filter: TodoListItemsFilterEnum!
      $count: Int!
      $cursor: String
    ) {
      viewer {
        todoList(id: $todoListID) {
          ...TodoListItemsWithFilter_todoList
        }
      }
    }
  `,
)
