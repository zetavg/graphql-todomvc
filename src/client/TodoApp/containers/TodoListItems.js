/* @flow */

import React, { Component } from 'react'
import { graphql, createPaginationContainer } from 'react-relay'
import type { DataID, PaginationContainerRelayProp } from 'react-relay'
import environment from '../relay/environment'

import TodoListItemsComponent from '../components/TodoListItems'

import { registerTodoListItemsConnectionName } from '../registrations/todoListItemsConnectionNames'

import UpdateAllItemsOnTodoListMutation from '../mutations/UpdateAllItemsOnTodoListMutation'

import ItemOnTodoListCreatedSubscription from '../subscriptions/ItemOnTodoListCreatedSubscription'
import ItemOnTodoListUpdatedSubscription from '../subscriptions/ItemOnTodoListUpdatedSubscription'
import ItemOnTodoListDeletedSubscription from '../subscriptions/ItemOnTodoListDeletedSubscription'
import ItemsOnTodoListUpdatedSubscription from '../subscriptions/ItemsOnTodoListUpdatedSubscription'
import ItemsOnTodoListDeletedSubscription from '../subscriptions/ItemsOnTodoListDeletedSubscription'

type Props = {|
  todoList: {
    id: DataID,
  },
  relay: PaginationContainerRelayProp,
|};

class TodoListItemsContainer extends Component<Props> {
  /* eslint-disable react/sort-comp */
  itemOnTodoListCreatedSubscription: ItemOnTodoListCreatedSubscription;
  itemOnTodoListUpdatedSubscription: ItemOnTodoListUpdatedSubscription;
  itemOnTodoListDeletedSubscription: ItemOnTodoListDeletedSubscription;
  itemsOnTodoListUpdatedSubscription: ItemsOnTodoListUpdatedSubscription;
  itemsOnTodoListDeletedSubscription: ItemsOnTodoListDeletedSubscription;
  component: TodoListItemsComponent;
  /* eslint-enable react/sort-comp */

  componentWillMount() {
    const subscriptionParams = [environment, {
      todoListID: this.props.todoList.id,
    }]

    this.itemOnTodoListCreatedSubscription = new ItemOnTodoListCreatedSubscription(...subscriptionParams)
    this.itemOnTodoListUpdatedSubscription = new ItemOnTodoListUpdatedSubscription(...subscriptionParams)
    this.itemOnTodoListDeletedSubscription = new ItemOnTodoListDeletedSubscription(...subscriptionParams)
    this.itemsOnTodoListUpdatedSubscription = new ItemsOnTodoListUpdatedSubscription(...subscriptionParams)
    this.itemsOnTodoListDeletedSubscription = new ItemsOnTodoListDeletedSubscription(...subscriptionParams)

    this.itemOnTodoListCreatedSubscription.subscribe()
    this.itemOnTodoListUpdatedSubscription.subscribe()
    this.itemOnTodoListDeletedSubscription.subscribe()
    this.itemsOnTodoListUpdatedSubscription.subscribe()
    this.itemsOnTodoListDeletedSubscription.subscribe()
  }

  componentWillUnmount() {
    if (this.itemOnTodoListCreatedSubscription) this.itemOnTodoListCreatedSubscription.unsubscribe()
    if (this.itemOnTodoListUpdatedSubscription) this.itemOnTodoListUpdatedSubscription.unsubscribe()
    if (this.itemOnTodoListDeletedSubscription) this.itemOnTodoListDeletedSubscription.unsubscribe()
    if (this.itemsOnTodoListUpdatedSubscription) this.itemsOnTodoListUpdatedSubscription.unsubscribe()
    if (this.itemsOnTodoListDeletedSubscription) this.itemsOnTodoListDeletedSubscription.unsubscribe()
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
