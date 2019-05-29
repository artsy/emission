/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkContextArtist_artwork$ref } from "./ArtworkContextArtist_artwork.graphql";
declare const _OtherWorks_artwork$ref: unique symbol;
export type OtherWorks_artwork$ref = typeof _OtherWorks_artwork$ref;
export type OtherWorks_artwork = {
    readonly id: string;
    readonly _id: string;
    readonly context: ({
        readonly __typename: string;
    }) | null;
    readonly " $fragmentRefs": ArtworkContextArtist_artwork$ref;
    readonly " $refType": OtherWorks_artwork$ref;
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
  "name": "OtherWorks_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
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
      "name": "context",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextArtist_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '9fc59978480c0fe7079ed4b7a20a1483';
export default node;
