/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type QueryRenderersBidFlowQueryVariables = {
    readonly artworkID: string;
    readonly saleID: string;
};
export type QueryRenderersBidFlowQueryResponse = {
    readonly artwork: ({
        readonly sale_artwork: ({
        }) | null;
    }) | null;
};



/*
query QueryRenderersBidFlowQuery(
  $artworkID: String!
  $saleID: String!
) {
  artwork(id: $artworkID) {
    sale_artwork(sale_id: $saleID) {
      ...BidFlow_sale_artwork
      __id
    }
    __id
  }
}

fragment BidFlow_sale_artwork on SaleArtwork {
  ...SelectMaxBid_sale_artwork
  __id
}

fragment SelectMaxBid_sale_artwork on SaleArtwork {
  increments {
    display
    cents
  }
  ...ConfirmBid_sale_artwork
  __id
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
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID",
    "type": "String!"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "sale_id",
    "variableName": "saleID",
    "type": "String"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "QueryRenderersBidFlowQuery",
  "id": "a4487568ceefbb74a8ebafcdf645a172",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "QueryRenderersBidFlowQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": v2,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BidFlow_sale_artwork",
                "args": null
              },
              v3
            ]
          },
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "QueryRenderersBidFlowQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": v2,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  v4,
                  v5
                ]
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
                  v6,
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
                  v3
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
                  v6,
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
                  v3
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
                  v5,
                  v4
                ]
              },
              v3
            ]
          },
          v3
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'd81a045733ed31854b43fa13be58de0c';
export default node;
