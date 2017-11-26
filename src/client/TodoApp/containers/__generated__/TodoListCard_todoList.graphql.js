/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TodoListCard_todoList = {| |};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListCard_todoList",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "TodoListHeader_todoList",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoListItemsWithFilter_todoList",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoListFooter_todoList",
      "args": null
    }
  ],
  "type": "TodoList"
};

module.exports = fragment;
