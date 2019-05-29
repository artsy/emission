/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
declare const _ArtworkContextArtist_artwork$ref: unique symbol;
export type ArtworkContextArtist_artwork$ref = typeof _ArtworkContextArtist_artwork$ref;
export type ArtworkContextArtist_artwork = {
    readonly " $fragmentRefs": ArtistArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextArtist_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextArtist_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '9570ea168773e3714c5c945d9e5f4a19';
export default node;
