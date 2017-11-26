/**
 * @flow
 * @relayHash 5896a9d36b60a019eb530dbd2526fb6d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ItemOnTodoListUpdatedSubscriptionVariables = {|
  todoListID: string;
|};
export type ItemOnTodoListUpdatedSubscriptionResponse = {|
  +itemOnTodoListUpdated: ?{|
    +todoItem: {|
      +id: string;
      +completed: boolean;
      +title: string;
      +listID: string;
    |};
    +todoList: {|
      +id: string;
      +completedItemsCount: number;
      +activeItemsCount: number;
    |};
  |};
|};
*/


/*
subscription ItemOnTodoListUpdatedSubscription(
  $todoListID: ID!
) {
  itemOnTodoListUpdated(todoListID: $todoListID) {
    todoItem {
      id
      completed
      title
      listID
    }
    todoList {
      id
      completedItemsCount
      activeItemsCount
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "todoListID",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ItemOnTodoListUpdatedSubscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "todoListID",
            "variableName": "todoListID",
            "type": "ID!"
          }
        ],
        "concreteType": "ItemOnTodoListUpdated",
        "name": "itemOnTodoListUpdated",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoItem",
            "name": "todoItem",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completed",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "listID",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedItemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "activeItemsCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "ItemOnTodoListUpdatedSubscription",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "todoListID",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ItemOnTodoListUpdatedSubscription",
    "operation": "subscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "todoListID",
            "variableName": "todoListID",
            "type": "ID!"
          }
        ],
        "concreteType": "ItemOnTodoListUpdated",
        "name": "itemOnTodoListUpdated",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoItem",
            "name": "todoItem",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completed",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "listID",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedItemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "activeItemsCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "subscription ItemOnTodoListUpdatedSubscription(\n  $todoListID: ID!\n) {\n  itemOnTodoListUpdated(todoListID: $todoListID) {\n    todoItem {\n      id\n      completed\n      title\n      listID\n    }\n    todoList {\n      id\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
