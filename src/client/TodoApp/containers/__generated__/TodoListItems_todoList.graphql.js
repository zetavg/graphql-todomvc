/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TodoListItems_todoList = {|
  +id: string;
  +itemsCount: number;
  +completedItemsCount: number;
  +items: {|
    +pageInfo: {|
      +endCursor: ?string;
      +hasNextPage: boolean;
    |};
    +edges: ?$ReadOnlyArray<?{|
      +cursor: string;
      +node: ?{|
        +id: string;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "cursor",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "filter",
      "type": "TodoListItemsFilterEnum"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "items"
        ]
      }
    ]
  },
  "name": "TodoListItems_todoList",
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
      "kind": "LinkedField",
      "alias": "items",
      "args": [
        {
          "kind": "Variable",
          "name": "filter",
          "variableName": "filter",
          "type": "TodoListItemsFilterEnum"
        }
      ],
      "concreteType": "TodoItemConnection",
      "name": "__TodoListItems_items_connection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "endCursor",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "hasNextPage",
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
          "name": "edges",
          "plural": true,
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
                },
                {
                  "kind": "FragmentSpread",
                  "name": "TodoItem_todoItem",
                  "args": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "type": "TodoItemConnection",
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "TodoItemEdge",
              "name": "edges",
              "plural": true,
              "selections": [
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
                      "name": "__typename",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "TodoList"
};

module.exports = fragment;
