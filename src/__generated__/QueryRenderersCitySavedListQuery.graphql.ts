/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CitySavedList_viewer$ref } from "./CitySavedList_viewer.graphql";
export type QueryRenderersCitySavedListQueryVariables = {
    readonly citySlug: string;
};
export type QueryRenderersCitySavedListQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": CitySavedList_viewer$ref;
    }) | null;
};
export type QueryRenderersCitySavedListQuery = {
    readonly response: QueryRenderersCitySavedListQueryResponse;
    readonly variables: QueryRenderersCitySavedListQueryVariables;
};



/*
query QueryRenderersCitySavedListQuery(
  $citySlug: String!
) {
  viewer {
    ...CitySavedList_viewer
  }
}

fragment CitySavedList_viewer on Viewer {
  city(slug: $citySlug) {
    name
  }
  me {
    followsAndSaves {
      shows(first: 20, status: RUNNING_AND_UPCOMING, city: $citySlug, after: "") {
        edges {
          node {
            id
            _id
            __id
            name
            status
            href
            is_followed
            exhibition_period
            cover_image {
              url
            }
            location {
              coordinates {
                lat
                lng
              }
              __id
            }
            type
            start_at
            end_at
            partner {
              __typename
              ... on Partner {
                name
                type
              }
              ... on Node {
                __id
              }
              ... on ExternalPartner {
                __id
              }
            }
            __typename
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "citySlug",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "QueryRenderersCitySavedListQuery",
  "id": "318c00611bc96975920567e7f84ac214",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "QueryRenderersCitySavedListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitySavedList_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "QueryRenderersCitySavedListQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "city",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "slug",
                "variableName": "citySlug",
                "type": "String"
              }
            ],
            "concreteType": "City",
            "plural": false,
            "selections": [
              v1
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "me",
            "storageKey": null,
            "args": null,
            "concreteType": "Me",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "followsAndSaves",
                "storageKey": null,
                "args": null,
                "concreteType": "FollowsAndSaves",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shows",
                    "storageKey": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "after",
                        "value": "",
                        "type": "String"
                      },
                      {
                        "kind": "Variable",
                        "name": "city",
                        "variableName": "citySlug",
                        "type": "String"
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 20,
                        "type": "Int"
                      },
                      {
                        "kind": "Literal",
                        "name": "status",
                        "value": "RUNNING_AND_UPCOMING",
                        "type": "EventStatus"
                      }
                    ],
                    "concreteType": "FollowedShowConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FollowedShowEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Show",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "exhibition_period",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "id",
                                "args": null,
                                "storageKey": null
                              },
                              v2,
                              v1,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "status",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "href",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_followed",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "_id",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "cover_image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "url",
                                    "args": null,
                                    "storageKey": null
                                  }
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "location",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Location",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "coordinates",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "LatLng",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "lat",
                                        "args": null,
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "lng",
                                        "args": null,
                                        "storageKey": null
                                      }
                                    ]
                                  },
                                  v2
                                ]
                              },
                              v3,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "start_at",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "end_at",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "partner",
                                "storageKey": null,
                                "args": null,
                                "concreteType": null,
                                "plural": false,
                                "selections": [
                                  v4,
                                  v2,
                                  {
                                    "kind": "InlineFragment",
                                    "type": "Partner",
                                    "selections": [
                                      v1,
                                      v3
                                    ]
                                  }
                                ]
                              },
                              v4
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "cursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "endCursor",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "hasNextPage",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "shows",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "after",
                        "value": "",
                        "type": "String"
                      },
                      {
                        "kind": "Variable",
                        "name": "city",
                        "variableName": "citySlug",
                        "type": "String"
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 20,
                        "type": "Int"
                      },
                      {
                        "kind": "Literal",
                        "name": "status",
                        "value": "RUNNING_AND_UPCOMING",
                        "type": "EventStatus"
                      }
                    ],
                    "handle": "connection",
                    "key": "CitySavedList_shows",
                    "filters": [
                      "status",
                      "city"
                    ]
                  }
                ]
              },
              v2
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
})();
(node as any).hash = '16104d57df352d994547e7882be5f947';
export default node;
