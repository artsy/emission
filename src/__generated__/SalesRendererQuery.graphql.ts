/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SalesRendererQueryVariables = {
};
export type SalesRendererQueryResponse = {
    readonly viewer: ({
    }) | null;
};



/*
query SalesRendererQuery {
  viewer {
    ...Sales_viewer
  }
}

fragment Sales_viewer on Viewer {
  sales(live: true, is_auction: true, size: 100, sort: TIMELY_AT_NAME_ASC) {
    ...SaleListItem_sale
    href
    live_start_at
    __id
  }
  ...LotsByFollowedArtists_viewer
}

fragment SaleListItem_sale on Sale {
  id
  name
  href
  is_open
  is_live_open
  live_url_if_open
  start_at
  end_at
  registration_ends_at
  live_start_at
  display_timely_at
  cover_image {
    url(version: "large")
    aspect_ratio
  }
  __id
}

fragment LotsByFollowedArtists_viewer on Viewer {
  sale_artworks: sale_artworks(first: 10, live_sale: true, is_auction: true, include_artworks_by_followed_artists: true) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        artwork {
          ...GenericGrid_artworks
          __id
        }
        __id
        __typename
      }
    }
  }
}

fragment GenericGrid_artworks on Artwork {
  __id
  id
  image {
    aspect_ratio
  }
  ...Artwork_artwork
}

fragment Artwork_artwork on Artwork {
  title
  date
  sale_message
  is_in_auction
  id
  sale_artwork {
    opening_bid {
      display
    }
    current_bid {
      display
    }
    bidder_positions_count
    sale {
      is_closed
      __id
    }
    __id
  }
  image {
    url(version: "large")
    aspect_ratio
  }
  artists(shallow: true) {
    name
    __id
  }
  partner {
    name
    __id
  }
  href
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "is_auction",
  "value": true,
  "type": "Boolean"
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large",
      "type": "[String]"
    }
  ],
  "storageKey": "url(version:\"large\")"
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "aspect_ratio",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v8 = [
  v3,
  v6
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "SalesRendererQuery",
  "id": "486986327c4c2b0ce00dc1170edbe6ed",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SalesRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
            "name": "Sales_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SalesRendererQuery",
    "argumentDefinitions": [],
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
            "name": "sales",
            "storageKey": "sales(is_auction:true,live:true,size:100,sort:\"TIMELY_AT_NAME_ASC\")",
            "args": [
              v0,
              {
                "kind": "Literal",
                "name": "live",
                "value": true,
                "type": "Boolean"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 100,
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "TIMELY_AT_NAME_ASC",
                "type": "SaleSorts"
              }
            ],
            "concreteType": "Sale",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "start_at",
                "args": null,
                "storageKey": null
              },
              v1,
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_open",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_live_open",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "live_url_if_open",
                "args": null,
                "storageKey": null
              },
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "end_at",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "registration_ends_at",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "live_start_at",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "display_timely_at",
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
                  v4,
                  v5
                ]
              },
              v6
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "sale_artworks",
            "name": "sale_artworks",
            "storageKey": "sale_artworks(first:10,include_artworks_by_followed_artists:true,is_auction:true,live_sale:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10,
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "include_artworks_by_followed_artists",
                "value": true,
                "type": "Boolean"
              },
              v0,
              {
                "kind": "Literal",
                "name": "live_sale",
                "value": true,
                "type": "Boolean"
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "plural": false,
            "selections": [
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
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworksEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "sale_message",
                            "args": null,
                            "storageKey": null
                          },
                          v6,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              v5,
                              v4
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
                          v1,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_in_auction",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "sale_artwork",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtwork",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "opening_bid",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "plural": false,
                                "selections": v7
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "current_bid",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtworkCurrentBid",
                                "plural": false,
                                "selections": v7
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "bidder_positions_count",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "sale",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Sale",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "is_closed",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  v6
                                ]
                              },
                              v6
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": "artists(shallow:true)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "shallow",
                                "value": true,
                                "type": "Boolean"
                              }
                            ],
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": v8
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "partner",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": v8
                          },
                          v2
                        ]
                      },
                      v6,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": "sale_artworks",
            "name": "sale_artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10,
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "include_artworks_by_followed_artists",
                "value": true,
                "type": "Boolean"
              },
              v0,
              {
                "kind": "Literal",
                "name": "live_sale",
                "value": true,
                "type": "Boolean"
              }
            ],
            "handle": "connection",
            "key": "LotsByFollowedArtists_sale_artworks",
            "filters": [
              "live_sale",
              "is_auction",
              "include_artworks_by_followed_artists"
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
(node as any).hash = '96db6414736bd4634b88cf6c32e5121f';
export default node;
