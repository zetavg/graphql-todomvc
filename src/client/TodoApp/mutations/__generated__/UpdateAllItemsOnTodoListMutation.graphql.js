/**
 * @flow
 * @relayHash db1b87011835f5fb55c9102a0bd46891
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UpdateAllItemsOnTodoListMutationVariables = {|
  input: {
    todoListID: string;
    title?: ?string;
    completed?: ?boolean;
    clientMutationId?: ?string;
  };
|};
export type UpdateAllItemsOnTodoListMutationResponse = {|
  +updateAllItemsOnTodoList: ?{|
    +todoList: {|
      +id: string;
      +completedItemsCount: number;
      +activeItemsCount: number;
    |};
    +updatedTodoItemIDs: $ReadOnlyArray<?string>;
  |};
|};
*/


/*
mutation UpdateAllItemsOnTodoListMutation(
  $input: UpdateAllItemsOnTodoListInput!
) {
  updateAllItemsOnTodoList(input: $input) {
    todoList {
      id
      completedItemsCount
      activeItemsCount
    }
    updatedTodoItemIDs
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateAllItemsOnTodoListInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateAllItemsOnTodoListMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateAllItemsOnTodoListInput!"
          }
        ],
        "concreteType": "UpdateAllItemsOnTodoListPayload",
        "name": "updateAllItemsOnTodoList",
        "plural": false,
        "selections": [
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "updatedTodoItemIDs",
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
  "name": "UpdateAllItemsOnTodoListMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateAllItemsOnTodoListInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UpdateAllItemsOnTodoListMutation",
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
            "type": "UpdateAllItemsOnTodoListInput!"
          }
        ],
        "concreteType": "UpdateAllItemsOnTodoListPayload",
        "name": "updateAllItemsOnTodoList",
        "plural": false,
        "selections": [
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "updatedTodoItemIDs",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation UpdateAllItemsOnTodoListMutation(\n  $input: UpdateAllItemsOnTodoListInput!\n) {\n  updateAllItemsOnTodoList(input: $input) {\n    todoList {\n      id\n      completedItemsCount\n      activeItemsCount\n    }\n    updatedTodoItemIDs\n  }\n}\n"
};

module.exports = batch;
