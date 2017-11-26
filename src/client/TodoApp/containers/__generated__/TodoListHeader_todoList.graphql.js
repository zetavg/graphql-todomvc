/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TodoListHeader_todoList = {|
  +name: string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListHeader_todoList",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "name",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "AddTodoItemInput_todoList",
      "args": null
    }
  ],
  "type": "TodoList"
};

module.exports = fragment;
