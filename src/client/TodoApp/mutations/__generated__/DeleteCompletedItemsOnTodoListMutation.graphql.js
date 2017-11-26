/**
 * @flow
 * @relayHash 3e678190c1da80ea714cd713a0e17cf1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteCompletedItemsOnTodoListMutationVariables = {|
  input: {
    todoListID: string;
    clientMutationId?: ?string;
  };
|};
export type DeleteCompletedItemsOnTodoListMutationResponse = {|
  +deleteCompletedItemsOnTodoList: ?{|
    +deletedTodoItemIDs: $ReadOnlyArray<?string>;
    +todoList: {|
      +id: string;
      +itemsCount: number;
      +completedItemsCount: number;
    |};
  |};
|};
*/


/*
mutation DeleteCompletedItemsOnTodoListMutation(
  $input: DeleteCompletedItemsOnTodoListInput!
) {
  deleteCompletedItemsOnTodoList(input: $input) {
    deletedTodoItemIDs
    todoList {
      id
      itemsCount
      completedItemsCount
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
        "type": "DeleteCompletedItemsOnTodoListInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteCompletedItemsOnTodoListMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteCompletedItemsOnTodoListInput!"
          }
        ],
        "concreteType": "DeleteCompletedItemsOnTodoListPayload",
        "name": "deleteCompletedItemsOnTodoList",
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
                "name": "itemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedItemsCount",
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
  "name": "DeleteCompletedItemsOnTodoListMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteCompletedItemsOnTodoListInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteCompletedItemsOnTodoListMutation",
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
            "type": "DeleteCompletedItemsOnTodoListInput!"
          }
        ],
        "concreteType": "DeleteCompletedItemsOnTodoListPayload",
        "name": "deleteCompletedItemsOnTodoList",
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
                "name": "itemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedItemsCount",
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
  "text": "mutation DeleteCompletedItemsOnTodoListMutation(\n  $input: DeleteCompletedItemsOnTodoListInput!\n) {\n  deleteCompletedItemsOnTodoList(input: $input) {\n    deletedTodoItemIDs\n    todoList {\n      id\n      itemsCount\n      completedItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
