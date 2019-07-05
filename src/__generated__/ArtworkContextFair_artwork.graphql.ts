/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { FairArtworkGrid_artwork$ref } from "./FairArtworkGrid_artwork.graphql";
import { RelatedArtworkGrid_artwork$ref } from "./RelatedArtworkGrid_artwork.graphql";
import { ShowArtworkGrid_artwork$ref } from "./ShowArtworkGrid_artwork.graphql";
declare const _ArtworkContextFair_artwork$ref: unique symbol;
export type ArtworkContextFair_artwork$ref = typeof _ArtworkContextFair_artwork$ref;
export type ArtworkContextFair_artwork = {
    readonly " $fragmentRefs": FairArtworkGrid_artwork$ref & ShowArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref & RelatedArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextFair_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextFair_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "FairArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedArtworkGrid_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '27ff8c2d87f7d74787534e26faa82f20';
export default node;
