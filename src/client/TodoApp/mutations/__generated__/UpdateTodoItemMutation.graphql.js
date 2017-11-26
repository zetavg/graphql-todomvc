/**
 * @flow
 * @relayHash 1a7868323402a432b0f4d222d1c2465c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UpdateTodoItemMutationVariables = {|
  input: {
    todoItemID: string;
    title?: ?string;
    completed?: ?boolean;
    clientMutationId?: ?string;
  };
|};
export type UpdateTodoItemMutationResponse = {|
  +updateTodoItem: ?{|
    +todoItem: {|
      +id: string;
      +title: string;
      +completed: boolean;
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
mutation UpdateTodoItemMutation(
  $input: UpdateTodoItemInput!
) {
  updateTodoItem(input: $input) {
    todoItem {
      id
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
        "name": "input",
        "type": "UpdateTodoItemInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateTodoItemMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateTodoItemInput!"
          }
        ],
        "concreteType": "UpdateTodoItemPayload",
        "name": "updateTodoItem",
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "UpdateTodoItemMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateTodoItemInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UpdateTodoItemMutation",
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
            "type": "UpdateTodoItemInput!"
          }
        ],
        "concreteType": "UpdateTodoItemPayload",
        "name": "updateTodoItem",
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
  "text": "mutation UpdateTodoItemMutation(\n  $input: UpdateTodoItemInput!\n) {\n  updateTodoItem(input: $input) {\n    todoItem {\n      id\n      title\n      completed\n    }\n    todoList {\n      id\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
