/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { PartnerArtworkGrid_artwork$ref } from "./PartnerArtworkGrid_artwork.graphql";
import { RelatedArtworkGrid_artwork$ref } from "./RelatedArtworkGrid_artwork.graphql";
import { ShowArtworkGrid_artwork$ref } from "./ShowArtworkGrid_artwork.graphql";
declare const _ArtworkContextShow_artwork$ref: unique symbol;
export type ArtworkContextShow_artwork$ref = typeof _ArtworkContextShow_artwork$ref;
export type ArtworkContextShow_artwork = {
    readonly " $fragmentRefs": ArtistArtworkGrid_artwork$ref & PartnerArtworkGrid_artwork$ref & RelatedArtworkGrid_artwork$ref & ShowArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextShow_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextShow_artwork",
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
      "kind": "FragmentSpread",
      "name": "PartnerArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtworkGrid_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '9723fa1135fa878a6198424cc80a4e46';
export default node;
