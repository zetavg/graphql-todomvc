/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TodoListItemsWithFilter_todoList = {| |};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "filter",
      "type": "TodoListItemsFilterEnum",
      "defaultValue": "all"
    },
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListItemsWithFilter_todoList",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "TodoListItems_todoList",
      "args": null
    }
  ],
  "type": "TodoList"
};

module.exports = fragment;
