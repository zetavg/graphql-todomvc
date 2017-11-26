/**
 * @flow
 * @relayHash ce410c4b75739dd70bfd392f38a83a0b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ItemsOnTodoListUpdatedSubscriptionVariables = {|
  todoListID: string;
|};
export type ItemsOnTodoListUpdatedSubscriptionResponse = {|
  +itemsOnTodoListUpdated: ?{|
    +updatedTodoItemIDs: $ReadOnlyArray<?string>;
    +changes: {|
      +title: ?string;
      +completed: ?boolean;
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
subscription ItemsOnTodoListUpdatedSubscription(
  $todoListID: ID!
) {
  itemsOnTodoListUpdated(todoListID: $todoListID) {
    updatedTodoItemIDs
    changes {
      title
      completed
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
    "name": "ItemsOnTodoListUpdatedSubscription",
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
        "concreteType": "ItemsOnTodoListUpdated",
        "name": "itemsOnTodoListUpdated",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "updatedTodoItemIDs",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "ItemsOnTodoListUpdatedChanges",
            "name": "changes",
            "plural": false,
            "selections": [
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
                "name": "completed",
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
  "name": "ItemsOnTodoListUpdatedSubscription",
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
    "name": "ItemsOnTodoListUpdatedSubscription",
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
        "concreteType": "ItemsOnTodoListUpdated",
        "name": "itemsOnTodoListUpdated",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "updatedTodoItemIDs",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "ItemsOnTodoListUpdatedChanges",
            "name": "changes",
            "plural": false,
            "selections": [
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
                "name": "completed",
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
  "text": "subscription ItemsOnTodoListUpdatedSubscription(\n  $todoListID: ID!\n) {\n  itemsOnTodoListUpdated(todoListID: $todoListID) {\n    updatedTodoItemIDs\n    changes {\n      title\n      completed\n    }\n    todoList {\n      id\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
