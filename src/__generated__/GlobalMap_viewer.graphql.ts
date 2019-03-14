/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _GlobalMap_viewer$ref: unique symbol;
export type GlobalMap_viewer$ref = typeof _GlobalMap_viewer$ref;
export type GlobalMap_viewer = {
    readonly city: ({
        readonly name: string | null;
        readonly slug: string | null;
        readonly coordinates: ({
            readonly lat: number | null;
            readonly lng: number | null;
        }) | null;
        readonly sponsoredContent: ({
            readonly introText: string | null;
            readonly artGuideUrl: string | null;
            readonly featuredShows: ReadonlyArray<({
                readonly id: string;
                readonly _id: string;
                readonly __id: string;
                readonly name: string | null;
                readonly status: string | null;
                readonly isStubShow: boolean | null;
                readonly href: string | null;
                readonly is_followed: boolean | null;
                readonly exhibition_period: string | null;
                readonly cover_image: ({
                    readonly url: string | null;
                }) | null;
                readonly location: ({
                    readonly coordinates: ({
                        readonly lat: number | null;
                        readonly lng: number | null;
                    }) | null;
                }) | null;
                readonly type: string | null;
                readonly start_at: string | null;
                readonly end_at: string | null;
                readonly partner: ({
                    readonly name?: string | null;
                    readonly type?: string | null;
                }) | null;
            }) | null> | null;
            readonly shows: ({
                readonly totalCount: number | null;
            }) | null;
        }) | null;
        readonly upcomingShows: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly _id: string;
                    readonly __id: string;
                    readonly isStubShow: boolean | null;
                    readonly name: string | null;
                    readonly status: string | null;
                    readonly href: string | null;
                    readonly is_followed: boolean | null;
                    readonly exhibition_period: string | null;
                    readonly cover_image: ({
                        readonly url: string | null;
                    }) | null;
                    readonly location: ({
                        readonly coordinates: ({
                            readonly lat: number | null;
                            readonly lng: number | null;
                        }) | null;
                    }) | null;
                    readonly type: string | null;
                    readonly start_at: string | null;
                    readonly end_at: string | null;
                    readonly partner: ({
                        readonly name?: string | null;
                        readonly type?: string | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly shows: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly _id: string;
                    readonly __id: string;
                    readonly isStubShow: boolean | null;
                    readonly name: string | null;
                    readonly status: string | null;
                    readonly href: string | null;
                    readonly is_followed: boolean | null;
                    readonly exhibition_period: string | null;
                    readonly cover_image: ({
                        readonly url: string | null;
                    }) | null;
                    readonly location: ({
                        readonly coordinates: ({
                            readonly lat: number | null;
                            readonly lng: number | null;
                        }) | null;
                    }) | null;
                    readonly type: string | null;
                    readonly start_at: string | null;
                    readonly end_at: string | null;
                    readonly partner: ({
                        readonly name?: string | null;
                        readonly type?: string | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly fairs: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly name: string | null;
                    readonly exhibition_period: string | null;
                    readonly counts: ({
                        readonly partners: any | null;
                    }) | null;
                    readonly location: ({
                        readonly coordinates: ({
                            readonly lat: number | null;
                            readonly lng: number | null;
                        }) | null;
                    }) | null;
                    readonly image: ({
                        readonly image_url: string | null;
                        readonly aspect_ratio: number;
                        readonly url: string | null;
                    }) | null;
                    readonly profile: ({
                        readonly icon: ({
                            readonly id: string | null;
                            readonly href: string | null;
                            readonly height: number | null;
                            readonly width: number | null;
                            readonly url: string | null;
                        }) | null;
                        readonly __id: string;
                        readonly id: string;
                        readonly name: string | null;
                    }) | null;
                    readonly start_at: string | null;
                    readonly end_at: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
    readonly " $refType": GlobalMap_viewer$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_followed",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isStubShow",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "exhibition_period",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "cover_image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
  "plural": false,
  "selections": [
    v10
  ]
},
v12 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "location",
  "storageKey": null,
  "args": null,
  "concreteType": "Location",
  "plural": false,
  "selections": [
    v1,
    v4
  ]
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "start_at",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "end_at",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "partner",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    v4,
    {
      "kind": "InlineFragment",
      "type": "Partner",
      "selections": [
        v0,
        v13
      ]
    }
  ]
},
v17 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_ASC",
  "type": "PartnerShowSorts"
},
v18 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "maxInt",
  "type": "Int"
},
v19 = {
  "kind": "Literal",
  "name": "includeStubShows",
  "value": true,
  "type": "Boolean"
},
v20 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "ShowEdge",
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
          v2,
          v3,
          v4,
          v6,
          v0,
          v5,
          v7,
          v8,
          v9,
          v11,
          v12,
          v13,
          v14,
          v15,
          v16
        ]
      }
    ]
  }
];
return {
  "kind": "Fragment",
  "name": "GlobalMap_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "citySlug",
      "type": "String!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "maxInt",
      "type": "Int!",
      "defaultValue": null
    }
  ],
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
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        v1,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "sponsoredContent",
          "storageKey": null,
          "args": null,
          "concreteType": "CitySponsoredContent",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "introText",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "artGuideUrl",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "featuredShows",
              "storageKey": null,
              "args": null,
              "concreteType": "Show",
              "plural": true,
              "selections": [
                v2,
                v3,
                v4,
                v0,
                v5,
                v6,
                v7,
                v8,
                v9,
                v11,
                v12,
                v13,
                v14,
                v15,
                v16
              ]
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "shows",
              "storageKey": "shows(first:1,sort:\"START_AT_ASC\")",
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 1,
                  "type": "Int"
                },
                v17
              ],
              "concreteType": "ShowConnection",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "totalCount",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": "upcomingShows",
          "name": "shows",
          "storageKey": null,
          "args": [
            {
              "kind": "Literal",
              "name": "dayThreshold",
              "value": 30,
              "type": "Int"
            },
            v18,
            v19,
            v17,
            {
              "kind": "Literal",
              "name": "status",
              "value": "UPCOMING",
              "type": "EventStatus"
            }
          ],
          "concreteType": "ShowConnection",
          "plural": false,
          "selections": v20
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "shows",
          "storageKey": null,
          "args": [
            v18,
            v19,
            {
              "kind": "Literal",
              "name": "sort",
              "value": "PARTNER_ASC",
              "type": "PartnerShowSorts"
            },
            {
              "kind": "Literal",
              "name": "status",
              "value": "RUNNING",
              "type": "EventStatus"
            }
          ],
          "concreteType": "ShowConnection",
          "plural": false,
          "selections": v20
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "fairs",
          "storageKey": null,
          "args": [
            v18,
            {
              "kind": "Literal",
              "name": "sort",
              "value": "START_AT_ASC",
              "type": "FairSorts"
            },
            {
              "kind": "Literal",
              "name": "status",
              "value": "CURRENT",
              "type": "EventStatus"
            }
          ],
          "concreteType": "FairConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "FairEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Fair",
                  "plural": false,
                  "selections": [
                    v3,
                    v0,
                    v9,
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "counts",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "FairCounts",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "partners",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    },
                    v12,
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "image",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "image_url",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "aspect_ratio",
                          "args": null,
                          "storageKey": null
                        },
                        v10
                      ]
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "profile",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Profile",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "icon",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "Image",
                          "plural": false,
                          "selections": [
                            v3,
                            v7,
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "height",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "width",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "url",
                              "args": [
                                {
                                  "kind": "Literal",
                                  "name": "version",
                                  "value": "square140",
                                  "type": "[String]"
                                }
                              ],
                              "storageKey": "url(version:\"square140\")"
                            }
                          ]
                        },
                        v4,
                        v3,
                        v0
                      ]
                    },
                    v14,
                    v15,
                    v4
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'bb9645662bc311a1814ea4107f42c604';
export default node;
