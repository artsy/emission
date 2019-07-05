/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkContextArtist_artwork$ref } from "./ArtworkContextArtist_artwork.graphql";
import { ArtworkContextAuction_artwork$ref } from "./ArtworkContextAuction_artwork.graphql";
import { ArtworkContextFair_artwork$ref } from "./ArtworkContextFair_artwork.graphql";
import { ArtworkContextShow_artwork$ref } from "./ArtworkContextShow_artwork.graphql";
declare const _OtherWorks_artwork$ref: unique symbol;
export type OtherWorks_artwork$ref = typeof _OtherWorks_artwork$ref;
export type OtherWorks_artwork = {
    readonly context: {
        readonly __typename: string;
    } | null;
    readonly sale: {
        readonly is_closed: boolean | null;
    } | null;
    readonly " $fragmentRefs": ArtworkContextArtist_artwork$ref & ArtworkContextFair_artwork$ref & ArtworkContextAuction_artwork$ref & ArtworkContextShow_artwork$ref;
    readonly " $refType": OtherWorks_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "OtherWorks_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
        }
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_closed",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextArtist_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextFair_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextAuction_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextShow_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '5c1c0318c34d391c136fddf16a84bff4';
export default node;
