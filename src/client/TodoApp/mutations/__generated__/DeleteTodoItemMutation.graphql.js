/**
 * @flow
 * @relayHash 4f7d951ba7fe7ba3de2f15c3d0bd7141
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteTodoItemMutationVariables = {|
  input: {
    todoItemID: string;
    clientMutationId?: ?string;
  };
|};
export type DeleteTodoItemMutationResponse = {|
  +deleteTodoItem: ?{|
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
mutation DeleteTodoItemMutation(
  $input: DeleteTodoItemInput!
) {
  deleteTodoItem(input: $input) {
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
        "name": "input",
        "type": "DeleteTodoItemInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteTodoItemMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoItemInput!"
          }
        ],
        "concreteType": "DeleteTodoItemPayload",
        "name": "deleteTodoItem",
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DeleteTodoItemMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteTodoItemInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteTodoItemMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoItemInput!"
          }
        ],
        "concreteType": "DeleteTodoItemPayload",
        "name": "deleteTodoItem",
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
  "text": "mutation DeleteTodoItemMutation(\n  $input: DeleteTodoItemInput!\n) {\n  deleteTodoItem(input: $input) {\n    deletedTodoItemID\n    todoList {\n      id\n      itemsCount\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
