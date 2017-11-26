/* @flow */

import React, { Component } from 'react'
import { graphql, createPaginationContainer } from 'react-relay'
import type { DataID, PaginationContainerRelayProp } from 'react-relay'
import environment from '../relay/environment'

import TodoListItemsComponent from '../components/TodoListItems'

import { registerTodoListItemsConnectionName } from '../registrations/todoListItemsConnectionNames'

import UpdateAllItemsOnTodoListMutation from '../mutations/UpdateAllItemsOnTodoListMutation'

// import TodoItemAddedSubscription from '../subscriptions/TodoItemAddedSubscription'
// import TodoItemUpdatedSubscription from '../subscriptions/TodoItemUpdatedSubscription'
// import TodoItemsUpdatedSubscription from '../subscriptions/TodoItemsUpdatedSubscription'
// import TodoItemRemovedSubscription from '../subscriptions/TodoItemRemovedSubscription'
// import TodoItemsRemovedSubscription from '../subscriptions/TodoItemsRemovedSubscription'

type Props = {|
  todoList: {
    id: DataID,
  },
  relay: PaginationContainerRelayProp,
|};

class TodoListItemsContainer extends Component<Props> {
  /* eslint-disable react/sort-comp */
  todoItemAddedSubscription: TodoItemAddedSubscription;
  todoItemUpdatedSubscription: TodoItemUpdatedSubscription;
  todoItemsUpdatedSubscription: TodoItemsUpdatedSubscription;
  todoItemRemovedSubscription: TodoItemRemovedSubscription;
  todoItemsRemovedSubscription: TodoItemsRemovedSubscription;
  component: TodoListItemsComponent;
  /* eslint-enable react/sort-comp */

  componentWillMount() {
    const subscriptionParams = [environment, {
      todoListID: this.props.todoList.id,
    }]

    // this.todoItemAddedSubscription = new TodoItemAddedSubscription(...subscriptionParams)
    // this.todoItemUpdatedSubscription = new TodoItemUpdatedSubscription(...subscriptionParams)
    // this.todoItemsUpdatedSubscription = new TodoItemsUpdatedSubscription(...subscriptionParams)
    // this.todoItemRemovedSubscription = new TodoItemRemovedSubscription(...subscriptionParams)
    // this.todoItemsRemovedSubscription = new TodoItemsRemovedSubscription(...subscriptionParams)

    // this.todoItemAddedSubscription.subscribe()
    // this.todoItemUpdatedSubscription.subscribe()
    // this.todoItemsUpdatedSubscription.subscribe()
    // this.todoItemRemovedSubscription.subscribe()
    // this.todoItemsRemovedSubscription.subscribe()
  }

  componentWillUnmount() {
    // if (this.todoItemAddedSubscription) this.todoItemAddedSubscription.unsubscribe()
    // if (this.todoItemUpdatedSubscription) this.todoItemUpdatedSubscription.unsubscribe()
    // if (this.todoItemsUpdatedSubscription) this.todoItemsUpdatedSubscription.unsubscribe()
    // if (this.todoItemRemovedSubscription) this.todoItemRemovedSubscription.unsubscribe()
    // if (this.todoItemsRemovedSubscription) this.todoItemsRemovedSubscription.unsubscribe()
  }

  setFilter = (filter: 'all' | 'active' | 'completed') => {
    if (!this.props.relay.refetch) throw new Error('props.relay.refetch is undefined')
    this.props.relay.refetch({ filter })
  }

  loadMore = (callback) => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) return
    this.props.relay.loadMore(10, callback)
  }

  refreshLayout = () => {
    if (
      this.component &&
      this.component.refreshLayout
    ) {
      setTimeout(this.component.refreshLayout, 10)
    }
  }

  refresh = () => {
    if (this.props.relay.isLoading()) return
    // this.setState({ refreshing: true })
    this.props.relay.refetchConnection(10, () => {
      // this.setState({ refreshing: false })
    })
  }

  _getNewMarkAllItemsOnTodoListMutation = ({ completed }) => {
    const { todoList } = this.props

    return new UpdateAllItemsOnTodoListMutation(environment, {
      todoListID: todoList.id,
      completed,
    })
  }

  _handleLoadMoreTriggered = (callbackIfHasMore) => {
    this.loadMore(() => {
      if (this.props.relay.hasMore()) callbackIfHasMore()
    })
  }

  _handleMarkAllCompletedChangeValue = (completed) => {
    const mutation = this._getNewMarkAllItemsOnTodoListMutation({ completed })
    mutation.commit()
  }

  render() {
    return (
      <TodoListItemsComponent
        {...this.props}
        ref={ref => this.component = ref}
        onMarkAllCompletedChangeValue={this._handleMarkAllCompletedChangeValue}
        onLoadMoreTriggered={this._handleLoadMoreTriggered}
      />
    )
  }
}

export default createPaginationContainer(
  TodoListItemsContainer,
  graphql`
    fragment TodoListItems_todoList on TodoList {
      id
      itemsCount
      completedItemsCount
      items(
        first: $count
        after: $cursor
        filter: $filter
      ) @connection(key: "TodoListItems_items") {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            ...TodoItem_todoItem
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.todoList && props.todoList.items
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        todoListID: props.todoList.id,
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query TodoListItemsPaginationQuery(
        $todoListID: ID
        $count: Int!
        $cursor: String
        $filter: TodoListItemsFilterEnum
      ) {
        viewer {
          todoList(id: $todoListID) {
            ...TodoListItems_todoList
          }
        }
      }
    `,
  },
)

registerTodoListItemsConnectionName('TodoListItems_items')
