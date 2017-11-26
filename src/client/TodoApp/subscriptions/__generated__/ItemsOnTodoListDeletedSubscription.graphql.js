/**
 * @flow
 * @relayHash fb8db917a89d05a5ec5a9f5eaab8698d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ItemsOnTodoListDeletedSubscriptionVariables = {|
  todoListID: string;
|};
export type ItemsOnTodoListDeletedSubscriptionResponse = {|
  +itemsOnTodoListDeleted: ?{|
    +deletedTodoItemIDs: $ReadOnlyArray<?string>;
    +todoList: {|
      +id: string;
      +completedItemsCount: number;
      +activeItemsCount: number;
    |};
  |};
|};
*/


/*
subscription ItemsOnTodoListDeletedSubscription(
  $todoListID: ID!
) {
  itemsOnTodoListDeleted(todoListID: $todoListID) {
    deletedTodoItemIDs
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
    "name": "ItemsOnTodoListDeletedSubscription",
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
        "concreteType": "ItemsOnTodoListDeleted",
        "name": "itemsOnTodoListDeleted",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoItemIDs",
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
  "name": "ItemsOnTodoListDeletedSubscription",
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
    "name": "ItemsOnTodoListDeletedSubscription",
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
        "concreteType": "ItemsOnTodoListDeleted",
        "name": "itemsOnTodoListDeleted",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoItemIDs",
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
  "text": "subscription ItemsOnTodoListDeletedSubscription(\n  $todoListID: ID!\n) {\n  itemsOnTodoListDeleted(todoListID: $todoListID) {\n    deletedTodoItemIDs\n    todoList {\n      id\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
