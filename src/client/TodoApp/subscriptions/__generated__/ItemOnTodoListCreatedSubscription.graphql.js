/**
 * @flow
 * @relayHash d05d2867bf8524597807bdcb3079f96b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ItemOnTodoListCreatedSubscriptionVariables = {|
  todoListID: string;
|};
export type ItemOnTodoListCreatedSubscriptionResponse = {|
  +itemOnTodoListCreated: ?{|
    +todoItem: {|
      +id: string;
      +completed: boolean;
      +title: string;
      +listID: string;
    |};
    +todoListItemsConnectionEdge: {|
      +cursor: string;
      +node: ?{|
        +id: string;
      |};
    |};
    +todoList: {|
      +id: string;
      +itemsCount: number;
      +completedItemsCount: number;
      +activeItemsCount: number;
    |};
  |};
|};
*/


/*
subscription ItemOnTodoListCreatedSubscription(
  $todoListID: ID!
) {
  itemOnTodoListCreated(todoListID: $todoListID) {
    todoItem {
      id
      completed
      title
      listID
    }
    todoListItemsConnectionEdge {
      cursor
      node {
        id
      }
    }
    todoList {
      id
      itemsCount
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
    "name": "ItemOnTodoListCreatedSubscription",
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
        "concreteType": "ItemOnTodoListCreated",
        "name": "itemOnTodoListCreated",
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
            "concreteType": "TodoItemEdge",
            "name": "todoListItemsConnectionEdge",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TodoItem",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
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
                "name": "itemsCount",
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
  "name": "ItemOnTodoListCreatedSubscription",
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
    "name": "ItemOnTodoListCreatedSubscription",
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
        "concreteType": "ItemOnTodoListCreated",
        "name": "itemOnTodoListCreated",
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
            "concreteType": "TodoItemEdge",
            "name": "todoListItemsConnectionEdge",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TodoItem",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
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
                "name": "itemsCount",
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
  "text": "subscription ItemOnTodoListCreatedSubscription(\n  $todoListID: ID!\n) {\n  itemOnTodoListCreated(todoListID: $todoListID) {\n    todoItem {\n      id\n      completed\n      title\n      listID\n    }\n    todoListItemsConnectionEdge {\n      cursor\n      node {\n        id\n      }\n    }\n    todoList {\n      id\n      itemsCount\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
