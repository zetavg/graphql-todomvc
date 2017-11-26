/**
 * @flow
 * @relayHash a67d15bd5481f0cf81d87844f8e470bc
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ItemOnTodoListDeletedSubscriptionVariables = {|
  todoListID: string;
|};
export type ItemOnTodoListDeletedSubscriptionResponse = {|
  +itemOnTodoListDeleted: ?{|
    +deletedTodoItemID: string;
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
subscription ItemOnTodoListDeletedSubscription(
  $todoListID: ID!
) {
  itemOnTodoListDeleted(todoListID: $todoListID) {
    deletedTodoItemID
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
    "name": "ItemOnTodoListDeletedSubscription",
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
        "concreteType": "ItemOnTodoListDeleted",
        "name": "itemOnTodoListDeleted",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoItemID",
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
  "name": "ItemOnTodoListDeletedSubscription",
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
    "name": "ItemOnTodoListDeletedSubscription",
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
        "concreteType": "ItemOnTodoListDeleted",
        "name": "itemOnTodoListDeleted",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoItemID",
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
  "text": "subscription ItemOnTodoListDeletedSubscription(\n  $todoListID: ID!\n) {\n  itemOnTodoListDeleted(todoListID: $todoListID) {\n    deletedTodoItemID\n    todoList {\n      id\n      itemsCount\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
