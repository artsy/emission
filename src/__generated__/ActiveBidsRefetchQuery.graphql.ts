/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type ActiveBidsRefetchQueryVariables = {
};
export type ActiveBidsRefetchQueryResponse = {
    readonly me: ({
    }) | null;
};



/*
query ActiveBidsRefetchQuery {
  me {
    ...ActiveBids_me
    __id
  }
}

fragment ActiveBids_me on Me {
  lot_standings(live: true) {
    most_recent_bid {
      __id
    }
    ...ActiveBid_bid
  }
  __id
}

fragment ActiveBid_bid on LotStanding {
  is_leading_bidder
  sale {
    href
    is_live_open
    __id
  }
  most_recent_bid {
    __id
    max_bid {
      display
    }
    sale_artwork {
      artwork {
        href
        image {
          url
        }
        artist_names
        __id
      }
      counts {
        bidder_positions
      }
      highest_bid {
        display
        __id: id
      }
      lot_number
      reserve_status
      __id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ActiveBidsRefetchQuery",
  "id": "a7bd30f1cd6c622b9118b99c03a8cb91",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ActiveBidsRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
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
            "kind": "FragmentSpread",
            "name": "ActiveBids_me",
            "args": null
          },
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ActiveBidsRefetchQuery",
    "argumentDefinitions": [],
    "selections": [
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
            "name": "lot_standings",
            "storageKey": "lot_standings(live:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true,
                "type": "Boolean"
              }
            ],
            "concreteType": "LotStanding",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "most_recent_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  v0,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "max_bid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": [
                      v1
                    ]
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
                        "name": "artwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          v2,
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
                                "name": "url",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "artist_names",
                            "args": null,
                            "storageKey": null
                          },
                          v0
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "counts",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "SaleArtworkCounts",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "bidder_positions",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "highest_bid",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "SaleArtworkHighestBid",
                        "plural": false,
                        "selections": [
                          v1,
                          {
                            "kind": "ScalarField",
                            "alias": "__id",
                            "name": "id",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "lot_number",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "reserve_status",
                        "args": null,
                        "storageKey": null
                      },
                      v0
                    ]
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_leading_bidder",
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
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_live_open",
                    "args": null,
                    "storageKey": null
                  },
                  v0
                ]
              }
            ]
          },
          v0
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'b529b67581dfe01e1ade3820469a2902';
export default node;
