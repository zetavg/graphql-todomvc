/**
 * @flow
 * @relayHash 289a0469fdf80c6f489a8882e345de34
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodoListCardQueryResponse = {|
  +viewer: ?{|
    +todoList: ?{| |};
  |};
|};
*/


/*
query TodoListCardQuery(
  $todoListID: ID
  $count: Int!
  $cursor: String
  $filter: TodoListItemsFilterEnum
) {
  viewer {
    todoList(id: $todoListID) {
      ...TodoListCard_todoList
      id
    }
    id
  }
}

fragment TodoListCard_todoList on TodoList {
  ...TodoListHeader_todoList
  ...TodoListItemsWithFilter_todoList
  ...TodoListFooter_todoList
}

fragment TodoListHeader_todoList on TodoList {
  name
  ...AddTodoItemInput_todoList
}

fragment TodoListItemsWithFilter_todoList on TodoList {
  ...TodoListItems_todoList
}

fragment TodoListFooter_todoList on TodoList {
  id
  activeItemsCount
  completedItemsCount
}

fragment TodoListItems_todoList on TodoList {
  id
  itemsCount
  completedItemsCount
  items(first: $count, after: $cursor, filter: $filter) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        ...TodoItem_todoItem
      }
    }
    ... on TodoItemConnection {
      edges {
        cursor
        node {
          __typename
          id
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}

fragment TodoItem_todoItem on TodoItem {
  id
  listID
  completed
  title
}

fragment AddTodoItemInput_todoList on TodoList {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "todoListID",
        "type": "ID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "TodoListItemsFilterEnum",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListCardQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "todoListID",
                "type": "ID"
              }
            ],
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "TodoListCard_todoList",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "TodoListCardQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "todoListID",
        "type": "ID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "TodoListItemsFilterEnum",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "TodoListCardQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "todoListID",
                "type": "ID"
              }
            ],
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
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
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "cursor",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "filter",
                    "variableName": "filter",
                    "type": "TodoListItemsFilterEnum"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "count",
                    "type": "Int"
                  }
                ],
                "concreteType": "TodoItemConnection",
                "name": "items",
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
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "listID",
                            "storageKey": null
                          },
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
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "cursor",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "filter",
                    "variableName": "filter",
                    "type": "TodoListItemsFilterEnum"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "count",
                    "type": "Int"
                  }
                ],
                "handle": "connection",
                "name": "items",
                "key": "TodoListItems_items",
                "filters": [
                  "filter"
                ]
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query TodoListCardQuery(\n  $todoListID: ID\n  $count: Int!\n  $cursor: String\n  $filter: TodoListItemsFilterEnum\n) {\n  viewer {\n    todoList(id: $todoListID) {\n      ...TodoListCard_todoList\n      id\n    }\n    id\n  }\n}\n\nfragment TodoListCard_todoList on TodoList {\n  ...TodoListHeader_todoList\n  ...TodoListItemsWithFilter_todoList\n  ...TodoListFooter_todoList\n}\n\nfragment TodoListHeader_todoList on TodoList {\n  name\n  ...AddTodoItemInput_todoList\n}\n\nfragment TodoListItemsWithFilter_todoList on TodoList {\n  ...TodoListItems_todoList\n}\n\nfragment TodoListFooter_todoList on TodoList {\n  id\n  activeItemsCount\n  completedItemsCount\n}\n\nfragment TodoListItems_todoList on TodoList {\n  id\n  itemsCount\n  completedItemsCount\n  items(first: $count, after: $cursor, filter: $filter) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...TodoItem_todoItem\n      }\n    }\n    ... on TodoItemConnection {\n      edges {\n        cursor\n        node {\n          __typename\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment TodoItem_todoItem on TodoItem {\n  id\n  listID\n  completed\n  title\n}\n\nfragment AddTodoItemInput_todoList on TodoList {\n  id\n}\n"
};

module.exports = batch;
