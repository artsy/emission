/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidFlowConfirmBidScreenRendererQueryVariables = {
    readonly saleArtworkID: string;
};
export type BidFlowConfirmBidScreenRendererQueryResponse = {
    readonly sale_artwork: ({
    }) | null;
};



/*
query BidFlowConfirmBidScreenRendererQuery(
  $saleArtworkID: String!
) {
  sale_artwork(id: $saleArtworkID) {
    ...ConfirmBid_sale_artwork
    __id
  }
}

fragment ConfirmBid_sale_artwork on SaleArtwork {
  sale {
    id
    live_start_at
    end_at
    __id
  }
  artwork {
    id
    title
    date
    artist_names
    __id
  }
  lot_label
  ...BidResult_sale_artwork
  __id
}

fragment BidResult_sale_artwork on SaleArtwork {
  current_bid {
    amount
    cents
    display
  }
  sale {
    live_start_at
    end_at
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "saleArtworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleArtworkID",
    "type": "String!"
  }
],
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
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "BidFlowConfirmBidScreenRendererQuery",
  "id": "2c05cbf9628a0b3b7f5a2ff168f252dd",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BidFlowConfirmBidScreenRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale_artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "SaleArtwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ConfirmBid_sale_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BidFlowConfirmBidScreenRendererQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale_artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "SaleArtwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              v3,
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
                "name": "end_at",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artwork",
            "storageKey": null,
            "args": null,
            "concreteType": "Artwork",
            "plural": false,
            "selections": [
              v3,
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artist_names",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lot_label",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "current_bid",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtworkCurrentBid",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "amount",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cents",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "display",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '4b3def96e7917ce25eac8990cae528a0';
export default node;
