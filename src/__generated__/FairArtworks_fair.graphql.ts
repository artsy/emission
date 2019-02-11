/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FilteredInfiniteScrollGrid_filteredArtworks$ref } from "./FilteredInfiniteScrollGrid_filteredArtworks.graphql";
declare const _FairArtworks_fair$ref: unique symbol;
export type FairArtworks_fair$ref = typeof _FairArtworks_fair$ref;
export type FairArtworks_fair = {
    readonly __id: string;
    readonly artworks: ({
        readonly " $fragmentRefs": FilteredInfiniteScrollGrid_filteredArtworks$ref;
    }) | null;
    readonly " $refType": FairArtworks_fair$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "FairArtworks_fair",
  "type": "Fair",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "price_range",
      "type": "String",
      "defaultValue": "*-*"
    }
  ],
  "selections": [
    v0,
    {
      "kind": "LinkedField",
      "alias": "artworks",
      "name": "filteredArtworks",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "MEDIUM",
            "PRICE_RANGE",
            "TOTAL"
          ],
          "type": "[ArtworkAggregation]"
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "price_range",
          "variableName": "price_range",
          "type": "String"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 0,
          "type": "Int"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "FilteredInfiniteScrollGrid_filteredArtworks",
          "args": null
        },
        v0
      ]
    }
  ]
};
})();
(node as any).hash = '26b36e9745a1c9221c25b8ca9dc871b4';
export default node;
