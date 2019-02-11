/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ShowItem_show$ref } from "./ShowItem_show.graphql";
declare const _Shows_show$ref: unique symbol;
export type Shows_show$ref = typeof _Shows_show$ref;
export type Shows_show = {
    readonly nearbyShows: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly " $fragmentRefs": ShowItem_show$ref;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": Shows_show$ref;
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
  "name": "Shows_show",
  "type": "Show",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "nearbyShows",
      "storageKey": "nearbyShows(first:20)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20,
          "type": "Int"
        }
      ],
      "concreteType": "ShowConnection",
      "plural": false,
      "selections": [
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
                {
                  "kind": "FragmentSpread",
                  "name": "ShowItem_show",
                  "args": null
                },
                v0
              ]
            }
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'af2c7984049427e4b1ab6e33ceefb1a3';
export default node;
