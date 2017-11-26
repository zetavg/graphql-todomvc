/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TodoListSelect_user = {|
  +todoLists: {|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +name: string;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListSelect_user",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "TodoListConnection",
      "name": "todoLists",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "TodoListEdge",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "TodoList",
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
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "name",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
