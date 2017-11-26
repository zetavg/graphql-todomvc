/**
 * @flow
 * @relayHash 3adc755d1f8da8b386f1681e228a2854
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreateTodoItemMutationVariables = {|
  input: {
    todoListID: string;
    title: string;
    completed?: ?boolean;
    clientMutationId?: ?string;
  };
|};
export type CreateTodoItemMutationResponse = {|
  +createTodoItem: ?{|
    +todoListItemsConnectionEdge: {|
      +cursor: string;
      +node: ?{|
        +completed: boolean;
        +id: string;
        +title: string;
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
mutation CreateTodoItemMutation(
  $input: CreateTodoItemInput!
) {
  createTodoItem(input: $input) {
    todoListItemsConnectionEdge {
      cursor
      node {
        completed
        id
        title
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
        "name": "input",
        "type": "CreateTodoItemInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateTodoItemMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreateTodoItemInput!"
          }
        ],
        "concreteType": "CreateTodoItemPayload",
        "name": "createTodoItem",
        "plural": false,
        "selections": [
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
                    "name": "completed",
                    "storageKey": null
                  },
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CreateTodoItemMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreateTodoItemInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreateTodoItemMutation",
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
            "type": "CreateTodoItemInput!"
          }
        ],
        "concreteType": "CreateTodoItemPayload",
        "name": "createTodoItem",
        "plural": false,
        "selections": [
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
                    "name": "completed",
                    "storageKey": null
                  },
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
  "text": "mutation CreateTodoItemMutation(\n  $input: CreateTodoItemInput!\n) {\n  createTodoItem(input: $input) {\n    todoListItemsConnectionEdge {\n      cursor\n      node {\n        completed\n        id\n        title\n      }\n    }\n    todoList {\n      id\n      itemsCount\n      completedItemsCount\n      activeItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
